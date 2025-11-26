import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../ui/Header';
import Photo from '../../../assets/officer-photo.jpg';
import { BlueBtn, WhiteBtn } from '../../ui/Button';
import OfficerHeader from '../../ui/OfficerHeader';

const staticData = [
    {
        id: 'E001',
        name: 'Michael J. Rodriguez',
        rank: 'Detective Sergeant',
        division: 'Criminal Investigation Division',
        status: 'Active',
        photo: Photo,
        badgeId: 'PD-2025-2365',
        personalInfo: {
            ssn: '9653 6666 2626',
            address: '31, Baker Street, Philadelphia, New Jersey, 23125',
            dob: 'October 12, 1986',
            pob: 'New York',
        },
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
            employerContact: {
                primary: '222 152 2252',
                secondary: '555 555 5555',
            },
        },
        employmentDetails: {
            hourlyRate: '22 $',
            hireDate: 'October 26, 2002',
            promotionDate: 'October 26, 2002',
            endDate: '9653 6666 2626',
        },
        otherDetails: {
            driverLicense: '555 225 6522',
            expirationDate: '555 225 6522',
            primaryDependent: {
                name: 'Cinderella',
                phone: '222 152 2252',
                school: 'White House',
                dob: '12 Oct 2006',
            },
            secondaryDependent: {
                name: 'Cinderella',
                phone: '222 152 2252',
                school: 'White House',
                dob: '12 Oct 2006',
            },
        },
    },
    {
        id: 'E002',
        name: 'Sarah L. Thompson',
        rank: 'Senior Officer',
        division: 'Patrol Division',
        status: 'Active',
        photo: Photo,
        badgeId: 'PD-2025-2366',
        personalInfo: {
            ssn: '8745 1234 5678',
            address: '45, Elm Street, Springfield, Illinois, 62704',
            dob: 'March 5, 1990',
            pob: 'Chicago',
        },
        contactInfo: {
            phone: '555 123 4567',
            pager: '555 765 4321',
            cellPhone: '555 987 6543',
            spouseName: 'John Doe',
            spouseContact: '555 321 6789',
            emergencyContact: {
                name: 'John Doe',
                phone: '555 321 6789',
                address: '123 Main St, Springfield, Illinois',
                altPhone: '555 654 3210',
            },
            employerContact: {
                primary: '555 123 4567',
                secondary: '555 765 4321',
            },
        },
        employmentDetails: {
            hourlyRate: '20 $',
            hireDate: 'June 15, 2015',
            promotionDate: 'August 20, 2018',
            endDate: 'N/A',
        },
        otherDetails: {
            driverLicense: 'D123-4567-8901',
            expirationDate: 'March 5, 2025',
            primaryDependent: {
                name: 'Jane Doe',
                phone: '555 987 6543',
                school: 'Springfield Elementary',
                dob: 'July 10, 2010',
            },
            secondaryDependent: {
                name: 'Jim Doe',
                phone: '555 654 3210',
                school: 'Springfield Middle School',
                dob: 'September 15, 2012',
            },
        },
    }
];

const EmployeeData = () => {
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

    const handleHeaderChange = (value) => {
        if (value === null) {
            setInputId('');
            setShowIdModal(true);
        } else {
            const employee = staticData.find((e) => e.id === value);
            if (employee) {
                setSelectedEmployee(employee);
            }
        }
    };

    return (
        <div className="min-h-screen p-2 sm:p-8 flex flex-col gap-8">
            <Header />
            <h2 className="text-2xl font-bold">Employee Data</h2>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-6">
                        <div>
                            <h3 className="text-lg font-bold mb-4">Personal Information</h3>
                            <div className='flex flex-col gap-3'>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Social Security Number:</span> <span className="font-normal">{selectedEmployee.personalInfo.ssn}</span></p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Address:</span> <span className="font-normal">{selectedEmployee.personalInfo.address}</span></p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Date Of Birth:</span> <span className="font-normal">{selectedEmployee.personalInfo.dob}</span></p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Place Of Birth:</span> <span className="font-normal">{selectedEmployee.personalInfo.pob}</span></p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4">Employment Details</h3>
                            <div className='flex flex-col gap-3'>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Hourly Rate:</span> <span className="font-normal">{selectedEmployee.employmentDetails.hourlyRate}</span></p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Hire Date:</span> <span className="font-normal">{selectedEmployee.employmentDetails.hireDate}</span></p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Promotion Date:</span> <span className="font-normal">{selectedEmployee.employmentDetails.promotionDate}</span></p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">End Date:</span> <span className="font-normal">{selectedEmployee.employmentDetails.endDate}</span></p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4">Contact Information</h3>
                            <div className='flex flex-col gap-3'>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Phone:</span> <span className="font-normal">{selectedEmployee.contactInfo.phone}</span></p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Pager:</span> <span className="font-normal">{selectedEmployee.contactInfo.pager}</span></p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Cell Phone:</span> <span className="font-normal">{selectedEmployee.contactInfo.cellPhone}</span></p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Spouse Name:</span> <span className="font-normal">{selectedEmployee.contactInfo.spouseName}</span></p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Spouse Contact:</span> <span className="font-normal">{selectedEmployee.contactInfo.spouseContact}</span></p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4">Other Details</h3>
                            <div className='flex flex-col gap-3'>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Driver License Number:</span> <span className="font-normal">{selectedEmployee.otherDetails.driverLicense}</span></p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Expiration Date:</span> <span className="font-normal">{selectedEmployee.otherDetails.expirationDate}</span></p>
                                </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4">Primary Emergency Contact</h3>
                            <div className='flex flex-col gap-3'>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Name:</span> <span className="font-normal">{selectedEmployee.contactInfo.emergencyContact.name}</span></p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Phone:</span> <span className="font-normal">{selectedEmployee.contactInfo.emergencyContact.phone}</span></p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Address:</span> <span className="font-normal">{selectedEmployee.contactInfo.emergencyContact.address}</span></p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Alt Phone:</span> <span className="font-normal">{selectedEmployee.contactInfo.emergencyContact.altPhone}</span></p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4">Primary Dependent</h3>
                            <div className='flex flex-col gap-3'>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Name:</span> <span className="font-normal">{selectedEmployee.otherDetails.primaryDependent.name}</span></p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Phone:</span> <span className="font-normal">{selectedEmployee.otherDetails.primaryDependent.phone}</span></p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">School:</span> <span className="font-normal">{selectedEmployee.otherDetails.primaryDependent.school}</span></p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Date of Birth:</span> <span className="font-normal">{selectedEmployee.otherDetails.primaryDependent.dob}</span></p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4">Employer Contact</h3>
                            <div className='flex flex-col gap-3'>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Primary:</span> <span className="font-normal">{selectedEmployee.contactInfo.employerContact.primary}</span></p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Secondary:</span> <span className="font-normal">{selectedEmployee.contactInfo.employerContact.secondary}</span></p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4">Secondary Dependent</h3>
                            <div className='flex flex-col gap-3'>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Name:</span> <span className="font-normal">{selectedEmployee.otherDetails.secondaryDependent.name}</span></p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Phone:</span> <span className="font-normal">{selectedEmployee.otherDetails.secondaryDependent.phone}</span></p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">School:</span> <span className="font-normal">{selectedEmployee.otherDetails.secondaryDependent.school}</span></p>
                                <p className='flex gap-4 text-[#1F1F1F]'><span className="font-semibold">Date of Birth:</span> <span className="font-normal">{selectedEmployee.otherDetails.secondaryDependent.dob}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeData;
