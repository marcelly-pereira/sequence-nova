import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Componente para um único dígito que vira
const FlipDigit = ({ value, label }) => {
  const [prevValue, setPrevValue] = useState(value);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (value !== prevValue) {
      // Determina a direção da animação (para cima ou para baixo)
      setDirection(1);
      setPrevValue(value);
    }
  }, [value, prevValue]);

  const variants = {
    enter: {
      opacity: 0,
      rotateX: -90,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      transformOrigin: 'bottom center'
    },
    center: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      rotateX: 90,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      transformOrigin: 'top center',
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  // Formata o valor para sempre ter dois dígitos
  const formattedValue = value.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center">
      <div className="relative bg-[#333381] rounded-md text-white p-1 w-8 h-8 flex justify-center items-center overflow-hidden shadow-lg" 
           style={{ perspective: "600px" }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={formattedValue}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full flex justify-center items-center text-sm font-bold"
          >
            {formattedValue}
          </motion.div>
        </AnimatePresence>
        <div className="absolute left-0 right-0 h-[1px] bg-indigo-800 opacity-30"></div>
      </div>
      <span className="text-xs text-gray-600 mt-1">{label}</span>
    </div>
  );
};

const FlipClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return (
    <div className="inline-flex gap-1 items-center">
      <FlipDigit value={hours} label="" />
      <span className="text-[#333381] text-xl font-bold mb-4">:</span>
      <FlipDigit value={minutes} label="" />
      <span className="text-[#333381] text-xl font-bold mb-4">:</span>
      <FlipDigit value={seconds} label="" />
    </div>
  );
};

export default FlipClock;