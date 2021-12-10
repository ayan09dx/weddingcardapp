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
  let doc = await db.collection('details').updateOne({email:data.email},{$set:{language:data.language,bridename:data.bridename,groomname:data.groomname,bridenamebangla:data.bridenamebangla,
    groomnamebangla:data.groomnamebangla,marraigedate:data.marraigedate,mhall:data.mhall,mhallbangla:data.mhallbangla,rhall:data.rhall,
    rhallbangla:data.rhallbangla,brideimage:data.brideimage,groomimage:data.groomimage}})
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