import React, { useState } from 'react';
import Header from '../../ui/Header';
import Table from '../../ui/Table';
import { BlueBtn, WhiteBtn } from '../../ui/Button';
import { FaDownload } from "react-icons/fa";

const ALL_DATA = [
  { lastName: 'October 10 2025', range: 'Indoor Range A', serialNo: 'GLK-526' },
  { lastName: 'October 15 2025', range: 'Indoor Range A', serialNo: 'GLK-526' },
  { lastName: 'October 20 2025', range: 'Indoor Range A', serialNo: 'GLK-526' },
  { lastName: 'October 20 2025', range: 'Indoor Range A', serialNo: 'GLK-526' },
  { lastName: 'October 23 2025', range: 'Indoor Range A', serialNo: 'GLK-526' },
  { lastName: 'October 21 2025', range: 'Indoor Range A', serialNo: 'GLK-526' },
  { lastName: 'October 13 2025', range: 'Indoor Range A', serialNo: 'GLK-526' },
  { lastName: 'October 12 2025', range: 'Indoor Range A', serialNo: 'GLK-526' },
];

const columns = [
  { key: 'lastName', label: 'LAST NAME' },
  { key: 'range', label: 'RANGE' },
  { key: 'serialNo', label: 'SERIAL NO.' },
];

const MvrRandomPick = () => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [filterActive, setFilterActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const parseDate = str => {
    const months = {
      January: '01', February: '02', March: '03', April: '04',
      May: '05', June: '06', July: '07', August: '08',
      September: '09', October: '10', November: '11', December: '12'
    };
    const parts = str.split(' ');
    if (parts.length === 3 && months[parts[0]]) {
      const yyyy = parts[2];
      const mm = months[parts[0]];
      const dd = parts[1].padStart(2, '0');
      return new Date(`${yyyy}-${mm}-${dd}`);
    }
    return null;
  };
  const getDateString = dateObj => dateObj ? dateObj.toISOString().slice(0, 10) : '';

  const sortedData = [...ALL_DATA].sort((a, b) => {
    const da = parseDate(a.lastName);
    const db = parseDate(b.lastName);
    return da - db;
  });

  const filteredData = filterActive && dateFrom && dateTo
    ? sortedData.filter(row => {
      const dObj = parseDate(row.lastName);
      const dStr = getDateString(dObj);
      if (!dStr) return false;
      return dStr >= dateFrom && dStr <= dateTo;
    })
    : sortedData;

  const rows = filteredData;

  const handleApplyFilter = () => {
    setFilterActive(true);
    setCurrentPage(1);
  };

  const handleClearFilter = () => {
    setFilterActive(false);
    setDateFrom('');
    setDateTo('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen p-2 sm:p-8 flex flex-col gap-8">
      <Header />
      <h2 className="text-2xl font-bold">MVR Random Pick Report.</h2>
      <div className='flex md:flex-row flex-col sm:justify-between sm:items-center'>
        <div className="font-semibold text-lg mb-2">Report Date - 28 October 2025</div>
        <div className="flex sm:flex-row flex-col gap-3 items-stretch sm:items-center">
          <input
            type="date"
            placeholder="Date From"
            value={dateFrom}
            onChange={e => setDateFrom(e.target.value)}
            className="min-w-[150px] sm:max-w-[180px] max-w-full bg-white rounded-lg px-3 py-2 border"
          />
          <input
            type="date"
            placeholder="Date To"
            value={dateTo}
            onChange={e => setDateTo(e.target.value)}
            className="min-w-[150px] sm:max-w-[180px] max-w-full bg-white rounded-lg px-3 py-2 border"
          />
          {!filterActive ? (
            <BlueBtn
              onClick={handleApplyFilter}
              disabled={!dateFrom || !dateTo}
            >
              Apply Filter
            </BlueBtn>
          ) : (
            <button
              className="bg-[#f3edff] text-[#a3a3a3] rounded-lg px-4 py-2 font-semibold"
              onClick={handleClearFilter}
            >
              Clear Filter
            </button>
          )}
        </div>
      </div>
      {/* Table */}
      <Table columns={columns} rows={rows} rowClassName="hover:bg-gray-100" />

      {/* Export Buttons */}
      <div className="flex sm:flex-row flex-col gap-5">
        <WhiteBtn><FaDownload />
          Export as Excel
        </WhiteBtn>
        <WhiteBtn ><FaDownload />
          Export as Pdf
        </WhiteBtn>
      </div>
    </div>
  );
};

export default MvrRandomPick;
