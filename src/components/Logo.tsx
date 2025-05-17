// components/Logo.tsx
'use client';

import { motion } from "framer-motion";

const Logo = () => {
  // Initial page load animation
  const containerVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      }
    }
  };

  return (
    <motion.div
      className="relative inline-block cursor-pointer overflow-visible py-2.5 font-medium text-xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center">
        <span className="font-semibold">ZRktty</span>
        <div className="ml-0.5 bg-black text-white px-1.5 rounded text-sm font-bold dark:bg-white dark:text-black">
          .dev
        </div>
      </div>
    </motion.div>
  );
};

export default Logo;

