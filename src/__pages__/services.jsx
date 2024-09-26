// eslint-disable-next-line no-unused-vars
import React from 'react'
import { motion } from 'framer-motion'
const Services = () => {
    // List of services provided (replace or add more services as necessary)
    const services = [
        {
            title: 'Tour Booking',
            description:
                'We provide customizable tour bookings for individuals, families, and groups, allowing you to explore your destinations comfortably.'
        },
        {
            title: 'One-Way Tours',
            description: 'Need a one-way ride? We offer flexible one-way trips to any destination, perfect for travelers on the go.'
        },
        {
            title: 'Round Trips',
            description:
                'Book round trips for convenience, whether you’re planning a weekend getaway or a business trip. We ensure your return is just as comfortable as your departure.'
        },
        {
            title: 'Trip Planning',
            description:
                'Our experts will help you plan your trip, suggest the best routes, and ensure that your journey is seamless and stress-free.'
        },
        {
            title: 'Family-Friendly Tours',
            description:
                'We specialize in family-friendly tours, providing vehicles with ample space and comfort, so everyone from toddlers to grandparents enjoys the ride.'
        },
        {
            title: 'Budget-Friendly Options',
            description: 'Travel doesn’t have to break the bank! We offer budget-friendly rides without compromising comfort or safety.'
        }
    ]
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
    return (
        <motion.section
            className="s_services-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible">
            <div className="s_content">
                <motion.h1 variants={itemVariants}>Our Services</motion.h1>

                <motion.div
                    className="s_services-grid"
                    variants={itemVariants}>
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="s_service-item"
                            variants={itemVariants}>
                            <motion.h2 variants={itemVariants}>{service.title}</motion.h2>
                            <motion.p variants={itemVariants}>{service.description}</motion.p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    )
}

export default Services
