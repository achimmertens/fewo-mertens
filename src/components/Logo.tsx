import React from 'react';
import { Link } from 'react-router-dom';

type LogoProps = {
  to?: string;
  className?: string;
};

const Logo: React.FC<LogoProps> = ({ to = '/', className = 'w-32 h-auto' }) => {
  return (
    <Link to={to} className="flex items-center justify-center">
      <img 
        src="/lovable-uploads/Waldoase_Mertens_Logo.png" 
        alt="Waldoase Mertens Logo" 
        className={className}
      />
    </Link>
  );
};

export default Logo;
