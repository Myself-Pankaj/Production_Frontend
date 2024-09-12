import PropTypes from 'prop-types'
import StylishLoader from '../loader/StylishLoader'
import MessageDisplay from '../Error/messageDisplay'

export const PassengersSection = ({ passengers, isLoading }) => {
    if (isLoading) {
        return (
            <StylishLoader
                size="large"
                color="cyan"
            />
        )
    }

    if (!passengers || passengers.length === 0) {
        return (
            <MessageDisplay
                message="Passenger Details are not avaliable"
                type="error"
            />
        )
    }

    return (
        <section className="booking_booking-detail__passengers">
            <h2>Passenger Details</h2>
            <div className="booking_passengers-list">
                {passengers.map((passenger) => (
                    <PassengerCard
                        key={passenger._id}
                        passenger={passenger}
                    />
                ))}
            </div>
        </section>
    )
}

const PassengerCard = ({ passenger }) => (
    <div className="booking_passenger-card">
        <div className="booking_passenger-card__avatar">
            {passenger.firstName[0]}
            {passenger.lastName[0]}
        </div>
        <div className="booking_passenger-card__info">
            <h3>
                {passenger.firstName} {passenger.lastName}
            </h3>
            <p>
                {passenger.gender}, {passenger.age || 'N/A'} years old
            </p>
        </div>
    </div>
)

// Prop validation
PassengersSection.propTypes = {
    passengers: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            gender: PropTypes.string.isRequired,
            age: PropTypes.number
        })
    ),
    isLoading: PropTypes.bool.isRequired
}

PassengerCard.propTypes = {
    passenger: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        age: PropTypes.number
    }).isRequired
}
