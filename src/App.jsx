import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import Loader from './__components__/loader/loader.jsx'
import Header from './__components__/header/header.jsx'
import { useFetchUser } from './__hooks__/fetchUser.jsx'
import ProtectedHook from './__hooks__/protectedHook.jsx'
import { useSelector } from 'react-redux'

const Home = lazy(() => import('./__pages__/home.jsx'))
const AuthScreen = lazy(() => import('./__pages__/auth.jsx'))
const Profile = lazy(() => import('./__pages__/profile.jsx'))
const DisplayCabs = lazy(() => import('./__pages__/passenger/displayCabs.jsx'))
const PreviewBooking = lazy(() => import('./__pages__/passenger/previewBooking.jsx'))
const MyBooking = lazy(() => import('./__pages__/passenger/myBooking.jsx'))
const BookingDetails = lazy(() => import('./__pages__/bookingDetails.jsx'))

//Driver Routes
const DriverDisplay = lazy(() => import('./__pages__/driver/driverDisplay.jsx'))
const OrderDetail = lazy(() => import('./__pages__/driver/orderDetail.jsx'))
const RegisteredCab = lazy(() => import('./__pages__/driver/registeredCab.jsx'))
const DriverCompletedBooking = lazy(() => import('./__pages__/driver/driverCompletedBooking.jsx'))

//Admin Routes
const AdminDashboard = lazy(() => import('./__pages__/admin/adminDashboard.jsx'))

function App() {
    const { isLoading } = useFetchUser()
    const { user } = useSelector((state) => state.auth)
    const RoleBasedHome = () => {
        switch (user?.role) {
            case 'Admin':
                return <AdminDashboard />
            case 'Driver':
                return <DriverDisplay />
            default:
                return <Home />
        }
    }

    if (isLoading) return <Loader />
    return (
        <>
            <Router>
                <Header />
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route
                            path="/"
                            element={<RoleBasedHome />}
                        />
                        <Route
                            path="/auth"
                            element={
                                user ? (
                                    user.isVerified ? (
                                        <Navigate
                                            to="/user-profile"
                                            replace
                                        />
                                    ) : (
                                        <AuthScreen />
                                    )
                                ) : (
                                    <AuthScreen />
                                )
                            }
                        />
                        <Route
                            path="/user-profile"
                            element={
                                <ProtectedHook>
                                    {' '}
                                    <Profile />
                                </ProtectedHook>
                            }
                        />
                        <Route
                            path="/display-cabs"
                            element={
                                <ProtectedHook>
                                    {' '}
                                    <DisplayCabs />
                                </ProtectedHook>
                            }
                        />
                        <Route
                            path="/preview-booking/:id"
                            element={
                                <ProtectedHook roles={['Passenger']}>
                                    {' '}
                                    <PreviewBooking />
                                </ProtectedHook>
                            }
                        />
                        <Route
                            path="/bookings"
                            element={
                                <ProtectedHook roles={['Passenger']}>
                                    <MyBooking />
                                </ProtectedHook>
                            }
                        />
                        <Route
                            path="/booking/:id"
                            element={
                                <ProtectedHook roles={['Passenger', 'Driver', 'Admin']}>
                                    <BookingDetails />
                                </ProtectedHook>
                            }
                        />
                        <Route
                            path="/driver-order/:id"
                            element={
                                <ProtectedHook roles={['Driver', 'Admin']}>
                                    <OrderDetail />
                                </ProtectedHook>
                            }
                        />
                        <Route
                            path="/registeredCabs"
                            element={
                                <ProtectedHook roles={['Driver', 'Admin']}>
                                    <RegisteredCab />
                                </ProtectedHook>
                            }
                        />
                        <Route
                            path="/mybookings"
                            element={
                                <ProtectedHook roles={['Driver', 'Admin']}>
                                    <DriverCompletedBooking />
                                </ProtectedHook>
                            }
                        />
                    </Routes>
                </Suspense>
            </Router>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

export default App
