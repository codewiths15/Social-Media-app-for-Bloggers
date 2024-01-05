import React from "react";
import "./Popup2.css";
export default function Popup2({ show1, onClose1 }) {
  if (!show1) {
    return null;
  }
  return (
    <div className="modalwrapper1">
     <div className="image2">
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
        <div className="input-2">
          <textarea
            id="w3review"
            className="input-1"
            name="caption"
          
          ></textarea>
          <input
         
            type="file"
            name="image"
          />
        </div>
        <div className="buttons">
          <button className="publish">
            Publish
          </button>
          <button className="publish cancel" >
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
