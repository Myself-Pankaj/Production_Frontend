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

export const revenueViewer = (revenue) => {
    if (revenue >= 1000 && revenue < 1000000) {
        return revenue % 1000 === 0 ? `${revenue / 1000}K` : `${(revenue / 1000).toFixed(1)}K`
    }
    if (revenue >= 1000000 && revenue < 1000000000) {
        return revenue % 1000000 === 0 ? `${revenue / 1000000}M` : `${(revenue / 1000000).toFixed(1)}M`
    }
    if (revenue >= 1000000000) {
        return revenue % 1000000000 === 0 ? `${revenue / 1000000000}B` : `${(revenue / 1000000000).toFixed(1)}B`
    }
    return revenue
}
