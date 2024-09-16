// eslint-disable-next-line no-unused-vars
import React from 'react'
import CustomTable from '../tables/customTable'
import PropTypes from 'prop-types'

const FreeCab = ({
    requestDate,
    setRequestDate,
    fetchAvailableCabs,
    availableCabs,
    tableData,
    tableColumns,
    manualCabId,
    setManualCabId,
    handleAssignCab
}) => {
    return (
        <div className="admin_booking_cabs-container">
            <h2 className="admin_booking_cabs-title">Available Cabs</h2>
            <input
                type="date"
                value={requestDate}
                onChange={(e) => setRequestDate(e.target.value)}
                required
            />
            <button
                onClick={fetchAvailableCabs}
                className="admin_booking_fetch-cabs-btn">
                Fetch Available Cabs
            </button>
            {availableCabs.length > 0 ? (
                <div className="admin_booking_cabs-table-wrapper">
                    <CustomTable
                        data={tableData}
                        columns={tableColumns}
                        itemsPerPage={10}
                        filterableColumns={['modelName', 'capacity', 'driverName']}
                    />
                </div>
            ) : (
                <div className="admin_booking_manual-assign">
                    <input
                        type="text"
                        value={manualCabId}
                        onChange={(e) => setManualCabId(e.target.value)}
                        placeholder="Enter Cab ID"
                    />
                    <button onClick={() => handleAssignCab(manualCabId)}>Assign Manually</button>
                </div>
            )}
        </div>
    )
}

// Define PropTypes
FreeCab.propTypes = {
    requestDate: PropTypes.string.isRequired, // Assuming it's a string formatted date (e.g., "YYYY-MM-DD")
    setRequestDate: PropTypes.func.isRequired, // Function to update the date
    fetchAvailableCabs: PropTypes.func.isRequired, // Function to fetch available cabs
    availableCabs: PropTypes.arrayOf(PropTypes.object).isRequired, // Array of available cabs (each cab is an object)
    tableData: PropTypes.arrayOf(PropTypes.object).isRequired, // Data for the table (array of objects)
    tableColumns: PropTypes.arrayOf(PropTypes.object).isRequired, // Table columns definition (array of objects)
    manualCabId: PropTypes.string.isRequired, // Cab ID for manual assignment
    setManualCabId: PropTypes.func.isRequired, // Function to set manual cab ID
    handleAssignCab: PropTypes.func.isRequired // Function to handle manual cab assignment
}

// Set default props if needed (optional)
FreeCab.defaultProps = {
    availableCabs: [],
    manualCabId: ''
}

export default FreeCab
