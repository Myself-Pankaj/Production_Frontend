import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { login, register, verify } from '../__redux__/thunks/authThunk'
// import messages from '../__constants__/messages' //TODO Implent message feature
import { useForgetPasswordMutation, useResetPasswordMutation } from '../__redux__/api/authApi'

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

    const [validEmail, setValidEmail] = React.useState('')
    const [isValidEmail, setIsValidEmail] = React.useState(false)
    const [newPassword, setNewPassword] = React.useState('')

    const [validOtp, setValidOtp] = React.useState('')

    const [forgetPassword, { isLoading: forgetPasswordLoading }] = useForgetPasswordMutation()
    const [resetPassword, { isLoading: resetPasswordLoading }] = useResetPasswordMutation()

    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [isForgetPasswordModalOpen, setIsForgetPasswordModalOpen] = React.useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const openForgetPasswordModal = () => {
        setIsForgetPasswordModalOpen(true)
    }

    const closeForgetPasswordModal = () => {
        setIsForgetPasswordModalOpen(false)
    }

    const { loading } = useSelector((state) => state.auth)

    const isLoading = loading || forgetPasswordLoading || resetPasswordLoading

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
                    toast.error(resultAction.payload || 'Login failed')
                }
                // eslint-disable-next-line no-unused-vars
            } catch (err) {
                toast.error('Login failed')
            }
        } else {
            try {
                const newUser = { username, email, password, role, phoneNumber }
                const resultAction = await dispatch(register(newUser))
                if (register.fulfilled.match(resultAction)) {
                    toast.success(resultAction.payload.message)
                    openModal()
                } else {
                    toast.error(resultAction.payload || 'Registration failed')
                }
                // eslint-disable-next-line no-unused-vars
            } catch (err) {
                toast.error('Registration error')
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
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            //TODO fix me
            toast.error('OTP verification failed')
        }
    }

    const handleForgetPassword = async () => {
        try {
            const res = await forgetPassword({ email: validEmail })

            if (res.error) {
                toast.error(res.error.data.message)
                setIsValidEmail(false)
            }
            if (res.data.success) {
                toast.success(res.data.message)
                setIsValidEmail(true)
            }
        } catch (error) {
            toast.error('Failed to send OTP', error)
        }
    }

    const handleResetPassword = async () => {
        try {
            const res = await resetPassword({ otp: validOtp, newPassword })
            if (res.error) {
                throw new Error(res.error.data.message)
            }
            if (res.data.success) {
                toast.success(res.data.message)
                closeForgetPasswordModal()
            }
        } catch (error) {
            toast.error(error)
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
                            <button
                                type="button"
                                onClick={openForgetPasswordModal}
                                className="auth_forgot_password">
                                Forgot your password?
                            </button>
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
                        {isLogin
                            ? 'To keep connected with us please login with your credentials'
                            : 'Enter your details and start your journey with us'}
                    </p>
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="auth_switch_btn">
                        {isLogin ? 'SIGN UP' : 'SIGN IN'}
                    </button>
                </div>
            </main>

            {/* Custom Modal for OTP Verification */}
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
                            {loading ? 'Processing...' : 'VERIFY OTP'}
                        </button>
                    </div>
                </div>
            )}

            {/* Forget Password Modal */}
            {isForgetPasswordModalOpen && (
                <div className="custom-modal-overlay">
                    <div className="custom-modal-content">
                        <h2>Enter Your Email</h2>
                        <input
                            type="email"
                            value={validEmail}
                            onChange={(e) => setValidEmail(e.target.value)}
                            placeholder="Enter your email address"
                            autoFocus
                        />
                        {isValidEmail && (
                            <>
                                <input
                                    type="text"
                                    value={validOtp}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/[^0-9]/g, '')
                                        if (value.length <= 6) setValidOtp(value)
                                    }}
                                    placeholder="Enter OTP"
                                    maxLength={6}
                                />
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </>
                        )}
                        <button
                            className="close-modal-btn"
                            onClick={closeForgetPasswordModal}
                            disabled={isLoading}>
                            Close
                        </button>
                        {isValidEmail ? (
                            <button
                                onClick={handleResetPassword}
                                disabled={isLoading}>
                                {isLoading ? 'Processing...' : 'RESET PASSWORD'}
                            </button>
                        ) : (
                            <button
                                onClick={handleForgetPassword}
                                disabled={isLoading}>
                                {isLoading ? 'Processing...' : 'GENERATE OTP'}
                            </button>
                        )}
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default AuthForm
