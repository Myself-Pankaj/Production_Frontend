import React, { Fragment } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateFormField } from '../__redux__/slice/infoSlice'
import { isGoogleMapsLoaded } from '../__scripts__/scriptLoader'
import VedioCarousel from '../__components__/carousel/vedioCarousel'

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            when: 'beforeChildren',
            staggerChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
}

const Home = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formData = useSelector((state) => state.info)
    const [tripType, setTripType] = React.useState('OneWay')

    const toggleTripType = () => {
        setTripType(tripType === 'OneWay' ? 'RoundTrip' : 'OneWay')
        dispatch(updateFormField({ field: 'cabType', value: tripType === 'OneWay' ? 'RoundTrip' : 'OneWay' }))
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        navigate('/display-cabs')
    }
    const handleInputChange = (field) => (event) => {
        dispatch(updateFormField({ field, value: event.target.value }))
    }
    const handleDateChange = (field) => (date) => {
        const dateString = date ? date.toISOString() : null
        dispatch(updateFormField({ field, value: dateString }))
    }
    const fromInputRef = React.useRef(null)
    const toInputRef = React.useRef(null)

    React.useEffect(() => {
        const handlePlaceSelect = (autocomplete, field) => {
            const place = autocomplete.getPlace()
            if (place.formatted_address) {
                dispatch(updateFormField({ field, value: place.formatted_address }))
            }
        }
        const initAutocomplete = () => {
            if (isGoogleMapsLoaded()) {
                const fromAutocomplete = new window.google.maps.places.Autocomplete(fromInputRef.current)
                const toAutocomplete = new window.google.maps.places.Autocomplete(toInputRef.current)

                fromAutocomplete.addListener('place_changed', () => handlePlaceSelect(fromAutocomplete, 'from'))
                toAutocomplete.addListener('place_changed', () => handlePlaceSelect(toAutocomplete, 'to'))
            } else {
                // If Google Maps isn't loaded yet, try again after a short delay
                setTimeout(initAutocomplete, 100)
            }
        }

        initAutocomplete()
    }, [dispatch])

    return (
        <Fragment>
            <motion.main
                className="homeContainer"
                variants={containerVariants}
                initial="hidden"
                animate="visible">
                <div className="content">
                    <motion.div
                        className="formContainer"
                        variants={itemVariants}>
                        <motion.h1
                            className="title"
                            variants={itemVariants}>
                            FUNMUNDO
                        </motion.h1>
                        <motion.div
                            className="trip-toggle"
                            onClick={toggleTripType}>
                            <motion.div
                                className="toggle-slider"
                                animate={{ x: tripType === 'OneWay' ? 0 : '100%' }}
                            />
                            <span className={tripType === 'OneWay' ? 'active' : ''}>One Way</span>
                            <span className={tripType === 'RoundTrip' ? 'active' : ''}>Round Trip</span>
                        </motion.div>
                        <form onSubmit={handleSubmit}>
                            <motion.div
                                className="form-group"
                                variants={itemVariants}>
                                <FaMapMarkerAlt className="input-icon" />
                                <input
                                    type="text"
                                    ref={fromInputRef}
                                    placeholder="Pick-up Location"
                                    value={formData.from}
                                    onChange={handleInputChange('from')}
                                    required
                                />
                            </motion.div>
                            <motion.div
                                className="form-group"
                                variants={itemVariants}>
                                <FaMapMarkerAlt className="input-icon" />
                                <input
                                    type="text"
                                    ref={toInputRef}
                                    placeholder="Drop-off Location"
                                    value={formData.to}
                                    onChange={handleInputChange('to')}
                                    required
                                />
                            </motion.div>
                            <motion.div
                                className="form-group"
                                variants={itemVariants}>
                                <FaCalendarAlt className="input-icon" />
                                <DatePicker
                                    selected={formData.pickupDate ? new Date(formData.pickupDate) : null}
                                    onChange={handleDateChange('pickupDate')}
                                    dateFormat="MMMM d, yyyy"
                                    placeholderText="Pick-Up Date"
                                    required
                                    className="custom-datepicker"
                                    calendarClassName="custom-calendar"
                                    popperClassName="custom-popper"
                                    wrapperClassName="custom-wrapper"
                                    showPopperArrow={false}
                                    minDate={new Date()}
                                />
                            </motion.div>
                            {tripType === 'RoundTrip' && (
                                <AnimatePresence>
                                    <motion.div
                                        className="form-group"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}>
                                        <FaCalendarAlt className="input-icon" />
                                        <DatePicker
                                            selected={formData.dropOffDate ? new Date(formData.dropOffDate) : null}
                                            onChange={handleDateChange('dropOffDate')}
                                            dateFormat="MMMM d, yyyy"
                                            placeholderText="Drop-Off Date"
                                            required
                                            className="custom-datepicker"
                                            calendarClassName="custom-calendar"
                                            popperClassName="custom-popper"
                                            wrapperClassName="custom-wrapper"
                                            showPopperArrow={false}
                                            minDate={formData.pickupDate ? new Date(formData.pickupDate) : null}
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            )}
                            <motion.button
                                type="submit"
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="SearchCab-button">
                                Go for it
                            </motion.button>
                        </form>
                    </motion.div>
                    <motion.div
                        className="textContainer"
                        variants={itemVariants}>
                        {/* <motion.h2 variants={itemVariants}>Your Journey Begins Here</motion.h2>
                        <motion.p variants={itemVariants}>Experience comfort and style with every ride.</motion.p>
                        <motion.p variants={itemVariants}>15% off for returning customers!</motion.p> */}
                        <VedioCarousel />
                    </motion.div>
                </div>
            </motion.main>
        </Fragment>
    )
}

export default Home
