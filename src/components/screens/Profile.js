import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from "../../App"

export default function Profile() {

  const [mypics,setPics]=useState([])
  const {state,dispatch}=useContext(UserContext)
  
  useEffect(()=>{
    fetch('https://instaclone-backend-j5kp.onrender.com/mypost',{
           headers:{
             Authorization:"Bearer "+localStorage.getItem("jwt")
          }
      }).then(res=>res.json())
      .then(result=>{
        //console.log(result)
        setPics(result.mypost)
      })
  },[])

  return (
    <div style={{maxWidth:"550px",margin:"0px auto"}}>
      <div style={{
        display:"flex",
        justifyContent:"space-around",
        margin:"18px 0px",
        borderBottom:"1px solid grey"

      }}>
         <div>
            <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
            src="https://www.pixelstalk.net/wp-content/uploads/2016/07/Wallpapers-pexels-photo.jpg" alt=""/>
         </div>

         <div>
           <h4>{state?state.name:"loading"} </h4>
            <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                <h6>40 posts</h6>
                <h6>40 followers</h6>
                <h6>40 following</h6>
                
            </div>
         </div>
      </div>

      <div className='gallery'>

      {
        mypics.map(item=>{
          return(
            <img key={item._id} className='item'  src={item.photo} alt={item.title}/>

          )
        })
      }
      
      </div>

    </div>
  )
}
