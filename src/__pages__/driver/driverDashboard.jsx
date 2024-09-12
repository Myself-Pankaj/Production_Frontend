/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useDriverBookingsQuery } from '../../__redux__/api/driverApi'
import MessageDisplay from '../../__components__/Error/messageDisplay'
import { FaCashRegister, FaChevronDown, FaChevronUp, FaExchangeAlt, FaWallet } from 'react-icons/fa'
import { AnimatePresence, motion } from 'framer-motion'

import { useSelector } from 'react-redux'

import BookingCard from '../../__components__/cards/bookingCard'
import StylishLoader from '../../__components__/loader/StylishLoader'

const DriverDashboard = () => {
    const { user, loading, error } = useSelector((state) => state.auth)
    const walletBalance = user?.wallet?.balance
    const transaction = user?.wallet?.transactionHistory
    const [upcomingExpanded, setUpcomingExpanded] = React.useState(true)
    const [confirmedExpanded, setConfirmedExpanded] = React.useState(true)

    const { data: bookingsData, isLoading: orderLoading, refetch, error: driverBookingErrror } = useDriverBookingsQuery()

    const upcomingBookingCount = bookingsData?.unacceptedBookings?.length || 0
    const confirmBookingsCount = bookingsData?.acceptedBookings?.length || 0

    const upcomingBookings = bookingsData?.unacceptedBookings || []
    const confirmBookings = bookingsData?.acceptedBookings || []

    if (loading || orderLoading) {
        ;<StylishLoader
            size="large"
            color="#d63031"
        />
    }

    if (error || driverBookingErrror) {
        ;<MessageDisplay
            message="Something Went wrong !"
            type="error"
        />
    }

    const toggleUpcoming = () => {
        setUpcomingExpanded(!upcomingExpanded)
        refetch()
    }

    const toggleConfirmed = () => {
        setConfirmedExpanded(!confirmedExpanded)
        refetch()
    }

    return (
        <div className="driver_dashboard">
            <header className="driver_dashboard_dashboard-header">
                <div className="driver_dashboard_wallet-section">
                    <FaWallet className="driver_dashboard_wallet-icon" />
                    <span>Wallet Balance: Rs. {walletBalance}</span>
                </div>
                <div className="driver_dashboard_wallet-section">
                    <FaCashRegister className="driver_dashboard_wallet-icon" />
                    <span>Total Eraning: Rs. {walletBalance}</span>
                </div>
            </header>

            <main className="driver_dashboard_dashboard-content">
                <section className="driver_dashboard_bookings-section">
                    <CollapsiblePanel
                        title={`Assigned Bookings [${upcomingBookingCount}]`}
                        isExpanded={upcomingExpanded}
                        onToggle={toggleUpcoming}>
                        {upcomingBookingCount !== 0 ? (
                            upcomingBookings.map((booking) => (
                                <BookingCard
                                    key={booking.orderId._id}
                                    booking={booking}
                                    type="upcoming"
                                />
                            ))
                        ) : (
                            <MessageDisplay message="Kindly wait, we will assign you your first booking soon" />
                        )}
                    </CollapsiblePanel>

                    <CollapsiblePanel
                        title={`Upcoming Bookings [${confirmBookingsCount}]`}
                        isExpanded={confirmedExpanded}
                        onToggle={toggleConfirmed}>
                        {confirmBookingsCount !== 0 ? (
                            confirmBookings.map((booking) => (
                                <BookingCard
                                    key={booking.orderId._id}
                                    booking={booking}
                                    type="confirmed"
                                />
                            ))
                        ) : (
                            <MessageDisplay message="Currently, we do not have any upcoming bookings for you!" />
                        )}
                    </CollapsiblePanel>
                </section>

                <section className="driver_dashboard_transactions-section">
                    <h2>
                        <FaExchangeAlt /> Recent Transactions
                    </h2>
                    <TransactionList />
                </section>
            </main>
        </div>
    )
}

const CollapsiblePanel = ({ title, isExpanded, onToggle, children }) => {
    return (
        <div className="driver_dashboard_collapsible-panel">
            <div
                className="driver_dashboard_panel-header"
                onClick={onToggle}>
                <h2>{title}</h2>
                {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="driver_dashboard_pannel-div">
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const TransactionList = () => {
    const transactions = [
        { id: 1, date: '2024-09-10', amount: 50, type: 'credit' },
        { id: 2, date: '2024-09-09', amount: 30, type: 'debit' },
        { id: 3, date: '2024-09-08', amount: 75, type: 'credit' }
    ]

    return (
        <ul className="driver_dashboard_transaction-list">
            {transactions.map((transaction) => (
                <li
                    key={transaction.id}
                    className={`driver_dashboard_transaction-item ${transaction.type}`}>
                    <span>{transaction.date}</span>
                    <span>${transaction.amount}</span>
                    <span>{transaction.type}</span>
                </li>
            ))}
        </ul>
    )
}

export default DriverDashboard
