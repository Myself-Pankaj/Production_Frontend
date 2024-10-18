// eslint-disable-next-line no-unused-vars
import React from 'react'
import StylishLoader from '../loader/StylishLoader'
import MessageDisplay from '../Error/messageDisplay'
import { InfoItem } from '../bookingStuff/InfoItem'
import Carousel from '../carousel/carousel.jsx'
import { FaCar, FaMailBulk, FaPhone, FaUserAlt, FaUserFriends } from 'react-icons/fa'
import { MdConfirmationNumber } from 'react-icons/md'
import PropTypes from 'prop-types'

const DriverCard = ({ driver, isLoading = false }) => {
    if (isLoading) {
        return (
            <StylishLoader
                size="large"
                color="#2ecc71"
            />
        )
    }

    if (!driver) {
        return (
            <MessageDisplay
                message="Details are missing"
                type="error"
            />
        )
    }

    const { username, email, phoneNumber, avatar } = driver.driverId
    const { modelName, cabNumber, capacity, photos } = driver.bookedCab || {}

    return (
        <section className="admin_booking-detail__driver">
            <h2>Driver Information</h2>
            <section className="admin_booking-detail__driver-info">
                <div className="admin_booking_driver-card">
                    {avatar?.url ? (
                        <img
                            src={avatar.url}
                            alt={username}
                            className="admin_booking-driver-card__avatar"
                        />
                    ) : (
                        <div className="admin_booking-passenger-card__avatar">{username[0].toUpperCase()}</div>
                    )}
                </div>
                <div className="admin_booking-driver-card__info">
                    <InfoItem
                        icon={FaMailBulk}
                        label="Email"
                        value={email}
                    />
                    <InfoItem
                        icon={FaUserAlt}
                        label="Username"
                        value={username}
                    />
                    <InfoItem
                        icon={FaPhone}
                        label="Phone Number"
                        value={phoneNumber}
                    />
                </div>
            </section>
            {driver.bookedCab && (
                <section className="admin_booking-booking-detail__ride">
                    <h2>Your Ride</h2>
                    <div className="admin_booking-cab-card">
                        <Carousel images={photos || []} />
                        <div className="admin_booking-cab-card__info">
                            <InfoItem
                                icon={FaCar}
                                label="Model"
                                value={modelName}
                            />
                            <InfoItem
                                icon={MdConfirmationNumber}
                                label="Number"
                                value={cabNumber}
                            />
                            <InfoItem
                                icon={FaUserFriends}
                                label="Capacity"
                                value={capacity}
                            />
                        </div>
                    </div>
                </section>
            )}
        </section>
    )
}

// Define PropTypes
DriverCard.propTypes = {
    driver: PropTypes.shape({
        driverId: PropTypes.shape({
            username: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            phoneNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            avatar: PropTypes.shape({
                url: PropTypes.string
            })
        }).isRequired,
        bookedCab: PropTypes.shape({
            modelName: PropTypes.string,
            cabNumber: PropTypes.string,
            capacity: PropTypes.number,
            photos: PropTypes.arrayOf(PropTypes.object)
        })
    }),
    isLoading: PropTypes.bool
}

export default DriverCard
