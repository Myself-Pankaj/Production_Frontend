// eslint-disable-next-line no-unused-vars
import React from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useCancelBookingMutation, useCompleteBookingMutation, useConfirmBookingMutation } from '../../__redux__/api/driverApi'
import date from '../../__utils__/date'
import { useNavigate } from 'react-router-dom'

const BookingCard = ({ booking, type }) => {
    const { orderId, departureDate, dropOffDate } = booking

    const navigate = useNavigate()
    const [confirmBooking, { isLoading: isConfirming }] = useConfirmBookingMutation()
    const [cancelBooking, { isLoading: isCancelling }] = useCancelBookingMutation()
    const [completeBooking, { isLoading: isCompleting }] = useCompleteBookingMutation()

    const handleAccept = async () => {
        try {
            const res = await confirmBooking({ orderId: orderId._id }).unwrap()

            if (res.success) {
                toast.success(res.message)
            }
        } catch (error) {
            toast.error(error.data.message)
        }
    }

    const handleDecline = async () => {
        try {
            const res = await cancelBooking({ orderId: orderId._id }).unwrap()
            if (res.success) {
                toast.success(res.message)
            }
        } catch (error) {
            toast.error(error.data.message)
        }
    }

    const handleComplete = async () => {
        try {
            const res = await completeBooking({ orderId: orderId._id }).unwrap()

            if (res.success) {
                toast.success(res.message)
            }
        } catch (error) {
            toast.error(error.data.message)
        }
    }

    const showDetail = () => {
        navigate(`/driver-order/${orderId._id}`)
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    }

    const itemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    }

    const isBookingComplete = new Date(dropOffDate) < new Date()

    return (
        <motion.div
            className="driver_dashboard_booking-card"
            variants={cardVariants}
            initial="hidden"
            animate="visible">
            <motion.div
                className="driver_dashboard_booking-info"
                variants={itemVariants}>
                <h3>
                    Booking ID: <span>{orderId._id}</span>
                </h3>
                <p>
                    Pickup: <span>{orderId.pickupLocation}</span>
                </p>
                <p>
                    Dropoff: <span>{orderId.destination}</span>
                </p>
                <p>
                    Departure: <span>{date.formatShortDate(departureDate)}</span>
                </p>
                <p>
                    Return: <span>{date.formatShortDate(dropOffDate)}</span>
                </p>
                <p>
                    Status: <span>{booking.status}</span>
                </p>
            </motion.div>
            <div className="driver_dashboard_booking-actions">
                {type === 'upcoming' && (
                    <>
                        <button
                            className="driver_dashboard_btn-accept"
                            onClick={handleAccept}
                            disabled={isConfirming}>
                            {isConfirming ? 'Accepting...' : 'Accept'}
                        </button>
                        <button
                            className="driver_dashboard_btn-decline"
                            onClick={handleDecline}
                            disabled={isCancelling}>
                            {isCancelling ? 'Declining...' : 'Decline'}
                        </button>
                    </>
                )}
                {type === 'confirmed' && isBookingComplete && (
                    <button
                        className="driver_dashboard_btn-accept"
                        onClick={handleComplete}
                        disabled={isCompleting}>
                        {isCompleting ? 'Completing...' : 'Complete'}
                    </button>
                )}
                <button
                    className="driver_dashboard_btn-details"
                    onClick={showDetail}>
                    Details
                </button>
            </div>
        </motion.div>
    )
}

BookingCard.propTypes = {
    booking: PropTypes.shape({
        orderId: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            pickupLocation: PropTypes.string.isRequired,
            destination: PropTypes.string.isRequired
        }).isRequired,
        departureDate: PropTypes.string.isRequired,
        dropOffDate: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired
    }).isRequired,
    type: PropTypes.oneOf(['upcoming', 'confirmed']).isRequired
}

export default BookingCard
