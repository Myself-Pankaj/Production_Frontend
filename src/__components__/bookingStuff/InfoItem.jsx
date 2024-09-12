import PropTypes from 'prop-types'

export const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="info-item">
        <Icon />
        <span className="info-item__label">{label}</span>
        <span className="info-item__value">{value}</span>
    </div>
)

InfoItem.propTypes = {
    icon: PropTypes.elementType.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}
