import React, {useState} from 'react'
import Leftbar from "./leftbar";
import axios from 'axios';
import {useHistory} from "react-router-dom"



export default function Register() {

  const history = useHistory()

  const [user, setuser] = useState({
    name:"",
    email:"",
    password:"",
    reenterpassword:""
  })

  const handleupdate= e =>{
      const {name, value }= e.target
      setuser(
        {
          ...user,
          [name]: value
        }) 
  }

  const register = () =>{

    const {name, email, password, reenterpassword} =  user
    if(name && email && password && (password===reenterpassword))
    {
        axios.post("http://localhost:8000/register", user)
        .then(res => {alert(res.data.message)
          history.push("/login")
        })
    }
    else
    {
      alert("Invalid input")
    }


  }

  return (
    <div>
      <Leftbar/>
      <div className="main-log">
      {console.log("User", user)}

        <div className="login">
        <div className="header">
           <h1>Sign UP</h1>
          </div>
          <div className="input">
            <input
              type="text"
              className="text" name='name' value={user.name}  onChange={handleupdate}
              placeholder="Enter your name"
            />
            <input
              type="text"
              className="text" name='email' value={user.email} onChange={handleupdate}
              placeholder="Enter your email"
            />
             <input
              type="password"
              className="text" name='password' value={user.password} onChange={handleupdate}
              placeholder="Enter your passwrord"
            />
             <input
              type="password"
              className="text" name='reenterpassword' value={user.reenterpassword} onChange={handleupdate}
              placeholder="Re-enter your passwrord"
            />

          </div>

          <div className="button">
            <button className="press" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
