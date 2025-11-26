import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../ui/Header';
import Table from '../../ui/Table';
import { BlueBtn } from '../../ui/Button';
import { FaEye, FaEdit, FaPlus } from "react-icons/fa";
import medicalStaticData from './medicalStaticData';

const MedicalInformation = () => {
  const navigate = useNavigate();

  const handleAddMedical = () => {
    localStorage.removeItem('medicalEmployeeId');
    localStorage.removeItem('medicalMode');
    navigate('/add-employee-medical');
  };

  const handleView = (row) => {
    localStorage.setItem('medicalEmployeeId', row.employeeId);
    localStorage.setItem('medicalMode', 'view');
    navigate('/add-employee-medical');
  };

  const handleEdit = (row) => {
    localStorage.setItem('medicalEmployeeId', row.employeeId);
    localStorage.setItem('medicalMode', 'edit');
    navigate('/add-employee-medical');
  };
  const columns = [
    { key: 'employeeId', label: 'EMPLOYEE ID', render: row => <span>{row.employeeId || '–'}</span> },
    { key: 'name', label: 'NAME', render: row => <span>{row.name || '–'}</span> },
    { key: 'bloodType', label: 'BLOOD TYPE', render: row => <span>{row.bloodType || '–'}</span> },
    { key: 'allergies', label: 'ALLERGIES', render: row => <span>{row.allergies || '–'}</span> },
    { key: 'doctor', label: 'DOCTOR', render: row => <span>{row.doctor || '–'}</span> },
    { key: 'condition', label: 'CONDITION', render: row => <span>{row.condition || '–'}</span> },
    {
      key: 'actions',
      label: 'ACTIONS',
      render: row => (
        <div className="flex gap-2">
          <button className="bg-green-500 text-white p-2 rounded-full" onClick={() => handleView(row)}><FaEye /></button>
          <button className="bg-[#1e3a8a] text-white p-2 rounded-full" onClick={() => handleEdit(row)}><FaEdit /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-2 sm:p-8 flex flex-col gap-8">
      <Header />
      <h2 className="text-2xl font-bold">Employee Medical Information</h2>
      <div className="flex sm:flex-row flex-col justify-end">
        <BlueBtn onClick={handleAddMedical}><FaPlus />Add New Employee</BlueBtn>
      </div>
      <Table columns={columns} rows={medicalStaticData} rowClassName="hover:bg-gray-100"/>
    </div>
  );
};

export default MedicalInformation;  
