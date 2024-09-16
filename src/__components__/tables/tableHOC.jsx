import React from 'react'
import PropTypes from 'prop-types'
const TableHOC = ({ data, columns, itemsPerPage, filterableColumns }) => {
    const [currentPage, setCurrentPage] = React.useState(1)
    const [filteredData, setFilteredData] = React.useState(data)
    const [filters, setFilters] = React.useState({})

    React.useEffect(() => {
        setFilteredData(data)
    }, [data])

    React.useEffect(() => {
        const filtered = data.filter((item) => {
            return Object.entries(filters).every(([key, value]) => {
                if (!value) return true
                const itemValue = item[key]
                if (itemValue == null) return false
                return itemValue.toString().toLowerCase().includes(value.toLowerCase())
            })
        })
        setFilteredData(filtered)
        setCurrentPage(1)
    }, [filters, data])

    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)
    const totalPages = Math.ceil(filteredData.length / itemsPerPage)

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage)
    }

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
    }

    return (
        <div className="admin_custom-table-container">
            <div className="admin_filter-section">
                {columns.map(
                    (column) =>
                        filterableColumns.includes(column.key) && (
                            <input
                                key={column.key}
                                type="text"
                                placeholder={`Filter ${column.title}`}
                                onChange={(e) => handleFilterChange(column.key, e.target.value)}
                            />
                        )
                )}
            </div>
            <table>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>{column.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((row, index) => (
                        <tr key={index}>
                            {columns.map((column) => (
                                <td key={column.key}>{row[column.key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="admin_pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}>
                    Previous
                </button>
                <span>
                    {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    )
}

TableHOC.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired, // Array of data objects for each row
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired, // Key representing the column (must match the data object's key)
            title: PropTypes.string.isRequired // Title for the column header
        })
    ).isRequired, // Array of column definitions
    itemsPerPage: PropTypes.number.isRequired, // Number of items to display per page
    filterableColumns: PropTypes.arrayOf(PropTypes.string).isRequired // List of columns (keys) that can be filtered
}

export default TableHOC
