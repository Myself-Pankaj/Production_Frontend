// eslint-disable-next-line no-unused-vars
import React, { Fragment } from 'react'
import { useGetDriverCabQuery } from '../../__redux__/api/cabApi'
import StylishLoader from '../../__components__/loader/StylishLoader'
import AdminSidebar from './adminSidebar'
import MessageDisplay from '../../__components__/Error/messageDisplay'
import messages from '../../__constants__/messages'
import Carousel from '../../__components__/carousel/carousel'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const AdminCabs = () => {
    const { data: cabs, isError, isLoading } = useGetDriverCabQuery()

    const loading = !cabs || isLoading

    return (
        <Fragment>
            <div className="admin-container">
                <AdminSidebar />
                {loading ? (
                    <StylishLoader
                        size="large"
                        color="black"
                    />
                ) : isError ? (
                    <MessageDisplay
                        message={messages.ERROR_FETCHING_CABS}
                        type="error"
                    />
                ) : (
                    <main>
                        {cabs.length > 0 ? (
                            <div>
                                {cabs.map((cab) => (
                                    <CabCard
                                        key={cab._id}
                                        cab={cab}
                                    />
                                ))}
                            </div>
                        ) : (
                            <MessageDisplay message={messages.NO_DATA_TO_DISPLAY} />
                        )}
                    </main>
                )}
            </div>
        </Fragment>
    )
}

export default AdminCabs

const CabCard = ({ cab }) => {
    const navigate = useNavigate()

    const handleSubmit = () => {
        navigate(`/admin/owned/cabs/${cab._id}`)
    }

    return (
        <div className="cab-card">
            <Carousel images={cab.photos} />
            <div className="cab-info">
                <h2>{cab.modelName}</h2>
                <p>
                    <span>Availability:</span> {cab.availability}
                </p>
                <p>
                    <span>Capacity:</span> {cab.capacity} persons
                </p>
                <p>
                    <span>Feature:</span> {cab.feature}
                </p>
                <p>
                    <span>Status:</span> {cab.isReady ? 'Ready' : 'Not Ready'}
                </p>
                <p>
                    <span>Created:</span> {new Date(cab.createdAt).toLocaleDateString()}
                </p>
                <button onClick={handleSubmit}>Details</button>
            </div>
        </div>
    )
}

// Define PropTypes
CabCard.propTypes = {
    cab: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        modelName: PropTypes.string.isRequired,
        photos: PropTypes.arrayOf(
            PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.shape({
                    url: PropTypes.string.isRequired
                })
            ])
        ).isRequired,
        availability: PropTypes.string.isRequired,
        capacity: PropTypes.number.isRequired,
        feature: PropTypes.string.isRequired,
        isReady: PropTypes.bool.isRequired,
        createdAt: PropTypes.string.isRequired
    }).isRequired
}
