import React,{useState} from 'react'
import { AiOutlineIdcard,AiOutlineHome,AiOutlineShareAlt,AiOutlineSetting} from 'react-icons/ai';
import { useRouter } from 'next/router';
export default function BottomNav(){
const [selected,setSelected]=useState(0);
const router = useRouter();

const onClick=(val)=>{
setSelected(val);
}

return(
    <div className="bottomnavcontainer">

      <div className={selected===0?"bttmnavbttn selected":"bttmnavbttn"} onClick={()=>{onClick(0);router.push('/')}}>
        <i className="bttmnavicon"><AiOutlineHome/></i>
        <p className="bttmnavbttnlabel">Home</p>
      </div>

      <div className={selected===1?"bttmnavbttn selected":"bttmnavbttn"} onClick={()=>{onClick(1);router.push('/mycard')}}>
        <i className="bttmnavicon"><AiOutlineIdcard/></i>
        <p className="bttmnavbttnlabel">My Card</p>
      </div>

      <div className={selected===2?"bttmnavbttn selected":"bttmnavbttn"} onClick={()=>{onClick(2);router.push('/share')}}>
        <i className="bttmnavicon"><AiOutlineShareAlt/></i>
        <p className="bttmnavbttnlabel">Share Card</p>
      </div>

      <div className={selected===3?"bttmnavbttn selected":"bttmnavbttn"} onClick={()=>{onClick(3);router.push('/myaccount')}}>
        <i className="bttmnavicon"><AiOutlineSetting/></i>
        <p className="bttmnavbttnlabel">My Account</p>
      </div>
      

    </div>
)
}