import { User } from "../models";
import * as yup from 'yup';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


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
}

export default new UserController();
