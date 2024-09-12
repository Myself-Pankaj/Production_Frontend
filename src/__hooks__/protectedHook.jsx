import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

const ProtectedHook = ({ children, roles = [] }) => {
    const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth)
    const location = useLocation()

    // If authentication is still being checked, show a loading indicator
    if (isLoading) {
        return <div>Loading...</div>
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/auth"
                state={{ from: location.pathname }}
                replace
            />
        )
    }
    const role = user?.role || localStorage.getItem('role')
    // If user object is null or undefined, handle the error
    // if (!user) {
    //     return <Navigate to="/error" replace />
    // }

    // Check role if roles are specified
    if (roles.length > 0 && !roles.includes(role)) {
        return (
            <Navigate
                to="/"
                replace
            />
        )
    }

    return children
}

// Add prop validation
ProtectedHook.propTypes = {
    children: PropTypes.node.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string)
}

export default ProtectedHook
