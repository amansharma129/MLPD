import React from 'react';
import Table from '../../ui/Table';
import Header from '../../ui/Header';

const staticData = [
    {
        employeeId: '07',
        employeeName: 'John Doe',
        date: '11/12/1990',
        dutyHQCI: 'Yes',
        dutyHNQC: 'Yes',
        offDutyMake: 'S&W',
        offDutyModel: '659',
        serialNo: 'TBC7376',
        calibre: '9',
        capacity: 'No',
        offDutyHQCI: 'No',
        shotgun: 'No',
        special1: 'Instructors Training/Qualification',
        special2: 'Submachine gun, Proficiency ASQC1',
    },
    {
        employeeId: '08',
        employeeName: 'Jane Smith',
        date: '5/28/1991',
        dutyHQCI: 'Yes',
        dutyHNQC: 'Yes',
        offDutyMake: 'Walther',
        offDutyModel: 'PPK/S',
        serialNo: '5047563',
        calibre: '380',
        capacity: 'Yes',
        offDutyHQCI: 'Yes',
        shotgun: 'No',
        special1: 'Stress Shooting \'93',
        special2: '',
    },
    // Add more static data rows here...
];

const columns = [
    { key: 'employeeId', label: 'Employee ID', render: row => <span>{row.employeeId}</span> },
    { key: 'employeeName', label: 'Employee Name', render: row => <span>{row.employeeName}</span> },
    { key: 'date', label: 'Date', render: row => <span>{row.date}</span> },
    { key: 'dutyHQCI', label: 'Duty HQCI', render: row => <span>{row.dutyHQCI}</span> },
    { key: 'dutyHNQC', label: 'Duty HNQC', render: row => <span>{row.dutyHNQC}</span> },
    { key: 'offDutyMake', label: 'Off Duty Make', render: row => <span>{row.offDutyMake}</span> },
    { key: 'offDutyModel', label: 'Off Duty Model', render: row => <span>{row.offDutyModel}</span> },
    { key: 'serialNo', label: 'S/N', render: row => <span>{row.serialNo}</span> },
    { key: 'calibre', label: 'Calibre', render: row => <span>{row.calibre}</span> },
    { key: 'capacity', label: 'Capacity', render: row => <span>{row.capacity}</span> },
    { key: 'offDutyHQCI', label: 'Off Duty HQCI', render: row => <span>{row.offDutyHQCI}</span> },
    { key: 'shotgun', label: 'Shotgun', render: row => <span>{row.shotgun}</span> },
    { key: 'special1', label: 'Special 1', render: row => <span>{row.special1}</span> },
    { key: 'special2', label: 'Special 2', render: row => <span>{row.special2}</span> },
];

const QualificationPre = () => {
    return (
        <div className="min-h-screen p-2 sm:p-8 flex flex-col gap-8">
            <Header />
            <div>
                <h2 className="text-2xl font-bold">Firearms Qualification Pre-Data</h2>
            </div>
            <Table
                columns={columns}
                rows={staticData}
                rowClassName="hover:bg-gray-50"
            />
        </div>
    );
};

export default QualificationPre;
