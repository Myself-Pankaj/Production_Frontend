import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { login, register, verify } from '../__redux__/thunks/authThunk'
import messages from '../__constants__/messages'

const AuthForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isLogin, setIsLogin] = React.useState(true)
    const [username, setUsername] = React.useState('')
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [role, setRole] = React.useState('Passenger')
    const [otp, setOtp] = React.useState('')

    const [isModalOpen, setIsModalOpen] = React.useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }
    const { loading } = useSelector((state) => state.auth)

    const isLoading = loading

    const buttonText = loading ? (isLogin ? 'SIGN IN...' : 'SIGN UP...') : isLogin ? 'SIGN IN' : 'SIGN UP'

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isLogin) {
            try {
                const resultAction = await dispatch(login({ email, password }))
                if (login.fulfilled.match(resultAction)) {
                    toast.success(resultAction.payload.message)
                    navigate('/user-profile')
                } else {
                    toast.error(resultAction.payload || messages.LOGIN_FAILED)
                }
                // eslint-disable-next-line no-unused-vars
            } catch (err) {
                toast.error(messages.LOGIN_FAILED)
            }
        } else {
            try {
                const newUser = {
                    username,
                    email,
                    password,
                    role,
                    phoneNumber
                }
                const resultAction = await dispatch(register(newUser))
                if (register.fulfilled.match(resultAction)) {
                    toast.success(resultAction.payload.message)
                    openModal()
                } else {
                    toast.error(resultAction.payload || 'Login failed')
                }
            } catch (err) {
                toast.error(err.message || 'An error occurred during registration')
            }
        }
    }
    const handleOtpSubmit = async () => {
        try {
            const resultAction = await dispatch(verify({ otp }))
            if (verify.fulfilled.match(resultAction)) {
                toast.success(resultAction.payload.message)
                closeModal()
                navigate('/')
            } else {
                toast.error(resultAction.payload || 'Verification failed')
            }
        } catch (err) {
            toast.error('An error occurred during verification', err)
        }
    }

    return (
        <Fragment>
            <main className="auth_container">
                <div className="auth_form_side">
                    <h1>{isLogin ? 'Sign in' : 'Create Account'}</h1>
                    <p className="divider">Use your {isLogin ? 'credential' : 'email for registration'}</p>
                    <form
                        onSubmit={handleSubmit}
                        className="auth_form">
                        <AnimatePresence>
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />

                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={phoneNumber}
                                        onChange={(e) => {
                                            const inputPhoneNumber = e.target.value
                                            if (/^\d{0,10}$/.test(inputPhoneNumber)) {
                                                setPhoneNumber(inputPhoneNumber)
                                            }
                                        }}
                                        pattern="\d{10}"
                                        title="Please enter a 10-digit phone number"
                                        required
                                    />
                                    <div className="auth_role_selector">
                                        <button
                                            type="button"
                                            className={`auth_role_btn ${role === 'Passenger' ? 'active' : ''}`}
                                            onClick={() => setRole('Passenger')}>
                                            Passenger
                                        </button>
                                        <button
                                            type="button"
                                            className={`auth_role_btn ${role === 'Driver' ? 'active' : ''}`}
                                            onClick={() => setRole('Driver')}>
                                            Driver
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {isLogin && (
                            <a
                                href="#"
                                className="auth_forgot_password">
                                Forgot your password?
                            </a>
                        )}
                        <Button
                            type="submit"
                            className="auth_submit_btn"
                            isLoading={isLoading}
                            disabled={isLoading}>
                            {buttonText}
                        </Button>
                    </form>
                </div>
                <div className="auth_welcome_side">
                    <h2>{isLogin ? 'Welcome Back!' : 'Hello, Friend!'}</h2>
                    <p>
                        {isLogin ? `To keep connected with us please login with your credential's` : 'Enter your details and start journey with us'}
                    </p>
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="auth_switch_btn">
                        {isLogin ? 'SIGN UP' : 'SIGN IN'}
                    </button>
                </div>
            </main>

            {/* Custom Modal */}
            {isModalOpen && (
                <div className="custom-modal-overlay">
                    <div className="custom-modal-content">
                        <h2>Verify Your OTP</h2>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, '')
                                if (value.length <= 6) setOtp(value)
                            }}
                            placeholder="Enter 6-digit OTP"
                            maxLength={6}
                            autoFocus
                        />
                        <button
                            onClick={handleOtpSubmit}
                            disabled={loading}>
                            {' '}
                            {loading ? 'Processing...' : 'VERIFY OTP'}
                        </button>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default AuthForm
