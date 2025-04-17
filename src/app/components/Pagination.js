import React from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const Pagination = ({ 
  currentPage = 1, 
  totalPages = 10, 
  onPageChange, 
  showPageNumbers = true,
  maxPageNumbers = 3
}) => {
  const getPageNumbers = () => {
    if (totalPages <= maxPageNumbers) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    let endPage = startPage + maxPageNumbers - 1;
    
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPageNumbers + 1);
    }
    
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = showPageNumbers ? getPageNumbers() : [];

  return (
    <nav className="flex items-center justify-center my-8">
      <ul className="flex items-center space-x-1">
        <li>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-8 h-8 rounded-md ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            aria-label="Página anterior"
          >
            <HiChevronLeft className="w-5 h-5" />
          </button>
        </li>

        {showPageNumbers && (
          <>
            {pageNumbers[0] > 1 && (
              <>
                <li>
                  <button
                    onClick={() => handlePageClick(1)}
                    className="flex items-center justify-center w-8 h-8 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    1
                  </button>
                </li>
                {pageNumbers[0] > 2 && (
                  <li className="flex items-center justify-center w-8 h-8">
                    <span className="text-gray-500">...</span>
                  </li>
                )}
              </>
            )}

            {pageNumbers.map((page) => (
              <li key={page}>
                <button
                  onClick={() => handlePageClick(page)}
                  className={`flex items-center justify-center w-8 h-8 rounded-md ${
                    currentPage === page
                      ? 'bg-[#1526ff] text-white'
                      : 'text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}

            {pageNumbers[pageNumbers.length - 1] < totalPages && (
              <>
                {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                  <li className="flex items-center justify-center w-8 h-8">
                    <span className="text-gray-500">...</span>
                  </li>
                )}
                <li>
                  <button
                    onClick={() => handlePageClick(totalPages)}
                    className="flex items-center justify-center w-8 h-8 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    {totalPages}
                  </button>
                </li>
              </>
            )}
          </>
        )}

        <li>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center w-8 h-8 rounded-md ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            aria-label="Próxima página"
          >
            <HiChevronRight className="w-5 h-5" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;