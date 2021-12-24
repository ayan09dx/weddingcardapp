/* eslint-disable @next/next/no-img-element */
import { useEffect,useState } from 'react'
import {  absoluteUrl,getAppCookies,verifyToken} from '../utils/jwthandler';
import styles from '../styles/card.module.css'
import {AiOutlineUser,AiOutlineIdcard} from 'react-icons/ai';
import{MdLanguage} from 'react-icons/md'
import jwt from 'jsonwebtoken';
const API_SECRET_KEY = process.env.API_SECRET_KEY;


export default function Share(props){
  const [load,setLoad]=useState(false);
  const [link,setLink]=useState('');
  const [guest,setGuest]=useState('');
  const [lang,setLang]=useState('en');
  const [type,setType]=useState('both');
  const [copied,setCopied]=useState(false);

  const onsubmit=(e)=>{
    let data={email:props.profile.userid,guest:guest,type:type,lang:lang}
    let token=jwt.sign(data,API_SECRET_KEY);
    let link=props.baseUrl+"?token="+token;
    setCopied(false)
    setLink(link)
 }

 useEffect(()=>{
  if(props.profile==='' || props.profile===null){
    router.push('/login')
  }
  else{
    setLoad(true)
  }
},[])     
    return(
    load?
      <div className={styles.sharecontainer}> 
         <div className={styles.shareform}>
          <h3 style={{textAlign:'center',color:'darkblue'}}>Generate Link to Share the Invite</h3>
          <h4 style={{margin:0,padding:0,marginBottom:5}}>Guest Name/আমন্ত্রিত অতিথির নাম</h4>
          <div className="input-field-container">
            <i className="icon"><AiOutlineUser /></i>
            <input className="input-field"
                type="text" placeholder="Guest Name / আমন্ত্রিত অতিথির নাম" name="guest" value={guest} onChange={(e) => setGuest(e.target.value)} />
          </div>

          <h4 style={{margin:0,padding:0,marginBottom:8,marginTop:30}}>Invitation Type/আমন্ত্রণের ধরন</h4>
          <div className="input-field-container">
            <i className="icon"><AiOutlineIdcard /></i>
            <select name="type" id="type" value={type} onChange={(e)=>setType(e.target.value)}  style={{paddingBottom:8}}>
            <option value="wedding">Wedding Only</option>
            <option value="reception">Reception Only</option>
            <option value="both">Both Wedding & Reception</option>
          </select>
          </div>

          <h4 style={{margin:0,padding:0,marginBottom:8,marginTop:30}}>Choose Language/ভাষা নির্বাচন করুন</h4>
          <div className="input-field-container">
            <i className="icon"><MdLanguage /></i>
            <select name="language" id="language" value={lang} onChange={(e)=>{setLang(e.target.value);setCopied(false)}}  style={{paddingBottom:8}}>
            <option value="en">English</option>
            <option value="bn">Bangla/বাংলা</option>
          </select>
          </div>
           <br/><br/>
          <button  className="btn" onClick={onsubmit}>Generate Link</button>
          <br/><br/>
          {link!==""?
            <div style={{width:'100%',textAlign:'center',display:'flex',flexDirection:'column',alignItems:'center'}}>
              <a href={link} target="_blank" style={{width:'90%',cursor:'pointer',textDecoration:'underline',color:'#280071',wordWrap:'break-word'}}>{link}</a><br/>
                 <button className={styles.copybutton} style={copied?{backgroundColor:'green',color:'white'}:{}} onClick={()=>{navigator.clipboard.writeText(link);setCopied(true)}} >{copied?'Copied':'Copy Link'}</button><br/>
                 <a href={"whatsapp://send?text= Wedding Invitation Card  "+link} style={{cursor:'pointer'}}><img src="./whatsapp.svg" alt="whatsapp" height={30}/></a>
            </div>
              :<></>}
         </div>
        
      </div>:<></>
    );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);
  const baseUrl = `${origin}/cardview`;
  const { token } = getAppCookies(req);
  const profile = token ? verifyToken(token.split(' ')[1]) : '';
  return {
    props: {
      baseUrl,
      profile,
      origin
    },
  };
}