import jwt from "jsonwebtoken"




export default async (req, res, next ) => {
  const authHeader = req.headers.authorization;

  console.log({authHeader});

  if(!authHeader){
    return res.status(401).json ({error:"Token não fornecido!"});
  }
  
   let token = authHeader.split(" ")[1];
    token = token.replace(/^"|"$/g, "");

  try {

    const decoded = jwt.verify(token, process.env.JWT_HASH);
    req.userId = decoded.id;

   
    

    return next ();   
   }catch (err){
    return res.status(401).json({error: "Token inválido"});
  } 

  

}