import React, { useState } from 'react';

const Table = ({
  headers = [],
  rows = [],
  columns = [],
  rowClassName = '',
  headerClassName,
  headerTextClassName,
  roundedClassName = 'rounded-lg'
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = rows.slice(startIndex, startIndex + rowsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div className={`overflow-x-auto bg-white ${roundedClassName} overflow-hidden`}>
        <table className="min-w-full table-auto w-full">
          <thead>
            <tr className={`${headerClassName || "bg-gradient-to-r from-blue-900 to-blue-800"} rounded-t-lg`}>
              {columns.length > 0
                ? columns.map((column, index) => (
                    <th
                      key={index}
                      className={`text-left p-4 whitespace-nowrap ${headerTextClassName || "text-white font-bold"}`}
                    >
                      {column.label}
                    </th>
                  ))  
                : headers.map((header, index) => (
                    <th
                      key={index}
                      className={`text-left p-4 whitespace-nowrap ${headerTextClassName || "text-white font-bold"}`}
                    >
                      {header}
                    </th>
                  ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.length > 0 ? (
              currentRows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={
                    [
                      rowClassName,
                      "bg-white",
                      rowIndex === 0 ? '' : 'border-t',
                      rowIndex === 0 ? 'rounded-t-lg' : '',
                      rowIndex === currentRows.length - 1 ? 'rounded-b-lg' : '',
                    ].join(' ')
                  }
                >
                  {columns.length > 0
                    ? columns.map((column, colIndex) => (
                        <td
                          key={colIndex}
                          className={`p-4 text-gray-700 ${column.className || ''} whitespace-nowrap`}
                        >
                          {column.render ? column.render(row) : row[column.key]}
                        </td>
                      ))
                    : row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="p-4 text-gray-700 whitespace-nowrap">
                          {cell}
                        </td>
                      ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="p-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
      {rows.length > rowsPerPage ? (
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-2 rounded-full ${currentPage === 1 ? 'cursor-not-allowed bg-gray-300 text-white' : 'cursor-pointer bg-[#1e3a8a] text-white'}`}
          >
            Prev
          </button>
          <button
            className="px-4 py-2 mx-2 rounded-full font-bold bg-white text-[#1e3a8a]"
          >
            {currentPage}
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 mx-2 rounded-full ${currentPage === totalPages ? 'cursor-not-allowed bg-gray-300 text-white' : 'cursor-pointer bg-[#1e3a8a] text-white'}`}
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Table;