import { User } from "../models";
import * as yup from 'yup';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import  where  from "sequelize";
import Mail from '../libs/Mail';
import { differenceInHours } from "date-fns";
import UploadImage  from '../libs/Uploadimage';






class UserController {
  async login(req,res){
    try {
      const schema = yup.object().shape({
      email: yup.string()
        .email('E-mail inválido.')
        .required('E-mail é obrigatório.'),
      password: yup.string()
        .required('Senha é obrigatória.')
        .min(6, 'Senha deve ter no mínimo 6 caracteres.'),
      })

      await schema.validate(req.body, {abortEarly: false});

      const user = await User.findOne({where:{email:req.body.email}});
      if(!user){
        return res.status(401).json({error:"E-mail ou senha não conferem."});
      }
      const checkPassword = await bcrypt.compare(
        req.body.password,
        user.password_hash
      );

      if(!checkPassword){
        return res.status(401).json({error: "E-mail ou senha não conferem."});
      }

      console.log({hash:process.env.JWT_HASH})
      
      const token = jwt.sign({id: user.id}, process.env.JWT_HASH,{
        expiresIn: "30d",
      });

      const {id, name, email, avatar_url, createdat}= user;
      return res.json({
        user:{
          id,
          name,
          email,
          avatar_url,
          createdat
        },            
        token,
      });     

     } catch (error){
      return res.status(400).json({error:error?.message});
    }
  }
  async create(req, res) {
    const schema = yup.object().shape({
      name: yup.string()
        .required('Nome é obrigatório.')
        .min(3, 'Nome deve ter no mínimo 3 caracteres.'),
      email: yup.string()
        .email('E-mail inválido.')
        .required('E-mail é obrigatório.'),
      password: yup.string()
        .required('Senha é obrigatória.')
        .min(6, 'Senha deve ter no mínimo 6 caracteres.'),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });

      // Verifica se o e-mail já existe
      const existedUser = await User.findOne({
        where: { email: req.body.email },
      });

      if (existedUser) {
        return res.status(400).json({ error: "Usuário já existe." });
      }

      const hashPassword = await bcrypt.hash(req.body.password, 8);

      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: "", // Nunca armazene a senha original
        password_hash: hashPassword,
        reset_password_token: null,
        reset_password_sent_at: null,
        avatar_url: req.body.avatar_url || null,
      });

      return res.status(201).json({ user });

    } catch (err) {
      if (err instanceof yup.ValidationError) {
        return res.status(400).json({ errors: err.errors });
      }

      return res.status(500).json({ error: 'Erro interno no servidor.' });
    }
  }

  async update (req, res) {  // Nova edição 
    try {
      const schema = yup.object().shape({
        name: yup.string()
        .required('Nome é obrigatório.')
        .min(3, 'Nome deve ter no mínimo 3 caracteres.'),
      email: yup.string()
        .email('E-mail inválido.')
        .required('E-mail é obrigatório.'),
      password: yup.string()
        .required('Senha é obrigatória.')
        .min(6, 'Senha deve ter no mínimo 6 caracteres.'),
    });

      await schema.validate(req.body); 
    const { name, email, password} = req.body

    const user = await User.findByPk(req.userId);

    if (!user){
      return res.status(404).json({error: " Usuário não encontrado"});
    }
    if (name){
      user.name = name;
    }
    if (email){
      user.email = email;
    }
    if (password) {
      user.password_hash = await bcrypt.hash(password, 8);
    }

    await user.save();
    
    return res.json ({ user}); 
  } catch (error) {
    return res.status(400).json({ error: error?. message});
  }
}

async updateAvatar(req,res){ // Avatar 
  try {
    const schema = yup.object().shape({
      base64: yup.string().required("Base64 é obrigatório."),
      mime: yup.string().required("Mime é obrigatório"),
    }) 

    await schema.validate(req.body);
    const { base64, mime } = req.body;
    
    const user = await User.findByPk(req.userId);

    if(!user){
      return res.status(404).json({error: "Usuário não encontrado."});
    }

    // 1. Deletar avatar anterior, se existir
    if (user.avatar_url) {
      const splitted = user.avatar_url.split("/");
      const oldKey = splitted[splitted.length - 1];

      const deleteResponse = await UploadImage.delete(oldKey);      

      if(deleteResponse.error) {
        return res.status(500).json({error: deleteResponse});
      }
    }

    // 2. Gerar key com extensão do arquivo
    const extension = mime.split("/")[1]; // Ex: 'jpeg', 'png'
    const key = `user_${user.id}_${Date.now()}.${extension}`;

    // 3. Upload para o S3
    const response = await UploadImage.upload(key, base64, mime);

    if (response?.error) {
      return res.status(400).json({ error: "Erro ao fazer o upload da imagem." });
}

    user.avatar_url = response?.Location;
    await user.save();  
    return res.json(user);


  } catch (error) {
    return res.status(400).json({ error: error?.message || "Erro ao atualizar avatar." });
  }
}
  async get(req, res) {
  try {
    const id = req.userId;

    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const user = await User.findByPk(id, {
      attributes: ["id", "name", "email", "avatar_url", "createdAt"]
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.json(user);
    
  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar usuário." });
  }
}
   async forgotPassword (req,res) {
       try {
        const schema = yup.object().shape({
          email:yup.string()
            .email("E-mail inválido")
            .required("E-mail é obrigatório"),            
        });

        await schema. validate(req.body);
        const user = await User.findOne({where: {email: req.body.email}});

        if(!user){
          return res.status(400).json({error: "Usuário não existe"});
        }
         const { email, name } = user;
         const token = Math.random().toString().slice(2, 8);
         const reset_password_token = await bcrypt.hash(token, 8);       

         await user.update({         
         reset_password_token,
         reset_password_sent_at: new Date(),  // agora está correto
        });

        console.log("Token gerado:", token);    

        
        await Mail.sendEmail(user.email, { // Enviar o e-mail via Resend
        name,
        token,
        }); 

           return res.json({ success: true, message: "E-mail enviado com sucesso." });
         } catch (error) {
           return res.status(500).json({ error: "Falha ao enviar e-mail de teste.", details: error.message });
      }
     }
     async resetPassword (req, res) {
      try{
        const schema = yup.object().shape({
          email:yup.string()
            .email("E-mail inválido")
            .required("E-mail é obrigatório"), 
          token: yup.string().required('Token é Obrigatório'),
          password: yup.string()
            .required('Senha é obrigatória.')
            .min(6, 'Senha deve ter no mínimo 6 caracteres.'),
           
        });

        await schema.validate(req.body);
        const user = await User.findOne({where: {email: req.body.email}});

        if(!user){
          return res.status(400).json({error: "Usuário não existe"});
        }

        if (!user.reset_password_token || !user.reset_password_sent_at) {
           return res.status(404).json({ error: 'Alteração de senha não foi solicitada' });
}


        const hoursDifference = differenceInHours (
          new Date(),
          user.reset_password_sent_at,          
        );

        if(hoursDifference > 3){
          return res.status(401).json({ error: "Token expirado"});
        }                

        console.log({hoursDifference});

        const checkToken = await bcrypt.compare(
        req.body.token,
        user.reset_password_token
      );

        if(!checkToken){
        return res.status(401).json({error: "Token inválido."});
      }

      const password_hash =await bcrypt.hash(req.body.password, 8);
      await user.update({
          password_hash,
          reset_password_token: null,
          reset_password_sent_at: null,
        });

      console.log({checkToken});
      return res.status(200).json({sucess:true});
      } catch (error){
        return res.status(400).json({error: error?.message});
        
      }
     }
    }  
    export default new UserController();
