import PropTypes from 'prop-types'
import { FaEnvelope, FaHourglassHalf, FaPhone } from 'react-icons/fa'
import MessageDisplay from '../Error/messageDisplay' // Assuming MessageDisplay is a reusable component for displaying messages
import { InfoItem } from './InfoItem' // Assuming InfoItem is a reusable component for displaying info items
import StylishLoader from '../loader/StylishLoader'

const DriverDetails = ({ orderData, driverData, isLoading }) => {
    // Loading state

    if (isLoading) {
        return (
            <StylishLoader
                size="large"
                color="#ff006e"
            />
        )
    }

    if (!driverData) {
        return (
            <MessageDisplay
                message="Driver details are missing!"
                type="info"
            />
        )
    }
    // If no order data is found
    if (!orderData) {
        return (
            <MessageDisplay
                message="No order data available!"
                type="not-found"
            />
        )
    }

    const isPending = orderData.bookingStatus === 'Pending'

    return (
        <section className="booking_booking-detail__driver">
            <h2>Driver Information</h2>
            {isPending ? <PendingDriverInfo /> : <DriverInfo driverData={driverData} />}
        </section>
    )
}

const DriverInfo = ({ driverData }) => (
    <div className="booking_driver-card">
        <DriverAvatar driverData={driverData} />
        <div className="booking_driver-card__info">
            <h3>{driverData.username}</h3>
            <InfoItem
                icon={FaEnvelope}
                label="Email"
                value={driverData.email || 'N/A'}
            />
            <InfoItem
                icon={FaPhone}
                label="Phone"
                value={driverData.phoneNumber || 'N/A'}
            />
        </div>
    </div>
)

const DriverAvatar = ({ driverData }) =>
    driverData?.avatar?.url ? (
        <img
            src={driverData.avatar.url}
            alt={driverData.username}
            className="booking_driver-card__avatar"
        />
    ) : (
        <div className="booking_driver-card__avatar">{driverData.username[0].toUpperCase()}</div>
    )

const PendingDriverInfo = () => (
    <div className="booking_driver-pending">
        <FaHourglassHalf aria-hidden="true" />
        <h3>Assigning Your Driver</h3>
        <p>
            We are working on finding the perfect driver for your journey. This may take up to 3-4 hours. We wll notify you via WhatsApp once a driver
            is assigned.
        </p>
    </div>
)

// PropTypes validation
DriverDetails.propTypes = {
    orderData: PropTypes.shape({
        bookingStatus: PropTypes.string.isRequired
    }),
    driverData: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string,
        phoneNumber: PropTypes.number,
        avatar: PropTypes.shape({
            url: PropTypes.string
        })
    }),
    isLoading: PropTypes.bool.isRequired
}

DriverInfo.propTypes = {
    driverData: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string,
        phoneNumber: PropTypes.number,
        avatar: PropTypes.shape({
            url: PropTypes.string
        })
    }).isRequired
}

DriverAvatar.propTypes = {
    driverData: PropTypes.shape({
        username: PropTypes.string.isRequired,
        avatar: PropTypes.shape({
            url: PropTypes.string
        })
    }).isRequired
}

export default DriverDetails
