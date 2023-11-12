import React from "react";
import "./Popup.css";

export default function Popup1({ show, onClose }) {
  if (!show) {
    return null;
  }
  return (
    <div className="modalwrapper">
      <div className="image1">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/people-discussing-holding-laptop-2706039-2257835.png"
          width={490}
          height={400}
          alt=""
        />
      </div>
      <div className="modal">
        <div className="header">
          <img
            src="https://umaine.edu/research/wp-content/uploads/sites/281/2018/06/idea-icon.png"
            width={30}
            height={30}
            alt=""
          />
          <h2 className="post1">Post your Ideas and Knowledge</h2>
        </div>

        <button className="cross" onClick={onClose}>
          <img
            src="https://www.freeiconspng.com/uploads/black-circle-close-button-png-5.png"
            height={20}
            width={20}
            alt=""
          />
        </button>
      </div>
      <div className="image1">
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
