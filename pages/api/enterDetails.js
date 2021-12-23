import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../../utils/mongodb';
import { verifyAPIToken } from '../../utils/jwthandler';


export default async function handleLogin(req,res){

  let { db } = await connectToDatabase();
  let data = JSON.parse(req.body);
  let res_data="";
  data = verifyAPIToken(data.token);
  //console.log(data)
  if(data){
  let doc = await db.collection('details').insertOne({email:data.email,language:data.language,bridename:data.bridename,groomname:data.groomname,bridenamebangla:data.bridenamebangla,
    groomnamebangla:data.groomnamebangla,marraigedate:data.marraigedate,mhall:data.mhall,mhallbangla:data.mhallbangla,receptiondate:data.receptiondate,rhall:data.rhall,
    rhallbangla:data.rhallbangla,brideimage:data.brideimage,brideimagename:data.brideimagename,groomimage:data.groomimage,groomimagename:data.groomimagename, 
    bridefathername:data.bridefathername,bridefathernamebangla:data.bridefathernamebangla,bridemothername:data.bridemothername,bridemothernamebangla:data.bridemothernamebangla,bridehome:data.bridehome,bridehomebangla:data.bridehomebangla,
    groomfathername:data.groomfathername,groomfathernamebangla:data.groomfathernamebangla,groommothername:data.groommothername,groommothernamebangla:data.groommothernamebangla,
    groomhome:data.groomhome,groomhomebangla:data.groomhomebangla,song:'./Sanai.mp3',type:'all'})
   //console.log(doc)
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