import React from 'react';
import Header from '../../ui/Header';
import Table from '../../ui/Table';

const cjisTrainingData = [
    {
        lastName: 'Adair',
        records: [
            {
                course: 'CJIS Initial Operator Course',
                date: '11/8/2019',
                instructor: 'Devlin',
                remarks: 'Missing persons file and guide, Identity Theft file',
            },
        ],
    },
    {
        lastName: 'Alessi',
        records: [
            {
                course: 'CJIS Operator Course',
                date: '1/31/2024',
                instructor: '669',
                remarks: 'Missing persons file and guide, Identity Theft file',
            },
        ],
    },
    {
        lastName: 'Amaro',
        records: [
            {
                course: 'CJIS Certification',
                date: '7/1/2003',
                instructor: 'Lt. Lehmann',
                remarks: 'Indoctrination, CJIS Access for Inquiries Only - Wanted Persons, Vehicles, DMV and CCH. Security Policy review. Operator Proficiency Attained.',
            },
            {
                course: 'CJIS Recertification',
                date: '11/16/2004',
                instructor: 'Sgt. Howard',
                remarks: 'CJIS Access for Inquiries Only - Wanted Persons, Vehicles, DMV and CCH. Security Policy review. Operator Proficiency Attained.',
            },
            {
                course: 'CJIS Updates',
                date: '6/1/2005',
                instructor: 'Lt. Howard',
                remarks: 'Missing persons file and guide, Identity Theft file',
            },
            {
                course: 'CJIS Recertification',
                date: '4/25/2006',
                instructor: 'Howard/Lehmann',
                remarks: 'CJIS Access for Inquiries Only - Wanted Persons, Vehicles, DMV and CCH. Security Policy review. Operator Proficiency Attained.',
            },
            {
                course: 'CJIS Updates',
                date: '11/21/2006',
                instructor: 'Howard',
                remarks: 'November 2006 CJIS update bulletin: Fingerprints and CCH',
            },
            {
                course: 'CJIS Recertification',
                date: '12/29/2008',
                instructor: 'Baskay',
                remarks: 'CJIS Access for Inquiries Only - Missing Persons, Wanted Persons, Vehicles, DMV and CCH. Security Policy review. Operator Proficiency Attained.',
            },
        ],
    },
];

const columns = [
    { key: 'course', label: 'Course', className: 'w-[20%]', render: row => <span>{row.course}</span> },
    { key: 'date', label: 'Date', className: 'w-[10%]', render: row => <span>{row.date}</span> },
    { key: 'instructor', label: 'Instructor', className: 'w-[15%]', render: row => <span>{row.instructor}</span> },
    { key: 'remarks', label: 'Remarks', className: 'sm:text-wrap w-[50%]', render: row => <span>{row.remarks}</span> },
];

const CJISTrainingReport = () => (
    <div className="min-h-screen p-2 sm:p-8 flex flex-col gap-8">      
        <Header />
        <h2 className="text-2xl font-bold">CJIS Training Report</h2>
        <div className="flex flex-col gap-8">
            {cjisTrainingData.map((officer, idx, arr) => (
                <div key={officer.lastName} className={`${idx !== arr.length - 1 ? ' mb-0' : ''}`}>
                    <h3 className="text-lg font-bold mb-2">{officer.lastName}</h3>
                    <Table
                        columns={columns}mb-8
                        rows={officer.records}
                        rowClassName="hover:bg-gray-100"
                        headerClassName="bg-[#1e3a8a]"
                        headerTextClassName="text-white font-semibold"
                    />
                </div>
            ))}
        </div>
    </div>
);

export default CJISTrainingReport;
