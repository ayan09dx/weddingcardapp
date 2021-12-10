import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState,useEffect } from 'react'
import {FaArrowCircleUp} from 'react-icons/fa';
import {setLogout} from '../utils/jwthandler';

const Header=()=>{
    const router = useRouter();
    const [burgerstate, setBurgerstate] = useState(true);
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300){
        setVisible(true)
        }
        else if (scrolled <= 300){
        setVisible(false)
        }
    };

    const scrollToTop = () =>{
        window.scrollTo({
        top: 0,
        behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener("resize", ()=>{window.innerWidth>=600?setBurgerstate(true):""});
        window.addEventListener('scroll', toggleVisible);
        
      },[]);
 // console.log(router)
return(
    <header className="header">
        <nav className="navbar">
        <Link href="/"><a style={{display:'flex',alignItems:'center',fontFamily:'SignPainter'}}><Image src="/logo.png" height={60} width={50} alt="applogo"/> <span style={{marginTop:5}}>Bengali Wedding Card</span></a></Link>
            <ul className={burgerstate?"nav-menu":"nav-menu active"}>
                <li className="nav-item">
                   <Link href="/"><a onClick={() => setBurgerstate(!burgerstate)} className={router.pathname==='/'?"nav-link active":"nav-link "}>Home</a></Link> 
                </li>
                <li className="nav-item">
                    <Link href="/mycard"><a onClick={() => setBurgerstate(!burgerstate)} className={router.pathname==='mycard'?"nav-link active":"nav-link "}>My Card</a></Link> 
                </li>
                <li className="nav-item">
                    <Link href="/share"><a onClick={() => setBurgerstate(!burgerstate)} className={router.pathname==='share'?"nav-link active":"nav-link "}>Share Card</a></Link> 
                </li>
                <li className="nav-item">
                    <Link href="/myaccount"><a onClick={() => setBurgerstate(!burgerstate)} className={router.pathname=='/myaccount'?"nav-link active":"nav-link "}>My Account</a></Link> 
                </li>
              
                <li className="nav-item">
                    <button onClick={(e)=>setLogout(e)} className="logoutbtn">Logout</button> 
                </li>
            </ul>
            <button className={burgerstate?"hamburger":"hamburger active"} onClick={() => setBurgerstate(!burgerstate)}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>
        </nav>
        <button className="scrollbtn">
        <FaArrowCircleUp onClick={scrollToTop}
        style={{display: visible ? 'inline' : 'none'}} />
        </button>
</header>
 
);
}
export default Header;