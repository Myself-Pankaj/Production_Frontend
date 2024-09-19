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
        <div className="custom_table_container">
            <table className="custom_table_">
                <thead>
                    <tr className="custom_table_">
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="custom_table_">
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr
                            key={index}
                            className="custom_table_">
                            {columns.map((column) => (
                                <td
                                    key={column.key}
                                    className="custom_table_">
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
