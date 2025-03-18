
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center justify-center">
      <img 
        src="/lovable-uploads/fc234910-95e4-4855-b7ec-9d5340eafa6e.png" 
        alt="Waldoase Mertens Logo" 
        className="w-32 h-auto"
      />
    </Link>
  );
};

export default Logo;
