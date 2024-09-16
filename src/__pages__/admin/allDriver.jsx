import React from 'react'
import { useFetchAllDriversQuery } from '../../__redux__/api/adminApi'
import messages from '../../__constants__/messages'
import MessageDisplay from '../../__components__/Error/messageDisplay'
import AdminSidebar from './adminSidebar'
import StylishLoader from '../../__components__/loader/StylishLoader'
import CustomTable from '../../__components__/tables/customTable'

const AllDriver = () => {
    const [page, setPage] = React.useState(1)
    const [limit] = React.useState(10)

    const { data: adminDrivers, isError, isLoading: driverLoading } = useFetchAllDriversQuery({ page, limit })

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= adminDrivers?.pagination?.totalPages) {
            setPage(newPage)
        }
    }
    const loading = !adminDrivers || driverLoading
    const columns = [
        { key: 'id', title: 'Ref No.' },
        { key: 'username', title: 'Name' },
        { key: 'email', title: 'Email' },
        { key: 'phoneNumber', title: 'Mobile No' },
        { key: 'isDocumentSubmited', title: 'Document' },
        { key: 'haveCab', title: 'Car' }
    ]

    const formatData = (data) => {
        if (!data || !data.data) return []

        return data.data.map((driver) => ({
            username: driver.username || 'N/A',
            id: driver._id,
            phoneNumber: driver.phoneNumber || 'N/A',
            isDocumentSubmited: driver.isDocumentSubmited ? 'Yes' : 'No',
            haveCab: driver.haveCab ? 'Yes' : 'No',
            email: driver.email || 'N/A'
        }))
    }
    const formattedData = formatData(adminDrivers)
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
                            totalPages={adminDrivers?.pagination?.totalPages || 1}
                            onPageChange={handlePageChange}
                        />
                    )}
                </main>
            )}
        </div>
    )
}

export default AllDriver
