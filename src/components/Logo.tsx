// components/Logo.tsx
'use client';

import { motion } from "framer-motion";
import { useState } from "react";

const Logo = () => {
  const [isHovered, setIsHovered] = useState(false);

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

  // Container animation for text sections
  const textContainerVariants = {
    collapsed: {
      width: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    expanded: {
      width: "auto",
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  // Letter animation
  const letterVariants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className="relative inline-block cursor-pointer overflow-visible py-2.5 font-medium text-xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex items-center">
        {/* Z part */}
        <span>Z</span>

        {/* Rest of the first name */}
        <motion.div
          className="overflow-hidden"
          variants={textContainerVariants}
          initial="collapsed"
          animate={isHovered ? "expanded" : "collapsed"}
        >
          <motion.div
            className="inline-flex whitespace-nowrap"
            variants={letterVariants}
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
          >
            oltan
          </motion.div>
        </motion.div>

        {/* Static middle dash */}
        <span className="mx-2">—</span>

        {/* R and rest of last name */}
        <span>R</span>
        <motion.div
          className="overflow-hidden"
          variants={textContainerVariants}
          initial="collapsed"
          animate={isHovered ? "expanded" : "collapsed"}
        >
          <motion.div
            className="inline-flex whitespace-nowrap"
            variants={letterVariants}
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
          >
            akottyai
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Logo;