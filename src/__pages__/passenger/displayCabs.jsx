import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDisplayCabsQuery } from '../../__redux__/api/cabApi'
import { updateFormField } from '../../__redux__/slice/infoSlice'
import { extractNumericValue } from '../../__utils__/utils'
import { motion } from 'framer-motion'
import Loader from '../../__components__/loader/loader'
import CabCard from '../../__components__/cards/cabCard'
import { useCalculateDistanceQuery } from '../../__redux__/api/otherApi'
import { toast } from 'react-toastify'
import MessageDisplay from '../../__components__/Error/messageDisplay'
import messages from '../../__constants__/messages'

const DisplayCabs = () => {
    const dispatch = useDispatch()

    const formData = useSelector((state) => state.info)

    const [errorShown, setErrorShown] = React.useState(false)

    const { data: cabs, isLoading: cabsLoading, error } = useDisplayCabsQuery()

    const {
        data: distanceData,
        isLoading: distanceLoading,
        error: distanceError
    } = useCalculateDistanceQuery({ origin: formData.from, destination: formData.to })

    React.useEffect(() => {
        if (distanceError && !errorShown) {
            toast.error('Services are not available in this region')
            setErrorShown(true)
        }
    }, [distanceError, errorShown])
    React.useEffect(() => {
        if (distanceData && distanceData.distance) {
            const distanceInKM = extractNumericValue(distanceData.distance)
            dispatch(updateFormField({ field: 'distance', value: distanceInKM }))
        } else {
            const defaultValue = 0
            dispatch(updateFormField({ field: 'distance', value: defaultValue }))
        }
    }, [dispatch, distanceData])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }
    if (cabsLoading) {
        return <Loader />
    }
    if (error) {
        return (
            <MessageDisplay
                message={messages.CAB_FETCHING_FAIL}
                type="error"
            />
        )
    }
    return (
        <main className="cabs_page">
            {!cabs ? (
                <div className="cabs_loader_container">
                    <MessageDisplay
                        message={messages.NO_CAB_FOUND}
                        type="error"
                    />
                </div>
            ) : (
                <motion.div
                    className="cabs_list"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible">
                    {cabs &&
                        cabs.map((cab) => (
                            <motion.div
                                key={cab._id}
                                variants={containerVariants}>
                                <CabCard
                                    cab={cab}
                                    distance={formData.distance}
                                    isLoading={distanceLoading}
                                />
                            </motion.div>
                        ))}
                </motion.div>
            )}
        </main>
    )
}

export default DisplayCabs
