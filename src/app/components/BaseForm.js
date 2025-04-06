import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BaseForm = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  primaryColor = '#0052cc',
  icon,
  actions,
  submitButtonText = 'Salvar',
  cancelButtonText = 'Cancelar',
  isValid = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const renderActions = () => {
    if (actions) return actions;

    return (
      <>
        <motion.button
          type="button"
          onClick={onClose}
          className="bg-transparent hover:bg-white/10 transition-colors text-gray-700 font-semibold w-full py-2 px-4 rounded"
        >
          {cancelButtonText}
        </motion.button>
        <motion.button
          type="submit"
          disabled={!isValid}
          className={`px-4 py-2 bg-[#1526ff] rounded font-semibold text-white w-full flex items-center justify-center ${
            isValid
              ? 'hover:opacity-90 transition-opacity cursor-pointer'
              : 'opacity-50 cursor-not-allowed'
          }`}
          style={{ backgroundColor: isValid ? primaryColor : undefined }}
        >
          {submitButtonText}
        </motion.button>
      </>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="bg-slate-900/20 backdrop-blur fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer p-8"
        >
          <motion.div
            className="bg-white rounded-lg w-full max-w-2xl shadow-xl relative z-10 cursor-default overflow-hidden"
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 flex items-center gap-4 relative z-10">
              {icon && <span style={{ color: primaryColor }}>{icon}</span>}
              <h2 className="text-lg font-medium">{title}</h2>
              <motion.button
                onClick={onClose}
                className="ml-auto text-gray-400 hover:text-gray-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </motion.button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="px-6 pb-6 space-y-4 relative z-10">
                {children}
              </div>

              <motion.div
                className="p-4 flex justify-end space-x-2 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {renderActions()}
              </motion.div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BaseForm;

// eslint-disable-next-line no-lone-blocks
{
  /* 
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BaseForm = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  primaryColor = '#0052cc',
  icon,
  actions,
  submitButtonText = 'Salvar',
  cancelButtonText = 'Cancelar',
  isValid = true
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const renderActions = () => {
    if (actions) return actions;
    
    return (
      <>
        <motion.button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {cancelButtonText}
        </motion.button>
        <motion.button
          type="submit"
          disabled={!isValid}
          className={`px-4 py-2 rounded-md text-sm font-medium text-white flex items-center ${
            isValid 
              ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' 
              : 'bg-blue-300 cursor-not-allowed opacity-50'
          }`}
          style={{ backgroundColor: isValid ? primaryColor : undefined }}
          whileHover={isValid ? { scale: 1.05 } : {}}
          whileTap={isValid ? { scale: 0.95 } : {}}
        >
          {submitButtonText}
        </motion.button>
      </>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div 
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          
          <motion.div 
            className="bg-white rounded-lg w-full max-w-md shadow-xl relative z-10"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          >
            <div className="p-6 flex items-center gap-4">
              {icon && <span className="text-primary">{icon}</span>}
              <h2 className="text-lg font-medium">{title}</h2>
              <motion.button 
                onClick={onClose}
                className="ml-auto text-gray-400 hover:text-gray-600"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </motion.button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="px-6 pb-4 space-y-4">
                {children}
              </div>
              
              <motion.div 
                className="border-gray-200 p-4 flex justify-end space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {renderActions()}
              </motion.div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BaseForm;
*/
}
