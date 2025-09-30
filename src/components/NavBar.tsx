import React from 'react'; 
import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';
import toggle_light from '../assets/day.png';
import toggle_dark from '../assets/night.png';
import { IoIosExit } from "react-icons/io";

interface NavBarProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const NavBar: React.FC<NavBarProps> = ({ theme, setTheme }) => {
  const navigate = useNavigate();

  const toggle_mode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  //burada çıkış yapmak için navigate eledik ve geri login'e yönlendirdik :
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className={`NavBar ${theme}`}>
      <img 
        onClick={toggle_mode} 
        src={theme === 'light' ? toggle_dark : toggle_light}  
        alt="toggle" 
        className="toggle_icon" 
      />

      <IoIosExit 
        onClick={handleLogout} 
        className="logout_icon" 
        size={28}
        aria-label="Çıkış"
      />
    </div>
  );
};

export default NavBar;
