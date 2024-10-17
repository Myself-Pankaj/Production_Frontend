// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useAllPendingPaymentQuery, usePayoutMutation } from '../../__redux__/api/adminApi'
import AdminSidebar from './adminSidebar'
import StylishLoader from '../../__components__/loader/StylishLoader'
import MessageDisplay from '../../__components__/Error/messageDisplay'
import messages from '../../__constants__/messages'
import TableHOC from '../../__components__/tables/tableHOC'
import date from '../../__utils__/date'
import { toast } from 'react-toastify'

const PendingPayment = () => {
    const { data, isLoading, isError, refetch } = useAllPendingPaymentQuery()
    let loading = isLoading

    const columns = [
        { key: 'id', title: 'User ID.' },
        { key: 'email', title: 'Email' },
        { key: 'isPending', title: 'Driver' },
        { key: 'orderId', title: 'Order ID' },
        { key: 'completedAt', title: 'Date' },
        { key: 'amount', title: 'Amount ₹' },
        { key: 'manage', title: 'Manage' }
    ]
    const filterableColumns = ['id', 'orderId', 'email']
    const formatData = (data) => {
        if (!data || !data.data) return []

        return data.data.map((user) => ({
            id: user.userId,
            email: user.email || 'N/A',
            amount: user.transaction.amount,
            isPending: user.transaction.isPending ? 'Yes' : 'No',
            orderId: user.transaction.orderId || 'N/A',
            completedAt: date.formatShortDate(user.transaction.transactionDate) || 'XX-XXXX-XXXX',

            manage: <button onClick={() => handleManage(user.transaction.orderId, user.userId, user.transaction.amount)}>Manage</button>
        }))
    }
    const formattedData = formatData(data)

    // eslint-disable-next-line no-unused-vars
    const [payout, { isLoading: payoutLoading, isError: mutationError, error }] = usePayoutMutation() //TODO Fix this issue
    const handleManage = async (orderId, userId, amount) => {
        const result = await payout({
            orderId: orderId,
            userId: userId,
            amount: amount
        }).unwrap()

        if (result.success) {
            toast.success(`Payout is successful Id: ${result.data.id}`)
        } else {
            toast.error(result.error)
        }
        refetch()
    }

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
                            type="info"
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
