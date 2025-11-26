import React from 'react';
import { Select } from 'antd';
import { BlueBtn } from './Button';
const OfficerHeader = ({ officer, officerList, onChange }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 flex justify-between lg:items-center flex-col lg:flex-row gap-8 w-full">
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8">
      <img
        src={officer.photo}
        alt={officer.name}
        className="w-40 h-40 md:w-60 md:h-60 rounded-lg object-cover"
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-4 items-center">
          <h3 className="text-xl font-semibold text-[#1e3a8a]">{officer.name}</h3>
          <span className="text-[#1F1F1F]">ID: {officer.badgeId}</span>
          <span className="flex items-center">
            <span
              className={`w-2.5 h-2.5 rounded-full mr-2 ${officer.status === 'Active' ? 'bg-green-600' : 'bg-red-600'}`}
            ></span>
            <span className={`${officer.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
              {officer.status}
            </span>
          </span>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <span className="bg-[#1e3a8a] text-white px-3 py-1 rounded-full">{officer.rank}</span>
          <span className="text-[#1F1F1F] font-semibold">{officer.division}</span>
        </div>
      </div>
    </div>
    <div className='block'>
      <BlueBtn
        onClick={() => onChange(null)}
      >
        Select Employee
      </BlueBtn>
    </div>
  </div>
);

export default OfficerHeader;
