// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useAllPendingPaymentQuery } from '../../__redux__/api/adminApi'
import AdminSidebar from './adminSidebar'
import StylishLoader from '../../__components__/loader/StylishLoader'
import MessageDisplay from '../../__components__/Error/messageDisplay'
import messages from '../../__constants__/messages'
import TableHOC from '../../__components__/tables/tableHOC'

const PendingPayment = () => {
    const { data, isLoading, isError } = useAllPendingPaymentQuery()

    let loading = isLoading || !data

    const columns = [
        { key: 'id', title: 'User ID.' },
        { key: 'username', title: 'Name' },
        { key: 'email', title: 'Email' },
        { key: 'phoneNo', title: 'Mobile No' },
        { key: 'isVerifiedDriver', title: 'Driver' },
        { key: 'isDocumented', title: 'Bank Details' },
        { key: 'balance', title: 'Amount ₹' },

        { key: 'manage', title: 'Manage' }
    ]
    const filterableColumns = ['id', 'username', 'email']
    const formatData = (data) => {
        if (!data || !data.data) return []

        return data.data.map((user) => ({
            id: user._id,
            email: user.email || 'N/A',
            username: user.username || 'N/A',
            isVerifiedDriver: user.isVerifiedDriver ? 'Yes' : 'No',
            isDocumented: user.isDocumented ? 'Yes' : 'No',
            balance: user.wallet.balance || 0,
            phoneNo: user.phoneNumber || 'XX-XXXX-XXXX',

            manage: <button onClick={() => handleManage(user._id)}>Manage</button>
        }))
    }
    const formattedData = formatData(data)
    const handleManage = () => {}
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
                        <TableHOC
                            data={formattedData}
                            columns={columns}
                            itemsPerPage={5}
                            filterableColumns={filterableColumns}
                        />
                    )}
                </main>
            )}
        </div>
    )
}

export default PendingPayment
