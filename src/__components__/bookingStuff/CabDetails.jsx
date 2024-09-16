import PropTypes from 'prop-types'
import { FaCar, FaList, FaUserFriends } from 'react-icons/fa'
import Carousel from '../carousel/carousel'
import { InfoItem } from './InfoItem'
import StylishLoader from '../loader/StylishLoader'
import MessageDisplay from '../Error/messageDisplay'

export const CabDetails = ({ cabdata, isLoading }) => {
    if (isLoading) {
        return (
            <StylishLoader
                size="large"
                color="#2ecc71"
            />
        )
    }

    // If cabData is null or undefined
    if (!cabdata) {
        return (
            <MessageDisplay
                message="Cab Details are missing"
                type="error"
            />
        )
    }

    return (
        <section className="booking_booking-detail__ride">
            <h2>Your Ride</h2>
            <div className="booking_cab-card">
                <Carousel images={cabdata.photos || []} />
                <div className="booking_cab-card__info">
                    <InfoItem
                        icon={FaCar}
                        label="Model"
                        value={cabdata.modelName || 'N/A'}
                    />
                    <InfoItem
                        icon={FaUserFriends}
                        label="Capacity"
                        value={cabdata.capacity || 'N/A'}
                    />
                    <InfoItem
                        icon={FaList}
                        label="Features"
                        value={cabdata.feature || 'N/A'}
                    />
                </div>
            </div>
        </section>
    )
}

// PropTypes for prop validation
CabDetails.propTypes = {
    cabdata: PropTypes.shape({
        photos: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string.isRequired
            })
        ),
        modelName: PropTypes.string,
        capacity: PropTypes.number,
        feature: PropTypes.string
    }),
    isLoading: PropTypes.bool.isRequired
}
