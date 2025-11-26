import React, { useState, useEffect } from 'react';
import Header from '../../ui/Header';
import OfficerHeader from '../../ui/OfficerHeader';
import { BlueBtn, WhiteBtn } from '../../ui/Button';
import Photo from '../../../assets/officer-photo.jpg'
import { useNavigate } from 'react-router-dom';

const staticData = [
    {
        id: 'E001',
        name: 'Michael J. Rodriguez',
        rank: 'Detective Sergeant',
        division: 'Criminal Investigation Division',
        status: 'Active',
        photo: Photo,
        badgeId: 'PD-2025-2365',
    },
    {
        id: 'E002',
        name: 'Sarah A. Johnson',
        rank: 'Police Officer',
        division: 'Patrol Division',
        status: 'Inactive',
        photo: Photo,
        badgeId: 'PD-2025-2366',
    },
    {
        id: 'E003',
        name: 'James M. Smith',
        rank: 'Chief',
        division: 'Administration Division',
        status: 'Active',
        photo: Photo,
        badgeId: 'PD-2025-2367',
    }
];

const OfficerPhoto = () => {
    const [selectedOfficer, setSelectedOfficer] = useState(null);
    const [showIdModal, setShowIdModal] = useState(true);
    const [inputId, setInputId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setSelectedOfficer(null);
        setInputId('');
        setShowIdModal(true);
    }, []);

    const handleIdOk = () => {
        const officer = staticData.find((o) => o.id === inputId.trim());
        if (officer) {
            setSelectedOfficer(officer);
            setShowIdModal(false);
        }
    };

    const handleIdCancel = () => {
        navigate(-1);
    };

    const handleHeaderChange = (id) => {
        if (id === null) {
            setInputId('');
            setShowIdModal(true);
        } else {
            const officer = staticData.find((o) => o.id === id);
            if (officer) setSelectedOfficer(officer);
        }
    };

    return (
        <div className="min-h-screen p-2 sm:p-8 flex flex-col gap-8">
            <Header />
            <h2 className="text-2xl font-bold">Officer Photo</h2>
            {/* Employee ID Modal */}
            {showIdModal && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#00000080]">
                    <div className="bg-white rounded-xl shadow-lg w-[95%] sm:w-full max-w-sm mx-auto p-8 flex flex-col gap-6">
                        <h2 className="text-xl font-semibold text-gray-800">Enter Employee ID</h2>
                        <input
                            type="text"
                            value={inputId}
                            onChange={e => setInputId(e.target.value)}
                            placeholder="Employee ID"
                            className="border rounded px-3 py-2"
                        />
                        <div className="flex gap-4 justify-end">
                            <BlueBtn onClick={handleIdOk}>OK</BlueBtn>
                            <WhiteBtn onClick={handleIdCancel}>Cancel</WhiteBtn>
                        </div>
                    </div>
                </div>
            )}
            {/* Show officer details only after ID is entered */}
            {selectedOfficer && (
                <OfficerHeader
                    officer={selectedOfficer}
                    officerList={staticData}
                    onChange={handleHeaderChange}
                />
            )}
        </div>
    );
};

export default OfficerPhoto;