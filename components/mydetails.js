import React, {useState,useEffect } from 'react';
import {AiOutlineUser} from 'react-icons/ai';
import{GiChessQueen} from 'react-icons/gi'
import{HiOutlineLocationMarker} from 'react-icons/hi'
import{MdLanguage,MdOutlineDateRange} from 'react-icons/md'
import FileUpload from './fileUpload';
import styles from '../styles/mydetails.module.css'
import jwt from 'jsonwebtoken';
import ErrorSnackbar from '../utils/errorSnackbar'
import SuccessSnackbar from '../utils/successSnackbar'
import Router from 'next/router'

const API_SECRET_KEY = process.env.API_SECRET_KEY;

export default function MyDetails(props){
    const [viewlevel,setViewLevel]=useState(0);
    const [language,setLanguage]=useState('')
    const [bridename,setBrideName]=useState('')
    const [errorbridename,setErrorBrideName]=useState('');
    const [bridenamebangla,setBrideNameBangla]=useState('')
    const [errorbridenamebangla,setErrorBrideNameBangla]=useState('');
    const [groomname,setGroomName]=useState('')
    const [errorgroomname,setErrorGroomName]=useState('');
    const [groomnamebangla,setGroomNameBangla]=useState('')
    const [errorgroomnamebangla,setErrorGroomNameBangla]=useState('');
    const [marraigedate,setMarraigeDate]=useState('')
    const [errormarriagedate,setErrorMarraigeDate]=useState('');
    const [mhallbangla,setMarraigeHallBangla]=useState('')
    const [errormhallbangla,setErrorMarraigeHallBangla]=useState('');
    const [mhall,setMarraigeHall]=useState('')
    const [errormhall,setErrorMarraigeHall]=useState('');
    const [receptiondate,setReceptionDate]=useState('')
    const [errorreceptiondate,setErrorReceptionDate]=useState('');
    const [rhall,setReceptionHall]=useState('')
    const [errorrhall,setErrorReceptionHall]=useState('');
    const [rhallbangla,setReceptionHallBangla]=useState('')
    const [errorrhallbangla,setErrorReceptionHallBangla]=useState('');
    const [errorselect,setErrorSelect]=useState('');
    const [brideimage,setBrideImage]=useState(false);
    const [brideimagename,setBrideImageName]=useState('');
    const [groomimagename,setGroomImageName]=useState('');
    const [groomimage,setGroomImage]=useState(false);
    const [errorsubmit,setErrorSubmit]=useState(false);
    const [successubmit,setSuccessSubmit]=useState(false);
    const [disabled,setDisabled]=useState(true);

    const checkBrideName=()=>{
        if(language==='bn'){
            return true
        }
        else if(bridename===""){
            setErrorBrideName('Please enter bride\'s  first name');
            return false
        }
            else{
                setErrorBrideName('');
                return true
            }
    }
    const checkBrideNameBangla=()=>{
        if(language==='en'){
            return true
        }
        else if(bridenamebangla===""){
            setErrorBrideNameBangla('কনের ভাল নাম লিখুন');
            return false
        }
            else{
                setErrorBrideNameBangla('');
                return true
            }
    }

    const checkGroomName=()=>{
        if(language==='bn'){
            return true
        }
        else if(groomname===""){
            setErrorGroomName('Please enter groom\'s  first name');
            return false
        }
            else{
                setErrorGroomName('');
                return true
            }
    }

    const checkGroomNameBangla=()=>{
        if(language==='en'){
            return true
        }
        else if(groomnamebangla===""){
            setErrorGroomNameBangla('বরের ভালো নাম লিখুন');
            return false
        }
            else{
                setErrorGroomNameBangla('');
                return true
            }
    }

    const checkMarraigeDate=()=>{
       
        if(marraigedate===""){
            setErrorMarraigeDate('Please enter marraige date-বিয়ের তারিখ লিখুন');
            return false
        }
            else{
                setErrorMarraigeDate('');
                return true
            }
    }
    const checkReceptionDate=()=>{
       
        if(receptiondate===""){
            setErrorReceptionDate('Please enter reception date-প্রীতিভোজের তারিখ লিখুন');
            return false
        }
            else{
                setErrorReceptionDate('');
                return true
            }
    }


    const checkMarraigeHall=()=>{
        if(language==='bn'){
            return true
        }
        else if(mhall===""){
            setErrorMarraigeHall('Please enter marraige hall address');
            return false
        }
            else{
                setErrorMarraigeHall('');
                return true
            }
    }

    const checkMarraigeHallBangla=()=>{
        if(language==='en'){
            return true
        }
        else if(mhallbangla===""){
            setErrorMarraigeHallBangla('বিয়ে বাড়ির ঠিকানা লিখুন');
            return false
        }
            else{
                setErrorMarraigeHallBangla('');
                return true
            }
    }

    const checkReceptionHall=()=>{
        if(language==='bn'){
            return true
        }
        else if(rhall===""){
            setErrorReceptionHall('Please enter reception hall address');
            return false
        }
            else{
                setErrorReceptionHall('');
                return true
            }
    }

    const checkReceptionHallBangla=()=>{
        if(language==='en'){
            return true
        }
        else if(rhallbangla===""){
            setErrorReceptionHallBangla('প্রীতিভোজের বাড়ির ঠিকানা লিখুন');
            return false
        }
            else{
                setErrorReceptionHallBangla('');
                return true
            }
    }

const handleNext=(level)=>{
    if(checkBrideName()&&checkBrideNameBangla()&&checkGroomName()&&checkGroomNameBangla())
    setViewLevel(level);
}
const handleNexttwo=(level)=>{
    if(checkMarraigeDate()&&checkMarraigeHall()&&checkMarraigeHallBangla()&&checkReceptionDate()&&checkReceptionHall()&&checkReceptionHallBangla())
    setViewLevel(level);
}

const  onSubmit=async ()=>{
    setErrorSubmit(false);setSuccessSubmit(false);
        let req_data={email:props.email,language:language,bridename:bridename,groomname:groomname,bridenamebangla:bridenamebangla,
        groomnamebangla:groomnamebangla,marraigedate:marraigedate,mhall:mhall,mhallbangla:mhallbangla,rhall:rhall,
        rhallbangla:rhallbangla,receptiondate:receptiondate,brideimage:brideimage,brideimagename:brideimagename,groomimage:groomimage,groomimagename:groomimagename}
        console.log(req_data)
        let payload={token:jwt.sign(req_data,API_SECRET_KEY,{expiresIn:'300s'})};
       // console.log(jwt.verify(payload.token,API_SECRET_KEY))
        const res = await fetch(props.apiURL+'/enterDetails', {
            method: 'post',
            body: JSON.stringify(payload)
          })
          const json = await res.json()
          if(json.message==='ok'){
            setSuccessSubmit(true);
            Router.reload();
          }
          else {
            setErrorSubmit(true)
          }     
    }


    return(
        <div className={styles.container}>
         {viewlevel===0?
            <div className={styles.formcontainer}>
            <h3>Please Enter Bride & Groom Details</h3>
     
                    <div className="input-container">
                        <div className="input-field-container">
                            <i className="icon"><MdLanguage /></i>
                            <select name="language" id="language" style={{paddingBottom:8}} onChange={(e) => setLanguage(e.target.value)} value={language}>
                                <option value="" disabled selected>Select Card Language</option>
                                <option value="en">English</option>
                                <option value="bn">Bengali</option>
                                <option value="all">Both English & Bengali</option>
                            </select>
                        </div>
                        <p className="texterror" style={errorselect === '' ? { display: 'none' } : {}}>{errorselect}</p>
                    </div>
                
            
                        <div className="input-container" style={(language === 'en' || language === 'all') ? {} : { display: 'none' }}>
                            <div className="input-field-container">
                                <i className="icon"><GiChessQueen /></i>
                                <input className={(errorbridename !== '') ? "input-field input-error" : "input-field"}
                                    type="text" placeholder="Bride's First Name" name="bridename" value={bridename} onChange={(e) => { setBrideName(e.target.value); setErrorBrideName(''); } } onBlur={checkBrideName} />
                            </div>
                            <p className="texterror" style={errorbridename === '' ? { display: 'none' } : {}}>{errorbridename}</p>
                        </div>
                        
                        <div className="input-container" style={(language === 'bn' || language === 'all') ? {} : { display: 'none' }}>
                            <div className="input-field-container">
                                <i className="icon"><GiChessQueen /></i>
                                <input className={(errorbridenamebangla !== '') ? "input-field input-error" : "input-field"}
                                    type="text" placeholder="কনের ভালো নাম" name="bridenamebangla" value={bridenamebangla} onChange={(e) => { setBrideNameBangla(e.target.value); setErrorBrideNameBangla(''); } } onBlur={checkBrideNameBangla} />
                            </div>
                            <p className="texterror" style={errorbridenamebangla === '' ? { display: 'none' } : {}}>{errorbridenamebangla}</p>
                        </div>
                    
                        <div className="input-container" style={(language === 'en' || language === 'all') ? {} : { display: 'none' }}>
                            <div className="input-field-container">
                                <i className="icon"><AiOutlineUser /></i>
                                <input className={(errorgroomname !== '') ? "input-field input-error" : "input-field"}
                                    type="text" placeholder="Groom's First Name" name="groomname" value={groomname} onChange={(e) => { setGroomName(e.target.value); setErrorGroomName(''); } } onBlur={checkGroomName} />
                            </div>
                            <p className="texterror" style={errorgroomname === '' ? { display: 'none' } : {}}>{errorgroomname}</p>
                        </div>
                
                        <div className="input-container" style={(language === 'bn' || language === 'all') ? {} : { display: 'none' }}>
                            <div className="input-field-container">
                                <i className="icon"><AiOutlineUser /></i>
                                <input className={(errorgroomnamebangla !== '') ? "input-field input-error" : "input-field"}
                                    type="text" placeholder="বরের ভালো নাম" name="groomnamebangla" value={groomnamebangla} onChange={(e) => { setGroomNameBangla(e.target.value); setErrorGroomNameBangla(''); } } onBlur={checkGroomNameBangla} />
                            </div>
                            <p className="texterror" style={errorgroomnamebangla === '' ? { display: 'none' } : {}}>{errorgroomnamebangla}</p>
                        </div>

                        <button  className="btn" onClick={()=>handleNext(1)} style={language !=='' ? {} : { display: 'none' }} >Next</button>
        </div>
      :
     viewlevel===1?
      <div className={styles.formcontainer}>
      <h3>Please Enter Date & Place Details</h3>
            <div className="input-container" style={language!==''?{}:{display:'none'}}>
                <h3>Marriage Date - বিয়ের তারিখ</h3>
                   <div className="input-field-container">
                        <i className="icon"><MdOutlineDateRange/></i>
                        <input className={(errormarriagedate!=='')?"input-field input-error":"input-field"} style={{padding:7.5}} 
                        type="date" placeholder="Marriage Date - বিয়ের তারিখ" name="marraigedate" value={marraigedate} onChange={(e)=>{setMarraigeDate(e.target.value);setErrorMarraigeDate('')}} onBlur={checkMarraigeDate}/>
                    </div> 
                    <p className="texterror" style={errormarriagedate===''?{display:'none'}:{}}>{errormarriagedate}</p>
            </div>

            <div className="input-container" style={(language === 'en' || language === 'all') ? {} : { display: 'none' }}>
                    <div className="input-field-container">
                        <i className="icon"><HiOutlineLocationMarker /></i>
                        <input className={(errormhall !== '') ? "input-field input-error" : "input-field"}
                            type="text" placeholder="Marriage Hall Address" name="mhalladrress" value={mhall} onChange={(e) => { setMarraigeHall(e.target.value); setErrorMarraigeHall(''); } } onBlur={checkMarraigeHall} />
                    </div>
                    <p className="texterror" style={errormhall === '' ? { display: 'none' } : {}}>{errormhall}</p>
            </div>

            <div className="input-container" style={(language === 'bn' || language === 'all') ? {} : { display: 'none' }}>
                    <div className="input-field-container">
                        <i className="icon"><HiOutlineLocationMarker /></i>
                        <input className={(errormhallbangla !== '') ? "input-field input-error" : "input-field"}
                            type="text" placeholder="বিয়ে বাড়ির ঠিকানা" name="mhalladrress" value={mhallbangla} onChange={(e) => { setMarraigeHallBangla(e.target.value); setErrorMarraigeHallBangla(''); } } onBlur={checkMarraigeHallBangla} />
                    </div>
                    <p className="texterror" style={errormhallbangla === '' ? { display: 'none' } : {}}>{errormhallbangla}</p>
            </div>

            <div className="input-container" style={language!==''?{}:{display:'none'}}>
                <h3>Reception Date - প্রীতিভোজের তারিখ</h3>
                   <div className="input-field-container">
                        <i className="icon"><MdOutlineDateRange/></i>
                        <input className={(errorreceptiondate!=='')?"input-field input-error":"input-field"} style={{padding:7.5}} 
                        type="date" placeholder="Reception Date - প্রীতিভোজের তারিখ" name="receptiondate" value={receptiondate} onChange={(e)=>{setReceptionDate(e.target.value);setErrorReceptionDate('')}} onBlur={checkReceptionDate}/>
                    </div> 
                    <p className="texterror" style={errorreceptiondate===''?{display:'none'}:{}}>{errorreceptiondate}</p>
            </div>

            <div className="input-container" style={(language === 'en' || language === 'all') ? {} : { display: 'none' }}>
                    <div className="input-field-container">
                        <i className="icon"><HiOutlineLocationMarker /></i>
                        <input className={(errorrhall !== '') ? "input-field input-error" : "input-field"}
                            type="text" placeholder="Reception Hall Address" name="rhalladrress" value={rhall} onChange={(e) => { setReceptionHall(e.target.value); setErrorReceptionHall(''); } } onBlur={checkReceptionHall} />
                    </div>
                    <p className="texterror" style={errorrhall === '' ? { display: 'none' } : {}}>{errorrhall}</p>
            </div>

            <div className="input-container" style={(language === 'bn' || language === 'all') ? {} : { display: 'none' }}>
                    <div className="input-field-container">
                        <i className="icon"><HiOutlineLocationMarker /></i>
                        <input className={(errorrhallbangla !== '') ? "input-field input-error" : "input-field"}
                            type="text" placeholder="প্রীতিভোজের বাড়ির ঠিকানা" name="rhalladrress" value={rhallbangla} onChange={(e) => { setReceptionHallBangla(e.target.value); setErrorReceptionHallBangla(''); } } onBlur={checkReceptionHallBangla} />
                    </div>
                    <p className="texterror" style={errorrhallbangla === '' ? { display: 'none' } : {}}>{errorrhallbangla}</p>
            </div>
            <button  className="btn" onClick={()=>handleNexttwo(2)} style={language !=='' ? {} : { display: 'none' }} >Next</button>

        </div> 
        :
        <div className={styles.formcontainer}>
        <h3>Please Upload Bride & Groom Image</h3>
            <div className="input-container" style={language!==''?{}:{display:'none'}}>
                   <FileUpload label="কনের - Bride's Image" setStatus={setBrideImage} setImageName={setBrideImageName} name={props.id+"_bride"}/>
            </div>
            <div className="input-container" style={language!==''?{}:{display:'none'}}>
                   <FileUpload label="বরের - Grooms's Image" setStatus={setGroomImage} setImageName={setGroomImageName} name={props.id+"_groom"}/>
            </div>
            
            <button  className="btn" onClick={onSubmit} style={language !=='' ? {} : { display: 'none' }} disabled={!(brideimage && groomimage)}>Submit</button>
        </div>
        

}   
        <SuccessSnackbar open={successubmit} msg="Data has been successfully saved" />
        <ErrorSnackbar open={errorsubmit} msg="Unable to process.Try Again" />  
        </div>
    )
}