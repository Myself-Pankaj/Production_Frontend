// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useGetPendingOrderQuery } from '../../__redux__/api/orderApi'
import AdminSidebar from './adminSidebar'
import MessageDisplay from '../../__components__/Error/messageDisplay'
import messages from '../../__constants__/messages'
import StylishLoader from '../../__components__/loader/StylishLoader'
import date from '../../__utils__/date'
import { useNavigate } from 'react-router-dom'
import TableHOC from '../../__components__/tables/tableHOC'

const PendingOrder = () => {
    const {
        data: Order,
        isLoading,
        isError
    } = useGetPendingOrderQuery({
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true
    })
    const navigate = useNavigate()
    if (isError) {
        return (
            <MessageDisplay
                message={messages.ERROR_FETCHING_ORDER}
                type="error"
            />
        )
    }
    // console.log(Order);

    let Loading = isLoading

    const columns = [
        { key: 'id', title: 'Ref No.' },
        { key: 'pickupLocation', title: 'From' },
        { key: 'destination', title: 'To' },
        { key: 'bookingStatus', title: 'Booking Status' },
        { key: 'bookingAmount', title: 'Fair ₹' },
        { key: 'departureDate', title: 'Departure' },
        { key: 'paymentMethod', title: 'Pay Method' },

        { key: 'manage', title: 'Manage' }
    ]
    const formatData = (data) => {
        if (!data) return []

        const getFirstWord = (str) => {
            if (!str) return 'N/A'
            return str.split(' ')[0]
        }
        return data.map((booking) => ({
            avalibility: booking.avalibility || 'N/A',
            pickupLocation: getFirstWord(booking.pickupLocation) || 'N/A',
            destination: getFirstWord(booking.destination) || 'N/A',
            bookingStatus: booking.bookingStatus || 'N/A',
            paymentMethod: booking.paymentMethod || 'N/A',
            bookingAmount: Math.round(booking.bookingAmount) || 'N/A',
            id: booking._id || 'N/A',
            departureDate: date.formatShortDate(booking.departureDate),

            manage: <button onClick={() => handleManage(booking._id)}>Manage</button>
        }))
    }
    const handleManage = (id) => {
        navigate(`/admin/booking/pending/${id}`)
    }
    const filterableColumns = ['pickupLocation', 'destination', 'departureDate', 'paymentMethod', 'bookingStatus', 'id']
    const formattedData = formatData(Order)

    return (
        <div className="admin-container">
            <AdminSidebar />
            {Loading ? (
                <StylishLoader
                    size="large"
                    color="black"
                />
            ) : (
                <main>
                    {!Order ? (
                        <MessageDisplay message={messages.NO_PENDING('Booking')} />
                    ) : (
                        <TableHOC
                            data={formattedData}
                            columns={columns}
                            itemsPerPage={10}
                            filterableColumns={filterableColumns}
                        />
                    )}
                </main>
            )}
        </div>
    )
}

export default PendingOrder
