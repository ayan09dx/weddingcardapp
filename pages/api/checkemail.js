import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../../utils/mongodb';
import { testJSON } from '../../utils/jwthandler';

const API_SECRET_KEY = process.env.API_SECRET_KEY;

export default async function handleCheckEmail(req,res){

  let { db } = await connectToDatabase();
  let data = JSON.parse(req.body);
  let email="";
  let res_data="";
  email = jwt.verify(data.token,API_SECRET_KEY);
  
  
  let doc = await db.collection('users').findOne({email:email})
  //console.log(testJSON(doc))
  if(doc!==null && testJSON(doc)){
    res_data={message:'notok',user:doc.username}
  }
  else if(!testJSON(doc)){
    res_data={message:'database_error',user:''}
  }
  else{
    res_data={message:'ok',user:''}
  }
 
  res.status(200).json(res_data);



}