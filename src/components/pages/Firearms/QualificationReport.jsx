import React, { useState, useEffect } from 'react';
import Table from '../../ui/Table';
import Header from '../../ui/Header';
import { WhiteBtn, BlueBtn } from '../../ui/Button';
import { FaDownload } from "react-icons/fa";
import { RiCheckboxCircleFill, RiCloseCircleFill } from "react-icons/ri";
import photo from '../../../assets/officer-photo.jpg'
import { useNavigate } from 'react-router-dom';

const rosterData = {
    Lieutenant: [
        {
            officerId: 'E001',
            name: 'Michael J. Rodriguez',
            img: photo,
            records: [
                {
                    date: 'October 10 2025',
                    range: 'Indoor Range A',
                    make: 'Glock',
                    model: '1255',
                    serialNo: 'GLK-526',
                    fats: 'Yes',
                    hqci: 25,
                    hnqc: 65,
                    slugDay: 25,
                    slugNight: 85,
                },
                {
                    date: 'November 5 2025',
                    range: 'Outdoor Range B',
                    make: 'Glock',
                    model: '1255',
                    serialNo: 'GLK-527',
                    fats: 'No',
                    hqci: 28,
                    hnqc: 67,
                    slugDay: 26,
                    slugNight: 82,
                }
            ],
        },
        {
            officerId: 'E002',
            name: 'Sarah A. Johnson',
            img: photo,
            records: [
                {
                    date: 'November 12 2025',
                    range: 'Outdoor Range B',
                    make: 'Sig Sauer',
                    model: 'P320',
                    serialNo: 'SIG-320',
                    fats: 'No',
                    hqci: 30,
                    hnqc: 70,
                    slugDay: 28,
                    slugNight: 80,
                },
            ],
        },
    ],
    Sergeant: [
        {
            officerId: 'E003',
            name: 'James Smith',
            img: photo,
            records: [
                {
                    date: 'September 15 2025',
                    range: 'Indoor Range C',
                    make: 'Beretta',
                    model: 'M9',
                    serialNo: 'BER-009',
                    fats: 'Yes',
                    hqci: 22,
                    hnqc: 60,
                    slugDay: 20,
                    slugNight: 75,
                },
            ],
        },
        {
            officerId: 'E004',
            name: 'Jennifer Brown',
            img: photo,
            records: [
                {
                    date: 'August 20 2025',
                    range: 'Outdoor Range D',
                    make: 'Colt',
                    model: 'Python',
                    serialNo: 'COL-357',
                    fats: 'No',
                    hqci: 27,
                    hnqc: 68,
                    slugDay: 23,
                    slugNight: 78,
                },
            ],
        },
    ],
    Officer: [
        {
            officerId: 'E005',
            name: 'Anne Lee',
            img: photo,
            records: [
                {
                    date: 'July 10 2025',
                    range: 'Indoor Range E',
                    make: 'Smith & Wesson',
                    model: 'SW9VE',
                    serialNo: 'SW-900',
                    fats: 'Yes',
                    hqci: 20,
                    hnqc: 55,
                    slugDay: 18,
                    slugNight: 70,
                },
            ],
        },
        {
            officerId: 'E006',
            name: 'Robert Miller',
            img: photo,
            records: [
                {
                    date: 'June 5 2025',
                    range: 'Outdoor Range F',
                    make: 'Ruger',
                    model: 'SR9',
                    serialNo: 'RUG-009',
                    fats: 'No',
                    hqci: 24,
                    hnqc: 62,
                    slugDay: 21,
                    slugNight: 73,
                },
            ],
        },
    ],
};

const columns = [
    
    {
        key: 'date',
        label: 'Date',
        className: 'w-60',
        render: (row) => <span className="text-[#1e3a8a]">{row.date}</span>,
    },
    {
        key: 'range',
        label: 'Range',
        className: 'w-60',
        render: (row) => <span className="text-[#1e3a8a]">{row.range}</span>,
    },
    {
        key: 'make',
        label: 'Make',
        className: 'w-40',
        render: (row) => <span className="text-[#1e3a8a]">{row.make}</span>,
    },
    {
        key: 'model',
        label: 'Model',
        className: 'w-40',
        render: (row) => <span className="text-[#1e3a8a]">{row.model}</span>,
    },
    {
        key: 'serialNo',
        label: 'Serial No.',
        className: 'w-40',
        render: (row) => <span className="text-[#1e3a8a]">{row.serialNo}</span>,
    },
    {
        key: 'fats',
        label: 'FATS',
        className: 'w-40',
        render: (row) =>
            row.fats === 'Yes'
                ? <span className="text-green-700 text-lg" title="Yes"><RiCheckboxCircleFill /></span>
                : <span className="text-red-600 text-lg" title="No"><RiCloseCircleFill /></span>,
    },
    {
        key: 'hqci',
        label: 'HQCI',
        render: (row) => <span className="text-[#25B06B]">{row.hqci}</span>,
    },
    {
        key: 'hnqc',
        label: 'HNQC',
        render: (row) => <span className="text-[#25B06L]">{row.hnqc}</span>,
    },
    {
        key: 'slugDay',
        label: 'Slug Day',
        render: (row) => <span className="text-[#F5A623]">{row.slugDay}</span>,
    },
    {
        key: 'slugNight',
        label: 'Slug Night',
        render: (row) => <span className="text-[#F5A623]">{row.slugNight}</span>,
    },
];


const QualificationReport = () => {
    const navigate = useNavigate();

    // Modal state for employee ID input
    const [showIdModal, setShowIdModal] = useState(true);
    const [inputId, setInputId] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    useEffect(() => {
        setEmployeeId('');
        setInputId('');
        setShowIdModal(true);
        localStorage.removeItem('qualificationEmployeeId');
    }, []);

    const handleIdOk = () => {
        if (inputId.trim()) {
            setEmployeeId(inputId.trim());
            setShowIdModal(false);
        }
    };

    const handleIdCancel = () => {
        navigate('/firearms-qualification')
    };

    const getFilteredData = () => {
        if (!employeeId) return {};
        const filtered = {};
        Object.entries(rosterData).forEach(([rank, officers]) => {
            filtered[rank] = officers
                .map(officer => {
                    if (employeeId && officer.officerId !== employeeId) return null;
                    return officer.records.length > 0
                        ? { ...officer, records: officer.records }
                        : null;
                })
                .filter(Boolean);
        });
        return filtered;
    };

    const filteredData = getFilteredData();

    return (
        <div className="min-h-screen p-2 sm:p-8 flex flex-col gap-8">
            <Header />
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
            <div>
                <h2 className="text-2xl font-bold">Officer Handgun and Shotgun Qualification Report</h2>
            </div>
            <div className='flex flex-col'>
                {employeeId && (
                    Object.entries(filteredData)
                        .filter(([_, officers]) => officers.length > 0).length > 0
                        ? <>
                            {Object.entries(filteredData)
                                .filter(([_, officers]) => officers.length > 0)
                                .map(([rank, officers]) => (
                                    <div key={rank} className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg mb-8">
                                        <div className="flex items-center gap-4 px-4 py-2 rounded-t-lg">
                                            <span className="text-lg font-semibold text-white">{rank}</span>
                                            <span className="bg-white text-[#1e3a8a] rounded-full px-3 py-1 font-bold">{officers.length}</span>
                                        </div>
                                        <div className="bg-white rounded-b-lg p-4">
                                            {officers.map(officer => (
                                                <div key={officer.officerId}>
                                                    <div className="font-semibold text-[#1e3a8a] mb-2 flex items-center gap-2">
                                                        <img src={officer.img} alt={officer.name} className="w-8 h-8 rounded-full" />{officer.name}
                                                    </div>
                                                    <Table
                                                        columns={columns}
                                                        rows={officer.records.map(record => ({
                                                            ...record,
                                                            officerId: officer.officerId,
                                                            name: officer.name,
                                                        }))}
                                                        headerClassName="bg-none border-b"
                                                        headerTextClassName="text-[#666666] font-semibold"
                                                        rowClassName="hover:bg-gray-100"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            <div className='flex sm:flex-row flex-col gap-5'>
                                <WhiteBtn><FaDownload />Export as Excel</WhiteBtn>
                                <WhiteBtn><FaDownload />Export as Pdf</WhiteBtn>
                            </div>
                        </>
                        : <div className="text-center text-gray-500 py-8 text-lg font-semibold">No data found</div>
                )}
            </div>
        </div>
    );
};

export default QualificationReport;
