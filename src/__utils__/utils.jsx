export const extractNumericValue = (distanceString) => {
    if (typeof distanceString !== 'string') return null

    // Remove any commas and non-numeric characters except the decimal point
    const cleanedString = distanceString.replace(/,/g, '').replace(/[^0-9.]/g, '')
    const distance = parseFloat(cleanedString)

    if (isNaN(distance)) return 0 // In case the distance parsing fails

    const totaldistance = distance

    // Return the rounded price
    return Math.round(totaldistance)
}

export const priceCalculator = (distance, rate) => {
    if (typeof distance !== 'number' || typeof rate !== 'number') return 0

    if (isNaN(distance) || isNaN(rate)) return 0

    const totalprice = distance * rate

    // Return the rounded price
    return Math.round(totalprice)
}
