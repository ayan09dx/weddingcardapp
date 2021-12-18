/* eslint-disable @next/next/no-img-element */
import React, {useState,useEffect } from 'react';
import { AiOutlineMail} from 'react-icons/ai';
import Link from 'next/link';
import jwt from 'jsonwebtoken';
import SuccessSnackbar from '../utils/successSnackbar';
import {useRouter} from 'next/router';
import { sendEmail } from '../utils/email';
import {  absoluteUrl,getAppCookies,verifyToken} from '../utils/jwthandler';
const API_SECRET_KEY = process.env.API_SECRET_KEY;

export default function ForgotPass(props){
    const router=useRouter();
    const [email,setEmail]=useState('');
    const [user,setUser]=useState('')
    const [erroremail,setErrorEmail]=useState('');
    const [successReq,setSuccessReq]=useState(false);
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,2|3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    const checkEmail=async()=>{
        let payload={token:jwt.sign(email,API_SECRET_KEY)};
        if(emailRegEx.test(email)){
          
            // console.log(jwt.verify(payload.token,API_SECRET_KEY))
             const res = await fetch(props.baseApiUrl+'/checkemail', {
                 method: 'post',
                 body: JSON.stringify(payload)
               })
               const json = await res.json()
               if(json.message!=='ok'){
                setUser(json.user);
                setErrorEmail('checked');
                return true
               }
               else{
                setErrorEmail('Email ID not registered. Sign up instead');
                return false
               }       
        }
        else{
            setErrorEmail('Please enter a valid email address');
            return false
        }
}
  

  

    const  onSubmit=async ()=>{
        setSuccessReq(false)
        if(checkEmail()){
            let req_data={email:email,username:user,msg:'allow'}
            let token=jwt.sign(req_data,API_SECRET_KEY,{expiresIn:'1d'});
            let subject=user+"- Password Change Request for Bengali Wedding Card App";
            let msg="Please reset the password using the link(Valid for 1 Day only): "+props.resetUrl+"?token="+token;
            setSuccessReq(true);
            sendEmail({name:user,email:email,msg:msg,subject:subject});
            
            }
        else{
            return
        }
    }
  
    useEffect(()=>{
        if(props.profile!=='' && props.profile!==null){
            router.push('/')
          }
    },[])


    return(
        <div className="loginpagecontainer">
        <div className="logincontainer">
             <div className="loginimgcontainer">
                <img src="./signup.jpg" alt="login-img" className="loginimg"/>
            </div>
            <div className="logintextcontainer">
               <h2>Forgot Password</h2>

                <div className="input-container">
                   <div className="input-field-container">
                        <i className="icon"><AiOutlineMail/></i>
                        <input className={(erroremail!=='checked' && erroremail!=='')?"input-field input-error":erroremail==="checked"?"input-field input-checked":"input-field"} 
                        type="email" placeholder="Email ID" name="email" value={email} onChange={(e)=>{setEmail(e.target.value);setErrorEmail('')}} onBlur={checkEmail}/>
                    </div> 
                    <p className="texterror" style={(erroremail==='' || erroremail==="checked")?{display:'none'}:{}}>{erroremail}</p>
                </div>
                

                <button type="submit" className="btn" onClick={onSubmit}>Submit Request</button>
                <div className="forgotnew">
                    <Link href="/login"><a>Sign In</a></Link>
                    <Link href="/signup"><a>New User? Create an Account</a></Link>
                </div>
            </div>
        </div>
           
        <SuccessSnackbar open={successReq} msg="Request Received. Please check your e-mail!!" />
        </div>
    )
}

export async function getServerSideProps(context) {
    const { req } = context;
    const { origin } = absoluteUrl(req);
    const baseApiUrl = `${origin}/api`;
    const resetUrl = `${origin}/resetPass`;
  
    const { token } = getAppCookies(req);
    const profile = token ? verifyToken(token.split(' ')[1]) : '';
    return {
      props: {
        baseApiUrl,
        profile,
        resetUrl
      },
    };
  }