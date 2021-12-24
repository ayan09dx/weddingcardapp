/* eslint-disable @next/next/no-img-element */
import { useEffect,useState } from 'react'
import {  absoluteUrl,getAppCookies,verifyToken,setLogout} from '../utils/jwthandler';
import styles from '../styles/card.module.css'
import {AiOutlineUser} from 'react-icons/ai';
import ErrorSnackbar from '../utils/errorSnackbar'
import SuccessSnackbar from '../utils/successSnackbar'
import jwt from 'jsonwebtoken';
import { useRouter } from "next/router"
const API_SECRET_KEY = process.env.API_SECRET_KEY;


export default function MyAccount(props){
  const [load,setLoad]=useState(false);
  const [link,setLink]=useState('');
  const [guest,setGuest]=useState('');
  const [lang,setLang]=useState('en');
  const [type,setType]=useState('both');
  const [copied,setCopied]=useState(false);
  const [userData,setUserData]=useState('');
  const [errordelete,setErrorDelete]=useState(false);
  const [succesdelete,setSuccessDelete]=useState(false);
  const router=useRouter();

  const handleDelete=async(e)=>{
    setErrorDelete(false);setSuccessDelete(false);
    let data={email:props.profile.userid,id:props.profile.id,groomimg:userData.groomimagename,brideimg:userData.brideimagename}
    let token={token:jwt.sign(data,API_SECRET_KEY)};
    const res = await fetch(props.baseApiUrl+'/deleteAccount', {
        method: 'post',
        body: JSON.stringify(token)
      })

    const json = await res.json()
    if(json.message==='ok'){
      setSuccessDelete(true);
      setLogout(e);
    }
    else {
      setErrorDelete(true)
    } 
    

 }

 const getDetails=async(email)=>{
    
     let payload={token:jwt.sign(email,API_SECRET_KEY)};
          const res = await fetch(props.baseApiUrl+'/getDetails', {
              method: 'post',
              body: JSON.stringify(payload)
            })
            const json = await res.json()
            if(json.message==='ok'){
             setUserData(json.data)
             setLoad(true)
             return true
            }
            else{
              router.push('/')
             return false
            }       
   }

 useEffect(()=>{
  if(props.profile==='' || props.profile===null){
    router.push('/login')
  }
  else{
    getDetails(props.profile.userid)
  }
},[])     


    return(
    load?
      <div className={styles.sharecontainer}> 
         <div className={styles.shareform}>
          <h4 style={{margin:0,padding:0,marginBottom:5}}>User Name</h4>
          <div className="input-field-container">
            <i className="icon"><AiOutlineUser /></i>
            <input className="input-field"
                type="text"  name="guest" defaultValue={props.profile.name} disabled/>
          </div>
          
          <h4 style={{margin:0,marginTop:30,padding:0,marginBottom:5}}>Email</h4>
          <div className="input-field-container">
            <i className="icon"><AiOutlineUser /></i>
            <input className="input-field"
                type="text"  name="guest" defaultValue={props.profile.userid} disabled/>
          </div>
          <br/><br/>
          <button  className="btn" onClick={handleDelete}>Delete Account</button>
          <p style={{fontStyle:'italic',fontWeight:'lighter',fontFamily:'sans-serif',fontSize:'12px'}}>All your data are saved in an encypted and secured manner. Delete Account will erase all the data including your uploaded photos</p>

         </div>
         <SuccessSnackbar open={succesdelete} msg="Account has been successfully deleted" />
        <ErrorSnackbar open={errordelete} msg="Unable to process.Try Again" />
      </div>:<></>
    );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);
  const baseApiUrl = `${origin}/api`;
  const baseUrl = `${origin}/cardview`;
  const { token } = getAppCookies(req);
  const profile = token ? verifyToken(token.split(' ')[1]) : '';
  return {
    props: {
      baseUrl,
      profile,
      baseApiUrl,
      origin
    },
  };
}