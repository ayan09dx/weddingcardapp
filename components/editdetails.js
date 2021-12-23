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
import Router from 'next/router';

const API_SECRET_KEY = process.env.API_SECRET_KEY;

export default function MyDetails(props){
    const [edit,setEdit]=useState(false);
    const [language,setLanguage]=useState(props.data.language)
    const [bridename,setBrideName]=useState(props.data.bridename)
    const [errorbridename,setErrorBrideName]=useState('');
    const [bridenamebangla,setBrideNameBangla]=useState(props.data.bridenamebangla)
    const [errorbridenamebangla,setErrorBrideNameBangla]=useState('');
    const [groomname,setGroomName]=useState(props.data.groomname)
    const [errorgroomname,setErrorGroomName]=useState('');
    const [groomnamebangla,setGroomNameBangla]=useState(props.data.groomnamebangla)
    const [errorgroomnamebangla,setErrorGroomNameBangla]=useState('');
    const [marraigedate,setMarraigeDate]=useState(props.data.marraigedate)
    const [errormarriagedate,setErrorMarraigeDate]=useState('');
    const [mhallbangla,setMarraigeHallBangla]=useState(props.data.mhallbangla)
    const [errormhallbangla,setErrorMarraigeHallBangla]=useState('');
    const [mhall,setMarraigeHall]=useState(props.data.mhall)
    const [errormhall,setErrorMarraigeHall]=useState('');
    const [receptiondate,setReceptionDate]=useState(props.data.receptiondate)
    const [errorreceptiondate,setErrorReceptionDate]=useState('');
    const [rhall,setReceptionHall]=useState(props.data.rhall)
    const [errorrhall,setErrorReceptionHall]=useState('');
    const [rhallbangla,setReceptionHallBangla]=useState(props.data.rhallbangla)
    const [errorrhallbangla,setErrorReceptionHallBangla]=useState('');
    const [errorselect,setErrorSelect]=useState('');
    const [brideimage,setBrideImage]=useState(props.data.brideimage);
    const [groomimage,setGroomImage]=useState(props.data.groomimage);
    const [brideimagename,setBrideImageName]=useState(props.data.brideimagename);
    const [groomimagename,setGroomImageName]=useState(props.data.groomimagename);
    const [bridefathername,setBrideFatherName]=useState(props.data.bridefathername)
    const [errorbridefathername,setErrorBrideFatherName]=useState('');
    const [bridefathernamebangla,setBrideFatherNameBangla]=useState(props.data.bridefathernamebangla)
    const [errorbridefathernamebangla,setErrorBrideFatherNameBangla]=useState('');
    const [bridemothername,setBrideMotherName]=useState(props.data.bridemothername)
    const [errorbridemothername,setErrorBrideMotherName]=useState('');
    const [bridemothernamebangla,setBrideMotherNameBangla]=useState(props.data.bridemothernamebangla);
    const [errorbridemothernamebangla,setErrorBrideMotherNameBangla]=useState('');
    const [groomfathername,setGroomFatherName]=useState(props.data.groomfathername)
    const [errorgroomfathername,setErrorGroomFatherName]=useState('');
    const [groomfathernamebangla,setGroomFatherNameBangla]=useState(props.data.groomfathernamebangla)
    const [errorgroomfathernamebangla,setErrorGroomFatherNameBangla]=useState('');
    const [groommothername,setGroomMotherName]=useState(props.data.groommothername)
    const [errorgroommothername,setErrorGroomMotherName]=useState('');
    const [groommothernamebangla,setGroomMotherNameBangla]=useState(props.data.groommothernamebangla)
    const [errorgroommothernamebangla,setErrorGroomMotherNameBangla]=useState('');
    const [bridehome,setBrideHome]=useState(props.data.bridehome)
    const [errorbridehome,setErrorBrideHome]=useState('');
    const [bridehomebangla,setBrideHomeBangla]=useState(props.data.bridehomebangla)
    const [errorbridehomebangla,setErrorBrideHomeBangla]=useState('');
    const [groomhome,setGroomHome]=useState(props.data.groomhome)
    const [errorgroomhome,setErrorGroomHome]=useState('');
    const [groomhomebangla,setGroomHomeBangla]=useState(props.data.groomhomebangla)
    const [errorgroomhomebangla,setErrorGroomHomeBangla]=useState('');

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

    const checkBrideFatherName=()=>{
        if(language==='bn'){
            return true
        }
        else if(bridefathername===""){
            setErrorBrideFatherName('Please enter bride\'s father\'s name');
            return false
        }
            else{
                setErrorBrideFatherName('');
                return true
            }
    }
    
    const checkBrideMotherName=()=>{
        if(language==='bn'){
            return true
        }
        else if(bridemothername===""){
            setErrorBrideMotherName('Please enter bride\'s mother\'s name');
            return false
        }
            else{
                setErrorBrideMotherName('');
                return true
            }
    }
    const checkBrideFatherNameBangla=()=>{
        if(language==='en'){
            return true
        }
        else if(bridefathernamebangla===""){
            setErrorBrideFatherNameBangla('কনের পিতার নাম লিখুন');
            return false
        }
            else{
                setErrorBrideFatherNameBangla('');
                return true
            }
    }

    const checkGroomFatherName=()=>{
        if(language==='bn'){
            return true
        }
        else if(groomfathername===""){
            setErrorGroomFatherName('Please enter groom\'s father\'s name');
            return false
        }
            else{
                setErrorGroomFatherName('');
                return true
            }
    }

    const checkGroomFatherNameBangla=()=>{
        if(language==='en'){
            return true
        }
        else if(groomfathernamebangla===""){
            setErrorGroomFatherNameBangla('বরের পিতার নাম লিখুন');
            return false
        }
            else{
                setErrorGroomFatherNameBangla('');
                return true
            }
    }

    const checkGroomMotherName=()=>{
        if(language==='bn'){
            return true
        }
        else if(groommothername===""){
            setErrorGroomMotherName('Please enter groom\'s mother\'s name');
            return false
        }
            else{
                setErrorGroomMotherName('');
                return true
            }
    }

    const checkGroomMotherNameBangla=()=>{
        if(language==='en'){
            return true
        }
        else if(groommothernamebangla===""){
            setErrorGroomMotherNameBangla('বরের পিতার নাম লিখুন');
            return false
        }
            else{
                setErrorGroomMotherNameBangla('');
                return true
            }
    }


    const checkBrideMotherNameBangla=()=>{
        if(language==='en'){
            return true
        }
        else if(bridemothernamebangla===""){
            setErrorBrideMotherNameBangla('কনের মায়ের নাম লিখুন');
            return false
        }
            else{
                setErrorBrideMotherNameBangla('');
                return true
            }
    }
    const checkBrideHome=()=>{
        if(language==='bn'){
            return true
        }
        else if(bridehome===""){
            setErrorBrideHome('Please enter bride\'s home address');
            return false
        }
            else{
                setErrorBrideHome('');
                return true
            }
    }

    const checkBrideHomeBangla=()=>{
        if(language==='en'){
            return true
        }
        else if(bridehomebangla===""){
            setErrorBrideHomeBangla('কনের বাড়ির নাম লিখুন');
            return false
        }
            else{
                setErrorBrideHomeBangla('');
                return true
            }
    }

    const checkGroomHome=()=>{
        if(language==='bn'){
            return true
        }
        else if(groomhome===""){
            setErrorGroomHome('Please enter groom\'s home address');
            return false
        }
            else{
                setErrorGroomHome('');
                return true
            }
    }

    const checkGroomHomeBangla=()=>{
        if(language==='en'){
            return true
        }
        else if(groomhomebangla===""){
            setErrorGroomHomeBangla('বরের বাড়ির নাম লিখুন');
            return false
        }
            else{
                setErrorGroomHomeBangla('');
                return true
            }
    }

const dataCheck=(level)=>{
    if(checkBrideName()&&checkBrideNameBangla()&&checkBrideFatherName()&&checkBrideFatherNameBangla()
    &&checkBrideMotherName()&&checkBrideMotherNameBangla()&&checkBrideHome()&&checkBrideHomeBangla()&&
      checkGroomName()&&checkGroomNameBangla()&&checkGroomFatherName()&&checkGroomFatherNameBangla()&&
      checkGroomMotherName()&&checkGroomMotherNameBangla()&&checkGroomHome()&&checkGroomHomeBangla()&&
      checkMarraigeDate()&&checkMarraigeHall()&&checkMarraigeHallBangla()&&checkReceptionDate()
      &&checkReceptionHall()&&checkReceptionHallBangla()
      )
    return true;
    else
    return false;
}


const  onSubmit=async ()=>{
    setErrorSubmit(false);setSuccessSubmit(false);
    if(dataCheck()){
        let req_data={email:props.data.email,language:language,bridename:bridename,groomname:groomname,bridenamebangla:bridenamebangla,
        groomnamebangla:groomnamebangla,marraigedate:marraigedate,mhall:mhall,mhallbangla:mhallbangla,rhall:rhall,
        rhallbangla:rhallbangla,receptiondate:receptiondate,brideimage:brideimage,brideimagename:brideimagename,groomimage:groomimage,groomimagename:groomimagename,
        bridefathername:bridefathername,bridefathernamebangla:bridefathernamebangla,bridemothername:bridemothername,bridemothernamebangla:bridemothernamebangla,bridehome:bridehome,bridehomebangla:bridehomebangla,
        groomfathername:groomfathername,groomfathernamebangla:groomfathernamebangla,groommothername:groommothername,groommothernamebangla:groommothernamebangla,
        groomhome:groomhome,groomhomebangla:groomhomebangla}
       // console.log(req_data)
        let payload={token:jwt.sign(req_data,API_SECRET_KEY,{expiresIn:'300s'})};
       // console.log(jwt.verify(payload.token,API_SECRET_KEY))
        const res = await fetch(props.apiURL+'/updateDetails', {
            method: 'post',
            body: JSON.stringify(payload)
          })
          const json = await res.json()
          if(json.message==='ok'){
            setSuccessSubmit(true);
            setEdit(false);
            Router.reload();
          }
          else {
            setErrorSubmit(true)
          } 
          
    }
    else
    return
    }



    return(
        <div className={styles.editcontainer}>
            <div className={styles.editformcontainer}>
            <h3 style={{color:'#004ABD'}}>Bride & Groom Details</h3>
     
                    <div className="input-container">
                        <div className="input-field-container">
                            <i className="icon"><MdLanguage /></i>
                            <select name="language" id="language" style={{paddingBottom:8}} onChange={(e) => setLanguage(e.target.value)} value={language} disabled={!edit}>
                                <option value="" disabled selected>Select Card Language</option>
                                <option value="en">English</option>
                                <option value="bn">Bengali</option>
                                <option value="all">Both English & Bengali</option>
                            </select>
                        </div>
                        <p className="texterror" style={errorselect === '' ? { display: 'none' } : {}}>{errorselect}</p>
                    </div>
                
            
                        <div className="input-container" style={(language === 'en' || language === 'all') ? {} : { display: 'none' }}>
                        <h4>Bride's First Name</h4>
                            <div className="input-field-container">
                                <i className="icon"><GiChessQueen /></i>
                                <input className={(errorbridename !== '') ? "input-field input-error" : "input-field"} disabled={!edit}
                                    type="text" placeholder="Bride's First Name" name="bridename" value={bridename} onChange={(e) => { setBrideName(e.target.value); setErrorBrideName(''); } } onBlur={checkBrideName} />
                            </div>
                            <p className="texterror" style={errorbridename === '' ? { display: 'none' } : {}}>{errorbridename}</p>
                        </div>
                        
                        <div className="input-container" style={(language === 'bn' || language === 'all') ? {} : { display: 'none' }}>
                        <h4>কনের ভালো নাম</h4>
                            <div className="input-field-container">
                                <i className="icon"><GiChessQueen /></i>
                                <input className={(errorbridenamebangla !== '') ? "input-field input-error" : "input-field"} disabled={!edit}
                                    type="text" placeholder="কনের ভালো নাম" name="bridenamebangla" value={bridenamebangla} onChange={(e) => { setBrideNameBangla(e.target.value); setErrorBrideNameBangla(''); } } onBlur={checkBrideNameBangla} />
                            </div>
                            <p className="texterror" style={errorbridenamebangla === '' ? { display: 'none' } : {}}>{errorbridenamebangla}</p>
                        </div>
                        
                        <div className="input-container" style={(language === 'en' || language === 'all') ? {} : { display: 'none' }}>
                        <h4>Bride's Father Name</h4>
                            <div className="input-field-container">
                                <i className="icon"><AiOutlineUser /></i>
                                <input className={(errorbridefathername !== '') ? "input-field input-error" : "input-field"} disabled={!edit}
                                    type="text" placeholder="Bride's Father Name" name="bridefathername" value={bridefathername} onChange={(e) => { setBrideFatherName(e.target.value); setErrorBrideFatherName(''); } } onBlur={checkBrideFatherName} />
                            </div>
                            <p className="texterror" style={errorbridefathername === '' ? { display: 'none' } : {}}>{errorbridefathername}</p>
                        </div>
                        
                        <div className="input-container" style={(language === 'bn' || language === 'all') ? {} : { display: 'none' }}>
                        <h4>কনের পিতার নাম</h4>
                            <div className="input-field-container">
                                <i className="icon"><AiOutlineUser /></i>
                                <input className={(errorbridefathernamebangla !== '') ? "input-field input-error" : "input-field"} disabled={!edit}
                                    type="text" placeholder="কনের পিতার নাম" name="bridefathernamebangla" value={bridefathernamebangla} onChange={(e) => { setBrideFatherNameBangla(e.target.value); setErrorBrideFatherNameBangla(''); } } onBlur={checkBrideFatherNameBangla} />
                            </div>
                            <p className="texterror" style={errorbridefathernamebangla === '' ? { display: 'none' } : {}}>{errorbridefathernamebangla}</p>
                        </div>

                        <div className="input-container" style={(language === 'en' || language === 'all') ? {} : { display: 'none' }}>
                        <h4>Bride's Mother's Name</h4>
                            <div className="input-field-container">
                                <i className="icon"><GiChessQueen /></i>
                                <input className={(errorbridemothername !== '') ? "input-field input-error" : "input-field"} disabled={!edit}
                                    type="text" placeholder="Bride's Mother's Name" name="bridemothername" value={bridemothername} onChange={(e) => { setBrideMotherName(e.target.value); setErrorBrideMotherName(''); } } onBlur={checkBrideMotherName} />
                            </div>
                            <p className="texterror" style={errorbridemothername === '' ? { display: 'none' } : {}}>{errorbridemothername}</p>
                        </div>
                        
                        <div className="input-container" style={(language === 'bn' || language === 'all') ? {} : { display: 'none' }}>
                        <h4>কনের মায়ের নাম</h4>
                            <div className="input-field-container">
                                <i className="icon"><GiChessQueen /></i>
                                <input className={(errorbridemothernamebangla !== '') ? "input-field input-error" : "input-field"} disabled={!edit}
                                    type="text" placeholder="কনের মায়ের নাম" name="bridemothernamebangla" value={bridemothernamebangla} onChange={(e) => { setBrideMotherNameBangla(e.target.value); setErrorBrideMotherNameBangla(''); } } onBlur={checkBrideMotherNameBangla} />
                            </div>
                            <p className="texterror" style={errorbridemothernamebangla === '' ? { display: 'none' } : {}}>{errorbridemothernamebangla}</p>
                        </div>

                        <div className="input-container" style={(language === 'en' || language === 'all') ? {} : { display: 'none' }}>
                        <h4>Bride's Home Address</h4>
                                <div className="input-field-container">
                                    <i className="icon"><HiOutlineLocationMarker /></i>
                                    <input className={(errorbridehome !== '') ? "input-field input-error" : "input-field"} disabled={!edit}
                                        type="text" placeholder="Bride's Home Address" name="bridehome" value={bridehome} onChange={(e) => { setBrideHome(e.target.value); setErrorBrideHome(''); } } onBlur={checkBrideHome} />
                                </div>
                                <p className="texterror" style={errorbridehome === '' ? { display: 'none' } : {}}>{errorbridehome}</p>
                        </div>

                        <div className="input-container" style={(language === 'bn' || language === 'all') ? {} : { display: 'none' }}>
                        <h4>কনের বাড়ির ঠিকানা</h4>
                                <div className="input-field-container">
                                    <i className="icon"><HiOutlineLocationMarker /></i>
                                    <input className={(errorbridehomebangla !== '') ? "input-field input-error" : "input-field"} disabled={!edit}
                                        type="text" placeholder="কনের বাড়ির ঠিকানা" name="bridehomebangla" value={bridehomebangla} onChange={(e) => { setBrideHomeBangla(e.target.value); setErrorBrideHomeBangla(''); } } onBlur={checkBrideHomeBangla} />
                                </div>
                                <p className="texterror" style={errorbridehomebangla === '' ? { display: 'none' } : {}}>{errorbridehomebangla}</p>
                        </div>

                        <div className="input-container" style={(language === 'en' || language === 'all') ? {} : { display: 'none' }}>
                        <h4>Groom's First Name</h4>
                            <div className="input-field-container">
                                <i className="icon"><AiOutlineUser /></i>
                                <input className={(errorgroomname !== '') ? "input-field input-error" : "input-field"} disabled={!edit}
                                    type="text" placeholder="Groom's First Name" name="groomname" value={groomname} onChange={(e) => { setGroomName(e.target.value); setErrorGroomName(''); } } onBlur={checkGroomName} />
                            </div>
                            <p className="texterror" style={errorgroomname === '' ? { display: 'none' } : {}}>{errorgroomname}</p>
                        </div>
                
                        <div className="input-container" style={(language === 'bn' || language === 'all') ? {} : { display: 'none' }}>
                        <h4>বরের ভালো নাম</h4>
                            <div className="input-field-container">
                                <i className="icon"><AiOutlineUser /></i>
                                <input className={(errorgroomnamebangla !== '') ? "input-field input-error" : "input-field"} disabled={!edit}
                                    type="text" placeholder="বরের ভালো নাম" name="groomnamebangla" value={groomnamebangla} onChange={(e) => { setGroomNameBangla(e.target.value); setErrorGroomNameBangla(''); } } onBlur={checkGroomNameBangla} />
                            </div>
                            <p className="texterror" style={errorgroomnamebangla === '' ? { display: 'none' } : {}}>{errorgroomnamebangla}</p>
                        </div>

                        <div className="input-container" style={(language === 'en' || language === 'all') ? {} : { display: 'none' }}>
                        <h4>Groom's Father's Name</h4>
                        <div className="input-field-container">
                            <i className="icon"><AiOutlineUser /></i>
                            <input className={(errorgroomfathername !== '') ? "input-field input-error" : "input-field"} disabled={!edit}
                                type="text" placeholder="Groom's Father's Name" name="groomfathername" value={groomfathername} onChange={(e) => { setGroomFatherName(e.target.value); setErrorGroomFatherName(''); } } onBlur={checkGroomFatherName} />
                        </div>
                        <p className="texterror" style={errorgroomfathername === '' ? { display: 'none' } : {}}>{errorgroomfathername}</p>
                    </div>
        
                <div className="input-container" style={(language === 'bn' || language === 'all') ? {} : { display: 'none' }}>
                <h4>বরের পিতার নাম</h4>
                    <div className="input-field-container">
                        <i className="icon"><AiOutlineUser /></i>
                        <input className={(errorgroomfathernamebangla !== '') ? "input-field input-error" : "input-field"} disabled={!edit}
                            type="text" placeholder="বরের পিতার নাম" name="groomfathernamebangla" value={groomfathernamebangla} onChange={(e) => { setGroomFatherNameBangla(e.target.value); setErrorGroomFatherNameBangla(''); } } onBlur={checkGroomFatherNameBangla} />
                    </div>
                    <p className="texterror" style={errorgroomfathernamebangla === '' ? { display: 'none' } : {}}>{errorgroomfathernamebangla}</p>
                </div>

                <div className="input-container" style={(language === 'en' || language === 'all') ? {} : { display: 'none' }}>
                <h4>Groom's Mother's Name</h4>
                    <div className="input-field-container">
                        <i className="icon"><GiChessQueen /></i>
                        <input className={(errorgroommothername !== '') ? "input-field input-error" : "input-field"} disabled={!edit}
                            type="text" placeholder="Groom's Mother's Name" name="groommothername" value={groommothername} onChange={(e) => { setGroomMotherName(e.target.value); setErrorGroomMotherName(''); } } onBlur={checkGroomMotherName} />
                    </div>
                    <p className="texterror" style={errorgroommothername === '' ? { display: 'none' } : {}}>{errorgroommothername}</p>
                </div>
        
                <div className="input-container" style={(language === 'bn' || language === 'all') ? {} : { display: 'none' }}>
                <h4>বরের মায়ের নাম</h4>
                    <div className="input-field-container">
                        <i className="icon"><GiChessQueen /></i>
                        <input className={(errorgroommothernamebangla !== '') ? "input-field input-error" : "input-field"} disabled={!edit}
                            type="text" placeholder="বরের মায়ের নাম" name="groommothernamebangla" value={groommothernamebangla} onChange={(e) => { setGroomMotherNameBangla(e.target.value); setErrorGroomMotherNameBangla(''); } } onBlur={checkGroomMotherNameBangla} />
                    </div>
                    <p className="texterror" style={errorgroommothernamebangla === '' ? { display: 'none' } : {}}>{errorgroommothernamebangla}</p>
                </div>

                <div className="input-container" style={(language === 'en' || language === 'all') ? {} : { display: 'none' }}>
                <h4>Groom's Home Address</h4>
                        <div className="input-field-container">
                            <i className="icon"><HiOutlineLocationMarker /></i>
                            <input className={(errorgroomhome !== '') ? "input-field input-error" : "input-field"} disabled={!edit}
                                type="text" placeholder="Groom's Home Address" name="groomhome" value={groomhome} onChange={(e) => { setGroomHome(e.target.value); setErrorGroomHome(''); } } onBlur={checkGroomHome} />
                        </div>
                        <p className="texterror" style={errorgroomhome === '' ? { display: 'none' } : {}}>{errorgroomhome}</p>
                </div>

                <div className="input-container" style={(language === 'bn' || language === 'all') ? {} : { display: 'none' }}>
                <h4>বরের বাড়ির ঠিকানা</h4>
                        <div className="input-field-container">
                            <i className="icon"><HiOutlineLocationMarker /></i>
                            <input className={(errorgroomhomebangla !== '') ? "input-field input-error" : "input-field"} disabled={!edit}
                                type="text" placeholder="বরের বাড়ির ঠিকানা" name="groomhomebangla" value={groomhomebangla} onChange={(e) => { setGroomHomeBangla(e.target.value); setErrorGroomHomeBangla(''); } } onBlur={checkGroomHomeBangla} />
                        </div>
                        <p className="texterror" style={errorgroomhomebangla === '' ? { display: 'none' } : {}}>{errorgroomhomebangla}</p>
                </div>


        
    

      <h3 style={{padding:0,margin:0,color:'#004ABD'}}>Date & Place Details</h3>
            <div className="input-container" style={language!==''?{}:{display:'none'}}>
                <h3>Marriage Date - বিয়ের তারিখ</h3>
                   <div className="input-field-container">
                        <i className="icon"><MdOutlineDateRange/></i>
                        <input className={(errormarriagedate!=='')?"input-field input-error":"input-field"} style={{padding:7.5}}  disabled={!edit}
                        type="date" placeholder="Marriage Date - বিয়ের তারিখ" name="marraigedate" value={marraigedate} onChange={(e)=>{setMarraigeDate(e.target.value);setErrorMarraigeDate('')}} onBlur={checkMarraigeDate}/>
                    </div> 
                    <p className="texterror" style={errormarriagedate===''?{display:'none'}:{}}>{errormarriagedate}</p>
            </div>

            <div className="input-container" style={(language === 'en' || language === 'all') ? {} : { display: 'none' }}>
                    <div className="input-field-container">
                        <i className="icon"><HiOutlineLocationMarker /></i>
                        <input className={(errormhall !== '') ? "input-field input-error" : "input-field"} disabled={!edit}
                            type="text" placeholder="Marriage Hall Address" name="mhalladrress" value={mhall} onChange={(e) => { setMarraigeHall(e.target.value); setErrorMarraigeHall(''); } } onBlur={checkMarraigeHall} />
                    </div>
                    <p className="texterror" style={errormhall === '' ? { display: 'none' } : {}}>{errormhall}</p>
            </div>

            <div className="input-container" style={(language === 'bn' || language === 'all') ? {} : { display: 'none' }}>
                    <div className="input-field-container">
                        <i className="icon"><HiOutlineLocationMarker /></i>
                        <input className={(errormhallbangla !== '') ? "input-field input-error" : "input-field"} disabled={!edit}
                            type="text" placeholder="বিয়ে বাড়ির ঠিকানা" name="mhalladrress" value={mhallbangla} onChange={(e) => { setMarraigeHallBangla(e.target.value); setErrorMarraigeHallBangla(''); } } onBlur={checkMarraigeHallBangla} />
                    </div>
                    <p className="texterror" style={errormhallbangla === '' ? { display: 'none' } : {}}>{errormhallbangla}</p>
            </div>

            <div className="input-container" style={language!==''?{}:{display:'none'}}>
                <h3>Reception Date - প্রীতিভোজের তারিখ</h3>
                   <div className="input-field-container">
                        <i className="icon"><MdOutlineDateRange/></i>
                        <input className={(errorreceptiondate!=='')?"input-field input-error":"input-field"} style={{padding:7.5}}  disabled={!edit}
                        type="date" placeholder="Reception Date - প্রীতিভোজের তারিখ" name="receptiondate" value={receptiondate} onChange={(e)=>{setReceptionDate(e.target.value);setErrorReceptionDate('')}} onBlur={checkReceptionDate}/>
                    </div> 
                    <p className="texterror" style={errorreceptiondate===''?{display:'none'}:{}}>{errorreceptiondate}</p>
            </div>

            <div className="input-container" style={(language === 'en' || language === 'all') ? {} : { display: 'none' }}>
                    <div className="input-field-container">
                        <i className="icon"><HiOutlineLocationMarker /></i>
                        <input className={(errorrhall !== '') ? "input-field input-error" : "input-field"}  disabled={!edit}
                            type="text" placeholder="Reception Hall Address" name="rhalladrress" value={rhall} onChange={(e) => { setReceptionHall(e.target.value); setErrorReceptionHall(''); } } onBlur={checkReceptionHall} />
                    </div>
                    <p className="texterror" style={errorrhall === '' ? { display: 'none' } : {}}>{errorrhall}</p>
            </div>

            <div className="input-container" style={(language === 'bn' || language === 'all') ? {} : { display: 'none' }}>
                    <div className="input-field-container">
                        <i className="icon"><HiOutlineLocationMarker /></i>
                        <input className={(errorrhallbangla !== '') ? "input-field input-error" : "input-field"} disabled={!edit}
                            type="text" placeholder="প্রীতিভোজের বাড়ির ঠিকানা" name="rhalladrress" value={rhallbangla} onChange={(e) => { setReceptionHallBangla(e.target.value); setErrorReceptionHallBangla(''); } } onBlur={checkReceptionHallBangla} />
                    </div>
                    <p className="texterror" style={errorrhallbangla === '' ? { display: 'none' } : {}}>{errorrhallbangla}</p>
            </div>

            </div>

        <div className={styles.editformcontainer}>
        <h3 style={{color:'#004ABD'}}> Bride Image</h3>
            <div className="input-container" style={language!=='' && edit?{}:{display:'none'}}>
                   <FileUpload label="কনের - Bride's Image" setStatus={setBrideImage} name={props.id+"_bride"}  setImageName={setBrideImageName}/>
            </div>
            <img src={"/uploads/"+brideimagename} style={edit?{display:'none'}:{height:200,objectFit:'contain'}}/>

            <h3 style={{color:'#004ABD'}}>Groom Image</h3>
            <div className="input-container" style={language!=='' && edit?{}:{display:'none'}}>
                   <FileUpload label="বরের - Grooms's Image" setStatus={setGroomImage} name={props.id+"_groom"} setImageName={setGroomImageName}/>
            </div>
            <img src={"/uploads/"+groomimagename} style={edit?{display:'none'}:{height:200,objectFit:'contain'}}/>
            <br/>
            <button  className="btn" onClick={()=>{setEdit(true);window.scrollTo({top: 0,behavior: 'smooth'});}} style={ !edit? {} : { display: 'none' }} >Edit</button>
            <div style={{display:'flex'}}>
                <button  className="btn" onClick={()=>{setEdit(false);window.scrollTo({top: 0,behavior: 'smooth'});}} style={edit? {margin:5} : { display: 'none' }} >Cancel</button>
                <button  className="btn" onClick={onSubmit} style={edit? {margin:5} : { display: 'none' }} >Save</button>
            </div>
           
        </div>

        <SuccessSnackbar open={successubmit} msg="Data has been successfully saved" />
        <ErrorSnackbar open={errorsubmit} msg="Unable to process.Try Again" />
        
        </div>
    )
}