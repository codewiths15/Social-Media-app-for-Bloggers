import React, { useState, useEffect, useReducer } from "react";
import "./Homepage.css";
import Popup1 from "./Popup1";
import Popup2 from "./Popup2";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import axios from "axios";
import Loader from "./Loader";
import Ask from "./Ask";
export default function Homepage({ userDetails, setLoginUser }) {
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const [isloading, setisloading] = useState(true);
  const [show, setshow] = React.useState(false);

  const [show1, setshow1] = React.useState(false);

  const [data, setData] = useState([]);

  const { _id, email, name } = userDetails;

  useEffect(() => {
    const delayTime = 4000; // 5 seconds in milliseconds

    const fetchData = () => {
      axios
        .get("http://localhost:8000/post")
        .then((response) => {
          setData(response.data);
          setisloading(false);
          forceUpdate();
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    const timer = setTimeout(() => {
      fetchData();
    }, delayTime);

    return () => clearTimeout(timer);
  }, [reducerValue]);

  useEffect(() => {
    $(".open-profile").click(function () {
      $(".home").css("display", "flex");
    });

    $(".cross").click(function () {
      $(".home").css("display", "none");
    });

    $(".func").click(function () {
      $(".navbar").css("display", "none");
    });
  });

  return isloading ? (
    <Loader />
  ) : (
    <div className="main-page">
      <div className="home">
        <div className="cross">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/12/15/37/close-150192_640.png"
            className="cross-button"
            alt=""
          />
        </div>
        <div className="home-container">
          <h1>Your Profile</h1>
        </div>
        <div className="profile">
          <img
            src="https://i.pinimg.com/originals/07/33/ba/0733ba760b29378474dea0fdbcb97107.png"
            width={140}
            height={140}
            alt=""
          />
        </div>
        <div className="user">
          <div className="user-icon">
            <img
              src="https://www.pngkey.com/png/full/202-2024792_user-profile-icon-png-download-fa-user-circle.png"
              width={20}
              height={20}
              alt=""
            />
          </div>
          <h3>{name}</h3>
        </div>

        <button className="log-out" onClick={() => setLoginUser({})}>
          Log out
        </button>
        <div className="functions">
          <button className="func" onClick={() => setshow(true)}>
            POST
          </button>
          <button className="func" onClick={() => setshow1(true)}>
            ASK
          </button>
        </div>
      </div>

      <Popup1
        show={show}
        userDetails={userDetails}
        onClose={() => setshow(false)}
      ></Popup1>

      <Popup2
        show1={show1}
        userDetails={userDetails}
        onClose1={() => setshow1(false)}
      ></Popup2>
      <div className="navbar">
        <div className="logo">
          <img
            src="https://www.freepnglogos.com/uploads/purple-twitch-logo-png-18.png"
            alt=""
            height={50}
            width={50}
          />
          <p className="blogify">Blogify</p>
        </div>
        <button className="open-profile">Profile</button>
      </div>
      <div className="posts">
        <div className="ask-section">
          <Ask/>
        </div>
        <div className="postsss">
          {data.map((item, index) => {
            return (
              <div className="post-section">
                <div className="post-card">
                  <div className="name">
                    <div className="profile-pic">
                      <img
                        src="https://www.pngall.com/wp-content/uploads/5/Profile.png"
                        alt=""
                      />
                    </div>
                    <div className="profile-name"> {item.name}</div>
                  </div>
                  <div className="profession">MERN Stack Developer</div>
                  <div className="information">{item.caption}</div>
                  <div className="image1">
                    <img
                      src={`http://localhost:8000/${item.imageUrl}`}
                      alt=""
                      height={400}
                      width={600}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
