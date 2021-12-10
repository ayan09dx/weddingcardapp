/* eslint-disable @next/next/no-img-element */
import React, {useState,useEffect } from 'react';
import { AiOutlineMail,AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import Link from 'next/link';
import {sha256} from 'js-sha256';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import ErrorSnackbar from '../utils/errorSnackbar'
import {useRouter} from 'next/router';
import {  absoluteUrl,getAppCookies,verifyToken} from '../utils/jwthandler';
const API_SECRET_KEY = process.env.API_SECRET_KEY;

export default function Login(props){
    const router=useRouter();
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [erroremail,setErrorEmail]=useState('');
    const [errorpassword,setErrorPassword]=useState('');
    const [errorLogin,setErrorLogin]=useState(false);
    const [errorLoginDatabase,setErrorLoginDatabase]=useState(false);
    const [showPassword,setShowPassword]=useState(false);
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,2|3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    const checkEmail=()=>{
            if(emailRegEx.test(email)){
                setErrorEmail('checked');
                return true;
            }
            else{
                setErrorEmail('Please enter a valid email address');
                return false
            }
    }
    const checkPass=()=>{
        if(password===""){
            setErrorPassword('Please enter your password');
            return false
        }
        else{
            setErrorPassword('');
            return true
        }
    }

  

    const  onSubmit=async ()=>{
        setErrorLogin(false);setErrorLoginDatabase(false);
        if(checkEmail() && checkPass() ){
            let req_data={email:email,password:sha256(password)}
            let payload={token:jwt.sign(req_data,API_SECRET_KEY,{expiresIn:'300s'})};
           // console.log(jwt.verify(payload.token,API_SECRET_KEY))
            const res = await fetch(props.baseApiUrl+'/login', {
               
                method: 'post',
                body: JSON.stringify(payload)
              })
              const json = await res.json()
              if(json.message==='ok'){
                Cookies.set('token', json.token);
                router.push('/');
              }
              else if(json.message==='notok'){
               setErrorLogin(true)
              }
              else{
                setErrorLoginDatabase(true)
              }
              
              
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

//console.log(erroremail)
    return(
        <div className="loginpagecontainer">
        <div className="logincontainer">
             <div className="loginimgcontainer">
                <img src="./login.jpg" alt="login-img" className="loginimg"/>
            </div>
            <div className="logintextcontainer">
               <h2>User Login</h2>

                <div className="input-container">
                   <div className="input-field-container">
                        <i className="icon"><AiOutlineMail/></i>
                        <input className={(erroremail!=='checked' && erroremail!=='')?"input-field input-error":erroremail==="checked"?"input-field input-checked":"input-field"} 
                        type="email" placeholder="Email ID" name="email" value={email} onChange={(e)=>{setEmail(e.target.value);setErrorEmail('')}} onBlur={checkEmail}/>
                    </div> 
                    <p className="texterror" style={(erroremail==='' || erroremail==="checked")?{display:'none'}:{}}>{erroremail}</p>
                </div>
                
                
                <div className="input-container">
                    <div className="input-field-container">
                        <i className="icon"><RiLockPasswordFill/></i>
                        <input className={errorpassword!==''?"input-field input-error":"input-field"} type={showPassword?"text":"password"} placeholder="Password" name="psw"
                        value={password} onChange={(e)=>{setPassword(e.target.value);setErrorPassword('');}} onBlur={checkPass}/>
                        <i className="passwordshow" onClick={()=>setShowPassword(!showPassword)}>{showPassword?<AiOutlineEyeInvisible/>:<AiOutlineEye/>}</i>
                    </div>
                    <p className="texterror"  style={errorpassword===''?{display:'none'}:{}}>{errorpassword}</p>
                </div>

                <button type="submit" className="btn" onClick={onSubmit}>Login</button>
                <div className="forgotnew">
                    <Link href="/forgotPass"><a>Forgot Password?</a></Link>
                    <Link href="/signup"><a>New User? Create an Account</a></Link>
                </div>
            </div>
        </div>
           
        <ErrorSnackbar open={errorLogin} msg="User ID/Password is Invalid" />
        <ErrorSnackbar open={errorLoginDatabase} msg="Unable to connect to server.Try Again" />
        </div>
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