import React, { useState } from 'react';
import Header from '../../ui/Header';
import { useNavigate } from 'react-router-dom';
import {BlueBtn}  from '../../ui/Button';

const TOTAL_PERSONNEL = 8;

const DrugScreening = () => {
    const [personnelCount, setPersonnelCount] = useState(TOTAL_PERSONNEL);
    const [customCount, setCustomCount] = useState(TOTAL_PERSONNEL);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen p-2 sm:p-8 flex flex-col gap-8">
            <Header />
            <h2 className="text-2xl font-bold">Drug Screening</h2>
            <div className="flex flex-col sm:flex-row gap-8">
                <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col md:w-1/2 lg:w-1/4">
                    <div className="text-xl font-semibold mb-2">All Employee Sampling</div>
                    <div className="text-gray-500 mb-6">{personnelCount} Personnel</div>
                    <BlueBtn
                        onClick={() => {
                            navigate('/mvr-random-pick');
                        }}
                    >
                        Select All
                    </BlueBtn>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col md:w-1/2 lg:w-1/4">
                    <div className="text-xl font-semibold mb-2">Custom Selection</div>
                    <div className="w-full flex flex-col mb-6">
                        <label className="text-gray-500 mb-2" htmlFor="custom-slider">
                            Number of Personnel *
                        </label>
                        <input
                            id="custom-slider"
                            type="range"
                            min={1}
                            max={TOTAL_PERSONNEL}
                            value={customCount}
                            onChange={e => setCustomCount(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="text-lg mt-2">{customCount}</div>
                    </div>
                    <BlueBtn
                        onClick={() => setPersonnelCount(customCount)}
                    >
                        Select
                    </BlueBtn>
                </div>
            </div>
        </div>
    );
};

export default DrugScreening;
