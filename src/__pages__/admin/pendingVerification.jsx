import React from 'react'
import { useFetchAllUnverifiedDriverQuery } from '../../__redux__/api/adminApi'
import MessageDisplay from '../../__components__/Error/messageDisplay'
import messages from '../../__constants__/messages'
import CustomTable from '../../__components__/tables/customTable'
import StylishLoader from '../../__components__/loader/StylishLoader'
import AdminSidebar from './adminSidebar'
import { useNavigate } from 'react-router-dom'

const PendingVerification = () => {
    const navigate = useNavigate()
    const [page, setPage] = React.useState(1)
    const [limit] = React.useState(5)
    const { data: adminDrivers, isLoading: driverLoading, isError } = useFetchAllUnverifiedDriverQuery({ page, limit })
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= adminDrivers?.pagination?.totalPages) {
            setPage(newPage)
        }
    }
    const columns = [
        { key: 'id', title: 'Ref No.' },
        { key: 'username', title: 'Name' },
        { key: 'email', title: 'Email' },
        { key: 'phoneNumber', title: 'Mobile No' },
        { key: 'isDocumentSubmited', title: 'Document' },
        { key: 'haveCab', title: 'Car' },
        { key: 'manage', title: 'Manage' }
    ]

    const formatData = (data) => {
        if (!data || !data.data) return []

        return data.data.map((driver) => ({
            username: driver.username || 'N/A',
            id: driver._id,
            phoneNumber: driver.phoneNumber || 'N/A',
            isDocumentSubmited: driver.isDocumentSubmited ? 'Yes' : 'No',
            haveCab: driver.haveCab ? 'Yes' : 'No',
            email: driver.email || 'N/A',
            manage: <button onClick={() => handleManage(driver._id)}>Manage</button>
        }))
    }

    const handleManage = (id) => {
        navigate(`/admin/driver/verification/${id}`)
    }
    const formattedData = formatData(adminDrivers)
    return (
        <div className="admin-container">
            <AdminSidebar />
            {driverLoading ? (
                <StylishLoader
                    size="large"
                    color="cyan"
                />
            ) : (
                <main>
                    {isError ? (
                        <MessageDisplay
                            message={messages.NO_DATA_TO_DISPLAY}
                            type="info"
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

export default PendingVerification
