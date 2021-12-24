/* eslint-disable @next/next/no-img-element */
import { useEffect,useState } from 'react'
import styles from '../styles/card.module.css'
import moment from 'moment';
import 'moment/locale/bn';
import 'moment/locale/en-in';

export default function Page3(props){
    const [load,setLoad]=useState(false);
    useEffect(() => {
      if(props.inviteType==="wedding" && props.load==='page3'){
        props.setPage('page4');
      }
        else if(props.load==='page3'){
                  setLoad(true);
                  const timer = setTimeout(() => {
                    props.setPage('page4');
                  }, 5000);
                  return () => clearTimeout(timer);

        }
        else{
            setLoad(false)
       }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[props.load])
   let receptionday=props.lang.days[moment(props.data.receptiondate).day()];
    return(
        load?
        <div className={styles.page2wrapper}>
          <div className={styles.receptionleftcontainer}>
          </div>
          <div className={styles.rightcontainer}>
            <div className={styles.eventdate} style={props.lang.id==='en'?{fontFamily:'SignPainter'}:{fontFamily:'Bangla'}}>
            <img src="./dateribbon.png" alt="bottomlogo" className={styles.dateribbon}/>
                <p className={styles.eventdatetext} >
                    {props.lang.id==='en'?moment(props.data.receptiondate).locale('en-in').format('DD-MMM-YYYY'):moment(props.data.receptiondate).locale('bn').format('DD-MMMM-YYYY')}
                    <br/>
                    {receptionday}
                </p>
            </div>
            
            <img src="./hallpic.png" alt="bottomlogo" className={styles.hallimg}/>
            <p className={styles.halltext} style={{wordWrap:'break-word'}}>
            {props.lang.id==='en'?props.data.rhall:props.data.rhallbangla}
            </p>
            <img src="./rightbottomlogo.png" alt="bottomlogo" className={styles.rightbottomlogo}/>
          </div>

        </div>
        :<></>
    )
}