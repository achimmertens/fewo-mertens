import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center justify-center">
      <img 
        src="/lovable-uploads/Waldoase_Mertens_Logo.jpg" 
        alt="Waldoase Mertens Logo" 
        className="w-32 h-auto"
      />
    </Link>
  );
};

export default Logo;
