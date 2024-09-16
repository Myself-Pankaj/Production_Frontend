// eslint-disable-next-line no-unused-vars
import React, { Fragment } from 'react'
import { useGetPendingOrderQuery } from '../../__redux__/api/orderApi'
import StylishLoader from '../../__components__/loader/StylishLoader'
import MessageDisplay from '../../__components__/Error/messageDisplay'
import date from '../../__utils__/date'
import messages from '../../__constants__/messages'

const OrderSection = () => {
    const {
        data: Order,
        isLoading,
        isError
    } = useGetPendingOrderQuery({
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true
    })
    if (isLoading) {
        return (
            <StylishLoader
                size="large"
                color="cyan"
            />
        )
    }
    if (isError) {
        return (
            <MessageDisplay
                message="Unable to fetch latest order"
                type="error"
            />
        )
    }
    if (!Order) {
        return <MessageDisplay message={messages.NO_PENDING('Order')} />
    }

    return (
        <Fragment>
            <h2 className="order_section_section-title">Latest Bookings</h2>
            <div className="order_section_order-section">
                <div className="order_section_order-carousel">
                    {Order.map((order) => (
                        <div
                            key={order._id}
                            className="order_section_order-card">
                            <div className="order_section_order-type">{order.bookingType}</div>
                            <div className="order_section_order-info">
                                <div className="order_section_info-item">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>From: {order.pickupLocation}</span>
                                </div>
                                <div className="order_section_info-item">
                                    <i className="fas fa-flag-checkered"></i>
                                    <span>To: {order.destination}</span>
                                </div>
                                <div className="order_section_info-item">
                                    <i className="far fa-calendar-alt"></i>
                                    <span>Date: {date.formatShortDate(order.departureDate)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}

export default OrderSection
