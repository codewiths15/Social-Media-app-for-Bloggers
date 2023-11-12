import React, {useState} from "react";
import "./Homepage.css";
import Popup1 from "./Popup1";
import Popup2 from "./Popup2"
export default function Homepage({ setLoginUser }) {

  const [show, setshow] = React.useState(false)

  const [show1, setshow1] = React.useState(false)
  return (
    <>
    <div className="home">
      <div className="home-container">
        <h1>Your Profile</h1>
      </div>
      <div className="profile">
        <img src="https://i.pinimg.com/originals/07/33/ba/0733ba760b29378474dea0fdbcb97107.png" width={200} height={200} alt="" />
      </div>
      <div className="user">
        <div className="user-icon">
          <img src="https://www.pngkey.com/png/full/202-2024792_user-profile-icon-png-download-fa-user-circle.png" width={20} height={20} alt="" />
        </div>
        <h3>paultech1507yyyy</h3>
      </div>
      
      <button className="log-out" onClick={() => setLoginUser({})}>Log out</button>
      <div className="functions">
        <button className="func" onClick={() => setshow(true)}>POST</button>
        <button className="func" onClick={() => setshow1(true)}>ASK</button>

      </div>
      
    </div>
    <Popup1 show={show} onClose= {() => setshow(false)}>

      </Popup1> 
    <Popup2 show1={show1} onClose1= {() => setshow1(false)}>

    </Popup2>
      
    </>
  );
}
