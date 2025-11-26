import React from 'react';
import { useNavigate } from 'react-router-dom';
import MLPDLogo from '../../assets/mlpd_logo.png';
import { LuMoveLeft } from "react-icons/lu";
const Header = ({ title, subtitle }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <header className="flex gap-4 items-start">
            {/* Back Button */}
            <button
                onClick={handleBack}
                className="p-2 rounded-full bg-white shadow-md focus:outline-none"
            >
                <span className="text-xl"><LuMoveLeft /></span>
            </button>

            {/* Logo */}
            <img src={MLPDLogo} alt="Police Logo" className="h-16" />

            {/* Title and Subtitle */}
            <div>
                <h1 className="text-2xl sm:text-4xl font-bold ">Mount Laurel Township Police Department</h1>
                <p className="text-xl text-gray-500">Personnel Database</p>
            </div>
        </header>
    );
};

export default Header;