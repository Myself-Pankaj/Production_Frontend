import React, { Fragment } from 'react'
import { useDriverCompletedBookingQuery } from '../../__redux__/api/driverApi'
import MessageDisplay from '../../__components__/Error/messageDisplay'
import StylishLoader from '../../__components__/loader/StylishLoader'
import OrderCard from '../../__components__/cards/orderCard'
import PaginationControls from '../../__components__/pagination/pagination'

const DriverCompletedBooking = () => {
    const [page, setPage] = React.useState(1)
    const [limit] = React.useState(5)

    const { data: orderData, isLoading, isError } = useDriverCompletedBookingQuery({ page, limit })

    if (isLoading) {
        return (
            <StylishLoader
                size="large"
                color="#6c63ff"
            />
        )
    }

    if (isError || !orderData) {
        return (
            <MessageDisplay
                message="No Order Found"
                type="error"
            />
        )
    }

    const { data: orders, pagination } = orderData

    return (
        <Fragment>
            <div className="booking_container">
                {orders.map((order) => (
                    <OrderCard
                        key={order._id}
                        order={order}
                        driver={true}
                    />
                ))}
            </div>
            <PaginationControls
                currentPage={page}
                totalPages={pagination.totalPages}
                onPageChange={setPage}
            />
        </Fragment>
    )
}

export default DriverCompletedBooking
