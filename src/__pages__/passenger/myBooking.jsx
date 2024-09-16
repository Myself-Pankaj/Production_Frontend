import { Fragment } from 'react'
import { useMyOrderQuery } from '../../__redux__/api/orderApi'
import OrderCard from '../../__components__/cards/orderCard'
import StylishLoader from '../../__components__/loader/StylishLoader'
import MessageDisplay from '../../__components__/Error/messageDisplay'
import messages from '../../__constants__/messages'

const MyBooking = () => {
    const { data: Order, isLoading, isError } = useMyOrderQuery()

    if (isError) {
        return (
            <MessageDisplay
                message="No Order Found"
                type="error"
            />
        )
    }

    if (isLoading || !Order) {
        return (
            <StylishLoader
                size="large"
                color="#6c63ff"
            />
        )
    }
    return (
        <Fragment>
            {Order.length !== 0 ? (
                <div className="booking_container">
                    {Order.map((order) => (
                        <OrderCard
                            key={order._id}
                            order={order}
                        />
                    ))}
                </div>
            ) : (
                <MessageDisplay message={messages.NO_ORDER_YET} />
            )}
        </Fragment>
    )
}

export default MyBooking
