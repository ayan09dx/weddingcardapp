import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../../utils/mongodb';

const API_SECRET_KEY = process.env.API_SECRET_KEY;

export default async function handleLogin(req,res){

  let { db } = await connectToDatabase();
  let data = JSON.parse(req.body);
  let res_data="";
  data = jwt.verify(data.token,API_SECRET_KEY);
  
  
  let doc = await db.collection('users').insertOne({username:data.username,email:data.email,password:data.password})
   //console.log(testJSON(doc))
  if(doc!==null){
    res_data={message:'ok'}
  }
  else{
    res_data={message:'notok'}
  }
 
  res.status(200).json(res_data);



}