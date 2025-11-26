import React, { useState, useEffect } from 'react';
import Header from '../../ui/Header';
import Photo from '../../../assets/officer-photo.jpg';
import { BlueBtn, WhiteBtn } from '../../ui/Button';
import OfficerHeader from '../../ui/OfficerHeader';
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
        contactInfo: {
            phone: '555 225 6522',
            pager: '555 225 6522',
            cellPhone: '555 225 6522',
            spouseName: 'Cinderella',
            spouseContact: '222 152 2252',
            emergencyContact: {
                name: 'Cinderella',
                phone: '222 152 2252',
                address: 'White House',
                altPhone: 'White House',
            },
        },
        medicalInfo: {
            allergies: 'Peanuts',
            bloodType: 'A+',
            hepatitis: [
                { type: 'Hep B 1', date: '28 Oct 2025' },
                { type: 'Hep B 1', date: '28 Oct 2025' },
                { type: 'Hep B 1', date: '28 Oct 2025' },
                { type: 'Declined', date: 'Cinderella' },
            ],
            medicalNotes: 'Cinderella',
            currentMedicalConditions: '222 152 2252',
            correctionField: 'White House',
        },
    },
    {
        id: 'E002',
        name: 'Sarah A. Johnson',
        rank: 'Police Officer',
        division: 'Patrol Division',
        status: 'Inactive',
        photo: Photo,
        badgeId: 'PD-2025-2366',
        contactInfo: {
            phone: '555 123 4567',
            pager: '555 765 4321',
            cellPhone: '555 987 6543',
            spouseName: 'John Doe',
            spouseContact: '555 321 6789',
            emergencyContact: {
                name: 'John Doe',
                phone: '555 321 6789',
                address: '123 Main St',
                altPhone: '555 654 3210',
            },
        },
        medicalInfo: {
            allergies: 'None',
            bloodType: 'B-',
            hepatitis: [
                { type: 'Hep A 1', date: '15 Jan 2024' },
                { type: 'Declined', date: 'John Doe' },
            ],
            medicalNotes: 'N/A',
            currentMedicalConditions: 'N/A',
            correctionField: 'N/A',
        },
    }
];

const EmployeeMedicalContact = () => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showIdModal, setShowIdModal] = useState(true);
    const [inputId, setInputId] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        setSelectedEmployee(null);
        setInputId('');
        setShowIdModal(true);
    }, []);

    const handleIdOk = () => {
        const employee = staticData.find((e) => e.id === inputId.trim());
        if (employee) {
            setSelectedEmployee(employee);
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
            const employee = staticData.find((e) => e.id === id);
            if (employee) setSelectedEmployee(employee);
        }
    };

    return (
        <div className="min-h-screen p-2 sm:p-8 flex flex-col gap-8">
            <Header />
            <h2 className="text-2xl font-bold">Employee Medical Emergency Contact Report</h2>
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
            {/* Show employee data only after ID is entered */}
            {selectedEmployee && (
                <div className="flex flex-col gap-8">
                    <OfficerHeader
                        officer={selectedEmployee}
                        officerList={staticData}
                        onChange={handleHeaderChange}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-6 ">
                        {/* Contact Information */}
                        <div>
                            <h3 className="text-lg font-bold mb-4">Contact Information</h3>
                            <div className='flex flex-col gap-3'>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Phone</span> {selectedEmployee.contactInfo.phone}</p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Pager</span> {selectedEmployee.contactInfo.pager}</p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Cell Phone</span> {selectedEmployee.contactInfo.cellPhone}</p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Spouse Name</span> {selectedEmployee.contactInfo.spouseName}</p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Spouse Contact</span> {selectedEmployee.contactInfo.spouseContact}</p>
                                <div className="mt-4">
                                    <h4 className="font-semibold text-base mb-4">Primary Emergency Contact</h4>
                                    <div className='flex flex-col gap-3'>
                                        <span className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Name</span> {selectedEmployee.contactInfo.emergencyContact.name}</span>
                                        <span className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Phone</span> {selectedEmployee.contactInfo.emergencyContact.phone}</span>
                                        <span className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Address</span> {selectedEmployee.contactInfo.emergencyContact.address}</span>
                                        <span className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Alt Phone</span> {selectedEmployee.contactInfo.emergencyContact.altPhone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Medical Information */}
                        <div>
                            <h3 className="text-lg font-bold mb-4">Medical Information</h3>
                            <div className='flex flex-col gap-3'>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Allergies</span> {selectedEmployee.medicalInfo.allergies}</p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Blood Type</span> {selectedEmployee.medicalInfo.bloodType}</p>
                                <div className="mt-4">
                                    <h4 className="font-semibold text-base mb-4">Hepatitis</h4>
                                    <div className="flex flex-col">
                                        {selectedEmployee.medicalInfo.hepatitis.map((h, idx) => (
                                            <span key={idx}>
                                                {h.type} &nbsp; {h.date}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Medical Notes</span> {selectedEmployee.medicalInfo.medicalNotes}</p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Current Medical Conditions</span> {selectedEmployee.medicalInfo.currentMedicalConditions}</p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Correction Field</span> {selectedEmployee.medicalInfo.correctionField}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeMedicalContact;
