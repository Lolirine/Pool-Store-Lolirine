import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationProps } from '../types';

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };
  
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow + 2) { // Show all pages if not too many
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) {
        pageNumbers.push('...');
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }

      pageNumbers.push(totalPages);
    }
    return [...new Set(pageNumbers)]; // Remove duplicates just in case
  };
  
  if (totalPages <= 1) {
    return null;
  }
  
  const pages = getPageNumbers();

  return (
    <nav className="flex items-center justify-center space-x-2 mt-12">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 disabled:opacity-50 text-gray-600 hover:text-gray-900"
        aria-label="Previous Page"
      >
        <ChevronLeft size={20} />
      </button>
      {pages.map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
              currentPage === page
                ? 'bg-cyan-600 text-white'
                : 'text-gray-700 hover:bg-gray-200'
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2 text-gray-500">...</span>
        )
      )}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 disabled:opacity-50 text-gray-600 hover:text-gray-900"
        aria-label="Next Page"
      >
        <ChevronRight size={20} />
      </button>
    </nav>
  );
};

export default Pagination;
