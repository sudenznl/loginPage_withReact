import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FolderPage from '../components/FolderPage';
import LoginPage from './LoginPage';
import '../styles/FolderAnimation.css';
import '../styles/LandingPage.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<FolderPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
