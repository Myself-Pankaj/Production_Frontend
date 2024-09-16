// eslint-disable-next-line no-unused-vars
import React, { Fragment } from 'react'
import { useCabDetailQuery } from '../../__redux__/api/cabApi'
import { useParams } from 'react-router-dom'
import StylishLoader from '../../__components__/loader/StylishLoader'
import MessageDisplay from '../../__components__/Error/messageDisplay'
import messages from '../../__constants__/messages'
import { CabDetails } from '../../__components__/bookingStuff/CabDetails'
import AdminSidebar from './adminSidebar'
import BookingSection from '../../__components__/adminStuff/bookingSection'

const CabUpcomingBooking = () => {
    const { id } = useParams()
    const { data, isLoading, isError } = useCabDetailQuery(id)

    const loading = isLoading || !data

    return (
        <Fragment>
            <div className="admin-container">
                <AdminSidebar />
                {loading ? (
                    <StylishLoader
                        size="large"
                        color="blue"
                    />
                ) : isError ? (
                    <MessageDisplay message={messages.NO_DATA_TO_DISPLAY} />
                ) : (
                    <section className="admin_driver_driver-details">
                        <h1>Driver Details</h1>
                        <div className="driver-car-info">
                            <CabDetails
                                cabdata={data}
                                isLoading={isLoading}
                            />
                        </div>

                        <div className="booking-section">
                            <BookingSection
                                cab={data}
                                isLoading={isLoading}
                            />
                        </div>
                    </section>
                )}
            </div>
        </Fragment>
    )
}

export default CabUpcomingBooking
