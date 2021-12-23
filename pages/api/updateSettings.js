import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../../utils/mongodb';
import { verifyAPIToken } from '../../utils/jwthandler';


export default async function handleLogin(req,res){

  let { db } = await connectToDatabase();
  let data = JSON.parse(req.body);
  let res_data="";
  data = verifyAPIToken(data.token);
  console.log(data)
  if(data){
  let doc = await db.collection('details').updateOne({email:data.email},{$set:{song:data.song,type:data.type}})
   console.log(doc)
  if(doc!==null){
    res_data={message:'ok'}
  }
  else{
    res_data={message:'notok'}
  }
}
else{
    res_data={message:'notok'}
}
  res.status(200).json(res_data);



}