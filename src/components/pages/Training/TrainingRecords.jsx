import React, { useState } from 'react';
import Header from '../../ui/Header';
import Table from '../../ui/Table';
import { BlueBtn, WhiteBtn } from '../../ui/Button';
import { Input, Select } from 'antd';
import AddTrainingRecord from './AddTrainingRecord';
import { FaDownload, FaPlus, FaPen } from "react-icons/fa";
const { Option } = Select;

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

const TrainingRecords = () => {
    const [search, setSearch] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [courseFilter, setCourseFilter] = useState('');
    const [filterActive, setFilterActive] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [editId, setEditId] = useState(null);

    const handleApplyFilter = () => {
        setFilterActive(true);
    };

    const handleClearFilters = () => {
        setSearch('');
        setDateFrom('');
        setDateTo('');
        setCourseFilter('');
        setFilterActive(false);
    };

    const handleAddRecord = () => {
        setModalMode('add');
        setEditId(null);
        setModalVisible(true);
    };

    const handleEditRecord = (row) => {
        setModalMode('edit');
        setEditId(row.employeeId);
        setModalVisible(true);
    };

    const parseDate = str => {
        const months = {
            January: '01', February: '02', March: '03', April: '04',
            May: '05', June: '06', July: '07', August: '08',
            September: '09', October: '10', November: '11', December: '12'
        };
        const parts = str.split(' ');
        if (parts.length === 3 && months[parts[0]]) {
            const yyyy = parts[2];
            const mm = months[parts[0]];
            const dd = parts[1].padStart(2, '0');
            return new Date(`${yyyy}-${mm}-${dd}`);
        }
        return null;
    };

    const officerTrainingData = Object.values(officerTrainingMap).flat();

    const filteredRows = officerTrainingData
        .filter(row => {
            let valid = true;
            if (search) {
                valid = row.lastName.toLowerCase().includes(search.toLowerCase()) ||
                    row.course.toLowerCase().includes(search.toLowerCase());
            }
            if (filterActive && dateFrom) {
                const rowDate = parseDate(row.date);
                valid = valid && rowDate && rowDate >= new Date(dateFrom);
            }
            if (filterActive && dateTo) {
                const rowDate = parseDate(row.date);
                valid = valid && rowDate && rowDate <= new Date(dateTo);
            }
            if (courseFilter) {
                valid = valid && row.course === courseFilter;
            }
            return valid;
        });

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
        { key: 'remarks', label: 'REMARKS', render: row => <span>{row.remarks}</span> },
        {
            key: 'actions',
            label: 'ACTIONS',
            render: row => (
                <BlueBtn
                    className="p-2 rounded-full bg-[#1e3a8a] text-white"
                    onClick={() => handleEditRecord(row)}
                >
                    <FaPen />
                </BlueBtn>
            ),
        },
    ];

    return (
        <div className="min-h-screen p-2 sm:p-8 flex flex-col gap-8">
            <Header />
            <h2 className="text-2xl font-bold">Training Records</h2>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-stretch sm:items-center sm:justify-between">
                    <div className='flex sm:w-auto w-full flex-col items-stretch sm:items-start sm:flex-row gap-4 sm:mb-0 mb-1'>
                        <Input
                            placeholder="Search by Name or Rank"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="min-w-[220px] sm:max-w-[220px] max-w-full rounded-lg border-none"
                        />
                        <input
                            type="date"
                            placeholder="Date From"
                            value={dateFrom}
                            onChange={e => setDateFrom(e.target.value)}
                            className="min-w-[150px] sm:max-w-[180px] max-w-full bg-[#f6f6fa] rounded-lg px-3 py-2 border-none"
                        />
                        <input
                            type="date"
                            placeholder="Date To"
                            value={dateTo}
                            onChange={e => setDateTo(e.target.value)}
                            className="min-w-[150px] sm:max-w-[180px] max-w-full bg-[#f6f6fa] rounded-lg px-3 py-2 border-none"
                        />
                        <Select
                            value={courseFilter || undefined}
                            onChange={value => setCourseFilter(value)}
                            placeholder="Filter by Course"
                            allowClear
                            className="min-w-[150px] sm:max-w-[180px] max-w-full rounded-lg border-none"
                        >
                            <Option value="Radio">Radio</Option>
                            <Option value="Body Camera">Body Camera</Option>
                            <Option value="Tom M. Riddle">Tom M. Riddle</Option>
                        </Select>
                        {(dateFrom || dateTo) ? (
                            !filterActive ? (
                                <BlueBtn onClick={handleApplyFilter}>Apply Filter</BlueBtn>
                            ) : (
                                <BlueBtn onClick={handleClearFilters}>Clear Filter</BlueBtn>
                            )
                        ) : (
                            <BlueBtn onClick={handleApplyFilter}>Apply Filter</BlueBtn>
                        )}
                    </div>
                        <BlueBtn onClick={handleAddRecord}><FaPlus />Add New Training Record</BlueBtn>
                </div>
            </div>
            <Table columns={columns} rows={filteredRows} />
            <div className="flex sm:flex-row flex-col gap-5">
                <WhiteBtn><FaDownload />Export as Excel</WhiteBtn>
                <WhiteBtn><FaDownload />Export as Pdf</WhiteBtn>
            </div>
            <AddTrainingRecord
                isOpen={modalVisible}
                onClose={() => setModalVisible(false)}
                mode={modalMode}
                editId={editId}
            />
        </div>
    );
};

export default TrainingRecords;