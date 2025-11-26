import React, { useState, useEffect } from 'react';
import Table from '../../ui/Table';
import Header from '../../ui/Header';
import { WhiteBtn, BlueBtn } from '../../ui/Button';
import { FaDownload } from "react-icons/fa";
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const rosterData = {
  Lieutenant: [
    {
      employeeId: '1245',
      Range: 'Other',
      firstName: 'James',
      middleName: 'Michale',
      lastName: 'Smith',
      make: 'TASER',  
      model: 'X26P',
      serialNumber: 'SN123456',
      date: '2 October 2025',
    },
    {
      employeeId: '1245',
      Range: 'Other',
      firstName: 'Sarah',
      middleName: 'Anne',
      lastName: 'Johnson',
      make: 'TASER',  
      model: 'X26P',
      serialNumber: 'SN123456',
      date: '15 October 2025',
    },
    {
      employeeId: '1245',
      Range: 'Other',
      firstName: 'Michael',
      middleName: 'Jennifer',
      lastName: 'Brown',
      make: 'TASER',  
      model: 'X26P',
      serialNumber: 'SN123456',
      date: '29 October 2025',
    },
  ],
  Chief: [
    {
      employeeId: '1245',
      Range: 'Other',
      firstName: 'James',
      middleName: 'Michale',
      lastName: 'Smith',
      make: 'TASER',  
      model: 'X26P',
      serialNumber: 'SN123456',
      date: '22 October 2025',
    },
    {
      employeeId: '1245',
      Range: 'Other',
      firstName: 'Michael',
      middleName: 'Jennifer',
      lastName: 'Brown',
      make: 'TASER',
      model: 'X26P',
      serialNumber: 'SN123456',
      date: '18 October 2025',
    },
  ],
  Sergeant: [
    {
      employeeId: '1245',
      Range: 'Other',
      firstName: 'James',
      middleName: 'Michale',
      lastName: 'Smith',
      make: 'TASER',  
      model: 'X26P',
      serialNumber: 'SN123456',
      date: '11 October 2025',
    },
    {
      employeeId: '1245',
      Range: 'Other',
      firstName: 'Michael',
      middleName: 'Jennifer',
      lastName: 'Brown',
      make: 'TASER',  
      model: 'X26P',
      serialNumber: 'SN123456',
      date: '29 October 2025',
    },
  ],
  'Police Officer': [
    {
      employeeId: '1245',
      Range: 'Other',
      firstName: 'James',
      middleName: 'Michale',
      lastName: 'Smith',
      make: 'TASER',
      model: 'X26P',
      serialNumber: 'SN123456',
      date: '29 October 2025',
    },
    {
      employeeId: '1245',
      Range: 'Other',
      firstName: 'Michael',
      middleName: 'Jennifer',
      lastName: 'Brown',
      make: 'TASER',  
      model: 'X26P',
      serialNumber: 'SN123456',
      date: '29 October 2025',
    },
  ],
};

// Table columns
const columns = [
  {
    key: 'date',
    label: 'Date',
    render: (employee) => <span className="text-[#1e3a8a]">{employee.date}</span>,
  },
  {
    key: 'range',
    label: 'Range',
    render: (employee) => <span className="text-[#1e3a8a]">{employee.Range}</span>,
  },
  {
    key: 'make',
    label: 'Make',
    render: (employee) => <span className="text-[#1e3a8a]">{employee.make}</span>,
  },
  {
    key: 'model',
    label: 'Model',
    render: (employee) => <span className="text-[#1e3a8a]">{employee.model}</span>,
  },
  {
    key: 'serialNumber',
    label: 'Serial Number',
    render: (employee) => <span className="text-[#1e3a8a]">{employee.serialNumber}</span>,
  }
];


const CEDQualification = () => {
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
    navigate('/firearms-qualification');
  };

  // Filter by date range only
  const getFilteredData = () => {
    if (!dateRange.start || !dateRange.end) return {};
    const filtered = {};
    Object.entries(rosterData).forEach(([type, data]) => {
      filtered[type] = data.filter(employee => {
        const recordDate = dayjs(employee.date, 'D MMMM YYYY');
        return recordDate.isSameOrAfter(dayjs(dateRange.start)) &&
               recordDate.isSameOrBefore(dayjs(dateRange.end));
      });
    });
    return filtered;
  };

  const filteredData = getFilteredData();

  return (
    <div className="min-h-screen p-2 sm:p-8 flex flex-col gap-8">
      <Header />
      <div className='flex justify-between items-center'>
        <h2 className='text-2xl font-bold'>CED Qualification Report</h2>
      </div>
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
      {/* Show data only after date range is selected */}
      {dateRange.start && dateRange.end && (
        <div className='flex flex-col'>
          {Object.entries(filteredData)
            .filter(([_, data]) => data.length > 0).length > 0
            ? Object.entries(filteredData)
                .filter(([_, data]) => data.length > 0)
                .map(([type, data]) => (
                  <div key={type} className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg mb-8">
                    <div className="flex items-center gap-4 px-4 py-2 rounded-t-lg">
                      <span className="text-lg font-semibold text-white">{type}</span>
                      <span className="bg-white text-[#1e3a8a] rounded-full px-3 py-1 font-bold">{data.length}</span>
                    </div>
                    <div className="bg-white rounded-b-lg">
                      <Table
                        columns={columns}
                        rows={data}
                        headerClassName="bg-none border-b"
                        headerTextClassName="text-[#666666] font-semibold"
                        rowClassName="hover:bg-gray-100"
                      />
                    </div>
                  </div>
                ))
            : <div className="text-center text-gray-500 py-8 text-lg font-semibold">No data found</div>
          }
          <div className='flex sm:flex-row flex-col gap-5'>
            <WhiteBtn><FaDownload />Export as Excel</WhiteBtn>
            <WhiteBtn><FaDownload />Export as Pdf</WhiteBtn>
          </div>
        </div>
      )}
    </div>
  );
};

export default CEDQualification;
