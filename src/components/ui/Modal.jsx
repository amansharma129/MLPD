import React, { useEffect, useState } from 'react';
import { RiCloseLargeLine } from "react-icons/ri";
const Modal = ({ isOpen, onClose, title, children, steps, actions }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsClosing(false);
    } else if (shouldRender) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsClosing(false);
      }, 300); 
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div className='fixed inset-0 z-50 flex justify-center items-center bg-[#00000080] backdrop-blur-sm'>
      <div
        className={`hide-scrollbar bg-white rounded-xl shadow-lg w-full max-w-[95%] sm:max-w-4xl mx-auto max-h-[90vh] overflow-y-auto relative ${isClosing ? 'animate-modal-pop-out' : 'animate-modal-pop'}`}
      >
        {/* Modal Header */}
        <div className='flex justify-between items-center p-5 border-b'>
          <h2 className='text-xl font-semibold text-gray-800'>{title}</h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 cursor-pointer '
          >
            <RiCloseLargeLine className='text-lg' />
          </button>
        </div>
        {steps && (
          <div className="flex justify-center gap-2 mt-4 mb-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-white ${step.active ? 'bg-blue-900' : 'bg-gray-300'
                  }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        )}
        {/* Modal Body */}
        <div className='p-6'>{children}</div>
        {actions && (
          <div className="flex justify-end mt-4 gap-2 px-6 pb-6">
            {actions.map((action, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-lg font-semibold shadow focus:outline-none ${action.className}`}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;