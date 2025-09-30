import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './common/Input';
import Button from './common/Button';
import '../styles/LoginPage.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from "framer-motion";
import { users } from '../data/user';

const logo = "/assets/img/tms-logo.png";
const usericon = "/assets/white-person-icon.png";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    // Kullanıcı adı ve şifre doğrulamasını yapıyoruz : ve giriş başarılıysa homepage gödreiyoruz :
    const user = users.find(u => u.username === username && u.password === password);
    if (user) 
    {
      console.log('Giriş başarılı!', user);
      alert(`Hoş geldiniz ${user.name}!`);
      navigate('/home');
    } 
    else 
    {
      setError('Kullanıcı adı veya şifre hatalı!');
    }
  };

  return (
    <motion.form
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="login-form" onSubmit={handleSubmit}
    >
      <div className="logo-container">
        <div className="logo-wrap">
          <img src={logo} alt="TMS Logo" className="logoform" />
        </div>
        <span className="logoform-text">TMS<sup className="logo-reg">®</sup></span>
      </div>

      <h2 className="login-title">Kullanıcı Girişi</h2>
      <img src={usericon} alt="usericon" className="usericon" />

      <Input 
        placeholder="Kullanıcı Adı" 
        className="login-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <div className="password-input-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Parola"
          className="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      {error && <div className="error-message">{error}</div>}

      <Button text="Login" />
    </motion.form>
  );
};

export default LoginForm;