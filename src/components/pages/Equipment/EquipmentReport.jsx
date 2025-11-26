import React, { useState, useEffect } from 'react';
import Header from '../../ui/Header';
import Table from '../../ui/Table';
import Photo from '../../../assets/officer-photo.jpg';
import { FaDownload } from "react-icons/fa";
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
        equipment: [
            {
                id: 'EQ1',
                quantity: 1,
                item: 'Radio',
                dateIssued: 'October 10 1685',
                condition: 'Good',
                dateReturned: 'October 10 1685',
                conditionReturned: 'Broken',
                make: '1959',
                model: '1255',
                serialNo: '12151',
                remarks: '-',
            },
            {
                id: 'EQ2',
                quantity: 2,
                item: 'Body Camera',
                dateIssued: 'October 10 1685',
                condition: 'Fine',
                dateReturned: 'October 10 1685',
                conditionReturned: 'Bad',
                make: 'Nokia',
                model: 'OASd5',
                serialNo: '12152',
                remarks: 'Sarah',
            },
            {
                id: 'EQ3',
                quantity: 3,
                item: 'Tom M. Riddle',
                dateIssued: 'October 10 1685',
                condition: 'New',
                dateReturned: 'October 10 1685',
                conditionReturned: 'Fine',
                make: 'Samsung',
                model: '646',
                serialNo: '12153',
                remarks: 'Michael',
            },
        ],
        officerSignature: 'michael-signature',
        supervisorSignature: 'supervisor-signature',
        officerSignatureDate: 'October 10 1685',
        supervisorSignatureDate: 'October 10 1685',
    },
    {
        id: 'E002',
        name: 'Sarah A. Johnson',
        rank: 'Police Officer',
        division: 'Patrol Division',
        status: 'Inactive',
        photo: Photo,
        badgeId: 'PD-2025-2366',
        equipment: [
            {
                id: 'EQ1',
                quantity: 1,
                item: 'Radio',
                dateIssued: 'November 12 1685',
                condition: 'Good',
                dateReturned: 'November 20 1685',
                conditionReturned: 'Fair',
                make: 'Motorola',
                model: 'XTR-1000',
                serialNo: '22334',
                remarks: '-',
            },
            {
                id: 'EQ2',
                quantity: 2,
                item: 'Body Camera',
                dateIssued: 'November 12 1685',
                condition: 'Good',
                dateReturned: 'November 20 1685',
                conditionReturned: 'Good',
                make: 'GoPro',
                model: 'HERO9',
                serialNo: '22335',
                remarks: '-',
            },
        ],
        officerSignature: 'sarah-signature',
        supervisorSignature: 'supervisor-signature',
        officerSignatureDate: 'November 20 1685',
        supervisorSignatureDate: 'November 20 1685',
    }
];

const EquipmentReport = () => {
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

    const columns = [
        { key: 'quantity', label: 'Quantity', render: (equipment) => <span>{equipment.quantity}</span> },
        { key: 'item', label: 'Item', render: (equipment) => <span>{equipment.item}</span> },
        { key: 'dateIssued', label: 'Date Issued', render: (equipment) => <span>{equipment.dateIssued}</span> },
        { key: 'condition', label: 'Condition', render: (equipment) => <span>{equipment.condition}</span> },
        { key: 'dateReturned', label: 'Date Returned', render: (equipment) => <span>{equipment.dateReturned}</span> },
        { key: 'conditionReturned', label: 'Condition Returned', render: (equipment) => <span>{equipment.conditionReturned}</span> },
        { key: 'make', label: 'Make', render: (equipment) => <span>{equipment.make}</span> },
        { key: 'model', label: 'Model', render: (equipment) => <span>{equipment.model}</span> },
        { key: 'serialNo', label: 'Serial No.', render: (equipment) => <span>{equipment.serialNo}</span> },
        { key: 'remarks', label: 'Remarks', render: (equipment) => <span>{equipment.remarks}</span> }
    ];

    return (
        <div className="min-h-screen p-2 sm:p-8 flex flex-col gap-8">
            <Header />
            <h2 className="text-2xl font-bold">Officer Equipment Report</h2>
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
                        officerList={staticData}
                        onChange={handleHeaderChange}
                    />
                    <Table columns={columns} rows={selectedOfficer.equipment} rowClassName="hover:bg-gray-100" />
                    <div className="bg-white p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Officer Signature</label>
                            <textarea
                                className="w-full bg-gray-100 rounded-md p-3 mb-2"
                                placeholder="Signature"
                                disabled
                                rows={1}
                                style={{ resize: 'none' }}
                                value={selectedOfficer.officerSignature || ''}
                            />
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                            <input
                                type="date"
                                className="w-full bg-gray-100 rounded-md p-3"
                                placeholder="Select Date"
                                disabled
                                value={
                                    selectedOfficer.officerSignatureDate
                                        ? (() => {
                                            const d = new Date(selectedOfficer.officerSignatureDate);
                                            if (!isNaN(d)) {
                                                return d.toISOString().slice(0, 10);
                                            }
                                            return '';
                                        })()
                                        : ''
                                }
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Supervisor Signature</label>
                            <textarea
                                className="w-full bg-gray-100 rounded-md p-3 mb-2"
                                placeholder="Signature"
                                disabled
                                rows={1}
                                style={{ resize: 'none' }}
                                value={selectedOfficer.supervisorSignature || ''}
                            />
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                            <input
                                type="date"
                                className="w-full bg-gray-100 rounded-md p-3"
                                placeholder="Select Date"
                                disabled
                                value={
                                    selectedOfficer.supervisorSignatureDate
                                        ? (() => {
                                            const d = new Date(selectedOfficer.supervisorSignatureDate);
                                            if (!isNaN(d)) {
                                                return d.toISOString().slice(0, 10);
                                            }
                                            return '';
                                        })()
                                        : ''
                                }
                            />
                        </div>
                    </div>
                    <div className="flex sm:flex-row flex-col gap-4">
                        <WhiteBtn><FaDownload />Export as Excel</WhiteBtn>
                        <WhiteBtn><FaDownload />Export as PDF</WhiteBtn>
                    </div>
                </>
            )}
        </div>
    );
};

export default EquipmentReport;
