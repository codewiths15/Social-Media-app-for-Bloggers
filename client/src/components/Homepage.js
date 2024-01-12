import React, { useState, useEffect, useReducer } from "react";
import "./Homepage.css";
import Popup1 from "./Popup1";
import Popup2 from "./Popup2";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import axios from "axios";
import Loader from "./Loader";
import Ask from "./Ask";
import { Icon } from "@iconify/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Homepage({ userDetails, setLoginUser }) {
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const [isloading, setisloading] = useState(true);
  const [show, setshow] = React.useState(false);

  const [show1, setshow1] = React.useState(false);

  const [data, setData] = useState([]);

  const [comments, setComments] = useState([]);

  const { _id, email, name } = userDetails;

  const [showCommentSection, setShowCommentSection] = useState(false);

  const [clicked, setClicked] = useState(false);

  const handleButtonClick = () => {
    setClicked(true);
    // You can perform other actions here on button click if needed
    // For example: Update state or trigger other functions
  };

  const toggleCommentSection = () => {
    setShowCommentSection(!showCommentSection);
  };

  const handleUpdate = (e, index) => {
    const { value } = e.target;
    const updatedComments = [...comments]; // Create a copy of the comments array
    updatedComments[index] = value; // Update the comment at the specified index
    setComments(updatedComments); // Update the state with the modified comments array
  };
  const handleLike = (id, user_id) => {
    axios
      .put("http://localhost:8000/likes", {
        postId: id, // The ID of the post to be liked
        userid: user_id, // The ID of the user performing the like action
      })
      .then((response) => {
        // Handle the response from the backend if needed
        // console.log("Post liked:", response.data);
        // You might update the UI here to reflect that the post has been liked
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error liking post:", error);
      });
  };

  const handleUnLike = (id, user_id) => {
    axios
      .put("http://localhost:8000/unlikes", {
        postId: id, // The ID of the post to be liked
        userid: user_id, // The ID of the user performing the like action
      })
      .then((response) => {
        // Handle the response from the backend if needed
        // console.log("Post liked:", response.data);
        // You might update the UI here to reflect that the post has been liked
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error liking post:", error);
      });
  };

  const handleComments = (id, user_id, name, comment) => {
    toast.info("Posting comment...", {
      autoClose: 2000, // Auto close the toast after 2 seconds
    });
    axios
      .put("http://localhost:8000/comment", {
        postId: id,
        userid: user_id,
        username: name,
        comment: comment,
      })
      .then((response) => {
        // Handle the response from the backend if needed
        console.log("Post commented:", response.data);
        setComments([]);
        // You might update the UI here to reflect that the post has been liked
        toast.success("Comment posted successfully!", {
          autoClose: 3000,
        });
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error commenting on post:", error);
        toast.error("Error posting comment. Please try again later.", {
          autoClose: 3000,
        });
      });
  };

  function getDayName(dayNumber) {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysOfWeek[dayNumber];
  }

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
          <Ask />
        </div>
        <div className="postsss">
          {data.map((item, index) => {
            const dayName = getDayName(item.day);

            // Format createdAt to display year, month, and day
            const createdAtDate = new Date(item.createdAt);
            const formattedDate = createdAtDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            return (
              <div className="post-section">
                <div className="post-card">
                  <div className="name">
                    <div className="first-space">
                      <div className="profile-pic">
                        <img
                          src="https://www.pngall.com/wp-content/uploads/5/Profile.png"
                          alt=""
                        />
                      </div>
                      <div className="profile-name"> {item.name}</div>
                    </div>
                    <div className="post-time">
                      {dayName}, {formattedDate}
                    </div>
                  </div>
                  <div className="profession">MERN Stack Developer</div>
                  <div className="information">{item.caption}</div>
                  <div className="image1">
                    <img
                      src={`http://localhost:8000/${item.imageUrl}`}
                      alt=""
                    />
                  </div>
                  <div className="like-comment">
                    <div className="like">
                      <div className="likey">
                        {item.likes.length + "  "}Likes
                      </div>
                      {item.likes.includes(_id) ? (
                        <div
                          className="likey"
                          onClick={() => handleUnLike(item._id, _id)}
                        >
                          <button className="like-1 splash like-3">
                            Unlike
                          </button>
                        </div>
                      ) : (
                        <div
                          className="likey"
                          onClick={() => handleLike(item._id, _id)}
                        >
                          <button className="like-1 like-2">Like</button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="comment-section">
                    <div
                      className={`discussion gradient-hover`}
                      onClick={toggleCommentSection}
                    >
                      Discussion Forum
                    </div>
                    <ToastContainer />
                    <div
                      className={`close-comment ${
                        showCommentSection ? "show" : "hide"
                      }`}
                    >
                      <div className="comment-input">
                        <textarea
                          id=""
                          rows="2"
                          name={`comment${index}`}
                          value={comments[index] || ""} // Set value from the comments array
                          onChange={(e) => handleUpdate(e, index)}
                          placeholder="Your Comment"
                        ></textarea>
                        <button
                          onClick={() =>
                            handleComments(item._id, _id, name, comments[index])
                          }
                        >
                          Post comment
                        </button>
                      </div>
                      <div className="border-comments">
                        <div className="all-comments1">
                          {item.comments.map((comment1, index) => {
                            return (
                              <>
                                <div className="all-comments">
                                  <div className="commentor-name">
                                    <img
                                      src="https://www.pngall.com/wp-content/uploads/5/Profile.png"
                                      className="commentor-icon"
                                      height={30}
                                      width={30}
                                      alt=""
                                    />
                                    <div className="commentor-name1">
                                      {comment1.name}
                                    </div>
                                  </div>
                                  <div className="comment-main">
                                    <div className="comment-text">
                                      {comment1.text}
                                    </div>
                                  </div>
                                </div>
                                <div className="reply-section">
                                  <button className="reply-button">
                                    Reply
                                  </button>
                                
                                </div>
                                <div className="reply-bar">
                                    <div className="reply-bar1">
                                      <input
                                        type="text"
                                        className="reply-text"
                                      />
                                      <div className="reply-button1">
                                        <button>Reply</button>
                                      </div>
                                    </div>
                                  </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
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
