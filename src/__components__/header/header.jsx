import React from 'react'
import { FaBars, FaBookmark, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../__assets__/logo.png'
import userImg from '../../__assets__/userpic.png'
import { useDispatch, useSelector } from 'react-redux'
import { useLazyLogoutQuery } from '../../__redux__/api/authApi'
import { toast } from 'react-toastify'
import { logout } from '../../__redux__/slice/authSlice'

const Header = () => {
    const navigate = useNavigate()
    const [isMobileView, setIsMobileView] = React.useState(window.innerWidth <= 768)
    const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false)
    const [isNavMenuOpen, setIsNavMenuOpen] = React.useState(false)
    const [logoutUser] = useLazyLogoutQuery()
    const dispatch = useDispatch()
    const toggleNavMenu = () => {
        setIsNavMenuOpen(!isNavMenuOpen)
    }

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen)
    }
    const { user } = useSelector((state) => state.auth)
    React.useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 768)
            if (window.innerWidth > 768) {
                setIsNavMenuOpen(false)
            }
        }

        const handleClickOutside = (event) => {
            if (!event.target.closest('.header__user-menu')) {
                setIsUserMenuOpen(false)
            }
        }

        window.addEventListener('resize', handleResize)
        document.addEventListener('click', handleClickOutside)

        return () => {
            window.removeEventListener('resize', handleResize)
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])
    const onLogout = async () => {
        try {
            // dispatch(resetForm());
            const result = await logoutUser()
            if (result.data.success === true) {
                dispatch(logout())
                navigate('/auth')
                toast.success(result.data.message)
            } else {
                toast.error('Unable to Logout')
            }
        } catch (error) {
            toast.error('Error during logout', error)
        }
    }
    return (
        <header className="header">
            <div className="header__container">
                {isMobileView && (
                    <button
                        className="header__mobile-toggle"
                        onClick={toggleNavMenu}>
                        <FaBars />
                    </button>
                )}

                {!isMobileView && (
                    <Link
                        to="/"
                        className="header__logo">
                        <img
                            src={Logo}
                            className="header__logo-icon"
                        />
                        <span className="header__logo-text">BariTravels</span>
                    </Link>
                )}
                <nav className={`header__nav ${isNavMenuOpen ? 'header__nav--open' : ''}`}>
                    {['Home', 'Our Fleet', 'Services', 'Contact'].map((item) => (
                        <Link
                            key={item}
                            to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                            className={`header__nav-link ${location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`) ? 'active' : ''}`}
                            onClick={() => isMobileView && toggleNavMenu()}>
                            {item}
                        </Link>
                    ))}
                </nav>
                <div className="header__user">
                    {user?._id ? (
                        <div className="header__user-menu">
                            <button
                                className="header__user-toggle"
                                onClick={toggleUserMenu}>
                                <img
                                    src={user?.avatar?.url ? user?.avatar?.url : userImg}
                                    alt="User"
                                />
                            </button>
                            {isUserMenuOpen && (
                                <div className="header__user-dropdown">
                                    <Link
                                        to="/user-profile"
                                        className="header__user-link">
                                        <FaUser /> Profile
                                    </Link>
                                    {user?.role !== 'Driver' ? (
                                        <Link
                                            to="/bookings"
                                            className="header__user-link">
                                            <FaBookmark /> My Bookings
                                        </Link>
                                    ) : (
                                        <Link
                                            to="/mybookings"
                                            className="header__user-link">
                                            <FaBookmark /> My Bookings
                                        </Link>
                                    )}
                                    <button
                                        onClick={onLogout}
                                        className="header__user-link header__logout">
                                        <FaSignOutAlt /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/auth"
                            className="header__auth-button">
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header
