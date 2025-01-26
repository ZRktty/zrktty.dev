import React from 'react';
import Nav from "@/components/Nav";
import ThemeSelector from "@/components/ThemeSelector";
import Logo from "@/components/Logo";

const Header: React.FC = () => {
  return (
    <header className="w-full p-4 flex justify-between">
      <Logo/>
      <Nav/>
      <ThemeSelector/>
    </header>
  );
};

export default Header;