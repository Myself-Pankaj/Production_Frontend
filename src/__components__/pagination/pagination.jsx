import PropTypes from 'prop-types'

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="p_g_pagination-controls">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}>
                Previous
            </button>
            <span>
                Page <span className="p_g_current-page">{currentPage}</span> of {totalPages}
            </span>
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}>
                Next
            </button>
        </div>
    )
}

PaginationControls.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}

export default PaginationControls
