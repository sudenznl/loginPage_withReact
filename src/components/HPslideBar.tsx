import React from 'react';
import '../styles/slideBar.css';

interface HPslideBarProps 
{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onMenuClick?: (key: string) => void;
}

const HPslideBar: React.FC<HPslideBarProps> = ({ isOpen, setIsOpen, onMenuClick }) => {

  return (
    <div
      className={`slideBar ${isOpen ? 'open' : 'closed'}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <img src="/img/TMSlogo.png" alt="logo" className="logo" />

      <ul>

        <li onClick={() => {
          setIsOpen(true);
          if (onMenuClick) onMenuClick("home");
        }}>
          {/*<img src="/img/tms-logo-icon.png" alt="icon" className="iconslide"/>*/}
          <div className="textkutusu"><span className="slidetext">Ana Sayfa</span></div>
        </li>

        <li>
          {/*<img src="/img/tms-logo-icon.png" alt="icon" className="iconslide"/>*/}
          <div className="textkutusu"><span className="slidetext">Arızalı Trenler</span></div>
        </li>

        <li>
          {/*<img src="/img/tms-logo-icon.png" alt="icon" className="iconslide"/>*/}
          <div className="textkutusu"><span className="slidetext">Günlük Bakım Yapılacak Trenler</span></div>
        </li>

         <li onClick={() => onMenuClick && onMenuClick("help")}>
          {/*<img src="/img/tms-logo-icon.png" alt="icon" className="iconslide"/>*/}
          <div className="textkutusu"><span className="slidetext">Yardım</span></div>
        </li>

        <li>
          {/*<img src="/img/tms-logo-icon.png" alt="icon" className="iconslide"/>*/}
          <div className="textkutusu"><span className="slidetext">İletişim</span></div>
        </li>

      </ul>

    </div>
  );
};

export default HPslideBar;
