import { Fragment } from 'react'
import { useMyOrderQuery } from '../../__redux__/api/orderApi'
import OrderCard from '../../__components__/cards/orderCard'
import StylishLoader from '../../__components__/loader/StylishLoader'
import MessageDisplay from '../../__components__/Error/messageDisplay'

const MyBooking = () => {
    const { data: Order, isLoading } = useMyOrderQuery()

    if (!Order) {
        return (
            <MessageDisplay
                message="No Order Found"
                type="error"
            />
        )
    }

    if (isLoading) {
        return (
            <StylishLoader
                size="large"
                color="#6c63ff"
            />
        )
    }
    return (
        <Fragment>
            <div className="booking_container">
                {Order.map((order) => (
                    <OrderCard
                        key={order._id}
                        order={order}
                    />
                ))}
            </div>
        </Fragment>
    )
}

export default MyBooking
