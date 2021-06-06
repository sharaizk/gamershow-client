import React from "react";
import BG from "../assets/BG.mp4";
import {NavLink} from 'react-router-dom'
const LandHome = () => {
  return (
      <>
    <div className="landHome">
      <video
        autoPlay
        loop
        muted
        disablePictureInPicture
        controlsList="nodownload"
        className="video"
      >
        <source src={BG} type="video/mp4" />
      </video>
      <div className="text">
        <h2>Never Stop</h2>
        <h3>Exploring the Virtual World</h3>
        <p>Join the GamerShow community!<br />Discover the best live streams anywhere.</p>
        <NavLink id='toHomeBtn' exact to="/home">JOIN US</NavLink> 

      </div>
    </div>
    </>
  );
};

export default LandHome;
