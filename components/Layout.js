import React, {useState,useEffect } from 'react';
import Header from './Header'
import Footer from './Footer'
import BottomNav from './BottomNav';
import Head from 'next/head';
import { useRouter } from "next/router"

export default function Layout({children}){
const [load,setLoad]=useState(false);
const router=useRouter();
useEffect(()=>{
    if(children[1].props.profile==='' || children[1].props.profile===null || router.pathname==="/cardview" ){
        setLoad(false)
    }
    else{
        setLoad(true)
    }
},[children])

   //console.log(router.pathname)
    return(
        load?
        <div>
            <Head>
            <meta charSet="utf-8" />
            <title>Bengali Wedding Card Maker - বাংলা বিয়ের কার্ড মেকার</title>
            <meta name="description" content="Easy tool to make customized bengali wedding cards in english and bengali language for sharing card digitally"/>
            <meta name="keywords" content="bengali wedding card,customised wedding card,bengali,wedding,english card,bengali wedding card" />
            <link rel="icon" href="/favicon.ico" />
            <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            </Head>
            <Header/>
            <div className="main" style={{marginTop:85}}>{children}</div>
            <Footer/>    
            <BottomNav/> 
        </div>
        :<div className="main" style={router.pathname==="/cardview"?{marginBottom:0}:{}}>{children}</div>
    );
    }
    