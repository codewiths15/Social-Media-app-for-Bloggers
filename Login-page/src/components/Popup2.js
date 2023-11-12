import React from "react";
import "./Popup2.css";
export default function Popup2({ show1, onClose1 }) {
  if (!show1) {
    return null;
  }
  return (
    <div className="modalwrapper1">
      <div className="image1">
      <img src="https://i.pinimg.com/originals/7c/39/22/7c39223bf5cf4f18ae6dfec79ed64e8a.png" width={470} height={500} alt="" />
      </div>
        

      <div className="modal1">
        Ask
        <button onClick={onClose1}>close</button>
      </div>
      <div className="image1">
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/male-employee-sitting-and-working-on-laptop-2726323-2272612.png" width={470} height={380} alt="" />
      </div>
    </div>
  );
}
