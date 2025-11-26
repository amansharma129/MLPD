import React, { useState } from 'react';
import Header from '../../ui/Header';
import { Input, Select } from 'antd';
import { WhiteBtn } from '../../ui/Button';
import Table from '../../ui/Table';
import { FaDownload } from "react-icons/fa";

const { Option } = Select;

const staticData = [
    { rank: 'Detective', firstName: 'Joseph', lastName: 'Joseph', cjisLogon: '12', aocLogon: '--' },
    { rank: 'Lieutenant', firstName: 'Clark', lastName: 'Clark', cjisLogon: '61', aocLogon: 'Good' },
    { rank: 'Chief', firstName: 'Smith', lastName: 'Smith', cjisLogon: '65', aocLogon: 'Excellent Participation' },
];

const ranks = [...new Set(staticData.map(row => row.rank))];

const columns = [
    { key: 'rank', label: 'RANK', render: row => <span>{row.rank}</span> },
    { key: 'firstName', label: 'FIRST NAME', render: row => <span>{row.firstName}</span> },
    { key: 'lastName', label: 'LAST NAME', render: row => <span>{row.lastName}</span> },
    { key: 'cjisLogon', label: 'CJIS LOGON', render: row => <span>{row.cjisLogon}</span> },
    { key: 'aocLogon', label: 'AOC LOGON', render: row => <span>{row.aocLogon}</span> },
];


const CjisAocLoginIds = () => {
    const [search, setSearch] = useState('');
    const [rankFilter, setRankFilter] = useState('');

    const filteredRows = staticData.filter(row => {
        let valid = true;
        if (search) {
            valid =
                row.firstName.toLowerCase().includes(search.toLowerCase()) ||
                row.lastName.toLowerCase().includes(search.toLowerCase()) ||
                String(row.rank).includes(search);
        }
        if (rankFilter) {
            valid = valid && String(row.rank) === String(rankFilter);
        }
        return valid;
    });

    return (
        <div className="min-h-screen p-2 sm:p-8 bg-[#ede6fa] flex flex-col gap-8">
            <Header />
            <h2 className="text-2xl font-bold">CJIS and AOC Login Id's</h2>
            <div className="flex sm:flex-row flex-col flex-wrap gap-3 items-stretch sm:items-center sm:justify-end">
                <Input
                    placeholder="Search by Name or Rank"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="min-w-[150px] sm:max-w-[300px] max-w-full"
                />
                <Select
                    value={rankFilter || undefined}
                    onChange={value => setRankFilter(value)}
                    className="min-w-[160px] sm:max-w-[200px] max-w-full"
                    placeholder="Filter By Rank"
                    allowClear
                >
                    {ranks.map(rank => (
                        <Option key={rank} value={rank}>{rank}</Option>
                    ))}
                </Select>
            </div>
                <Table columns={columns} rows={filteredRows} />
            <div className="flex sm:flex-row flex-col gap-5">
                <WhiteBtn><FaDownload />Export as Excel</WhiteBtn>
                <WhiteBtn><FaDownload />Export as Pdf</WhiteBtn>
            </div>
        </div>
    );
};

export default CjisAocLoginIds;
