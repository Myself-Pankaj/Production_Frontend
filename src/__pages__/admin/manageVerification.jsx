import React from 'react'
import { useParams } from 'react-router-dom'
import { useDriverVerificationMutation, useGetDriverInfoQuery } from '../../__redux__/api/adminApi'
import { toast } from 'react-toastify'
import AdminSidebar from './adminSidebar'
import { AnimatePresence, motion } from 'framer-motion'
import DriverDoc from '../../__components__/adminStuff/driverDoc'
import StylishLoader from '../../__components__/loader/StylishLoader'
import { CabDetails } from '../../__components__/bookingStuff/CabDetails'
import DocumentPreview from '../../__components__/adminStuff/documentPreview'
import MessageDisplay from '../../__components__/Error/messageDisplay'
import messages from '../../__constants__/messages'
import PropTypes from 'prop-types'
const DocName = ['Aadhar Card', 'Pan Card', 'License', 'Insurance', 'PUC', 'Bank Details']

const ManageVerification = () => {
    const { id } = useParams()

    const { data: driverDetail, isLoading: driverLoading, isError: driverError, refetch } = useGetDriverInfoQuery(id)
    const loading = driverLoading || !driverDetail
    const [adminVerifyDriver, { isLoading: verifyLoading }] = useDriverVerificationMutation()

    const [showDocument, setShowDocument] = React.useState(null)
    const [isVerified, setIsVerified] = React.useState(driverDetail?.driver?.isDocumentSubmited)

    const toggleShowDocument = (docId) => setShowDocument((prev) => (prev === docId ? null : docId))

    const handleVerify = async () => {
        try {
            const res = await adminVerifyDriver({ id, flag: !isVerified }).unwrap()

            if (res.success) {
                toast.success(res.message)
            }
            setIsVerified((prev) => !prev)
            refetch()
        } catch (error) {
            toast.error(error.data.message)
        }
    }

    const cabDetail = driverDetail?.cab
    const documents = driverDetail?.driverDocuments

    React.useEffect(() => {
        const bookingsContainer = document.querySelector('.admin_driver_bookings')
        const scrollAmount = bookingsContainer?.offsetWidth / 2

        const scrollLeft = () => bookingsContainer.scrollBy(-scrollAmount, 0)
        const scrollRight = () => bookingsContainer.scrollBy(scrollAmount, 0)

        const beforeArrow = document.querySelector('.admin_driver_bookings::before')
        const afterArrow = document.querySelector('.admin_driver_bookings::after')

        beforeArrow?.addEventListener('click', scrollLeft)
        afterArrow?.addEventListener('click', scrollRight)

        // Cleanup event listeners on component unmount
        return () => {
            beforeArrow?.removeEventListener('click', scrollLeft)
            afterArrow?.removeEventListener('click', scrollRight)
        }
    }, [])

    return (
        <div className="admin-container">
            <AdminSidebar />
            {driverLoading ? (
                <StylishLoader
                    size="large"
                    color="green"
                />
            ) : (
                <main className="admin_driver_manage-drivers">
                    {driverError ? (
                        <MessageDisplay message={messages.DOCUMENT_CAB_NOT_SUBMITTED} />
                    ) : (
                        <section className="admin_driver_driver-details">
                            <h1>Driver Details</h1>
                            <div className="driver-car-info">
                                <DriverDoc
                                    driver={driverDetail}
                                    isLoading={loading}
                                />
                                <CabDetails
                                    cabdata={cabDetail}
                                    isLoading={loading}
                                />
                            </div>
                            <div className="documents-section">
                                <DocumentPreview
                                    documents={documents}
                                    isLoading={loading}
                                    showDocument={showDocument}
                                    toggleShowDocument={toggleShowDocument}
                                    DocName={DocName}
                                />
                            </div>
                            <div className="verify-button-section">
                                <VerifyButton
                                    isVerified={isVerified}
                                    handleVerify={handleVerify}
                                    isLoading={verifyLoading}
                                />
                            </div>
                        </section>
                    )}
                </main>
            )}
        </div>
    )
}

export default ManageVerification

const VerifyButton = ({ isVerified, handleVerify, isLoading }) => (
    <div className="admin_driver_verify-section">
        <AnimatePresence mode="wait">
            <motion.button
                key={isVerified ? 'resubmit-button' : 'verify-button'}
                onClick={handleVerify}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                disabled={isLoading}>
                {isLoading ? 'Processing...' : isVerified ? 'Resubmit' : 'Verify'}
            </motion.button>
        </AnimatePresence>
    </div>
)

// PropTypes validation
VerifyButton.propTypes = {
    isVerified: PropTypes.bool.isRequired,
    handleVerify: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.object
}

ManageVerification.propTypes = {
    driverDetail: PropTypes.shape({
        driver: PropTypes.shape({
            isDocumentSubmited: PropTypes.bool.isRequired
        }),
        cab: PropTypes.object,
        driverDocuments: PropTypes.array
    }),
    loading: PropTypes.bool
}
