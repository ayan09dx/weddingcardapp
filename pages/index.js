import React, {useState} from "react"
import { useRouter } from "next/router"
import {  absoluteUrl,getAppCookies,verifyToken} from '../utils/jwthandler';
import EnterDetails from "../components/mydetails";
import jwt from 'jsonwebtoken';
import EditDetails from "../components/editdetails"

const API_SECRET_KEY = process.env.API_SECRET_KEY;

export default function Home(props){

  const [load,setLoad]=useState(false)
  const [pagelevel,setPagelevel]=useState('entry');
  const [userData,setUserData]=useState({});
  const router=useRouter();


  const getDetails=async()=>{
    let payload={token:jwt.sign(props.profile.userid,API_SECRET_KEY)};
        // console.log(jwt.verify(payload.token,API_SECRET_KEY))
         const res = await fetch(props.baseApiUrl+'/getDetails', {
             method: 'post',
             body: JSON.stringify(payload)
           })
           const json = await res.json()
           if(json.message==='ok'){
            setUserData(json.data)
            setPagelevel('show')
            return true
           }
           else{
            setPagelevel('entry')
            return false
           }       
    }


  React.useEffect(()=>{
    if(props.profile==='' || props.profile===null){
      router.push('/login')
       
    }
    else{
       getDetails();
       setLoad(true)
    }
},[])
console.log(userData)
  return(
    load && pagelevel==='entry'?
    <EnterDetails id={props.profile.id} email={props.profile.userid} apiURL={props.baseApiUrl}/>
    :
    load && pagelevel==='show'?
    <EditDetails id={props.profile.id} data={userData} apiURL={props.baseApiUrl}/>
    :<></>
  )
}

export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);
  const baseApiUrl = `${origin}/api`;
  
  const { token } = getAppCookies(req);
  const profile = token ? verifyToken(token.split(' ')[1]) : '';
  return {
    props: {
      baseApiUrl,
      profile,
    },
  };
}