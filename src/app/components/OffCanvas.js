import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const OffCanvas = ({ 
  isOpen, 
  onClose, 
  title = 'Detalhes', 
  children,
  width = '380px', // Valor padrão em pixels, pode ser alterado
  showClose = true
}) => {
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflowY = 'scroll';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-25"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div
            className="relative bg-gray-100 shadow-xl flex flex-col h-full rounded-l-2xl overflow-hidden"
            style={{ width: width }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          >
            <div className="flex justify-between items-center px-4 py-3 bg-white">
              <div className="flex items-center">
                {title && <h2 className="text-md font-medium">{title}</h2>}
              </div>
              {showClose && (
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
                  aria-label="Fechar"
                >
                  <FiX size={20} />
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OffCanvas;