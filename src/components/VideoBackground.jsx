import React from 'react';
import '../styles/VideoBackground.css';

const videoSource = "/assets/background-video.mp4";

const VideoBackground = () => {
  return (
    <div className="video-background">
      <video className="video-element" autoPlay loop muted>
        <source src={videoSource} type="video/mp4" />
        Tarayıcınız video etiketini desteklemiyor.
      </video>
      <div className="video-overlay"> <h2> </h2> </div>
    </div>
  );
};

export default VideoBackground;
