"use client"

import React from 'react';
import LocalTime from "@/components/LocalTime";

const Footer: React.FC = () => {
  return (
    <footer className="w-full p-4 flex justify-between">
      <div className="flex-1">
        {/* Add content for the first column here */}
        Column 1 content
      </div>
      <div className="">
        <LocalTime/>
      </div>
    </footer>
  );
};

export default Footer;