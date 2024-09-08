import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

const ProtectedHook = ({ children, roles = [] }) => {
    const { user } = useSelector((state) => state.auth)
    const location = useLocation()

    if (!user) {
        return (
            <Navigate
                to="/auth"
                state={{ from: location.pathname }}
                replace
            />
        )
    }

    if (roles.length > 0 && !roles.includes(user.role)) {
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
    children: PropTypes.node.isRequired, // Validate children prop
    roles: PropTypes.arrayOf(PropTypes.string) // Validate roles prop
}

export default ProtectedHook
