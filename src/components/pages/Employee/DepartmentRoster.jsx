import React, { useState } from 'react';
import Table from '../../ui/Table';
import Header from '../../ui/Header';
import { WhiteBtn } from '../../ui/Button';
import { Select } from 'antd';
import { FaDownload } from "react-icons/fa";
const rosterData = {
  Lieutenant: [
    {
      employeeId: '1245',
      firstName: 'James',
      middleName: 'Michale',
      lastName: 'Smith',
      hireDate: '29 October 1998',
      promotedDate: '29 October 1998',
    },
    {
      employeeId: '1245',
      firstName: 'Sarah',
      middleName: 'Anne',
      lastName: 'Johnson',
      hireDate: '29 October 1998',
      promotedDate: '29 October 1998',
    },
    {
      employeeId: '1245',
      firstName: 'Michael',
      middleName: 'Jennifer',
      lastName: 'Brown',
      hireDate: '29 October 1998',
      promotedDate: '29 October 1998',
    },
  ],
  Chief: [
    {
      employeeId: '1245',
      firstName: 'James',
      middleName: 'Michale',
      lastName: 'Smith',
      hireDate: '29 October 1998',
      promotedDate: '29 October 1998',
    },
    {
      employeeId: '1245',
      firstName: 'Michael',
      middleName: 'Jennifer',
      lastName: 'Brown',
      hireDate: '29 October 1998',
      promotedDate: '29 October 1998',
    },
  ],
  Sergeant: [
    {
      employeeId: '1245',
      firstName: 'James',
      middleName: 'Michale',
      lastName: 'Smith',
      hireDate: '29 October 1998',
      promotedDate: '29 October 1998',
    },
    {
      employeeId: '1245',
      firstName: 'Michael',
      middleName: 'Jennifer',
      lastName: 'Brown',
      hireDate: '29 October 1998',
      promotedDate: '29 October 1998',
    },
  ],
  'Police Officer': [
    {
      employeeId: '1245',
      firstName: 'James',
      middleName: 'Michale',
      lastName: 'Smith',
      hireDate: '29 October 1998',
      promotedDate: '29 October 1998',
    },
    {
      employeeId: '1245',
      firstName: 'Michael',
      middleName: 'Jennifer',
      lastName: 'Brown',
      hireDate: '29 October 1998',
      promotedDate: '29 October 1998',
    },
  ],
};

// Table columns
const columns = [
  {
    key: 'employeeId',
    label: 'Employee ID',
    render: (employee) => <span className="text-[#1e3a8a]">{employee.employeeId}</span>,
  },
  {
    key: 'firstName',
    label: 'First Name',
    render: (employee) => <span className="text-[#1e3a8a]">{employee.firstName}</span>,
  },
  {
    key: 'middleName',
    label: 'Middle Name',
    render: (employee) => <span className="text-[#1e3a8a]">{employee.middleName}</span>,
  },
  {
    key: 'lastName',
    label: 'Last Name',
    render: (employee) => <span className="text-[#1e3a8a]">{employee.lastName}</span>,
  },
  {
    key: 'hireDate',
    label: 'Hire Date',
    render: (employee) => <span className="text-[#1e3a8a]">{employee.hireDate}</span>,
  },
  {
    key: 'promotedDate',
    label: 'Promoted Date',
    render: (employee) => <span className="text-[#1e3a8a]">{employee.promotedDate}</span>,
  },
];

const rankOptions = [
  'Lieutenant',
  'Chief',
  'Sergeant',
  'Police Officer'
];

const DepartmentRoster = () => {
  const [selectedRank, setSelectedRank] = useState(null);

  return (
    <div className="min-h-screen p-2 sm:p-8 flex flex-col gap-8">
      <Header />
      <div className='flex justify-between sm:items-center sm:flex-row flex-col gap-4'>
        <h2 className='text-2xl font-bold'>Department Roster</h2>
        {/* Filter Dropdown */}
        <div className="mb-4 w-64">
          <Select
            allowClear
            placeholder="Filter by Rank"
            value={selectedRank}
            onChange={value => setSelectedRank(value)}
            className="w-full"
          >
            {rankOptions.map(rank => (
              <Select.Option key={rank} value={rank}>
                {rank}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <div className='flex flex-col'>
        {Object.entries(rosterData)
          .filter(([type]) => !selectedRank || type === selectedRank)
          .map(([type, data], idx, arr) => (
            <div
              key={type}
              className={`bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg${idx !== arr.length - 1 ? ' mb-8' : ''}`}
            >
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
          ))}
      </div>
      <div className='flex sm:flex-row flex-col gap-5'>
        <WhiteBtn><FaDownload />Export as Excel</WhiteBtn>
        <WhiteBtn><FaDownload />Export as Pdf</WhiteBtn>
      </div>
    </div>
  );
};

export default DepartmentRoster;
