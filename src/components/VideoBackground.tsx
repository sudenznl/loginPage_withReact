import React from 'react';
import '../styles/VideoBackground.css';

const imageSource = "/assets/logingorsel.png";

const VideoBackground: React.FC = () => {
  return (
    <div className="video-background">
      <img className="video-element" src={imageSource} alt="Login görseli" />
      <div className="video-overlay"> <h2> </h2> </div>
    </div>
  );
};

export default VideoBackground;
