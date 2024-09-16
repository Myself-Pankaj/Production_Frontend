import React from 'react'
import { useFetchAllUsersQuery } from '../../__redux__/api/adminApi'
import MessageDisplay from '../../__components__/Error/messageDisplay'
import messages from '../../__constants__/messages'
import date from '../../__utils__/date'
import AdminSidebar from './adminSidebar'
import StylishLoader from '../../__components__/loader/StylishLoader'
import CustomTable from '../../__components__/tables/customTable'

const AllUser = () => {
    const [page, setPage] = React.useState(1)
    const [limit] = React.useState(5)

    const { data: adminUser, isLoading: usersLoading, isError } = useFetchAllUsersQuery({ page, limit })

    let loading = usersLoading || !adminUser
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= adminUser?.pagination?.totalPages) {
            setPage(newPage)
        }
    }
    const columns = [
        { key: 'username', title: 'Name' },
        { key: 'id', title: 'Ref No.' },
        { key: 'phoneNumber', title: 'Mobile No.' },
        { key: 'email', title: 'Email' },
        { key: 'role', title: 'Role' },
        { key: 'registeredAt', title: 'Registered At' }
    ]
    const formatData = (data) => {
        if (!data || !data.data) return []

        return data.data.map((user) => ({
            username: user.username || 'N/A',
            id: user._id || 'N/A',
            phoneNumber: user.phoneNumber || 'N/A',
            email: user.email || 'N/A',
            role: user.role || 'N/A',
            registeredAt: date.formatShortDate(user.createdAt)
        }))
    }
    const formattedData = formatData(adminUser)
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
                            totalPages={adminUser?.pagination?.totalPages || 1}
                            onPageChange={handlePageChange}
                        />
                    )}
                </main>
            )}
        </div>
    )
}

export default AllUser
