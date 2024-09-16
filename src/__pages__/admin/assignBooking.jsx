import React from 'react'
import { useFetchAllAssignedBookingQuery } from '../../__redux__/api/adminApi'
import MessageDisplay from '../../__components__/Error/messageDisplay'
import AdminSidebar from './adminSidebar'
import date from '../../__utils__/date'
import StylishLoader from '../../__components__/loader/StylishLoader'
import CustomTable from '../../__components__/tables/customTable'
import messages from '../../__constants__/messages'

const AssignBooking = () => {
    const [page, setPage] = React.useState(1)
    const [limit] = React.useState(10)

    const { data: assignBookings, isLoading: assignBookingLoading, isError } = useFetchAllAssignedBookingQuery({ page, limit })

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= assignBookings?.pagination?.totalPages) {
            setPage(newPage)
        }
    }

    const columns = [
        { key: 'id', title: 'Ref No.' },
        { key: 'driverName', title: 'Driver' },
        { key: 'driverEmail', title: 'Email' },
        { key: 'driverPhone', title: 'Phone No' },
        { key: 'pickupLocation', title: 'From' },
        { key: 'destination', title: 'To' },
        { key: 'departureDate', title: 'Departure' }
    ]

    const formatData = (data) => {
        if (!data || !data.data) return []

        const getFirstWord = (str) => {
            if (!str) return 'N/A'
            return str.split(' ')[0]
        }
        return data.data.map((booking) => ({
            id: booking._id || 'N/A',
            driverName: booking?.driverId?.username || 'N/A',
            pickupLocation: getFirstWord(booking.pickupLocation) || 'N/A',
            destination: getFirstWord(booking.destination) || 'N/A',
            driverEmail: booking?.driverId?.email || 'N/A',
            driverPhone: booking?.driverId?.phoneNumber || 'N/A',
            departureDate: date.formatShortDate(booking.departureDate)
        }))
    }
    let loading = assignBookingLoading || !assignBookings

    const formattedData = formatData(assignBookings)
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
                            totalPages={assignBookings?.pagination?.totalPages || 1}
                            onPageChange={handlePageChange}
                        />
                    )}
                </main>
            )}
        </div>
    )
}

export default AssignBooking
