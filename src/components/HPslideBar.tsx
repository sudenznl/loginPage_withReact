import React from 'react';
import '../styles/slideBar.css';

interface HPslideBarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onMenuClick?: (key: string) => void;
}

const HPslideBar: React.FC<HPslideBarProps> = ({ isOpen, setIsOpen, onMenuClick }) => {

  // Menü itemlarını diziye dönüştürdük. bu şekide tek tek li kullanmama gerek kalmadı.
  const menuItems = [
    { key: "home", label: "Ana Sayfa" },
    { key: "faults", label: "Bakım Takvimi" },
    { key: "daily", label: "Günlük Bakım Yapılacak Trenler" },
    { key: "help", label: "Yardım" },
    { key: "contact", label: "İletişim" },
  ];

  return (
    <div
      className={`slideBar ${isOpen ? 'open' : 'closed'}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <img src="/img/TMSlogo.png" alt="logo" className="logo" />

      <ul>
        {menuItems.map(item => (
          <li
            key={item.key}
            onClick={() => {
              setIsOpen(true);
              onMenuClick?.(item.key); // opsiyonel olması için ? kullandık.
            }}
          >
            <div className="textkutusu">
              <span className="slidetext">{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HPslideBar;
