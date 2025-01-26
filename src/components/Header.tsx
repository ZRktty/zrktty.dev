import React from 'react';
import Nav from "@/components/Nav";
import ThemeSelector from "@/components/ThemeSelector";

const Header: React.FC = () => {
  return (
    <header className="w-full p-4 flex justify-between">
      <Nav/>
      <ThemeSelector/>
    </header>
  );
};

export default Header;