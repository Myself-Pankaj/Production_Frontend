import PropTypes from 'prop-types'
import { FaMapMarker, FaFlagCheckered, FaCalendar, FaTags, FaUser } from 'react-icons/fa'
import date from '../../__utils__/date'
import { InfoItem } from './InfoItem'
import MessageDisplay from '../Error/messageDisplay'
import StylishLoader from '../loader/StylishLoader'

export const JourneySection = ({ order, isLoading }) => {
    // Check if the data is loading
    if (isLoading) {
        return <StylishLoader size="large" />
    }

    // If the order is not found
    if (!order) {
        return (
            <MessageDisplay
                message="Booking Not Found !"
                type="error"
            />
        )
    }

    // Render the journey details
    return (
        <section className="booking_booking-detail__journey">
            <div className="booking_journey-card">
                <div className="booking_journey-card__path">
                    <JourneyPoint
                        icon={FaMapMarker}
                        title="From"
                        location={order.exactLocation || order.pickupLocation}
                    />
                    <div className="booking_journey-line"></div>
                    <JourneyPoint
                        icon={FaFlagCheckered}
                        title="To"
                        location={order.destination}
                    />
                </div>
                <div className="booking_journey-card__info">
                    <InfoItem
                        icon={FaCalendar}
                        label="Departure"
                        value={date.formatShortDate(order.departureDate, false)}
                    />
                    <InfoItem
                        icon={FaTags}
                        label="Booking Type"
                        value={order.bookingType}
                    />
                    {order.bookingType !== 'RoundTrip' ? (
                        <InfoItem
                            icon={FaUser}
                            label="Passengers"
                            value={order.numberOfPassengers}
                        />
                    ) : (
                        <InfoItem
                            icon={FaCalendar}
                            label="Return"
                            value={date.formatShortDate(order.dropOffDate, false)}
                        />
                    )}
                </div>
            </div>
        </section>
    )
}

const JourneyPoint = ({ icon: Icon, title, location }) => (
    <div className={`booking_journey-point booking_journey-point--${title.toLowerCase()}`}>
        <Icon />
        <h3>{title}</h3>
        <p>{location}</p>
    </div>
)

// Prop validation
JourneySection.propTypes = {
    order: PropTypes.shape({
        exactLocation: PropTypes.string,
        pickupLocation: PropTypes.string,
        destination: PropTypes.string.isRequired,
        departureDate: PropTypes.string.isRequired,
        bookingType: PropTypes.string.isRequired,
        dropOffDate: PropTypes.string.isRequired,
        numberOfPassengers: PropTypes.number.isRequired
    }),
    isLoading: PropTypes.bool.isRequired
}

JourneyPoint.propTypes = {
    icon: PropTypes.elementType.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired
}
