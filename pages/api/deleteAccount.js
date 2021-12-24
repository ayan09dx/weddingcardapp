import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../../utils/mongodb';
import { verifyAPIToken } from '../../utils/jwthandler';
import fs from 'fs'

export default async function deleteAccount(req,res){
    let { db } = await connectToDatabase();
    let data = JSON.parse(req.body);
    let res_data="";
    data = verifyAPIToken(data.token);
        let user = await db.collection('users').deleteOne({email:data.email})
        if(user){
            let details = await db.collection('details').deleteOne({email:data.email})
            if(details){
                res_data={message:'ok'}
                deleteFile(data.brideimg)
                deleteFile(data.groomimg)
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

function deleteFile(file) {
    fs.unlink("public/uploads/"+file, (err => {
        if (err) {
           
            return false
            
        }
        else {
            console.log(file+"--Deleted")
            return true
        }
      }));
  }