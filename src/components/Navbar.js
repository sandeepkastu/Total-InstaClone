import React,{useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { UserContext } from '../App'

export default function Navbar() {
  
  const {state,dispatch}=useContext(UserContext)
  const history=useHistory()
  const renderList=()=>{
    if(state){
       return (
        <div>

          <li><Link to="/profile">Profile</Link></li>,
          <li><Link to="/createpost">Create Post</Link></li>,
          <li>
          <button
          className="btn waves-effect waves-light red"
          onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push('/signin')
          }} >
          
          Logout
        </button>
          </li>

        </div>
        )
    }else{
      return (
        <div>
          <li><Link to="/signup">Signup</Link></li>,
          <li><Link to="/signin">Signin</Link></li>
        </div>
        )
    }
  }
  
  return (
      <nav>
    <div className="nav-wrapper white" >
      <Link to={state?"/":"/signin"} className="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" className="right">
        {renderList()}
        
      </ul>
    </div>
  </nav>
    
  )
}
