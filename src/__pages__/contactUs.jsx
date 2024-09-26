// eslint-disable-next-line no-unused-vars
import React from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaWhatsapp } from 'react-icons/fa'

const Contact = () => {
    const email = 'info@example.com' // Replace with your actual email
    const whatsapp = '+1234567890' // Replace with your actual WhatsApp number

    return (
        <section className="c_u_contact-section">
            <motion.div
                initial={{ opacity: 0, x: '-100vw' }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="c_u_contact-info-container">
                <h2>Contact Us</h2>
                <p>If you have any questions or inquiries, feel free to reach us through the following:</p>

                <div className="c_u_contact-details">
                    <p>
                        <FaEnvelope />
                        Email: <a href={`mailto:${email}`}>{email}</a>
                    </p>
                    <p>
                        <FaWhatsapp />
                        WhatsApp:{' '}
                        <a
                            href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer">
                            {whatsapp}
                        </a>
                    </p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: '100vw' }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="c_u_contact-image-container">
                <motion.img
                    initial={{ opacity: 0, y: '-100vh' }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    src="/images/contact.png" // Replace with actual image path
                    alt="Contact Us"
                    className="c_u_contact-image"
                />
            </motion.div>
        </section>
    )
}

export default Contact
