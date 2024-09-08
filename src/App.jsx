import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from './__components__/loader/loader.jsx'
import Header from './__components__/header/header.jsx'
import useFetchUser from './__hooks__/fetchUser.jsx'
import ProtectedHook from './__hooks__/protectedHook.jsx'
const Home = lazy(() => import('./__pages__/home.jsx'))
const AuthScreen = lazy(() => import('./__pages__/auth.jsx'))
const Profile = lazy(() => import('./__pages__/profile.jsx'))

function App() {
    const { user, isLoading } = useFetchUser()

    //    console.log(allowedUser);
    if (isLoading) return <Loader />
    return (
        <>
            <Router>
                <Header />
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route
                            path="/"
                            element={<Home />}
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
