import React from 'react';
import LoginForm from '../components/LoginForm';
import VideoBackground from '../components/VideoBackground';
import '../styles/LoginPage.css';
const LoginPage: React.FC = () => {
  return (
      <div className="login-page-container">
      <div className="login-card">
        <div className="login-form-panel">
          <LoginForm />
        </div>
        <div className="video-background-panel">
          <VideoBackground />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;