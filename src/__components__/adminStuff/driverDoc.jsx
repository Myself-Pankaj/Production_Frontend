// eslint-disable-next-line no-unused-vars
import React from 'react'
import StylishLoader from '../loader/StylishLoader'
import date from '../../__utils__/date'
import PropTypes from 'prop-types'
const DriverDoc = ({ driver, isLoading }) => {
    if (isLoading) {
        return (
            <StylishLoader
                size="large"
                color="orange"
            />
        )
    }

    const { cab: cabDetail, createdAt, username, email, phoneNumber, isDocumentSubmited, haveCab, isVerifiedDriver, isReady } = driver
    const { cabId } = cabDetail || {} // Fallback to an empty object if cabDetail is undefined

    return (
        <div className="driver_info">
            <p>Since: {date.formatShortDate(createdAt, false)}</p>
            <p>Name: {username}</p>
            <p>Cab ID: {cabId}</p>
            <p>Email: {email}</p>
            <p>Phone No: {phoneNumber}</p>
            {haveCab ? (
                <div className="driver_info_document-status">
                    <span>
                        <p>Verified</p>
                        <p style={{ backgroundColor: isDocumentSubmited ? 'green' : 'red' }}>{isDocumentSubmited ? 'Yes' : 'No'}</p>
                    </span>
                    <span>
                        <p>Is Ready</p>
                        <p style={{ backgroundColor: isReady ? 'green' : 'red' }}>{isVerifiedDriver ? 'Yes' : 'No'}</p>
                    </span>
                </div>
            ) : (
                <div className="driver_info_document-status">
                    <span>
                        <p>Verified</p>
                        <p style={{ backgroundColor: isDocumentSubmited ? 'green' : 'red' }}>{isDocumentSubmited ? 'Yes' : 'No'}</p>
                    </span>
                    <span>
                        <p>Car Owned</p>
                        <p style={{ backgroundColor: haveCab ? 'green' : 'red' }}>{haveCab ? 'Yes' : 'No'}</p>
                    </span>
                </div>
            )}
        </div>
    )
}

// Define PropTypes
DriverDoc.propTypes = {
    driver: PropTypes.shape({
        cab: PropTypes.shape({
            cabId: PropTypes.string,
            cabNumber: PropTypes.string,
            capacity: PropTypes.number,
            feature: PropTypes.string,
            pastBookings: PropTypes.arrayOf(PropTypes.object),
            upcomingBookings: PropTypes.arrayOf(PropTypes.object),
            modelName: PropTypes.string
        }),
        driverDocuments: PropTypes.arrayOf(PropTypes.object),
        createdAt: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phoneNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        isDocumentSubmited: PropTypes.bool.isRequired,
        haveCab: PropTypes.bool.isRequired,
        isVerifiedDriver: PropTypes.bool.isRequired,
        isVerified: PropTypes.bool.isRequired,
        isReady: PropTypes.bool.isRequired
    }).isRequired,
    isLoading: PropTypes.bool
}

// Set default props
DriverDoc.defaultProps = {
    isLoading: false
}
export default DriverDoc
