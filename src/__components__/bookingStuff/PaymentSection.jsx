import PropTypes from 'prop-types'
import { FaCreditCard, FaWallet, FaHashtag, FaCheckCircle, FaExclamationTriangle, FaCalculator, FaRupeeSign } from 'react-icons/fa'
import StylishLoader from '../loader/StylishLoader'
import MessageDisplay from '../Error/messageDisplay'

export const PaymentSection = ({ order, isLoading }) => {
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
                message="Order details are msising"
                type="error"
            />
        )
    }

    return (
        <section className="booking_booking-detail__payment">
            <h2>Payment Details</h2>
            <div className="booking_payment-card">
                <PaymentInfo
                    icon={FaCreditCard}
                    label="Method"
                    value={order.paymentMethod}
                />
                <PaymentInfo
                    icon={FaRupeeSign}
                    label="Amount Paid"
                    value={`₹ ${order.paidAmount}`}
                    style={{ color: 'green' }}
                />
                <PaymentInfo
                    icon={FaWallet}
                    label="Amount Remaining"
                    value={`₹ ${order.bookingAmount - order.paidAmount}`}
                    style={{ color: 'red' }}
                />
                <PaymentInfo
                    icon={FaCalculator}
                    label="Total Amount"
                    value={`₹ ${order.bookingAmount}`}
                />
                {order.paymentMethod !== 'Cash' && (
                    <PaymentInfo
                        icon={FaHashtag}
                        label="Transaction ID"
                        value={order.razorpayOrderId || 'N/A'}
                    />
                )}
                <PaymentInfo
                    icon={order.paymentStatus !== 'Paid' ? FaExclamationTriangle : FaCheckCircle}
                    label="Payment Status"
                    value={order.paymentStatus}
                    style={order.paymentStatus !== 'Paid' ? { color: 'red' } : { color: 'green' }}
                />
            </div>
        </section>
    )
}

const PaymentInfo = ({ icon: Icon, label, value, style }) => (
    <div
        className="booking_payment-card__amount"
        style={style}>
        <Icon />
        <h3>{label}</h3>
        <p>{value}</p>
    </div>
)

// Prop validation
PaymentSection.propTypes = {
    order: PropTypes.shape({
        paymentMethod: PropTypes.string.isRequired,
        paidAmount: PropTypes.number.isRequired,
        bookingAmount: PropTypes.number.isRequired,
        razorpayOrderId: PropTypes.string,
        paymentStatus: PropTypes.string.isRequired
    }),
    isLoading: PropTypes.bool.isRequired
}

PaymentInfo.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    style: PropTypes.object
}
