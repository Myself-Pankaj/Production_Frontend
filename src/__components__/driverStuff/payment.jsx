import PropTypes from 'prop-types'
import MessageDisplay from '../Error/messageDisplay'
import StylishLoader from '../loader/StylishLoader'
import { FaCreditCard, FaRupeeSign } from 'react-icons/fa'

const Payment = ({ order, isLoading }) => {
    if (!order) {
        return (
            <MessageDisplay
                message="Payment details not updated"
                type="error"
            />
        )
    }
    if (isLoading) {
        return (
            <StylishLoader
                size="large"
                color="black"
            />
        )
    }
    const { driverShare, paymentMethod } = order
    const earning = driverShare?.driverCut || 0
    const paymentBy = paymentMethod !== 'Hybrid' ? 'UnPaid Booking' : 'Paid Booking'

    return (
        <div className="d_p_container">
            <>
                <div className="d_p_card d_p_earning">
                    <FaRupeeSign className="d_p_icon" />
                    <h2 className="d_p_title">Your Earning</h2>
                    <p className="d_p_amount">{earning.toFixed(2)}</p>
                </div>
                <div className="d_p_card d_p_order-type">
                    <FaCreditCard className="d_p_icon" />
                    <h2 className="d_p_title">Order Type</h2>
                    <p className="d_p_type">{paymentBy}</p>
                </div>
            </>
        </div>
    )
}
Payment.propTypes = {
    order: PropTypes.shape({
        driverShare: PropTypes.shape({
            driverCut: PropTypes.number.isRequired
        }).isRequired,
        paymentMethod: PropTypes.string.isRequired
    }),
    isLoading: PropTypes.bool
}
export default Payment
