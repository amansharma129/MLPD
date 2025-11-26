import React, { useState, useEffect } from 'react';
import Header from '../../ui/Header';
import Table from '../../ui/Table';
import { BlueBtn, WhiteBtn } from '../../ui/Button';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const jiffData = [
    {
        lastName: 'Jankaitis',
        records: [
            { date: '2025-10-05', course: 'Juvenile Justice Reform', instructor: 'Jankaitis', remarks: 'Completed with distinction. Demonstrated advanced understanding of juvenile justice principles and participated actively in all group discussions and practical exercises.' },
        ],
    },
    {
        lastName: 'Ricigliano',
        records: [
            { date: '2025-09-05', course: 'Juvenile Justice Reform', instructor: 'Ricigliano', remarks: 'Excellent participation. Provided insightful feedback during case studies and showed leadership in collaborative tasks throughout the training.' },
        ],
    },
    {
        lastName: 'Merlock, Jr.',
        records: [
            { date: '2025-11-16', course: 'Juvenile Justice Reform', instructor: 'Merlock, Jr.', remarks: 'Passed final assessment. Consistently demonstrated a high level of professionalism and attention to detail in both written and practical evaluations.' },
        ],
    },
    {
        lastName: 'Gregorio',
        records: [
            { date: '2025-10-05', course: 'Juvenile Justice Reform', instructor: 'Gregorio', remarks: 'Good attendance. Maintained punctuality and contributed positively to team activities and scenario-based learning.' },
        ],
    },
    {
        lastName: 'Herrmann',
        records: [
            { date: '2025-09-17', course: 'High Risk MV Stop (Practical)', instructor: 'Herrmann', remarks: 'Demonstrated leadership. Took initiative during practical drills and provided guidance to peers, ensuring safety protocols were followed.' },
        ],
    },
    {
        lastName: 'Zinger',
        records: [
            { date: '2025-10-10', course: 'Building Search (Practical)', instructor: 'Zinger', remarks: 'Outstanding teamwork. Collaborated effectively with other officers, showing excellent communication and tactical awareness.' },
            { date: '2025-10-05', course: 'High Risk MV Stop (Practical)', instructor: 'Zinger', remarks: 'Quick response. Reacted promptly to simulated emergencies and adapted well to changing scenarios.' },
        ],
    },
    {
        lastName: 'Bell',
        records: [
            { date: '2025-10-10', course: 'Building Search (Practical)', instructor: 'Bell', remarks: 'Very thorough. Paid close attention to detail during building search exercises and ensured all objectives were met.' },
            { date: '2025-10-05', course: 'High Risk MV Stop (Practical)', instructor: 'Bell', remarks: 'Met all objectives. Successfully completed all required tasks and demonstrated strong procedural knowledge.' },
        ],
    },
    {
        lastName: 'DiGirolamo',
        records: [
            { date: '2025-10-1', course: 'Law Enforcement Resiliency Program', instructor: 'DiGirolamo', remarks: 'Engaged in all activities. Showed a proactive attitude towards mental health and resiliency training, encouraging others to participate.' },
            { date: '2025-11-06', course: 'New Jersey Resiliency', instructor: 'DiGirolamo', remarks: 'Positive feedback from peers. Recognized for supportive behavior and willingness to share personal experiences to benefit the group.' },
        ],
    },
    {
        lastName: 'Butchko',
        records: [
            { date: '2025-10-17', course: 'Building Search (Practical)', instructor: 'Butchko', remarks: 'Excellent problem solving. Demonstrated creative solutions to complex scenarios and maintained composure under pressure.' },
            { date: '2025-09-15', course: 'High Risk MV Stop (Practical)', instructor: 'Butchko', remarks: 'Completed with high marks. Achieved top scores in both written and practical assessments, showing mastery of course material.' },
        ],
    },
    {
        lastName: 'Riker',
        records: [
            { date: '2021-01-06', course: 'Building Search (Practical)', instructor: 'Riker', remarks: 'Participated fully. Engaged in every aspect of the training and provided valuable input during debrief sessions.' },
        ],
    },
];

const columns = [
    { key: 'date', label: 'Date', className: 'w-[15%]', render: row => <span>{dayjs(row.date).format('M/D/YYYY')}</span> },
    { key: 'course', label: 'Course', className: 'w-[20%] sm:text-wrap', render: row => <span>{row.course}</span> },
    { key: 'instructor', label: 'Instructor', className: 'w-[15%]', render: row => <span>{row.instructor}</span> },
    { key: 'remarks', label: 'Remarks', className: 'sm:text-wrap w-[50%]', render: row => <span>{row.remarks}</span> },
];

const JIFFReport = () => {
    const [showDateModal, setShowDateModal] = useState(true);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const navigate = useNavigate();

    useEffect(() => {
        setStartDate('');
        setEndDate('');
        setDateRange({ start: '', end: '' });
        setShowDateModal(true);
    }, []);

    const handleDateOk = () => {
        if (startDate && endDate) {
            setDateRange({ start: startDate, end: endDate });
            setShowDateModal(false);
        }
    };

    const handleDateCancel = () => {
        navigate(-1)
    };

    // Filter records by date range
    const getFilteredData = () => {
        if (!dateRange.start || !dateRange.end) return [];
        const start = dayjs(dateRange.start);
        const end = dayjs(dateRange.end);
        return jiffData.map(officer => ({
            lastName: officer.lastName,
            records: officer.records.filter(record => {
                const d = dayjs(record.date);
                return d.isSameOrAfter(start) && d.isSameOrBefore(end);
            }),
        })).filter(officer => officer.records.length > 0);
    };

    const filteredData = getFilteredData();

    return (
        <div className="min-h-screen p-2 sm:p-8 flex flex-col gap-8">
            <Header />
            <h2 className="text-2xl font-bold">JIFF Training Report</h2>
            {/* Date Range Modal */}
            {showDateModal && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#00000080]">
                    <div className="bg-white rounded-xl shadow-lg w-[95%] sm:w-full max-w-sm mx-auto p-8 flex flex-col gap-6">
                        <h2 className="text-xl font-semibold text-gray-800">Select Hire Date Range</h2>
                        <input
                            type="date"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            placeholder="Start Date (Hire Date)"
                            className="border rounded px-3 py-2"
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            placeholder="End Date"
                            className="border rounded px-3 py-2"
                        />
                        <div className="flex gap-4 justify-end">
                            <BlueBtn onClick={handleDateOk}>OK</BlueBtn>
                            <WhiteBtn onClick={handleDateCancel}>Cancel</WhiteBtn>
                        </div>
                    </div>
                </div>
            )}
            {/* Show filtered data after date range is selected */}
            {dateRange.start && dateRange.end && (
                <div className="flex flex-col gap-8">
                    {filteredData.length > 0 ? (
                        filteredData.map(officer => (
                            <div key={officer.lastName}>
                                <h3 className="text-lg font-bold mb-2">{officer.lastName}</h3>
                                <Table
                                    columns={columns}
                                    rows={officer.records}
                                    rowClassName="hover:bg-gray-100"
                                    headerClassName="bg-[#1e3a8a]"
                                    headerTextClassName="text-white font-semibold"
                                />
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-8 text-lg font-semibold">No data found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default JIFFReport;
