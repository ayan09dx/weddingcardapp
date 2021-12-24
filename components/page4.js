/* eslint-disable @next/next/no-img-element */
import { useEffect,useState } from 'react'
import styles from '../styles/card.module.css'
import moment from 'moment';
import 'moment/locale/bn';
import 'moment/locale/en-in';

export default function Page4(props){
    const [load,setLoad]=useState(false);
    const [lang,setLang]=useState(props.lang)

    const playAgain=()=>{
        props.setPage('page1');
    }
    useEffect(() => {
        if(props.load=='page4'){
            setLang(props.lang)
                  setLoad(true);
       }
        else{
            setLoad(false)
       }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[props.load])
   let marraigeday=props.lang.days[moment(props.data.marraigedate).day()];
   let marriagedate=props.lang.id==='en'?moment(props.data.marraigedate).locale('en-in').format('DD-MMM-YYYY'):moment(props.data.marraigedate).locale('bn').format('DD-MMMM-YYYY');
   let receptiondate=props.lang.id==='en'?moment(props.data.receptiondate).locale('en-in').format('DD-MMM-YYYY'):moment(props.data.receptiondate).locale('bn').format('DD-MMMM-YYYY');
   let receptionday=props.lang.days[moment(props.data.receptiondate).day()];
    return(
        load?
        <div className={styles.page2wrapper}>
          <div className={styles.lastleftcontainer}>
          <img src="./flowers.gif" alt="namaste" className={styles.flowers}/>
          <img src="./baji.gif" alt="namaste" className={styles.fireworks}/>
            <div className={styles.bridebadge}>
                <img src={"/uploads/"+props.data.groomimagename} alt="groomimg" className={styles.badgeimg}/>
                <h3 style={{padding:0,margin:0,color:'#B71A00'}}>{lang.id==='en'?props.data.groomname:props.data.groomnamebangla}</h3>
            </div>
            <div className={styles.groombadge}>
            <img src={"/uploads/"+props.data.brideimagename} alt="groomimg" className={styles.badgeimg}/>
            <h3 style={{padding:0,margin:0,color:'#B71A00'}}>{lang.id==='en'?props.data.bridename:props.data.bridenamebangla}</h3>
            </div>
          </div>
          <div className={styles.lastrightcontainer}>
          <img src="./namaste.png" alt="namaste" style={{width:'22%',marginTop:5}}/>
        
          <p style={lang.id==='en'?{fontFamily:'SignPainter',fontSize:24,color:'#B71A00',maxWidth:'200px',textAlign:'center'}:{fontFamily:'Bangla',fontSize:24,color:'#B71A00',maxWidth:'200px',textAlign:'center'}}>
              {lang.lastpagereq}
          </p>
          <div style={props.inviteType!=="reception"?{width:'90%',textAlign:'center'}:{display:'none'}}>
          <p style={lang.id==='en'?{fontFamily:'SignPainter',fontSize:24,color:'#B71A00',textAlign:'center',wordWrap:'break-word'}:{fontFamily:'Bangla',fontSize:24,color:'#B71A00',textAlign:'center',wordWrap:'break-word'}}>
              {lang.biye}<br/>{marriagedate}<br/>{marraigeday}<br/><br/>{props.lang.id==='en'?props.data.mhall:props.data.mhallbangla}
          </p>

          </div>
         
          <div style={props.inviteType!=="wedding"?{width:'90%',textAlign:'center'}:{display:'none'}}>
          <p style={lang.id==='en'?{fontFamily:'SignPainter',fontSize:24,color:'#B71A00',textAlign:'center',wordWrap:'break-word'}:{fontFamily:'Bangla',fontSize:24,color:'#B71A00',textAlign:'center',wordWrap:'break-word'}}>
              {lang.reception}<br/>{receptiondate}<br/>{receptionday}<br/><br/>{props.lang.id==='en'?props.data.rhall:props.data.rhallbangla}
          </p>
          </div>

          <button style={{marginBottom:30,marginTop:30,width:'90%'}} onClick={playAgain} className='btn'>{lang.repeat}</button>
          </div>
    
        </div>
        :<></>
    )
}