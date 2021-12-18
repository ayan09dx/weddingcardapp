/* eslint-disable @next/next/no-img-element */
import { useEffect,useState } from 'react'
import styles from '../styles/card.module.css'

export default function Page1(props){

const [load,setLoad]=useState(false);
const [journey,setJourney]=useState(false);
const [lang,setLang]=useState(props.lang)
useEffect(() => {
     if(props.load==='page1'){
          setLang(props.lang)
          setJourney(false)
          setLoad(true);
          const timer = setTimeout(() => {
               viewJourney();
             }, 8000);
             return () => clearTimeout(timer);
     }
     else{
          setLoad(false)
     }
},[props.load])

const viewJourney=()=>{
     setJourney(true);
     setTimeout(() => {
          props.setPage('page2');
        }, 4000);
}


    return(
     load?
     <div className={styles.pagewrapper}>
                   <div className={styles.pagecontent}>
                        <img src="./shankha-left.svg" alt="shangkhaleft" className={journey ? styles.invisible : styles.shangkhaleft}></img>
                        <img src="./shankha-right.svg" alt="shangkharight" className={journey ? styles.invisible : styles.shangkharight}></img>
                        <img src="./hathi-left.svg" alt="hathileft" className={styles.elephantleft}></img>
                        <img src="./hathi-right.svg" alt="hathiright" className={styles.elephantright}></img>
                        <img src="./stage.svg" alt="stage" className={journey ? styles.invisible: styles.stage}></img>
                        <img src="./jatra.svg" alt="stage" className={!journey ? styles.invisible : styles.jatra}></img>
                        <img src="./bridegroom.svg" alt="couple" className={journey ? styles.invisible : styles.stagecouple}></img>
                        <img src="./yogga.gif" alt="yogga" className={journey ? styles.invisible : styles.yogga}></img>
                        <div className={styles.pagetexts}>
                             <h1 className={journey ? styles.invisible : styles.h1} style={lang.id==='en'?{fontFamily:'SignPainter',textTransform:'uppercase'}:{fontFamily:'Bangla'}}>
                                  {lang.id==='en'?props.data.groomname+" Weds "+props.data.bridename:props.data.groomnamebangla+" ও "+props.data.bridenamebangla}
                             
                             </h1>
                             <h1 className={!journey ? styles.invisible : styles.h1 +" " +styles.swipein} style={lang.id==='en'?{fontFamily:'SignPainter'}:{fontFamily:'Bangla'}}>{lang.journey}</h1>
                        </div>
                   
                   </div>
              </div>
    :<></>
    )}