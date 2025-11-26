import React from 'react';
import Header from '../../ui/Header';
import Table from '../../ui/Table';
import { WhiteBtn } from '../../ui/Button';
import { FaDownload } from "react-icons/fa";

const columns = [
    { key: 'sno', label: 'S No.', render: (row) => <span>{row.sno}</span> },
    { key: 'name', label: 'Name', render: (row) => <span>{row.name}</span> },
    { key: 'item', label: 'Item', render: (row) => <span>{row.item}</span> },
    { key: 'make', label: 'Make', render: (row) => <span>{row.make}</span> },
    { key: 'model', label: 'Model', render: (row) => <span>{row.model}</span> },
    { key: 'date', label: 'Date', render: (row) => <span>{row.date}</span> },
    { key: 'serialNo', label: 'Serial No.', render: (row) => <span>{row.serialNo}</span> },
    { key: 'remarks', label: 'Remarks', render: (row) => <span>{row.remarks}</span> }
];

const data = [
    {
        sno: 1,
        name: 'Harry J Potter',
        item: 'Radio',
        make: '1959',
        model: '1255',
        date: 'October 10 1685',
        serialNo: '12151',
        remarks: '--',
    },
    {
        sno: 2,
        name: 'Severus Snape',
        item: 'Body Camera',
        make: 'Nokia',
        model: 'OASd5',
        date: 'October 10 1685',
        serialNo: '12151',
        remarks: 'Sarah',
    },
    {
        sno: 3,
        name: 'Tom M. Riddle',
        item: 'Tom M. Riddle',
        make: 'Samsung',
        model: '646',
        date: 'October 10 1685',
        serialNo: '12151',
        remarks: 'Michael',
    },
];

const VestReplacement = () => (
    <div className="min-h-screen p-2 sm:p-8 flex flex-col gap-8">
        <Header />
        <h2 className="text-2xl font-bold">Vest Replacement Report</h2>
        <Table columns={columns} rows={data} rowClassName="hover:bg-gray-100" />
        <div className="flex sm:flex-row flex-col gap-4">
            <WhiteBtn><FaDownload />Export as Excel</WhiteBtn>
            <WhiteBtn><FaDownload />Export as Pdf</WhiteBtn>
        </div>
    </div>
);

export default VestReplacement;