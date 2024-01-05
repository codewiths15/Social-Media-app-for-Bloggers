import React, {useState} from "react";
import Leftbar from "./leftbar";
import axios from "axios";
import {useHistory} from "react-router-dom"
import "./Login.css";

export default function Login({ userDetails,setLoginUser}) {

const history = useHistory()
  const [user, setuser] = useState({
    email:"",
    password:"",
  })

  const handleupdate= e =>{
      const {name, value }= e.target
      setuser(
        {
          ...user,
          [name]: value
        }) 
  }

  const loginchange = () =>{

    const {email, password} =  user
   
    if(email && password)
    {
        axios.post("http://localhost:8000/login", user)
        .then(res => {
          alert(res.data.message)
          setLoginUser(res.data.userExist)
         
          history.push("/")
        })
    }
    else
    {
      alert("Invalid input")
    }


  }
  return (
    <div>
      <Leftbar />
      <div className="main-log">
      {console.log("User", user)}

        <div className="login">
          <div className="header">
           <h1>Sign IN</h1>
          </div>
          <div className="input">
            <input
              type="text"
              className="text" name='email' value={user.email}  onChange={handleupdate}
              placeholder="Enter your email"
              autocomplete="off"
            />
            <input
             type="password"
              className="text" name='password' value={user.password}  onChange={handleupdate}
              placeholder="Enter your passwrord"
              autocomplete="off"
            />
          </div>

          <div className="button">
            <button className="press" onClick={loginchange}>
              Login
            </button>
            <p>Not yet registered?</p>
            <button className="press1" onClick={() => history.push("/register")}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
