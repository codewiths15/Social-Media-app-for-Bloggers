import React from 'react'
import './Loader.css'

function Loader() {
  return (
    <div className='loader'>
      <img
            src="https://www.freepnglogos.com/uploads/purple-twitch-logo-png-18.png"
            alt=""
            height={50}
            width={50}
          />
          <div className="write">
          Loading....
          </div>
    </div>
  )
}

export default Loader
