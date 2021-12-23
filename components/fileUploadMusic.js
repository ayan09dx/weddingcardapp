import React,{useState} from 'react'
import axios from 'axios';
import ProgressBar from "@ramonak/react-progress-bar";
import { AiOutlineCloudUpload,AiOutlineDelete } from 'react-icons/ai';


export default function FileUpload(props){

  const [fileArray,setFileArray]=useState([]);
  const [image, setImage] = useState(null);
  const [uploadPercentage, setuploadPercentage] = useState(0);
  const [errortype, setErrorType] = useState(false);
  const [errorSize, setErrorSize] = useState(false);
  const [uploadBar, setUploadBar] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorUpload, setErrorUpload] = useState(false);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  

 

  const checkSize=(size)=>{
    if(size>2097152){
      setErrorSize(true);
      return false
    }
    else{
      setErrorSize(false);
      return true
    }  
  }
  const checkType=(type)=>{
    if( type === "audio/mpeg"){
      setErrorType(false);
      return true
      }
      else{
        setErrorType(true);
        return false
      }
  }

  const uploadToClient = (event) => {
    console.log(event.target.files[0])
   setSuccess(false);setErrorUpload(false)
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if(checkSize(file.size) && checkType(file.type)){
        setImage(file);
        setCreateObjectURL(URL.createObjectURL(file));
      }
    }
  };

  const uploadToServer = async () => {
    setUploadBar(true);
    const body = new FormData();
    body.append("file", image,props.name);
    const config = {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: (event) => {
           setuploadPercentage(Math.round((event.loaded * 100) / event.total));
        },
      };
  
      const response = await axios.post('/api/fileUpload', body, config);

      if(response.data.data==="success"){
        
        setUploadBar(false);
        setErrorUpload(false);
        setSuccess(true);
        props.setSong("./uploads/"+props.name);
        props.setStatus(true);
      }
      else{
        props.setStatus(false);
        setSuccess(false);
        setErrorUpload(true);
      }

  };

  const handleClientDelete=()=>{
    setFileArray([]);
    setImage(null);
  }

//console.log(props)
    return(
    
      <div style={{padding:0}}>
        <br/>
        <div className="input-outlined">
          <input type="file" name="myImage" value={fileArray} onChange={uploadToClient} />
          <i className="iconupload"><AiOutlineCloudUpload/></i>
          <input placeholder={"Choose "+props.label} type="text" defaultValue={image?image.name:""}/>
          <label>{props.label}</label>
        </div>
        <p className="texterror">{errorUpload?"Unable to upload.Try again..":""}</p>
          <p className="textsuccess">{success?"Song uploaded successfully..":""}</p>
        {(!errortype && image && !errorSize && !success)?
        <div className="imagepreview">
          <audio src={createObjectURL} controls style={{width:'100%'}}>
                    <p>If you are reading this, it is because your browser does not support the audio element.</p>
                </audio>
        <i className="songpreviewaction" onClick={handleClientDelete}><AiOutlineDelete/></i>
        </div>
        :<p className="texterror">{errortype?"Wrong file type":errorSize?"File size can not be more than 2 MB":""}</p>
        }
        <br/>
      {uploadBar?
        <><ProgressBar
            bgColor="green"
            completed={uploadPercentage} /><br /></>
         :<></>}
      {image && !success?
        <button
          className="btn btn-primary"
          type="submit"
          onClick={uploadToServer}
          disabled={errortype || errorSize}
        >
          Confirm Upload
        </button>
        :<></>}
      </div>
    )
}