export const sendEmail=async(props)=>{
    let value=false;
    let res= await fetch("https://formsubmit.co/ajax/ayan09dx@gmail.com", {
    method: "POST",
    headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        name: props.name,
        message: props.msg,
        _subject:props.subject,
        _cc:props.email,
        _template:"table"
    })
})
     const json = await res.json()
     if(json.success){
         value=true
     }

    return value;
    
}