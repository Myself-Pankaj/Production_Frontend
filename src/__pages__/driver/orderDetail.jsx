/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { useOrderDetailQuery } from '../../__redux__/api/orderApi'
import MessageDisplay from '../../__components__/Error/messageDisplay'
import { JourneySection } from '../../__components__/bookingStuff/JourneySection'
import { PassengersSection } from '../../__components__/bookingStuff/PassengersSection'
import Payment from '../../__components__/driverStuff/payment'
import CustomerSection from './customerSection'

const OrderDetail = () => {
    const { id } = useParams()
    const {
        data: orderDetail,
        isLoading: orderLoading,
        isError: orderError
    } = useOrderDetailQuery(id, {
        refetchOnReconnect: true
    })
    if (orderError) {
        ;<MessageDisplay
            message="Error Loading Order Details"
            type="error"
        />
    }
    const passengerDetails = orderDetail?.passengers
    return (
        <Fragment>
            <div className="booking_booking-detail">
                <h1 className="booking_booking-detail__title">Your Journey Details</h1>

                <JourneySection
                    order={orderDetail}
                    isLoading={orderLoading}
                />
                <PassengersSection
                    passengers={passengerDetails}
                    isLoading={orderLoading}
                />

                <Payment
                    order={orderDetail}
                    isLoading={orderLoading}
                />
                <CustomerSection
                    Id={orderDetail?.userId}
                    isLoading={orderLoading}
                />
                <h2 className="booking_booking-detail-quotes">
                    After finalizing your booking, you'll receive either immediate payment through our system or a payout processed within 3 business
                    days, depending on the order type.
                </h2>
            </div>
        </Fragment>
    )
}

export default OrderDetail
