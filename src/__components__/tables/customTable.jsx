// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import PaginationControls from '../pagination/pagination'
import MessageDisplay from '../Error/messageDisplay'
import messages from '../../__constants__/messages'

const CustomTable = ({ columns, data, currentPage, totalPages, onPageChange }) => {
    if (data.length === 0) {
        return <MessageDisplay message={messages.NO_DATA_TO_DISPLAY} />
    }
    return (
        <div className="custom-table-container">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="p-2 text-left border">
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr
                            key={index}
                            className="border-b hover:bg-gray-50">
                            {columns.map((column) => (
                                <td
                                    key={column.key}
                                    className="p-2 border">
                                    {row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <PaginationControls
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </div>
    )
}

CustomTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired
        })
    ).isRequired,
    data: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}

export default CustomTable
