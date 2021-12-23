import React,{useState} from 'react'
import { AiOutlineIdcard,AiOutlineHome,AiOutlineShareAlt,AiOutlineSetting} from 'react-icons/ai';
import { useRouter } from 'next/router';
export default function BottomNav(){
const [selected,setSelected]=useState('');
const router = useRouter();



return(
    <div className="bottomnavcontainer">

      <div className={ router.pathname==='/'?"bttmnavbttn selected":"bttmnavbttn"} onClick={()=>{router.push('/')}}>
        <i className="bttmnavicon"><AiOutlineHome/></i>
        <p className="bttmnavbttnlabel">Home</p>
      </div>

      <div className={router.pathname==='/mycard'?"bttmnavbttn selected":"bttmnavbttn"} onClick={()=>{router.push('/mycard')}}>
        <i className="bttmnavicon"><AiOutlineIdcard/></i>
        <p className="bttmnavbttnlabel">My Card</p>
      </div>

      <div className={ router.pathname==='/share'?"bttmnavbttn selected":"bttmnavbttn"} onClick={()=>{router.push('/share')}}>
        <i className="bttmnavicon"><AiOutlineShareAlt/></i>
        <p className="bttmnavbttnlabel">Share Card</p>
      </div>

      <div className={ router.pathname==='/myaccount'?"bttmnavbttn selected":"bttmnavbttn"} onClick={()=>{router.push('/myaccount')}}>
        <i className="bttmnavicon"><AiOutlineSetting/></i>
        <p className="bttmnavbttnlabel">My Account</p>
      </div>
      

    </div>
)
}