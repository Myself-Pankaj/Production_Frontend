import React from 'react'
import AdminSidebar from './adminSidebar'
import { useParams } from 'react-router-dom'
import { useOrderDetailQuery } from '../../__redux__/api/orderApi'
import { JourneySection } from '../../__components__/bookingStuff/JourneySection'
import { PassengersSection } from '../../__components__/bookingStuff/PassengersSection'
import { PaymentSection } from '../../__components__/bookingStuff/PaymentSection'
import SummarySection from '../../__components__/adminStuff/summarySection'
import DriverCard from '../../__components__/adminStuff/driverCard'
import { useAssignBookingMutation, useFetchFreeCabMutation } from '../../__redux__/api/adminApi'
import { toast } from 'react-toastify'
import CustomTable from '../../__components__/tables/customTable'
import StylishLoader from '../../__components__/loader/StylishLoader'
import MessageDisplay from '../../__components__/Error/messageDisplay'
import messages from '../../__constants__/messages'

const ManageBooking = () => {
    const { id } = useParams()
    const [availableCabs, setAvailableCabs] = React.useState([])
    const [pagination, setPagination] = React.useState(null)
    const [page, setPage] = React.useState(1)
    const limit = 10

    const { data: adminOrder, isLoading: orderLoading, isError: orderError, refetch: refetchOrder } = useOrderDetailQuery(id)

    const [fetchFreeCab, { isLoading: cabLoading, isError: mutationError }] = useFetchFreeCabMutation()
    const [assignCab] = useAssignBookingMutation()
    if (orderError) {
        return (
            <MessageDisplay
                message={messages.ERROR_FETCHING_ORDER}
                type="error"
            />
        )
    }

    const fetchAvailableCabs = async () => {
        try {
            const result = await fetchFreeCab({
                capacity: adminOrder.bookedCab.capacity,
                date: adminOrder.departureDate,
                page,
                limit
            }).unwrap()
            setAvailableCabs(result.data)
            setPagination(result.pagination)
        } catch (error) {
            toast.error(error.data?.message || 'Failed to fetch available cabs')
        }
    }

    const handleAssignCab = async (newCabId) => {
        try {
            const result = await assignCab({
                orderId: id,
                newCabId
            }).unwrap()

            toast.success(result.message)
            refetchOrder()
            setAvailableCabs([])
        } catch (error) {
            toast.error(error.data?.message || 'Failed to assign cab')
        }
    }

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination?.totalPages) {
            setPage(newPage)
            fetchAvailableCabs() // Fetch cabs for the new page
        }
    }

    const tableColumns = [
        { key: 'modelName', title: 'Model Name' },
        { key: 'type', title: 'Type' },
        { key: 'capacity', title: 'Capacity' },
        { key: 'feature', title: 'Feature' },
        { key: 'cabNumber', title: 'Cab Number' },
        { key: 'driverName', title: 'Driver Name' },
        { key: 'driverEmail', title: 'Driver Email' },
        { key: 'driverPhone', title: 'Driver Phone' },
        { key: 'assign', title: 'Assign', action: (cabId) => handleAssignCab(cabId) }
    ]

    const tableData = availableCabs.map((cab) => ({
        ...cab,
        driverName: cab.driver.name,
        driverEmail: cab.driver.email,
        driverPhone: cab.driver.phoneNumber,
        assign: <button onClick={() => handleAssignCab(cab.cabId)}>Assign</button>
    }))

    const loader = orderLoading || !adminOrder
    const loading = cabLoading || mutationError

    return (
        <div className="admin-container">
            <AdminSidebar />
            {loader ? (
                <StylishLoader
                    size="large"
                    color="red"
                />
            ) : (
                <main className="admin_booking_booking-page">
                    <div className="booking_booking-detail">
                        <h1 className="booking_booking-detail__title">Journey Details</h1>
                        <JourneySection
                            order={adminOrder}
                            isLoading={orderLoading}
                        />
                        <PassengersSection
                            passengers={adminOrder?.passengers}
                            isLoading={orderLoading}
                        />
                        <PaymentSection
                            order={adminOrder}
                            isLoading={orderLoading}
                        />
                        <SummarySection
                            order={adminOrder}
                            isLoading={orderLoading}
                        />
                    </div>
                    {adminOrder?.driverId ? (
                        <DriverCard driver={adminOrder} />
                    ) : (
                        <div>
                            <button
                                onClick={fetchAvailableCabs}
                                disabled={loading}>
                                {loading ? (
                                    <StylishLoader
                                        size="small"
                                        color="blue"
                                    />
                                ) : (
                                    'Fetch Available Cabs'
                                )}
                            </button>
                            {availableCabs.length > 0 && (
                                <CustomTable
                                    columns={tableColumns}
                                    data={tableData}
                                    currentPage={page}
                                    totalPages={pagination?.totalPages || 1}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </div>
                    )}
                </main>
            )}
        </div>
    )
}
export default ManageBooking
