// eslint-disable-next-line no-unused-vars
import React from 'react'
import { motion } from 'framer-motion'
import { FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa'

const Footer = () => {
    const iconVariants = {
        hover: { scale: 1.2, rotate: 15 }
    }

    return (
        <motion.footer
            className="footer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            <div className="footer__content">
                <motion.span
                    className="footer__copyright"
                    whileHover={{ color: '#f4c600' }}>
                    © 2024 Velocity Rides
                </motion.span>
                <div className="footer__links">
                    <motion.a
                        href="#"
                        whileHover="hover"
                        variants={iconVariants}>
                        <FaInstagram />
                    </motion.a>
                    <motion.a
                        href="#"
                        whileHover="hover"
                        variants={iconVariants}>
                        <FaTwitter />
                    </motion.a>
                    <motion.a
                        href="#"
                        whileHover="hover"
                        variants={iconVariants}>
                        <FaFacebookF />
                    </motion.a>
                </div>
            </div>
        </motion.footer>
    )
}

export default Footer
