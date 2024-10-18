// eslint-disable-next-line no-unused-vars
import React from 'react'
import { FaCalendarAlt, FaCogs, FaFileInvoice } from 'react-icons/fa'
import date from '../../__utils__/date'
import StylishLoader from '../loader/StylishLoader'
import MessageDisplay from '../Error/messageDisplay'
import PropTypes from 'prop-types'
import { FaStackpath } from 'react-icons/fa6'

const SummarySection = ({ order, isLoading = false }) => {
    if (isLoading) {
        return (
            <StylishLoader
                size="large"
                color="#2ecc71"
            />
        )
    }

    if (!order) {
        return (
            <MessageDisplay
                message="Details are missing"
                type="error"
            />
        )
    }

    return (
        <section className="booking_booking-detail__payment">
            <h2>Booking Details</h2>
            <div className="booking_payment-card">
                <div className="booking_payment-card__method">
                    <i className="fas fa-credit-card">
                        <FaFileInvoice />
                    </i>
                    <h3>Ref No.</h3>
                    <p>{order._id}</p>
                </div>
                <div className="booking_payment-card__amount">
                    <i className="fas fa-dollar-sign">
                        <FaCalendarAlt />
                    </i>
                    <h3>Created At</h3>
                    <p style={{ color: 'green' }}>{date.formatShortDate(order.createdAt)}</p>
                </div>
                <div className="booking_payment-card__amount">
                    <i className="fas fa-dollar-sign">
                        <FaCogs />
                    </i>
                    <h3>Seats</h3>
                    <p style={{ color: 'red' }}>₹ {order.bookedCab.capacity}</p>
                </div>
                <div className="booking_payment-card__amount">
                    <i className="fas fa-dollar-sign">
                        <FaStackpath />
                    </i>
                    <h3>Status</h3>
                    <p style={order.bookingStatus === 'completed' ? { color: 'green' } : { color: 'red' }}>{order.bookingStatus}</p>
                </div>
            </div>
        </section>
    )
}

// Define PropTypes
SummarySection.propTypes = {
    order: PropTypes.shape({
        _id: PropTypes.string.isRequired, // Assuming order._id is a string
        createdAt: PropTypes.string.isRequired, // Assuming it's a date string
        bookingStatus: PropTypes.string.isRequired,
        bookedCab: PropTypes.shape({
            capacity: PropTypes.number.isRequired // Capacity is a number
        }).isRequired // bookedCab is required and must have a capacity
    }).isRequired,
    isLoading: PropTypes.bool // isLoading is optional and can be a boolean
}

export default SummarySection
