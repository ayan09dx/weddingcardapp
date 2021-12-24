import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../../utils/mongodb';
import { testJSON } from '../../utils/jwthandler';
const SECRET_KEY = process.env.SECRET_KEY;
const API_SECRET_KEY = process.env.API_SECRET_KEY;

export default async function handleLogin(req,res){

  let { db } = await connectToDatabase();
  let data = JSON.parse(req.body);
  let user="";
  let res_data="";
  data = jwt.verify(data.token,API_SECRET_KEY);
  
  
  let doc = await db.collection('users').findOne({email:data.email,password:data.password})

  if(doc!==null && testJSON(doc)){
    user ={userid:doc.email,name:doc.username,id:doc._id.toString()}
    let token=jwt.sign(user,SECRET_KEY,{expiresIn:'1d'});
    res_data={message:'ok',token:'Bearer ' + token}
  }
  else if(!testJSON(doc)){
    res_data={message:'database_error',token:''}
  }
  else{
    res_data={message:'notok',token:''}
  }
 
  res.status(200).json(res_data);



}