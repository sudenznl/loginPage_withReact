import React, { useState } from 'react';
import HPCard from "../components/HPCard";
import HPGraph from "../components/HPGraph";
import HPTable from "../components/HPTable";
import NavBar from "../components/NavBar";
import HPslideBar from "../components/HPslideBar";
import Helping from '../components/helping'; 
import UserProcess from '../components/UserProcess';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  const [theme, setTheme] = useState('light');
  const [isOpen, setIsOpen] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  const handleMenuClick = (key: string) => {
    if (key === "help") setShowHelp(true);
    else if (key === "home") setShowHelp(false);
  };//yardım sayfasını açmak için fonk.

  return (
    <div className={`homepage ${theme}`}>
      <HPslideBar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onMenuClick={handleMenuClick} // yeni prop
      />
      <div className={`main-content${isOpen ? ' slidebar-open' : ''}`}>
        <NavBar theme={theme} setTheme={setTheme} />
        <div className="content">
          {showHelp ? (
            <Helping />
          ) : (
            <>
              <UserProcess />
              <HPCard />
              <HPGraph />
              <HPTable />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
