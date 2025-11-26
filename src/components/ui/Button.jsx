import React from 'react';

export const BlueBtn = ({ children, ...props }) => (
  <button
    className="justify-center bg-[#1e3a8a] text-white px-6 py-2 rounded-xl font-semibold shadow focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:ring-offset-2 flex items-center gap-2"
    {...props}
  >
    {children}
  </button>
);

export const GreenBtn = ({ children, ...props }) => (
  <button
    className="justify-center bg-[#04693A] text-white px-6 py-2 rounded-xl font-semibold shadow focus:outline-none focus:ring-2 focus:ring-[#04693A] focus:ring-offset-2 flex items-center gap-2"
    {...props}
  >
    {children}
  </button>
);

export const RedBtn = ({ children, ...props }) => (
  <button
    className="justify-center bg-[#D92D20] text-white px-6 py-2 rounded-xl font-semibold shadow focus:outline-none focus:ring-2 focus:ring-[#D92D20] focus:ring-offset-2 flex items-center gap-2"
    {...props}
  >
    {children}
  </button>
);

export const Outline = ({ children, disabled, ...props }) => (
  <button
    className={`justify-center border-2 border-[#1e3a8a] text-[#1e3a8a] px-6 py-2 rounded-xl font-semibold shadow focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:ring-offset-2 flex items-center gap-2 ${
      disabled ? 'cursor-not-allowed opacity-50' : ''
    }`}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

export const WhiteBtn = ({ children, ...props }) => (
  <button
    className="justify-center bg-white text-[#1e3a8a] px-6 py-2 rounded-xl font-semibold shadow focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:ring-offset-2 flex items-center gap-2"
    {...props}
  >
    {children}
  </button>
);