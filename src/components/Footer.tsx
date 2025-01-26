"use client"

import React from 'react';
import LocalTime from "@/components/LocalTime";
import SiteVersion from "@/components/SiteVersion";

const Footer: React.FC = () => {
  return (
    <footer className="w-full p-4 flex justify-between">
      <div className="flex-1">
        <SiteVersion/>
      </div>
      <div className="">
        <LocalTime/>
      </div>
    </footer>
  );
};

export default Footer;