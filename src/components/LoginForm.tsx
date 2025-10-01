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

  const navigate = useNavigate();//yönlrndirme
  const [showPassword, setShowPassword] = useState<boolean>(false);//şifre görme
  const [username, setUsername] = useState<string>('');//kullanıcı adı
  const [password, setPassword] = useState<string>('');//şifre
  const [error, setError] = useState<string>('');//hata mesajı

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

  e.preventDefault();
  setError('');

  const user = users.find(u => u.username === username && u.password === password);
  // Kullanıcı adı ve şifre doğru girilirse home page yönlendiriyoruz.
  if (user) 
  {
    console.log('Giriş başarılı!', user.name);
    alert(`Hoş geldiniz ${user.name}!`);
    localStorage.setItem("currentUser", JSON.stringify(user)); // kullanıcıyı keydediyoruz ki iconda görünebilsin.
    navigate('/home');
  } 
  else //yanlış girişte hata mesajı gösteriyoruz.
  {
    setError('Kullanıcı adı veya şifre hatalı!');
  }
};

  return (
    <motion.form
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="login-form" onSubmit={handleSubmit}>

      <div className="logo-container">{/*logonun bulunduğu bölüm*/}
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
      />{/*kullanıcı_adı girişi*/}

      <div className="password-input-wrapper">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Parola"
          className="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{/*şifre girişi*/}

        <span
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>{/*şifre görme ikonu*/}

      </div>

      {error && <div className="error-message">{error}</div>}

      <Button text="Login" />
      
    </motion.form>
  );
};

export default LoginForm;