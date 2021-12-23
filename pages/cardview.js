import Head from 'next/head'
import {useRouter} from 'next/router';
import EN from '../components/englishlang'
import BN from '../components/banglalang'
import { useEffect,useState } from 'react'
import { route } from 'next/dist/server/router';
import {verifyAPIToken} from '../utils/jwthandler';
import styles from '../styles/card.module.css'
import jwt from 'jsonwebtoken';
import Page1 from '../components/page1'
import Page2 from '../components/page2'
import Page3 from '../components/page3'
import Page4 from '../components/page4'
import Page5 from '../components/page5'
import Page6 from '../components/page6'
import moment from 'moment';

const API_SECRET_KEY = process.env.API_SECRET_KEY;

export default function MyCard() {

const [open,SetOpen]=useState(false);
const [load,SetLoad]=useState('');
const [pageload,SetPageLoad]=useState(false);
const [lang,setLang]=useState(EN);
const [guest,setGuest]=useState('');
const [email,setEmail]=useState('');
const router =useRouter();
const [userData,setUserData]=useState({});

const startAnimation=()=>{
  SetOpen(true);
  SetLoad('page1');
}
const setPage=(val)=>{
SetLoad(val);
}

const getDetails=async(email,guest,lang)=>{
 //console.log("here")
  let payload={token:jwt.sign(email,API_SECRET_KEY)};
       const res = await fetch('/api/getDetails', {
           method: 'post',
           body: JSON.stringify(payload)
         })
         const json = await res.json()
         if(json.message==='ok'){
          setUserData(json.data)
          setGuest(guest);
          setLang(lang==='bn'?BN:EN);
          SetPageLoad(true)
          return true
         }
         else{
          return false
         }       
}
useEffect(() => {

if(router.query.token){
  let reqdata=verifyAPIToken(router.query.token);
  if (reqdata){
    let guest=reqdata.guest?reqdata.guest:'';
    let email=reqdata.email?reqdata.email:'';   
    let lang=router.query.lang?router.query.lang:'en'
    getDetails(email,guest,lang)
  }
}
},[router.query])

console.log(load)
  return (
    pageload?
    <div className={styles.container}>
      <Head>
        <title>{"Invitation Letter for Wedding Ceremony of "+ userData.groomname+ " and "+ userData.bridename} </title>
        <meta name="description" content={"Invitation Letter for Wedding Ceremony of "+ userData.groomname+ " and "+ userData.bridename} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <Page1 load={load} setPage={setPage} lang={lang} data={userData}/>
        <Page2 load={load} setPage={setPage} lang={lang} data={userData}/>
        <Page3 load={load} setPage={setPage} lang={lang} data={userData}/>
        <Page4 load={load} setPage={setPage} lang={lang} data={userData}/>
        <Page5 load={load} setPage={setPage} lang={lang} data={userData}/>
        <Page6 load={load} setPage={setPage} lang={lang} data={userData}/>
      </div>
    {load===''?
      <><div className={open ? styles.leftcover + " " + styles.leftcoveranimation : styles.leftcover}>
            <img src="bridegroom.svg" alt="left" className={styles.bridegroom} />
          </div><div className={open ? styles.spinwheelmobile + " " + styles.hide : styles.spinwheelmobile}>
              <img src="siderotator.svg" alt="center" className={styles.ribonimg} />
            </div><div className={open ? styles.centerribbon + " " + styles.hide : styles.centerribbon}>
              <div className={styles.ribbonbox}>
                <p className={styles.ribbondate}>Save The Date <br />{moment(userData.marraigedate).format('DD-MMM-YYYY')}</p>
              </div>
            </div><div className={open ? styles.invitetext + " " + styles.hide : styles.invitetext} style={lang.id === 'en' ? { fontFamily: 'SignPainter' } : { fontFamily: 'Bangla' }}>
              <h2 style={{ color: 'white' }}>{guest.toUpperCase()}<p style={{ margin: 0, padding: 0, maxWidth: 300, }}> {lang.welcomemsg}</p></h2>
              <button className={styles.invitebuttuon} onClick={startAnimation} style={lang.id === 'en' ? { fontFamily: 'SignPainter' } : { fontFamily: 'Bangla' }}>{lang.invitebtn}</button>
            </div><div className={open ? styles.rightcover + " " + styles.rightcoveranimation : styles.rightcover}>
              <img src="siderotator.svg" alt="right" className={styles.spinwheel} />
            </div></>
:<></>}
      {load!==""?
      <audio src={userData.song} autoPlay loop>
          <p>If you are reading this, it is because your browser does not support the audio element.</p>
      </audio>
:<></>}
    </div>
    :<></>
  )
}

