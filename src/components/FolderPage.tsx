import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../styles/FolderAnimation.css';

const containerVariants: Variants = {
  hidden: { opacity: 0, x: -300 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 1 }
  }
};

// framer-motion Variants tipi repeatType için belirli değerler bekler
const lineVariants: Variants = {
  hidden: { width: 0 },
  visible: (i: number) => ({
    width: '80%',
    transition: {
      delay: 1.5 + i * 0.2,
      duration: 0.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: 'reverse'
    }
  })
};

const FolderPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login'); 
    }, 7000); // kaç saniye sonra geçeceğimize karar veriyoruz.

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);

  return (
    <div className="folder-page-container">
      <motion.div 
        className="page-frame"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[...Array(8)].map((_, i) => (
          <motion.div 
            className="page-line" 
            key={i} 
            custom={i} 
            variants={lineVariants}
            initial="hidden"
            animate="visible"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default FolderPage;
