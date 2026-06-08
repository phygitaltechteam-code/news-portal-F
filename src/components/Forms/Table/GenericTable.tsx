import React, {useState} from 'react';
import {FiEdit} from 'react-icons/fi';
import {GrFormNext, GrFormPrevious} from 'react-icons/gr';
import {MdDelete} from 'react-icons/md';
import {FiEye} from 'react-icons/fi';
import {FaArrowLeft} from 'react-icons/fa';

type Button<T> = {
  label: string;
  onClick: (item: T) => void;
  className?: string;
  icon?: React.ReactNode;
};

export type Column<T> = {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  render?: (item: T, index?: number) => React.ReactNode;
  className?: string;
  buttons?: Button<T>[];
  sortable?: boolean;
  action?: boolean;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onCellClick?: (item: T) => void;
};

type GenericTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  itemsPerPage?: number;
  searchAble?: boolean;
  title?: string;
  action?: boolean;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  paginationOff?: boolean;
  onView?: (item: T) => void;
  showBackButton?: boolean;
  onBack?: () => void;
};

export const GenericTable = <T,>({
  data,
  columns,
  itemsPerPage = 5,
  searchAble,
  action,
  title,
  onEdit: handleEdit,
  onDelete: handleDelete,
  paginationOff = false,
  onView,
  showBackButton = false,
  onBack,
}: GenericTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: 'asc' | 'desc';
  } | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const sortedData = React.useMemo(() => {
    const sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        const aValue =
          typeof sortConfig.key === 'function'
            ? (sortConfig.key as (a: T) => string | number | boolean)(a)
            : a[sortConfig.key];
        const bValue =
          typeof sortConfig.key === 'function'
            ? (sortConfig.key as (a: T) => string | number | boolean)(b)
            : b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const handleSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'asc'
    ) {
      direction = 'desc';
    }
    setSortConfig({key, direction});
  };

  const filteredData = sortedData.filter((item) =>
    columns.some((column) => {
      const value =
        typeof column.accessor === 'function'
          ? column.accessor(item)
          : item[column.accessor];
      return value
        ?.toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    }),
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;

  const paginatedData = paginationOff
    ? filteredData
    : filteredData.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="rounded-2xl border border-stroke bg-white px-4 pb-3 pt-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-6">
      {title && (
        <div className="mb-4 flex items-center gap-2">
          {showBackButton && onBack && (
            <button
              onClick={onBack}
              className="rounded-lg border border-stroke bg-white p-2 text-gray-600 transition hover:border-gray-500 hover:bg-gray-50 dark:bg-boxdark dark:text-gray-400 dark:hover:bg-meta-4"
            >
              <FaArrowLeft className="h-5 w-5" />
            </button>
          )}

          <h2 className="text-lg font-semibold text-black dark:text-white">
            {title}
          </h2>
        </div>
      )}

      {searchAble && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full max-w-[280px] rounded-2xl border-[1.5px] border-stroke px-3 py-2 text-sm text-black outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-500/20 active:border-gray-500 disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-gray-500"
          />
        </div>
      )}
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left dark:bg-meta-4">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`min-w-[120px] px-3 py-3 text-sm font-semibold text-gray-700 dark:text-white ${column.className || ''}`}
                  onClick={
                    column.sortable
                      ? () => handleSort(column.accessor as keyof T)
                      : undefined
                  }
                  style={{cursor: column.sortable ? 'pointer' : 'default'}}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && (
                      <span className="text-xs text-gray-500">
                        {sortConfig?.key === column.accessor
                          ? sortConfig.direction === 'asc'
                            ? '↑'
                            : '↓'
                          : '↕'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {action && (
                <th className="min-w-[100px] px-3 py-3 text-sm font-semibold text-gray-700 dark:text-white">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className="bg-white text-sm transition hover:bg-gray-50 dark:bg-boxdark dark:hover:bg-meta-4"
              >
                {columns.map((column, colIndex) => {
                  const value =
                    typeof column.accessor === 'function'
                      ? column.accessor(item)
                      : item[column.accessor];

                  return (
                    <td
                      key={colIndex}
                      className="border-b border-stroke px-3 py-3 dark:border-strokedark"
                      onClick={() => column.onCellClick?.(item)}
                      style={{
                        cursor: column.onCellClick ? 'pointer' : 'default',
                      }}
                    >
                      <div className="py-1.5 text-sm text-body dark:text-bodydark">
                        {column.render
                          ? column.render(item, rowIndex)
                          : typeof value === 'string'
                            ? value
                            : JSON.stringify(value)}
                        {column.buttons && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {column.buttons.map((button, btnIndex) => (
                              <button
                                key={btnIndex}
                                onClick={() => button.onClick(item)}
                                className={`inline-flex items-center justify-center rounded-full border border-gray-300 bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700 transition hover:bg-gray-200 ${button.className || ''}`}
                              >
                                {button.icon || button.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}
                {action && (
                  <td className="border-b border-stroke px-3 py-3 dark:border-strokedark">
                    <div className="flex items-center gap-3 py-1.5">
                      {onView && (
                        <button
                          className="rounded-lg border border-gray-300 bg-white p-2 text-gray-600 transition hover:border-gray-500 hover:bg-gray-50 dark:bg-boxdark dark:text-gray-400"
                          onClick={() => onView(item)}
                        >
                          <FiEye className="h-4 w-4" />
                        </button>
                      )}
                      {handleEdit && (
                        <button
                          className="rounded-lg border border-gray-300 bg-white p-2 text-gray-600 transition hover:border-gray-500 hover:bg-gray-50 dark:bg-boxdark dark:text-gray-400"
                          onClick={() => handleEdit(item)}
                        >
                          <FiEdit className="h-4 w-4" />
                        </button>
                      )}
                      {handleDelete && (
                        <button
                          className="rounded-lg border border-gray-300 bg-white p-2 text-red-600 transition hover:border-red-500 hover:bg-red-50 dark:text-red-400"
                          onClick={() => handleDelete(item)}
                        >
                          <MdDelete className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {!paginationOff && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm text-body dark:text-bodydark">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-2">
            <button
              className="rounded-lg border border-gray-300 bg-white p-2 text-gray-600 transition hover:border-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-form-strokedark dark:bg-boxdark dark:text-gray-400"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <GrFormPrevious className="h-4 w-4" />
            </button>
            <button
              className="rounded-lg border border-gray-300 bg-white p-2 text-gray-600 transition hover:border-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-form-strokedark dark:bg-boxdark dark:text-gray-400"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <GrFormNext className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenericTable;