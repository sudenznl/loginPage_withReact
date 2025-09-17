import React, { useState } from 'react';
import Input from './common/Input';
import Button from './common/Button';
import '../styles/LoginPage.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from "framer-motion";

const logo = "/assets/tms-logo.png";
const usericon = "/assets/white-person-icon.png";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Giriş butonuna tıklandı!');
  };

  return (
    <motion.form
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 7 }}
    className="login-form" onSubmit={handleSubmit}
    >
      <div className="logo-container">
        <img src={logo} alt="TMS Logo" className="logo" />
        <span className="logo-text">TMS</span>
      </div>

      <h2 className="login-title">Kullanıcı Girişi</h2>
      <img src={usericon} alt="usericon" className="usericon" />

      <Input placeholder="Kullanıcı Adı"  className="login-input"/>

      <div className="password-input-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Parola"
          className="password-input"
        />
        <span
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <Button text="Login" />
    </motion.form>
  );
};

export default LoginForm;