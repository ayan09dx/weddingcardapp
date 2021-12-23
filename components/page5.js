/* eslint-disable @next/next/no-img-element */
import { useEffect,useState } from 'react'
import styles from '../styles/card.module.css'
import moment from 'moment';
import 'moment/locale/bn';
import 'moment/locale/en-in';

export default function Page5(props){
    const [load,setLoad]=useState(false);
    useEffect(() => {
      if(props.data.type==='ex'){
        props.setPage('page2');
      }
      else if(props.load==='page5'){
                  setLoad(true);
                  const timer = setTimeout(() => {
                    props.setPage('page6');
                  }, 8000);
                  return () => clearTimeout(timer);

        }
        else{
            setLoad(false)
       }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[props.load])
   let marraigeday=props.lang.days[moment(props.data.marraigedate).day()];
    return(
        load?
        <div className={styles.page2wrapper}>
          <div className={styles.bridegroomdetailsleftcontainer}>
              <img src={"/uploads/"+props.data.groomimagename} alt="groom-image" className={styles.bridegroomdetailsleftcontainerimg}/>
          </div>
          <div className={styles.rightcontainer}>
          <div className={styles.eventdate} style={props.lang.id==='en'?{fontFamily:'SignPainter'}:{fontFamily:'Bangla'}}>
          <img src="./dateribbon.png" alt="bottomlogo" className={styles.dateribbon}/>
            <p className={styles.eventdatetext} style={{textTransform:'uppercase'}}>
                {props.lang.id==='en'?props.data.groomname:props.data.groomnamebangla}
            </p>
          </div>
          {props.lang.id==='en'?
          <p className={styles.halltext} style={{marginTop:5,wordWrap:'break-word'}}>
            Son of<br/>
           {props.data.groomfathername+" & "+props.data.groommothername}
          </p>
          :<p className={styles.halltext} style={{marginTop:5,wordWrap:'break-word'}}>
            পিতা এবং মাতার পরিচয়<br/>
            {props.data.groomfathernamebangla+" - "+props.data.groommothernamebangla}
          </p>
          }
          
          {props.lang.id==='en'?
          <p className={styles.halltext} style={{marginTop:0,wordWrap:'break-word'}}>
            Resident of<br/>
           {props.data.groomhome}
          </p>
          :<p className={styles.halltext} style={{marginTop:0,wordWrap:'break-word'}}>
            নিবাস<br/>
            {props.data.groomhomebangla}
          </p>
          }
          <img src="./rightbottomlogo.png" alt="bottomlogo" className={styles.rightbottomlogo}/>
          </div>

        </div>
        :<></>
    )
}