export const getLastMonths = () => {
    const currentDate = new Date()

    currentDate.setDate(1) // Set to the first day of the current month

    const last6Months = []
    const last12Months = []

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    for (let i = 0; i < 6; i++) {
        const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
        const monthName = monthNames[monthDate.getMonth()]
        last6Months.unshift(monthName)
    }

    for (let i = 0; i < 12; i++) {
        const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
        const monthName = monthNames[monthDate.getMonth()]
        last12Months.unshift(monthName)
    }

    return {
        last12Months,
        last6Months
    }
}
