/* eslint-disable @next/next/no-img-element */
import { useEffect,useState } from 'react'
import styles from '../styles/card.module.css'
import moment from 'moment';
import 'moment/locale/bn';
import 'moment/locale/en-in';

export default function Page2(props){
    const [load,setLoad]=useState(false);
    useEffect(() => {
        if(props.load==='page2' && props.inviteType==="reception"){
          props.setPage('page3');
        }
        else if(props.load==='page2'){
                  setLoad(true);
                  const timer = setTimeout(() => {
                    props.setPage('page3');
                  }, 8000);
                  return () => clearTimeout(timer);

        }
        else{
            setLoad(false)
       }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[props.load])
   console.log(props.inviteType)
   let marraigeday=props.lang.days[moment(props.data.marraigedate).day()];
    return(
        load?
        <div className={styles.page2wrapper}>
          <div className={styles.leftcontainer}>
              <img src="./weddingdayleft.png" alt="wedding-logo" className={styles.leftcontainerimg}/>
          </div>
          <div className={styles.rightcontainer}>
          <div className={styles.eventdate} style={props.lang.id==='en'?{fontFamily:'SignPainter'}:{fontFamily:'Bangla'}}>
          <img src="./dateribbon.png" alt="bottomlogo" className={styles.dateribbon}/>
            <p className={styles.eventdatetext} >
                {props.lang.id==='en'?moment(props.data.marraigedate).locale('en-in').format('DD-MMM-YYYY'):moment(props.data.marraigedate).locale('bn').format('DD-MMMM-YYYY')}
                <br/>
                {marraigeday}
            </p>
          </div>
          
          <img src="./hallpic.png" alt="bottomlogo" className={styles.hallimg}/>
          <p className={styles.halltext} style={{wordWrap:'break-word'}}>
           {props.lang.id==='en'?props.data.mhall:props.data.mhallbangla}
          </p>
          <img src="./rightbottomlogo.png" alt="bottomlogo" className={styles.rightbottomlogo}/>
          </div>

        </div>
        :<></>
    )
}