import React, { useState } from 'react';
import Table from '../../ui/Table';
import Header from '../../ui/Header';
import { WhiteBtn, BlueBtn } from '../../ui/Button';
import { Input, Select } from 'antd';
import { FaEye, FaPencilAlt, FaDownload, FaPlus } from 'react-icons/fa';
import AddOfficerModal from '../../modals/AddOfficerModal';

const staticData = [
    {
        employeeId: '1245',
        firstName: 'James',
        middleName: 'Michale',
        lastName: 'Smith',
        rank: 'Detective Sergeant',
        hireDate: '29-10-1998',
        promotedDate: '29-10-2024',
        status: 'Active',
    },
    {
        employeeId: '1246',
        firstName: 'Sarah',
        middleName: 'Anne',
        lastName: 'Johnson',
        rank: 'Police Officer',
        hireDate: '15-02-1992',
        promotedDate: 'NA',
        status: 'Inactive',
    },
    {
        employeeId: '1247',
        firstName: 'Michael',
        middleName: 'Jennifer',
        lastName: 'Brown',
        rank: 'Detective',
        hireDate: '29-10-1998',
        promotedDate: '25-11-2025',
        status: 'Active',
    },
];

const OfficerName = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [data] = useState(staticData);
    const [status, setStatus] = useState();
    const [rank, setRank] = useState();
    const [search, setSearch] = useState('');
    const [selectedOfficer, setSelectedOfficer] = useState(null);

    const filteredData = data.filter(row => {
        const matchesStatus = status ? row.status === status : true;
        const matchesRank = rank ? row.rank === rank : true;
        const matchesSearch =
            !search ||
            row.firstName.toLowerCase().includes(search.toLowerCase()) ||
            row.lastName.toLowerCase().includes(search.toLowerCase()) ||
            row.employeeId.includes(search);
        return matchesStatus && matchesRank && matchesSearch;
    });

    // Handler for viewing officer
    const handleViewOfficer = (row) => {
        const officer = { ...staticData.find(o => o.employeeId === row.employeeId) };
        // Ensure isEdit is not set for view
        delete officer.isEdit;
        setSelectedOfficer(officer);
        setShowAddModal(true);
    };

    // Handler for editing officer
    const handleEditOfficer = (row) => {
        const officer = { ...staticData.find(o => o.employeeId === row.employeeId), isEdit: true };
        setSelectedOfficer(officer);
        setShowAddModal(true);
    };

    const columns = [
        {
            key: 'employeeId',
            label: 'EMPLOYEE ID',
            render: (row) => <span className="text-[#1e3a8a]">{row.employeeId}</span>,
        },
        {
            key: 'firstName',
            label: 'FIRST NAME',
            render: (row) => <span className="text-[#1e3a8a]">{row.firstName}</span>,
        },
        {
            key: 'middleName',
            label: 'MIDDLE NAME',
            render: (row) => <span className="text-[#1e3a8a]">{row.middleName}</span>,
        },
        {
            key: 'lastName',
            label: 'LAST NAME',
            render: (row) => <span className="text-[#1e3a8a]">{row.lastName}</span>,
        },
        {
            key: 'rank',
            label: 'RANK',
            render: (row) => (
                <span className="bg-[#1e3a8a] text-white px-3 py-1 rounded-full">{row.rank}</span>
            ),
        },
        {
            key: 'hireDate',
            label: 'HIRE DATE',
            render: (row) => <span className="text-[#1e3a8a]">{row.hireDate}</span>,
        },
        {
            key: 'promotedDate',
            label: 'PROMOTED DATE',
            render: (row) => <span className="text-[#1e3a8a]">{row.promotedDate}</span>,
        },
        {
            key: 'actions',
            label: 'ACTIONS',
            render: (row) => (
                <div className="flex gap-2">
                    <button
                        className="text-md text-white bg-[#16A34A] p-2 rounded-full"
                        onClick={() => handleViewOfficer(row)}
                    >
                        <FaEye />
                    </button>
                    <button
                        className="text-md text-white bg-[#1e3a8a] p-2 rounded-full"
                        onClick={() => handleEditOfficer(row)}
                    >
                        <FaPencilAlt />
                    </button>
                </div>
            ),
        },
    ];

    const rankOptions = [
        'Detective Sergeant',
        'Police Officer',
        'Detective',
    ];

    const statusOptions = [
        'Active',
        'Inactive',
    ];

    return (
        <div className="min-h-screen p-2 sm:p-8 flex flex-col gap-8">
            <Header />
            <div className="flex justify-between lg:items-center lg:flex-row flex-wrap flex-col gap-4">
                <h2 className="text-2xl font-bold">Officer Name, Rank and Hire Date</h2>
                <div className="flex items-stretch sm:items-start flex-wrap sm:items-center sm:flex-row flex-col gap-4">
                    <Input.Search
                        placeholder="Search by Name or Id"
                        className="w-full sm:w-64 custom-bg"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        allowClear
                    />
                    <Select
                        placeholder="Filter By Status"
                        className="mb-2 sm:mb-0 w-full sm:w-48 custom-bg"
                        allowClear
                        value={status}
                        onChange={setStatus}
                    >
                        {statusOptions.map(opt => (
                            <Select.Option key={opt} value={opt}>{opt}</Select.Option>
                        ))}
                    </Select>
                    <Select
                        placeholder="Filter By Ranks"
                        className="mb-2 sm:mb-0 w-full sm:w-48 custom-bg"
                        allowClear
                        value={rank}
                        onChange={setRank}
                    >
                        {rankOptions.map(opt => (
                            <Select.Option key={opt} value={opt}>{opt}</Select.Option>
                        ))}
                    </Select>
                    <BlueBtn onClick={() => { setSelectedOfficer(null); setShowAddModal(true); }}>
                        <FaPlus /> Add Officer
                    </BlueBtn>
                </div>
            </div>
            <div className="bg-white rounded-xl">
                <Table
                    columns={columns}
                    rows={filteredData}
                    rowClassName="hover:bg-gray-100"
                />
            </div>
            <div className="flex sm:flex-row flex-col gap-5">
                <WhiteBtn ><FaDownload />Export as Excel</WhiteBtn>
                <WhiteBtn ><FaDownload />Export as Pdf</WhiteBtn>
            </div>
            <AddOfficerModal
                isOpen={showAddModal}
                onClose={() => { setShowAddModal(false); setSelectedOfficer(null); }}
                onAdd={() => { setShowAddModal(false); setSelectedOfficer(null); }}
                officer={selectedOfficer}
                isView={!!selectedOfficer && !selectedOfficer?.isEdit}
                isEdit={!!selectedOfficer?.isEdit}
                onUpdate={() => { setShowAddModal(false); setSelectedOfficer(null); }}
            />
        </div>
    );
};

export default OfficerName;