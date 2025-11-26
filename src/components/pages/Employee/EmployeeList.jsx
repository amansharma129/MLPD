import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../ui/Header';
import Table from '../../ui/Table';
import { BlueBtn } from '../../ui/Button';
import { FaEye, FaPencilAlt, FaPlus } from "react-icons/fa";
import employeeList from './employeeStaticData';

const EmployeeList = () => {
    const navigate = useNavigate();

    const handleAddNewEmployee = () => {
        localStorage.removeItem('employeeId');
        localStorage.removeItem('employeeMode');
        navigate('/add-new-employee');
    };
    const handleViewEmployee = (employee) => {
        localStorage.setItem('employeeId', employee.id);
        localStorage.setItem('employeeMode', 'view');
        navigate('/add-new-employee');
    };
    const handleEditEmployee = (employee) => {
        localStorage.setItem('employeeId', employee.id);
        localStorage.setItem('employeeMode', 'edit');
        navigate('/add-new-employee');
    };

    const columns = [
        {
            key: 'id',
            label: 'Employee ID',
            render: (employee) => <span className="text-[#1e3a8a]">{employee.id}</span>,
        },
        {
            key: 'name',
            label: 'Name',
            render: (employee) => <span className="text-[#1e3a8a]">{employee.name}</span>,
        },
        {
            key: 'division',
            label: 'Division',
            render: (employee) => <span className="text-gray-700">{employee.division}</span>,
        },
        {
            key: 'status',
            label: 'Status',
            render: (employee) => (
                <span className={`flex items-center gap-2`}>
                    <span className={`w-2.5 h-2.5 rounded-full ${employee.status === 'Active' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                    <span className={employee.status === 'Active' ? 'text-green-600' : 'text-red-600'}>{employee.status}</span>
                </span>
            ),
        },
        {
            key: 'ssn',
            label: 'SSN',
            render: (employee) => <span className="text-gray-700">***-**-{employee.personalInfo.ssn.slice(-4)}</span>,
        },
        {
            key: 'phone',
            label: 'Phone',
            render: (employee) => <span className="text-gray-700">{employee.personalInfo.phone}</span>,
        },
        {
            key: 'pob',
            label: 'Place of Birth',
            render: (employee) => <span className="text-gray-700">{employee.personalInfo.pob}</span>,
        },
        {
            key: 'actions',
            label: 'Actions',
            render: (employee) => (
                <div className="flex space-x-2">
                    <button
                        className="text-md text-white bg-[#16A34A] p-2 rounded-full"
                        onClick={() => handleViewEmployee(employee)}
                    >
                        <FaEye />
                    </button>
                    <button
                        className="text-md text-white bg-[#1e3a8a] p-2 rounded-full"
                        onClick={() => handleEditEmployee(employee)}
                    >
                        <FaPencilAlt />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="min-h-screen p-2 sm:p-8 flex flex-col gap-8">
            <Header />
            <div className='flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2'>
                <h2 className='text-2xl font-bold'>Employee List</h2>
                <BlueBtn onClick={handleAddNewEmployee}><FaPlus />Add New Employee</BlueBtn>
            </div>
            <Table columns={columns} rows={employeeList} rowClassName="hover:bg-gray-100" />
        </div>
    );
};

export default EmployeeList;