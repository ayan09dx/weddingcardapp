import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../../utils/mongodb';
import { testJSON } from '../../utils/jwthandler';

const API_SECRET_KEY = process.env.API_SECRET_KEY;

export default async function getDetails(req,res){

  let { db } = await connectToDatabase();
  let data = JSON.parse(req.body);
  let email="";
  let res_data="";
  email = jwt.verify(data.token,API_SECRET_KEY);
  
  
  let doc = await db.collection('details').findOne({email:email})
  //console.log(testJSON(doc))
  if(doc!==null && testJSON(doc)){
    res_data={message:'ok',data:doc}
  }
  else if(!testJSON(doc)){
    res_data={message:'database_error',data:''}
  }
  else{
    res_data={message:'notok',data:''}
  }
 
  res.status(200).json(res_data);



}