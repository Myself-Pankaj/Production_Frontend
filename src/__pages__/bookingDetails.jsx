import React from 'react'
import { useParams } from 'react-router-dom'
import { useOrderDetailQuery } from '../__redux__/api/orderApi'
import { useCabDetailQuery } from '../__redux__/api/cabApi'
import { useMeIdQuery } from '../__redux__/api/authApi'
import { JourneySection } from '../__components__/bookingStuff/JourneySection'
import { PassengersSection } from '../__components__/bookingStuff/PassengersSection'
import { PaymentSection } from '../__components__/bookingStuff/PaymentSection'
import { CabDetails } from '../__components__/bookingStuff/CabDetails'
import DriverDetails from '../__components__/bookingStuff/DriverDetails'
import MessageDisplay from '../__components__/Error/messageDisplay'

const BookingDetails = () => {
    const { id } = useParams()
    const {
        data: orderDetail,
        isLoading: orderLoading,
        isError: orderError
    } = useOrderDetailQuery(id, {
        refetchOnReconnect: true
    })

    const bookedCabId = React.useMemo(() => orderDetail?.bookedCab, [orderDetail])

    const {
        data: cabData,
        isLoading: cabLoading,
        isError: cabError
    } = useCabDetailQuery(bookedCabId, {
        skip: !bookedCabId
    })
    const driverId = React.useMemo(() => cabData?.belongsTo, [cabData])

    const {
        data: driverData,
        isLoading: driverLoading,
        isError: driverError
    } = useMeIdQuery(driverId, {
        skip: !driverId
    })
    if (orderError) {
        return (
            <MessageDisplay
                message="Error Loading Order Details !"
                type="error"
            />
        )
    }
    if (cabError) {
        return (
            <MessageDisplay
                message="Error Loading Cab Details !"
                type="error"
            />
        )
    }
    if (driverError) {
        return (
            <MessageDisplay
                message="Error Loading Driver Details !"
                type="error"
            />
        )
    }
    const passengerDetails = orderDetail?.passengers
    const tempLoading = orderLoading && driverLoading

    return (
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
            <CabDetails
                cabdata={cabData}
                isLoading={cabLoading}
            />

            <PaymentSection
                order={orderDetail}
                isLoading={orderLoading}
            />
            <DriverDetails
                orderData={orderDetail}
                driverData={driverData}
                isLoading={tempLoading}
            />
        </div>
    )
}

export default BookingDetails
