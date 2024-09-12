// eslint-disable-next-line no-unused-vars
import React, { Fragment } from 'react'
import StylishLoader from '../../__components__/loader/StylishLoader'
import MessageDisplay from '../../__components__/Error/messageDisplay'
import messages from '../../__constants__/messages'
import { useMeQuery } from '../../__redux__/api/authApi'
import { motion } from 'framer-motion'
import Verification from './verification'
import Registration from './registration'
import OrderSection from './orderSection'
import DriverDashboard from './driverDashboard'

const DriverDisplay = () => {
    const { data: me, isLoading, refetch } = useMeQuery()

    if (isLoading) {
        return (
            <StylishLoader
                size="large"
                color="black"
            />
        )
    }

    const handleSubmitSuccess = () => {
        refetch()
    }
    const user = me?.data

    if (!user) {
        ;<MessageDisplay
            message={messages.USER_NOT_FOUND}
            type="error"
        />
    }
    return (
        <Fragment>
            <motion.div
                className="driver_home_driver-home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}>
                <h2>Driver Dashboard</h2>
                <motion.div
                    className="driver_home_content-wrapper"
                    initial={{ y: 50 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}>
                    {!user?.isDocumentSubmited && (
                        <section className="driver_home_driver_section">
                            <h2>Document Verification</h2>
                            <Verification onSubmitSuccess={handleSubmitSuccess} />
                        </section>
                    )}
                    {user?.isDocumentSubmited && !user.haveCab && (
                        <section className="driver_home_driver_section">
                            <h2>Cab Registration</h2>
                            <Registration onSubmitSuccess={handleSubmitSuccess} />
                        </section>
                    )}
                    {user?.isDocumentSubmited && user.haveCab && <DriverDashboard />}
                </motion.div>
            </motion.div>
            <OrderSection />
        </Fragment>
    )
}

export default DriverDisplay
