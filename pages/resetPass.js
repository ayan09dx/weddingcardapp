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
import {  absoluteUrl,getAppCookies,verifyToken,verifyAPIToken} from '../utils/jwthandler';

const API_SECRET_KEY = process.env.API_SECRET_KEY;

export default function SignUp(props){
    const router=useRouter();
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [load,setLoad]=useState(false)
    const [confirmpassword,setConfirmPassword]=useState('')
    const [errorpassword,setErrorPassword]=useState('');
    const [errorconfirmpassword,setErrorConfirmPassword]=useState('');
    const [errorReset,setErrorReset]=useState(false);
    const [successReset,setSuccessReset]=useState(false);
    const [showPassword,setShowPassword]=useState(false);
    const passRegEx = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

   

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
        setErrorReset(false);setSuccessReset(false)
        if(checkPass() && checkConfirmPass()){
            let req_data={email:email,password:sha256(password)}
            let payload={token:jwt.sign(req_data,API_SECRET_KEY,{expiresIn:'300s'})};
           // console.log(jwt.verify(payload.token,API_SECRET_KEY))
            const res = await fetch(props.baseApiUrl+'/resetPass', {
                method: 'post',
                body: JSON.stringify(payload)
              })
              const json = await res.json()
              if(json.message==='ok'){
                let subject=username+"- Your Password has been reset for Bengali Wedding Card App";
                let msg="Password reset successful . If not done by you ,please reset immediately"
                setSuccessReset(true);
                sendEmail({name:username,email:email,msg:msg,subject:subject})
                router.push('/login');
              }
              else {
               setErrorReset(true)
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
        if(router.query.token){
            let userdata=verifyAPIToken(router.query.token);
            console.log(userdata);
            if(userdata){
                setEmail(userdata.email);
                setUsername(userdata.username);
               
            }
            else{
                setLoad(true);
            }
         }
        else{
            router.push('/login')
        }
    },[])


    return(
        <div className="loginpagecontainer">
        <div className="logincontainer">
             <div className="loginimgcontainer">
                <img src="./signup.jpg" alt="login-img" className="loginimg"/>
            </div>
            <div className="logintextcontainer">
               <h2>Password Reset</h2>
{!load?

               <><div className="input-container">
                            <div className="input-field-container">
                                <i className="icon"><AiOutlineUser /></i>
                                <input className="input-field" type="text" placeholder="Full Name" name="name" value={username} disabled />
                            </div>
                        </div><div className="input-container">
                                <div className="input-field-container">
                                    <i className="icon"><AiOutlineMail /></i>
                                    <input className="input-field"
                                        type="email" placeholder="Email ID" name="email" value={email} disabled />
                                </div>
                            </div><div className="input-container">
                                <div className="input-field-container">
                                    <i className="icon"><RiLockPasswordFill /></i>
                                    <input className={errorpassword !== '' ? "input-field input-error" : "input-field"} type={showPassword ? "text" : "password"} placeholder="Password" name="psw"
                                        value={password} onChange={(e) => { setPassword(e.target.value); setErrorPassword(''); } } onBlur={checkPass} />
                                    <i className="passwordshow" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</i>
                                </div>
                                <p className="texterror" style={errorpassword === '' ? { display: 'none' } : {}}>{errorpassword}</p>
                            </div><div className="input-container">
                                <div className="input-field-container">
                                    <i className="icon"><RiLockPasswordFill /></i>
                                    <input className={errorconfirmpassword !== '' ? "input-field input-error" : "input-field"} type={showPassword ? "text" : "password"} placeholder="Confirm Password" name="cpsw"
                                        value={confirmpassword} onChange={(e) => { setConfirmPassword(e.target.value); setErrorConfirmPassword(''); } } onBlur={checkConfirmPass} />
                                    <i className="passwordshow" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</i>
                                </div>
                                <p className="texterror" style={errorconfirmpassword === '' ? { display: 'none' } : {}}>{errorconfirmpassword}</p>
                            </div><button type="submit" className="btn" onClick={onSubmit}>Submit</button></>
                            :
                            <div style={{textAlign:'center'}}>
                            <p className="texterror">Invalid Request / Request has Expired.</p>
                            <p className="texterror">Please Raise Again</p>
                            <br/>
                            <Link href="/forgotPass"><button type="submit" className="btn">Raise Again</button></Link>
                        </div>
                            
                            }
            </div>
            
        </div>
           
        <SuccessSnackbar open={successReset} msg="Password has been successfully reset" />
        <ErrorSnackbar open={errorReset} msg="Unable to process.Try Again" />
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