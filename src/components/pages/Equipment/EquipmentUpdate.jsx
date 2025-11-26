import React, { useState, useEffect } from 'react';
import Header from '../../ui/Header';
import Table from '../../ui/Table';
import OfficerHeader from '../../ui/OfficerHeader'; 
import Photo from '../../../assets/officer-photo.jpg';
import { FaPencilAlt, FaPlus, FaDownload } from "react-icons/fa";
import { BlueBtn, WhiteBtn } from '../../ui/Button';
import AddEquipmentModal from '../../modals/AddEquipment';
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
                dateReturned: 'November 15 1685',
                conditionReturned: 'Good',
                make: 'Motorola',
                model: 'XTS5000',
                serialNo: '22334',
                remarks: '-',
            },
        ],
    },
];

const EquipmentUpdate = () => {
    const [selectedOfficer, setSelectedOfficer] = useState(null);
    const [showIdModal, setShowIdModal] = useState(true);
    const [inputId, setInputId] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
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

    const handleEditEquipment = (equipment) => {
        setSelectedEquipment(equipment);
        setIsEdit(true);
        setIsModalOpen(true);
    };

    const handleAddEquipment = () => {
        setSelectedEquipment(null);
        setIsEdit(false);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedEquipment(null);
    };

    const handleUpdateEquipment = (updatedEquipment) => {
        const updatedEquipmentList = selectedOfficer.equipment.map((eq) =>
            eq.id === updatedEquipment.id ? updatedEquipment : eq
        );
        setSelectedOfficer((prev) => ({ ...prev, equipment: updatedEquipmentList }));
        handleModalClose();
    };

    const handleAddNewEquipment = (newEquipment) => {
        setSelectedOfficer((prev) => ({
            ...prev,
            equipment: [...prev.equipment, newEquipment],
        }));
        handleModalClose();
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
        { key: 'remarks', label: 'Remarks', render: (equipment) => <span>{equipment.remarks}</span> },
        {
            key: 'actions',
            label: 'Actions',
            render: (equipment) => (
                <button
                    className="text-md text-white bg-[#1e3a8a] p-2 rounded-full"
                    onClick={() => handleEditEquipment(equipment)}
                >
                    <FaPencilAlt />
                </button>
            ),
        },
    ];

    return (
        <div className="min-h-screen p-2 sm:p-8 flex flex-col gap-8">
            <Header />
            <h2 className="text-2xl font-bold">Equipment Update</h2>
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
                        onChange={id => {
                            if (id === null) {
                                setInputId('');
                                setShowIdModal(true);
                            } else {
                                const officer = staticData.find((o) => o.id === id);
                                if (officer) setSelectedOfficer(officer);
                            }
                        }}
                    />
                    <div className='flex lg2:justify-end justify-start'>
                        <BlueBtn onClick={handleAddEquipment}><FaPlus />Add New Equipment</BlueBtn>
                    </div>
                    <Table columns={columns} rows={selectedOfficer.equipment} rowClassName="hover:bg-gray-100" />
                    <div className="flex sm:flex-row flex-col gap-4">
                        <WhiteBtn><FaDownload />Export as Excel</WhiteBtn>
                        <WhiteBtn><FaDownload />Export as PDF</WhiteBtn>
                    </div>
                    <AddEquipmentModal
                        isOpen={isModalOpen}
                        onClose={handleModalClose}
                        onAdd={handleAddNewEquipment}
                        onUpdate={handleUpdateEquipment}
                        equipment={selectedEquipment}
                        isEdit={isEdit}
                    />
                </>
            )}
        </div>
    );
};

export default EquipmentUpdate;