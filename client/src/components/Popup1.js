import React, { useState, useEffect } from "react";
import "./Homepage.css";
import "./Popup.css";
import Axios from "axios";
import $ from "jquery";
import "jquery-ui-dist/jquery-ui";
import { useHistory } from "react-router-dom";

export default function Popup1({ show, userDetails, onClose }) {
  const history = useHistory();

  useEffect(() => {
    $(".cancel").click(function () {
      $(".navbar").css("display", "flex");
    });

   
  });

  const [image, setimage] = useState("");
  const [post, setpost] = useState({
    caption: "",
  });

  if (!show) {
    return null;
  }

  
  const handleupdate = (e) => {
    const { name, value } = e.target;
    setpost({
      ...post,
      [name]: value,
    });
  };

  const closeClear = () => {
    setpost({ caption: "" });
  };

  function combinedFunction() {
    onClose();
    closeClear();
  }

  const addPassword = () => {
    const formData = new FormData();
    formData.append("userid", userDetails._id);
    formData.append("caption", post.caption);
    formData.append("name", userDetails.name);
    formData.append("image", image);

    console.log(image, 12);

    Axios.post("http://localhost:8000/post", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }); // Send formData directly
  };

  
  return (
    <div className="modalwrapper">
      <div className="image2">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/people-discussing-holding-laptop-2706039-2257835.png"
          width={490}
          height={400}
          alt=""
        />
      </div>
      <div className="modal">
        {console.log("Caption :", post)}
        <div className="header">
          <img
            src="https://umaine.edu/research/wp-content/uploads/sites/281/2018/06/idea-icon.png"
            width={30}
            height={30}
            alt=""
          />
          <h2 className="post1">Post your Ideas and Knowledge</h2>
        </div>
        <div className="input-2">
          <textarea
            id="w3review"
            className="input-1"
            name="caption"
            value={post.caption}
            onChange={handleupdate}
          ></textarea>
          <input
            onChange={(e) => setimage(e.target.files[0])}
            type="file"
            name="image"
          />
        </div>
        <div className="buttons">
          <button className="publish" onClick={addPassword}>
            Publish
          </button>
          <button className="publish cancel" onClick={combinedFunction}>
            Cancel
          </button>
        </div>
      </div>
      <div className="image2">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/young-people-discussing-the-problem-while-showing-laptop-2644454-2206523.png"
          width={470}
          height={380}
          alt=""
        />
      </div>
    </div>
  );
}
