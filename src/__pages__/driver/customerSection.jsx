import PropTypes from 'prop-types'
import MessageDisplay from '../../__components__/Error/messageDisplay'
import StylishLoader from '../../__components__/loader/StylishLoader'
import { useMeIdQuery } from '../../__redux__/api/authApi'
import { InfoItem } from '../../__components__/bookingStuff/InfoItem'
import { FaEnvelope, FaPhone } from 'react-icons/fa'

const CustomerSection = ({ Id, orderLoading }) => {
    const {
        data: customerData,
        isLoading: driverLoading,
        isError: driverError
    } = useMeIdQuery(Id, {
        skip: !Id
    })

    // Handle case where Id is missing
    if (!Id) {
        return (
            <MessageDisplay
                message="User details are not updated"
                type="error"
            />
        )
    }

    // Handle case where there's an error fetching customer data
    if (!customerData || driverError) {
        return (
            <MessageDisplay
                message="User details could not be retrieved"
                type="error"
            />
        )
    }

    // Handle loading states for both the customer and order data
    if (orderLoading || driverLoading) {
        return (
            <StylishLoader
                size="large"
                color="black"
            />
        )
    }

    return (
        <section className="booking_booking-detail__driver">
            <h2>User Information</h2>
            <CustomerInfo customerData={customerData} />
        </section>
    )
}

const CustomerInfo = ({ customerData }) => (
    <div className="booking_driver-card">
        <CustomerAvatar customerData={customerData} />
        <div className="booking_driver-card__info">
            <h3>{customerData.username || 'Unknown User'}</h3>
            <InfoItem
                icon={FaEnvelope}
                label="Email"
                value={customerData.email || 'N/A'}
            />
            <InfoItem
                icon={FaPhone}
                label="Phone"
                value={customerData.phoneNumber ? customerData.phoneNumber.toString() : 'N/A'}
            />
        </div>
    </div>
)

const CustomerAvatar = ({ customerData }) =>
    customerData?.avatar?.url ? (
        <img
            src={customerData.avatar.url}
            alt={customerData.username || 'User Avatar'}
            className="booking_driver-card__avatar"
        />
    ) : (
        <div className="booking_driver-card__avatar">{customerData?.username ? customerData.username[0].toUpperCase() : 'U'}</div>
    )

// PropTypes for CustomerSection
CustomerSection.propTypes = {
    Id: PropTypes.string.isRequired, // Ensure Id is a string and required
    orderLoading: PropTypes.bool.isRequired // Ensure orderLoading is a boolean and required
}

// PropTypes for CustomerInfo
CustomerInfo.propTypes = {
    customerData: PropTypes.shape({
        username: PropTypes.string.isRequired,
        email: PropTypes.string,
        phoneNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Allow both string and number for phoneNumber
        avatar: PropTypes.shape({
            url: PropTypes.string
        })
    }).isRequired
}

// PropTypes for CustomerAvatar
CustomerAvatar.propTypes = {
    customerData: PropTypes.shape({
        username: PropTypes.string,
        avatar: PropTypes.shape({
            url: PropTypes.string
        })
    }).isRequired
}

export default CustomerSection
