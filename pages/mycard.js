import React, {useState} from "react"
import {  absoluteUrl,getAppCookies,verifyToken} from '../utils/jwthandler';
import jwt from 'jsonwebtoken';
import { useRouter } from "next/router"
const API_SECRET_KEY = process.env.API_SECRET_KEY;


export default function MyCard(props){

    const [load,setLoad]=useState(false);
    const [token,setToken]=useState('');
    const router=useRouter();
    
  React.useEffect(()=>{
    if(props.profile==='' || props.profile===null){
      router.push('/login')
       
    }
    else{
      let data={email:props.profile.userid,guest:''}
      let payload=jwt.sign(data,API_SECRET_KEY);
       setToken(payload);
       setLoad(true)
    }
},[])     

    return(
      load?
        <div className="cardviewer">
            <div className="cardlangselector">
               <img src="./en.jpeg" className="selectorimg"/>
               <button className="btn"> <a href={props.origin+"/cardview?token="+token+"&lang=en"} target="_blank">View in English</a></button>
            </div>
            <div className="cardlangselector">
               <img src="./bn.png" className="selectorimg"/>
               <button className="btn"> <a href={props.origin+"/cardview?token="+token+"&&lang=bn"} target="_blank">View in Bengali</a></button>
            </div>

        </div>
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
        origin
      },
    };
  }