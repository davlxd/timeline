import React from 'react'

import './style.css'

const Home = () => (
  <div className="bg">
    <video className="bgv" loop autoPlay>
      <source src={process.env.PUBLIC_URL + '/one-shot-fast.mp4'} type="video/mp4" />
      {/* <source src={this.state.videoURL} type="video/ogg" /> */}
      Your browser does not support the video tag.
    </video>
    <div className="fg"></div>
    <span className="logo">Timeline.ink</span>
    <div className="buttons">
      <span className="button try"><a className="button-link" href="/line/ca8455706902446396d381363bd869a7">Try it out!</a></span>
      <span className="button gallery"><a className="button-link" href="/gallery">Browse Gallery</a></span>
    </div>
    <div className="footers">
      <span className="footer"><a className="footer-link" href="/terms">Terms of Service</a></span>
      <span className="footer"><a className="footer-link" href="/privacy">Privacy Policy</a></span>
      <span className="footer"><a className="footer-link" href="/thanks">Thanks</a></span>
    </div>
  </div>
)

export default Home
