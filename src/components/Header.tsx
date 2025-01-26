import React from 'react';
import Nav from "@/components/Nav";
import ThemeSelector from "@/components/ThemeSelector";
import Logo from "@/components/Logo";
import MenuButton from "@/components/MenuButton";

const Header: React.FC = () => {
  return (
    <header className="w-full p-4 flex justify-between">
      <Logo />
      <Nav />
      <div className='flex gap-4'>
        <ThemeSelector />
        <MenuButton />
      </div>
    </header>
  );
};

export default Header;