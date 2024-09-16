// eslint-disable-next-line no-unused-vars
import React, { Fragment } from 'react'
import date from '../../__utils__/date'
import StylishLoader from '../loader/StylishLoader'
import PropTypes from 'prop-types'

const BookingSection = ({ cab, isLoading }) => {
    if (isLoading) {
        return (
            <StylishLoader
                size="large"
                color="black"
            />
        )
    }
    return (
        <Fragment>
            <div className="admin_driver_bookings">
                <BookingList
                    title="Upcoming Bookings"
                    bookings={cab.upcomingBookings}
                />
            </div>
        </Fragment>
    )
}

BookingSection.propTypes = {
    cab: PropTypes.shape({
        upcomingBookings: PropTypes.array.isRequired
    }).isRequired,
    isLoading: PropTypes.bool.isRequired
}
export default BookingSection

const BookingList = ({ title, bookings }) => (
    <div className="admin_driver_booking-list">
        <h2>{title}</h2>
        {bookings.length === 0 ? (
            <p>No bookings available.</p>
        ) : (
            bookings.map((booking) => (
                <div
                    key={booking.orderId}
                    className="admin_driver_booking-item">
                    <p>
                        <strong>Order ID:</strong> {booking.orderId}
                    </p>
                    <p>
                        <strong>Departure:</strong> {date.formatShortDate(booking.departureDate)}
                    </p>
                    <p>
                        <strong>Drop-off:</strong> {date.formatShortDate(booking.dropOffDate)}
                    </p>
                    <p>
                        <strong>Status:</strong> {booking.status}
                    </p>
                </div>
            ))
        )}
    </div>
)

BookingList.propTypes = {
    title: PropTypes.string.isRequired,
    bookings: PropTypes.arrayOf(
        PropTypes.shape({
            orderId: PropTypes.string.isRequired,
            departureDate: PropTypes.string.isRequired,
            dropOffDate: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired
        })
    ).isRequired
}
