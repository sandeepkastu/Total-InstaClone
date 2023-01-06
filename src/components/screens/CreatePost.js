import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import { useHistory } from 'react-router-dom'


export default function CreatePost() {

  const history=useHistory()
   const [title,setTitle]=useState("")
   const [body,setBody]=useState("")
   const [image,setImage]=useState("")
   const [url,setUrl]=useState("")

   useEffect(()=>{
    if(url){
    fetch("https://instaclone-backend-j5kp.onrender.com/createpost" , {
      method:"post",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({

        title,
        body,
        pic:url
      })
    }).then(res=>res.json())
    .then(data=>{
          
           if(data.error){
            M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }else{
            M.toast({html:"Created post  Successfully",classes:"#689f38 light-green darken-2"})
            history.push('/')
           }
    })
    .catch(err=>{
      console.log(err)
    })

  }
      
   },[url])
  
   const postDetails=()=>{
    const data=new FormData()
    data.append("file",image)
    data.append("upload_preset","instaclone")
    data.append("cloud_name","dspbghnww")
    fetch("https://api.cloudinary.com/v1_1/dspbghnww/image/upload",{
      method:"post",
      body:data
    })
    .then(res=>res.json())
    .then(data=>{
      setUrl(data.url)
    })
    .catch(err=>{
      console.log(err)
    })
    
    

   }

  return (
    <div className='card input-filed'
          style={{
            margin:"30px auto",
            maxWidth:"500px",
            padding:'20px',
            textAlign:"center"
          }}>

      <input type="text" placeholder='title'
      value={title}
      onChange={(e)=>setTitle(e.target.value)} />
      <input type="text" placeholder='body'
      value={body}
      onChange={(e)=>setBody(e.target.value)}/>

      <div class="file-field input-field">
      <div class="btn">
        <span>Upload Image</span>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
      </div>
      <div class="file-path-wrapper">
        <input class="file-path validate" type="text"/>
      </div>
    </div>
    <button
    className="btn waves-effect waves-light #64b5f6 blue darken-1"
    onClick={postDetails} >
    
      Submit Post
  </button>
    </div>
  )
}
