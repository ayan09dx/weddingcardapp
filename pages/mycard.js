import React, {useState} from "react"
import {  absoluteUrl,getAppCookies,verifyToken} from '../utils/jwthandler';
import jwt from 'jsonwebtoken';
import {AiOutlineIdcard} from 'react-icons/ai';
import {GiLoveSong} from 'react-icons/gi';
import { useRouter } from "next/router"
import FileUpload from '../components/fileUploadMusic';
import ErrorSnackbar from '../utils/errorSnackbar'
import SuccessSnackbar from '../utils/successSnackbar'
const API_SECRET_KEY = process.env.API_SECRET_KEY;


export default function MyCard(props){

    const [load,setLoad]=useState(false);
    const [token,setToken]=useState('');
    const [type,setType]=useState('all');
    const [uploadSongStatus,setUploadStatus]=useState(false);
    const [userData,setUserData]=useState('');
    const [song,setSong]=useState('/Sanai.mp3');
    const [errorsubmit,setErrorSubmit]=useState(false);
    const [successubmit,setSuccessSubmit]=useState(false);
    const router=useRouter();
    

    const getDetails=async(email)=>{
      //console.log("here")
       let payload={token:jwt.sign(email,API_SECRET_KEY)};
            const res = await fetch(props.baseApiUrl+'/getDetails', {
                method: 'post',
                body: JSON.stringify(payload)
              })
              const json = await res.json()
              if(json.message==='ok'){
               setUserData(json.data)
               setSong(json.data.song)
               setLoad(true)
               return true
              }
              else{
                router.push('/')
               return false
              }       
     }

  const  saveSettings=async ()=>{
    setErrorSubmit(false);setSuccessSubmit(false);
    let req_data={email:userData.email,song:song,type:type}
    let payload={token:jwt.sign(req_data,API_SECRET_KEY,{expiresIn:'300s'})};
   
    const res = await fetch(props.baseApiUrl+'/updateSettings', {
      method: 'post',
      body: JSON.stringify(payload)
    })
    const json = await res.json()
    if(json.message==='ok'){
      setSuccessSubmit(true);
    }
    else {
      setErrorSubmit(true)
    } 
  }
  React.useEffect(()=>{
    if(props.profile==='' || props.profile===null){
      router.push('/login')
       
    }
    else{
      let data={email:props.profile.userid,guest:''}
      let payload=jwt.sign(data,API_SECRET_KEY);
       setToken(payload);
       getDetails(props.profile.userid);
    }
},[])     

    return(
      load?
      <div style={{padding:20}}>
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
        <br/>
        <div className="customsettings">
          <h3>Customize Settings</h3>
          <br/>
          <div className="customform">
                <div className="input-container custom">
                    <div className="input-field-container">
                        <i className="icon"><AiOutlineIdcard/></i>
                        <select name="language" id="language" style={{paddingBottom:8}} onChange={(e) => setType(e.target.value)} value={type}>
                            <option value="" disabled selected>Select Details Type</option>
                            <option value="all">Include All Details</option>
                            <option value="ex">Exclude Bride,Groom & Parents Details</option>
                        </select>
                    </div>
                </div>
                <div className="input-container custom">
                    <div className="input-field-container">
                        <i className="icon"><GiLoveSong/></i>
                        <select name="song" id="song" style={{paddingBottom:8}} onChange={(e) => setSong(e.target.value)} value={song}>
                            <option value="" disabled>Select Song</option>
                            <option value="./Sanai.mp3">Sanai</option>
                            <option value="./Laze.mp3">Laze Ranga Holo</option>
                            <option value="./Lila.mp3">Lila Bali Lila Bali</option>
                            <option value="own">Your Custom Song</option>
                            <option value="upload">Upload Song</option>
                            <option value="na">No song required</option>
                        </select>
                    </div>
                    <div style={song==='upload'?{marginTop:25}:{display:'none'}}>
                     <FileUpload label="Upload Song" setStatus={setUploadStatus}  name={props.profile.id+".mp3"}/>
                    </div>
                    
                </div>
                
                <button  className="btn custombtn" onClick={saveSettings} style={(song==='upload'&&uploadSongStatus)||(song!=='upload')?{marginBottom:20}:{display:'none'}}>Save</button>
             
            </div>
            <div className="input-container" style={song==='na'||song==='upload'?{display:'none'}:{}}>
                 <h3>Play Current Song</h3>
                 <audio src={song==='own'?"/uploads/"+props.profile.id+".mp3":song} controls style={{width:'100%'}}>
                    <p>If you are reading this, it is because your browser does not support the audio element.</p>
                </audio>
                </div>
        </div>
        <SuccessSnackbar open={successubmit} msg="Data has been successfully saved" />
        <ErrorSnackbar open={errorsubmit} msg="Unable to process.Try Again" />
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