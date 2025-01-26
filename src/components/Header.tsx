import React from 'react';
import Nav from "@/components/Nav";

const Header: React.FC = () => {
  return (
    <header className="w-full p-4 bg-gray-800 text-white">
      <Nav/>
    </header>
  );
};

export default Header;