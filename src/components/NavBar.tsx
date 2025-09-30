import React, {useState, useEffect} from 'react'; 
import { useNavigate } from 'react-router-dom';
import '../styles/NavBar.css';
import toggle_light from '../assets/day.png';
import toggle_dark from '../assets/night.png';
import { IoIosExit } from "react-icons/io";
import { FaUserCircle } from 'react-icons/fa';

interface NavBarProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const NavBar: React.FC<NavBarProps> = ({ theme, setTheme }) => {
  const navigate = useNavigate();

  const toggle_mode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Kullanıcı bilgilerini state'e alıyoruz.
  const [currentUser, setCurrentUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
      const user = localStorage.getItem("currentUser");
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
    }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser"); //çıkış yaptıktan sonra kullanıcıyı localStorageden kaldırıyoruz ki çakışma olmasın.
    navigate('/login');
  };

  return (

    <div className={`NavBar ${theme}`}>

      <div className="left-section">

        <p className="nav-title">CARL</p>

        {currentUser && (
          <div className="user-avatar">
            <FaUserCircle 
              className="avatar-icon" 
              size={32} 
              aria-label="User Icon"
            />
            <span className="user-name">{currentUser.name}</span>
          </div>
        )}

      </div>

      <div className="right-section">
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
    </div>
  );
};

export default NavBar;
