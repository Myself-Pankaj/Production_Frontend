import React from 'react'
import AdminSidebar from './adminSidebar'
import { useFetchAllCabsQuery } from '../../__redux__/api/adminApi'
import CustomTable from '../../__components__/tables/customTable'
import date from '../../__utils__/date'
import StylishLoader from '../../__components__/loader/StylishLoader'
import MessageDisplay from '../../__components__/Error/messageDisplay'
import messages from '../../__constants__/messages'
import { useNavigate } from 'react-router-dom'

const AllCabs = () => {
    const navigate = useNavigate()
    const [page, setPage] = React.useState(1)
    const [limit] = React.useState(10)

    const { data: adminCabs, isLoading: cabsLoading, isError } = useFetchAllCabsQuery({ page, limit })

    if (isError) {
        return (
            <MessageDisplay
                message={messages.ERROR_FETCHING_CABS}
                type="error"
            />
        )
    }
    let loading = cabsLoading || !adminCabs
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= adminCabs?.pagination?.totalPages) {
            setPage(newPage)
        }
    }

    const columns = [
        { key: 'id', title: 'Ref No.' },
        { key: 'availability', title: 'Availability' },
        { key: 'capacity', title: 'Capacity' },
        { key: 'registeredAt', title: 'Registered At' },
        { key: 'isReady', title: 'Is Ready' },
        { key: 'modelName', title: 'Model Name' },
        { key: 'manage', title: 'Manage' }
    ]

    const formatData = (data) => {
        if (!data || !data.data) return []

        return data.data.map((cab) => ({
            id: cab._id || 'N/A',
            availability: cab.availability || 'N/A',
            capacity: cab.capacity?.toString() || 'N/A',
            registeredAt: date.formatShortDate(cab.createdAt),
            isReady: cab.isReady ? 'Yes' : 'No',
            modelName: cab.modelName || 'N/A',
            manage: <button onClick={() => handleManage(cab._id)}>Manage</button>
        }))
    }

    const handleManage = (id) => {
        navigate(`/admin/cabs/${id}`)
    }
    const formattedData = formatData(adminCabs)

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
                    <CustomTable
                        columns={columns}
                        data={formattedData}
                        currentPage={page}
                        totalPages={adminCabs?.pagination?.totalPages || 1}
                        onPageChange={handlePageChange}
                    />
                </main>
            )}
        </div>
    )
}

export default AllCabs
