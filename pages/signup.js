/* eslint-disable @next/next/no-img-element */
import React, {useState,useEffect } from 'react';
import { AiOutlineMail,AiOutlineEyeInvisible,AiOutlineEye,AiOutlineUser} from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import Link from 'next/link';
import {sha256} from 'js-sha256';
import jwt from 'jsonwebtoken';
import ErrorSnackbar from '../utils/errorSnackbar'
import SuccessSnackbar from '../utils/successSnackbar'
import { sendEmail } from '../utils/email';
import {useRouter} from 'next/router';
import {  absoluteUrl,getAppCookies,verifyToken} from '../utils/jwthandler';

const API_SECRET_KEY = process.env.API_SECRET_KEY;

export default function SignUp(props){
    const router=useRouter();
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmpassword,setConfirmPassword]=useState('')
    const [errorusername,setErrorUsername]=useState('');
    const [erroremail,setErrorEmail]=useState('');
    const [errorpassword,setErrorPassword]=useState('');
    const [errorconfirmpassword,setErrorConfirmPassword]=useState('');
    const [errorSignup,setErrorSignup]=useState(false);
    const [successSignup,setSuccessSignup]=useState(false);
    const [disabled,setDisabled]=useState(false);
    const [showPassword,setShowPassword]=useState(false);
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,2|3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passRegEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

    const checkUserName=()=>{
        if(username===""){
            setErrorUsername('Please enter your full name');
            return false
        }
            else{
                setErrorUsername('');
                return true
            }
    }

    const checkEmail=async()=>{
        let payload={token:jwt.sign(email,API_SECRET_KEY)};
        if(emailRegEx.test(email)){
          
            // console.log(jwt.verify(payload.token,API_SECRET_KEY))
             const res = await fetch(props.baseApiUrl+'/checkemail', {
                 method: 'post',
                 body: JSON.stringify(payload)
               })
               const json = await res.json()
               if(json.message==='ok'){
                setErrorEmail('checked');
                setDisabled(false);
                return true
               }
               else{
                setErrorEmail('Email ID already registered. Sign in instead');
                setDisabled(true);
                return false
               }       
        }
        else{
            setErrorEmail('Please enter a valid email address');
            setDisabled(false);
            return false
        }
}

    const checkPass=()=>{
        
        if(password===""){
            setErrorPassword('Please enter your password');
            return false
        }
        else if(!passRegEx.test(password)){
            setErrorPassword('Password should contain min 8 letters, with atleast a symbol, upper and lower case letters and a number')
            return false
        }
        else{
            setErrorPassword('');
            return true
        }
    }

    const checkConfirmPass=()=>{
        if(confirmpassword===""){
            setErrorConfirmPassword('Please re-enter your password');
            return false
        }
        else if(confirmpassword!==password){
            //console.log('here')
            setErrorConfirmPassword('Confirm password should be same as Password');
            return false
        }
        else{
            setErrorConfirmPassword('');
            return true
        }
    }

  

    const  onSubmit=async ()=>{
        setErrorSignup(false);setSuccessSignup(false)
        if(checkUserName() && checkEmail() && checkPass() && checkConfirmPass()){
            let req_data={username:username,email:email,password:sha256(password)}
            let payload={token:jwt.sign(req_data,API_SECRET_KEY,{expiresIn:'300s'})};
           // console.log(jwt.verify(payload.token,API_SECRET_KEY))
            const res = await fetch(props.baseApiUrl+'/signup', {
               
                method: 'post',
                body: JSON.stringify(payload)
              })
              const json = await res.json()
              if(json.message==='ok'){
                let subject=username+"- You are successfully signed up with Bengali Wedding Card App";
                let msg="Welcome onboard!! We are delighted to have you here. Access your account at https://bengaliweddingcard.herokuapp.com from desktop/laptop or from mobile app"
                setSuccessSignup(true);
                sendEmail({name:username,email:email,msg:msg,subject:subject})
                router.push('/login');
              }
              else {
               setErrorSignup(true)
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


    return(
        <div className="loginpagecontainer">
        <div className="logincontainer">
             <div className="loginimgcontainer">
                <img src="./signup.jpg" alt="login-img" className="loginimg"/>
            </div>
            <div className="logintextcontainer">
               <h2>New User Sign Up</h2>

               <div className="input-container">
                   <div className="input-field-container">
                        <i className="icon"><AiOutlineUser/></i>
                        <input className={(errorusername!=='')?"input-field input-error":"input-field"} 
                        type="text" placeholder="Full Name" name="name" value={username} onChange={(e)=>{setUsername(e.target.value);setErrorUsername('')}} onBlur={checkUserName} disabled={disabled}/>
                    </div> 
                    <p className="texterror" style={(errorusername==='' || errorusername==="checked")?{display:'none'}:{}}>{errorusername}</p>
                </div>

                <div className="input-container">
                   <div className="input-field-container">
                        <i className="icon"><AiOutlineMail/></i>
                        <input className={(erroremail!=='checked' && erroremail!=='')?"input-field input-error":erroremail==="checked"?"input-field input-checked":"input-field"} 
                        type="email" placeholder="Email ID" name="email" value={email} onChange={(e)=>{setEmail(e.target.value);setErrorEmail('');}} onBlur={checkEmail} />
                    </div> 
                    <p className="texterror" style={(erroremail==='' || erroremail==="checked")?{display:'none'}:{}}>{erroremail}</p>
                </div>

                <div className="input-container">
                    <div className="input-field-container">
                        <i className="icon"><RiLockPasswordFill/></i>
                        <input className={errorpassword!==''?"input-field input-error":"input-field"} type={showPassword?"text":"password"} placeholder="Password" name="psw"
                        value={password} onChange={(e)=>{setPassword(e.target.value);setErrorPassword('')}} onBlur={()=>{checkPass();checkConfirmPass();}} disabled={disabled} />
                        <i className="passwordshow" onClick={()=>setShowPassword(!showPassword)}>{showPassword?<AiOutlineEyeInvisible/>:<AiOutlineEye/>}</i>
                    </div>
                    <p className="texterror"  style={errorpassword===''?{display:'none'}:{}}>{errorpassword}</p>
                </div>
               
                
                
                <div className="input-container">
                    <div className="input-field-container">
                        <i className="icon"><RiLockPasswordFill/></i>
                        <input className={errorconfirmpassword!==''?"input-field input-error":"input-field"} type={showPassword?"text":"password"} placeholder="Confirm Password" name="cpsw"
                        value={confirmpassword} onChange={(e)=>{setConfirmPassword(e.target.value);setErrorConfirmPassword('');checkPass();}} onBlur={checkConfirmPass} disabled={disabled} />
                        <i className="passwordshow" onClick={()=>setShowPassword(!showPassword)}>{showPassword?<AiOutlineEyeInvisible/>:<AiOutlineEye/>}</i>
                    </div>
                    <p className="texterror"  style={errorconfirmpassword===''?{display:'none'}:{}}>{errorconfirmpassword}</p>
                </div>

                <button type="submit" className="btn" onClick={onSubmit} disabled={disabled}>Sign Up</button>
                <div className="forgotnew">
                    <Link href="/forgotPass"><a>Forgot Password?</a></Link>
                    <Link href="/login"><a>Already Have Account? Sign In</a></Link>
                </div>
            </div>
        </div>
           
        <SuccessSnackbar open={successSignup} msg="You are on board.Please cheack your email" />
        <ErrorSnackbar open={errorSignup} msg="Unable to connect to server.Try Again" />
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