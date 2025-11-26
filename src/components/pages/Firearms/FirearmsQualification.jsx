import React from 'react';
import { BlueBtn } from '../../ui/Button';
import Header from '../../ui/Header';
import { useNavigate } from 'react-router-dom';
const cardData = [
    {
        title: 'Firearms Qualification Entry Form',
        desc: 'Enter new firearms qualification records and Scores',
        btn: 'Firearms Qualification Entry Form',
    },
    {
        title: 'Officer Qualification by Date',
        desc: 'View handgun, shotgun and off-duty qualifications by date',
        btn: 'View By Date',
    },
    {
        title: 'Officer Qualification Report',
        desc: 'Generate comprehensive qualification reports',
        btn: 'Generate Report',
    },
    {
        title: 'Firearms Qualification Pre-2006',
        desc: 'Access historical qualification records before 2006',
        btn: 'View Archives',
    },
    {
        title: 'Rifle Qualification Report',
        desc: 'Rifle qualification and familiarization records',
        btn: 'View By Date',
    },
    {
        title: 'CED Qualification Report',
        desc: 'Conducted Energy Device qualification records',
        btn: 'Generate Report',
    },
];

const FirearmsQualification = () => {
    const navigate = useNavigate();

    const handleAddqualificationform = () => {
        navigate('/qualification-entry-form');
    };

    const handleViewByDate = () => {
        navigate('/qualification-by-date');
    };

    const handleGenerateReport = () => {
        navigate('/qualification-report');
    };

    const handleViewArchives = () => {
        navigate('/qualification-pre-2006');
    };

    const handleRifleReport = () => {
        navigate('/rifle-qualification-report');
    };

    const handleCEDReport = () => {
        navigate('/ced-qualification-report');
    };

    return (
    <div className="min-h-screen p-2 sm:p-8 flex flex-col gap-8">
        <Header />
        <h2 className="text-2xl font-bold">Firearms Qualification</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardData.map((card, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
                    <div className='flex flex-col gap-2'>
                        <h3 className="text-2xl font-semibold">{card.title}</h3>
                        <p className="text-[#1F1F1F]">{card.desc}</p>
                    </div>
                    {card.btn === 'Firearms Qualification Entry Form' && (
                        <BlueBtn onClick={handleAddqualificationform}>{card.btn}</BlueBtn>
                    )}
                    {card.btn === 'View By Date' && card.title === 'Officer Qualification by Date' && (
                        <BlueBtn onClick={handleViewByDate}>{card.btn}</BlueBtn>
                    )}
                    {card.btn === 'Generate Report' && card.title === 'Officer Qualification Report' && (
                        <BlueBtn onClick={handleGenerateReport}>{card.btn}</BlueBtn>
                    )}
                    {card.btn === 'View Archives' && (
                        <BlueBtn onClick={handleViewArchives}>{card.btn}</BlueBtn>
                    )}
                    {card.btn === 'View By Date' && card.title === 'Rifle Qualification Report' && (
                        <BlueBtn onClick={handleRifleReport}>{card.btn}</BlueBtn>
                    )}
                    {card.btn === 'Generate Report' && card.title === 'CED Qualification Report' && (
                        <BlueBtn onClick={handleCEDReport}>{card.btn}</BlueBtn>
                    )}
                </div>
            ))}
        </div>
    </div>
    );
};
export default FirearmsQualification;
