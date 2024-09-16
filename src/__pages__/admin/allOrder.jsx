import React from 'react'
import { useFetchAllOrdersQuery } from '../../__redux__/api/adminApi'
import MessageDisplay from '../../__components__/Error/messageDisplay'
import messages from '../../__constants__/messages'
import date from '../../__utils__/date'
import AdminSidebar from './adminSidebar'
import StylishLoader from '../../__components__/loader/StylishLoader'
import CustomTable from '../../__components__/tables/customTable'

const AllOrder = () => {
    const [page, setPage] = React.useState(1)
    const [limit] = React.useState(10)

    const { data: adminBookings, isLoading: bookingLoading, isError } = useFetchAllOrdersQuery({ page, limit })

    let loading = bookingLoading || !adminBookings
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= adminBookings?.pagination?.totalPages) {
            setPage(newPage)
        }
    }
    const columns = [
        { key: 'id', title: 'Ref No.' },
        { key: 'pickupLocation', title: 'From' },
        { key: 'destination', title: 'To' },
        { key: 'bookingStatus', title: 'Booking Status' },
        { key: 'bookingAmount', title: 'Fair' },
        { key: 'departureDate', title: 'Departure' },
        { key: 'paymentMethod', title: 'Pay Method' }
    ]
    const formatData = (data) => {
        if (!data || !data.data) return []

        const getFirstWord = (str) => {
            if (!str) return 'N/A'
            return str.split(' ')[0]
        }
        return data.data.map((booking) => ({
            avalibility: booking.avalibility || 'N/A',
            pickupLocation: getFirstWord(booking.pickupLocation) || 'N/A',
            destination: getFirstWord(booking.destination) || 'N/A',
            bookingStatus: booking.bookingStatus || 'N/A',
            paymentMethod: booking.paymentMethod || 'N/A',
            bookingAmount: Math.round(booking.bookingAmount) || 'N/A',
            id: booking._id || 'N/A',
            departureDate: date.formatShortDate(booking.departureDate)
        }))
    }
    const formattedData = formatData(adminBookings)
    return (
        <div className="admin-container">
            <AdminSidebar />
            {loading ? (
                <StylishLoader
                    size="large"
                    color="cyan"
                />
            ) : (
                <main>
                    {isError ? (
                        <MessageDisplay
                            message={messages.NO_DATA_TO_DISPLAY}
                            type="error"
                        />
                    ) : (
                        <CustomTable
                            columns={columns}
                            data={formattedData}
                            currentPage={page}
                            totalPages={adminBookings?.pagination?.totalPages || 1}
                            onPageChange={handlePageChange}
                        />
                    )}
                </main>
            )}
        </div>
    )
}

export default AllOrder
