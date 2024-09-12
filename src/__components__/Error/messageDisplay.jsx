import PropTypes from 'prop-types'

const MessageDisplay = ({ message, type = 'info' }) => {
    const getIcon = () => {
        switch (type) {
            case 'error':
                return '❌'
            case 'not-found':
                return '🔍'
            default:
                return 'ℹ️'
        }
    }

    return (
        <div className={`message-display ${type}`}>
            <span className="icon">{getIcon()}</span>
            <p className="content">{message}</p>
        </div>
    )
}

MessageDisplay.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['error', 'not-found', 'info'])
}

export default MessageDisplay
