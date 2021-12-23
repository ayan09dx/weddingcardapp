/* eslint-disable @next/next/no-img-element */
import { useEffect,useState } from 'react'
import styles from '../styles/card.module.css'
import moment from 'moment';
import 'moment/locale/bn';
import 'moment/locale/en-in';

export default function Page6(props){
    const [load,setLoad]=useState(false);
    useEffect(() => {
        if(props.load==='page6'){
                  setLoad(true);
                  const timer = setTimeout(() => {
                    props.setPage('page2');
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
              <img src={"/uploads/"+props.data.brideimagename} alt="groom-image" className={styles.bridegroomdetailsleftcontainerimg}/>
          </div>
          <div className={styles.rightcontainer}>
          <div className={styles.eventdate} style={props.lang.id==='en'?{fontFamily:'SignPainter'}:{fontFamily:'Bangla'}}>
          <img src="./dateribbon.png" alt="bottomlogo" className={styles.dateribbon}/>
            <p className={styles.eventdatetext} style={{textTransform:'uppercase'}}>
                {props.lang.id==='en'?props.data.bridename:props.data.bridenamebangla}
            </p>
          </div>
          {props.lang.id==='en'?
          <p className={styles.halltext} style={{marginTop:5,wordWrap:'break-word'}}>
            Daughter of<br/>
           {props.data.bridefathername+" & "+props.data.bridemothername}
          </p>
          :<p className={styles.halltext} style={{marginTop:5,wordWrap:'break-word'}}>
            পিতা এবং মাতার পরিচয়<br/>
            {props.data.bridefathernamebangla+" - "+props.data.bridemothernamebangla}
          </p>
          }
          
          {props.lang.id==='en'?
          <p className={styles.halltext} style={{marginTop:0,wordWrap:'break-word'}}>
            Resident of<br/>
           {props.data.bridehome}
          </p>
          :<p className={styles.halltext} style={{marginTop:0,wordWrap:'break-word'}}>
            নিবাস<br/>
            {props.data.bridehomebangla}
          </p>
          }
          <img src="./rightbottomlogo.png" alt="bottomlogo" className={styles.rightbottomlogo}/>
          </div>

        </div>
        :<></>
    )
}