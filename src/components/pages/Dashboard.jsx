import React from 'react';
import MLPDLogo from '../../assets/mlpd_logo.png';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaListUl, FaDatabase, FaAddressBook, FaToolbox, FaBookMedical, FaGraduationCap } from "react-icons/fa";
import { FaGun, FaVial, FaUserPlus, FaArrowsRotate, FaFileLines, FaPenToSquare, FaCamera, FaUserDoctor, FaPhone, FaBullseye, FaShuffle, FaTruckFront, FaCirclePlus, FaChartBar, FaKey, FaCalendarDays } from "react-icons/fa6";
const Dashboard = () => {
    const navigate = useNavigate();

    const handleAddUpdateEmployee = () => {
        navigate('/employees');
    };
    const handleDepartmentRoster = () => {
        navigate('/department-roster');
    }
    const handleOfficerDetails = () => {
        navigate('/officer');
    }
    const handleOfficerPhoto = () => {
        navigate('/officer-photo');
    }
    const handleEmployeeData = () => {
        navigate('/employee-data');
    }
    const handleEquipmentUpdate = () => {
        navigate('/equipment-update');
    }
    const handleEquipmentReport = () => {
        navigate('/officer-equipment-report');
    }
    const handleVestReplacement = () => {
        navigate('/vest-replacement');
    }
    const handleMedicalInfo = () => {
        navigate('/medical-info');
    }
    const handleMedicalContacts = () => {
        navigate('/employee-medical-contacts');
    }
    const handleFirearmsQualification = () => {
        navigate('/firearms-qualification');
    }
    const handleDrugScreening = () => {
        navigate('/drug-screening');
    }
    const handleMvrRandomPick = () => {
        navigate('/mvr-random-pick');
    }
    const handleAddTrainingRecord = () => {
        navigate('/training-records');
    }
    const handleTrainingRecord = () => {
        navigate('/employee-training-records');
    }
    const handleCjisAocLoginIds = () => {
        navigate('/cjis-aoc-login-ids');
    }
    const handleCjisTrainingReport = () => {
        navigate('/cjis-training-report');
    }
    const handleMonthlyJiffReport = () => {
        navigate('/monthly-jiff-report');
    }
    return (
        <div className="min-h-screen flex flex-col items-center">
            <div className="w-full flex flex-col justify-between min-h-screen gap-12">
                <header class="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-2xl">
                    <div class="max-w-7xl mx-auto px-6 py-10 flex items-center gap-6">
                            <img src={MLPDLogo} alt="Police Logo" className="h-24" />
                        {/* <div class="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                            <FaShieldAlt className="text-blue-900 text-4xl" />
                        </div> */}
                        <div>
                            <h1 class="text-3xl md:text-5xl font-bold text-white">Mount Laurel Township Police Department</h1>
                            <p class="text-xl mt-2 opacity-90">Personnel Database</p>
                        </div>
                    </div>
                </header>
                <div className="max-w-7xl mx-auto px-2 sm:px-6 flex flex-col gap-14">
                    <div className="bg-white/50 rounded-xl shadow-[0_10px_15px_-3px_#0000001A] p-6">
                        <h2 className="text-2xl mb-4 flex items-center gap-2 font-bold"><FaUsers />Employees</h2>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                            <span className='cursor-pointer flex gap-2 text-md' onClick={handleAddUpdateEmployee}><FaUserPlus className='btn-icon'/>Add/Update Employee</span>
                            <span className='cursor-pointer flex gap-2 text-md' onClick={handleDepartmentRoster}><FaListUl className='btn-icon'/>Department Roster</span>
                            <span className='cursor-pointer flex gap-2 text-md' onClick={handleEmployeeData}><FaDatabase className='btn-icon'/>Employee Data</span>
                            <span className='cursor-pointer flex gap-2 text-md' onClick={handleOfficerDetails}><FaAddressBook className='btn-icon'/>Officer Name, Rank & Hire Date</span>
                            <span className='cursor-pointer flex gap-2 text-md' onClick={handleOfficerPhoto}><FaCamera className='btn-icon'/>Officer Photo</span>
                        </div>
                    </div>
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6">
                        <div className="bg-white/50 rounded-xl shadow-[0_10px_15px_-3px_#0000001A] p-6">
                            <h2 className="text-2xl mb-4 flex items-center gap-2 font-bold"><FaToolbox />Equipment</h2>
                            <div className="flex flex-col gap-4">
                                <span className='cursor-pointer flex gap-2 text-md' onClick={handleEquipmentUpdate}><FaPenToSquare className='btn-icon'/>Equipment Update</span>
                                <span className='cursor-pointer flex gap-2 text-md' onClick={handleEquipmentReport}><FaFileLines className='btn-icon'/>Officer Equipment Report</span>
                                <span className='cursor-pointer flex gap-2 text-md' onClick={handleVestReplacement}><FaArrowsRotate className='btn-icon'/>Vest Replacement</span>
                            </div>
                        </div>
                        <div className="bg-white/50 rounded-xl shadow-[0_10px_15px_-3px_#0000001A] p-6">
                            <h3 className="text-2xl mb-4 flex items-center gap-2 font-bold"><FaBookMedical />Medical</h3>
                            <div className="flex flex-col gap-4">
                                <span className='cursor-pointer flex gap-2 text-md' onClick={handleMedicalInfo}><FaUserDoctor className='btn-icon'/>Add/Update Employee Medical Information</span>
                                <span className='cursor-pointer flex gap-2 text-md' onClick={handleMedicalContacts}><FaPhone className='btn-icon'/>Emergency Contact & Medical Info Report</span>
                            </div>
                        </div>
                        <div className="bg-white/50 rounded-xl shadow-[0_10px_15px_-3px_#0000001A] p-6">
                            <h3 className="text-2xl mb-4 flex items-center gap-2 font-bold"><FaGun />Firearms</h3>
                            <div className="flex flex-col gap-4">
                                <span className='cursor-pointer flex gap-2 text-md' onClick={handleFirearmsQualification}><FaBullseye className='btn-icon'/>Firearms Training</span>
                            </div>
                        </div>
                        <div className="bg-white/50 rounded-xl shadow-[0_10px_15px_-3px_#0000001A] p-6">
                            <h3 className="text-2xl mb-4 flex items-center gap-2 font-bold"><FaVial />Screening</h3>
                            <div className="flex flex-col gap-4">
                                <span className='cursor-pointer flex gap-2 text-md' onClick={handleDrugScreening}><FaShuffle className='btn-icon'/>Random Drug Screening</span>
                                <span className='cursor-pointer flex gap-2 text-md' onClick={handleMvrRandomPick}><FaTruckFront className='btn-icon'/>Random MVR Pick 5</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/50 rounded-xl shadow-[0_10px_15px_-3px_#0000001A] p-6">
                        <h2 className="text-2xl mb-4 flex items-center gap-2 font-bold"><FaGraduationCap />Training & Compliance</h2>
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
                            <span className='cursor-pointer flex gap-2 text-md' onClick={handleAddTrainingRecord}><FaCirclePlus className='btn-icon'/>Add Training Record</span>
                            <span className='cursor-pointer flex gap-2 text-md' onClick={handleTrainingRecord}><FaChartBar className='btn-icon'/>Employee Training Report</span>
                            <span className='cursor-pointer flex gap-2 text-md' onClick={handleCjisAocLoginIds}><FaKey className='btn-icon'/>CJIS and AOC Login IDs</span>
                            <span className='cursor-pointer flex gap-2 text-md' onClick={handleCjisTrainingReport}><FaFileLines className='btn-icon'/>CJIS Training Report</span>
                            <span className='cursor-pointer flex gap-2 text-md' onClick={handleMonthlyJiffReport}><FaCalendarDays className='btn-icon'/>Monthly JIFF Report</span>
                        </div>
                    </div>
                </div>

                <footer class="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-8 text-center">
                    <p class="text-sm">© 2025 Mount Laurel Township Police Department — Personnel Database</p>
                </footer>
            </div>
        </div>
    );
};

export default Dashboard;