import PropTypes from 'prop-types'

const StylishLoader = ({ size = 'medium', color = '#3498db' }) => {
    const sizeClass = `loader-${size}`

    return (
        <div className={`loader-container ${sizeClass}`}>
            <div
                className="loader"
                style={{ '--color': color }}>
                <div className="loader-dot"></div>
                <div className="loader-dot"></div>
                <div className="loader-dot"></div>
            </div>
        </div>
    )
}

StylishLoader.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    color: PropTypes.string
}

export default StylishLoader
