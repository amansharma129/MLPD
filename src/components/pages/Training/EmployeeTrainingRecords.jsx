import React, { useState, useEffect } from 'react';
import Header from '../../ui/Header';
import OfficerHeader from '../../ui/OfficerHeader';
import Table from '../../ui/Table';
import { WhiteBtn, BlueBtn } from '../../ui/Button';
import { FaDownload } from "react-icons/fa";
import Photo from '../../../assets/officer-photo.jpg';
import { useNavigate } from 'react-router-dom';

const officerList = [
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
    },
];

const officerTrainingMap = {
    E003: [
        {
            employeeId: '3',
            date: 'October 8 2025',
            course: 'Tom M. Riddle',
            lastName: 'Smith',
            expirationDate: 'October 8 2026',
            location: 'Air Squadron 1',
            topic: 'Maneuvering',
            instructor: 'James Smith',
            hours: '65',
            remarks: 'Excellent Parti',
        },
    ],
    E001: [
        {
            employeeId: '1',
            date: 'October 10 2025',
            course: 'Radio',
            lastName: 'Joseph',
            expirationDate: 'October 10 2026',
            location: 'Training Centre 1',
            topic: 'Pistol',
            instructor: 'Kite Kennedy',
            hours: '12',
            remarks: '--',
        },
    ],
    E002: [
        {
            employeeId: '2',
            date: 'October 12 2025',
            course: 'Body Camera',
            lastName: 'Clark',
            expirationDate: 'October 12 2026',
            location: 'Medical 1',
            topic: 'Life Support',
            instructor: 'Florence Terz',
            hours: '61',
            remarks: 'Good',
        },
    ],
};

const EmployeeTrainingRecords = () => {
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
        const officer = officerList.find((o) => o.id === inputId.trim());
        if (officer) {
            setSelectedOfficer(officer);
            setShowIdModal(false);
        }
    };

    const handleIdCancel = () => {
        navigate(-1)
    };

    const handleHeaderChange = (id) => {
        if (id === null) {
            setInputId('');
            setShowIdModal(true);
        } else {
            const officer = officerList.find((o) => o.id === id);
            if (officer) setSelectedOfficer(officer);
        }
    };

    const officerTrainingData = selectedOfficer ? (officerTrainingMap[selectedOfficer.id] || []) : [];

    const columns = [
        { key: 'employeeId', label: 'EMPLOYEE ID', render: row => <span>{row.employeeId}</span> },
        { key: 'date', label: 'DATE', render: row => <span>{row.date}</span> },
        { key: 'course', label: 'COURSE', render: row => <span>{row.course}</span> },
        { key: 'lastName', label: 'LAST NAME', render: row => <span>{row.lastName}</span> },
        { key: 'expirationDate', label: 'EXPIRATION DATE', render: row => <span>{row.expirationDate}</span> },
        { key: 'location', label: 'LOCATION', render: row => <span>{row.location}</span> },
        { key: 'topic', label: 'TOPIC', render: row => <span>{row.topic}</span> },
        { key: 'instructor', label: 'INSTRUCTOR', render: row => <span>{row.instructor}</span> },
        { key: 'hours', label: 'HOURS', render: row => <span>{row.hours}</span> },
        { key: 'remarks', label: 'REMARKS', render: row => <span>{row.remarks}</span> }
    ];

    return (
        <div className="min-h-screen p-2 sm:p-8 flex flex-col gap-8">
            <Header />
            <h2 className="text-2xl font-bold">Employee Training Report</h2>
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
            {/* Show officer data only after ID is entered */}
            {selectedOfficer && (
                <>
                    <OfficerHeader
                        officer={selectedOfficer}
                        officerList={officerList}
                        onChange={handleHeaderChange}
                    />
                    <Table columns={columns} rows={officerTrainingData} />
                    <div className="flex sm:flex-row flex-col gap-5">
                        <WhiteBtn><FaDownload />Export as Excel</WhiteBtn>
                        <WhiteBtn><FaDownload />Export as Pdf</WhiteBtn>
                    </div>
                </>
            )}
        </div>
    );
};

export default EmployeeTrainingRecords;