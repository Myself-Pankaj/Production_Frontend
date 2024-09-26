// eslint-disable-next-line no-unused-vars
import React from 'react'
import AdminSidebar from './adminSidebar'
import { HiTrendingDown, HiTrendingUp } from 'react-icons/hi'
import { useStatsQuery } from '../../__redux__/api/adminApi'
import { BarChart, DoughnutChart } from './charts'
import { getLastMonths } from '../../__utils__/features'
import MessageDisplay from '../../__components__/Error/messageDisplay'
import { FaBalanceScale } from 'react-icons/fa'
import StylishLoader from '../../__components__/loader/StylishLoader'
import PropTypes from 'prop-types'

const AdminDashboard = () => {
    const { data: stats, isLoading, isError } = useStatsQuery()
    // console.log(stats.modifiedLatestTransaction)
    let loading = isLoading || !stats

    if (isError) {
        return (
            <MessageDisplay
                message="Unable to fetch"
                type="error"
            />
        )
    }
    const { last6Months: months } = getLastMonths()
    return (
        <div className="admin-container">
            <AdminSidebar />

            {loading ? (
                <StylishLoader
                    size="large"
                    color="black"
                />
            ) : (
                <main className="dashboard">
                    <section className="widget-container">
                        <WidgetItem
                            percent={stats?.changePercent?.revenue}
                            amount={true}
                            value={Math.round(stats?.count?.revenue)}
                            heading="Revenue"
                            color="rgb(0,115,255)"
                        />
                        <WidgetItem
                            percent={stats?.changePercent?.user}
                            value={Math.round(stats?.count?.users)}
                            heading="Users"
                            color="rgb(0 198 202)"
                        />
                        <WidgetItem
                            percent={stats?.changePercent?.order}
                            value={Math.round(stats?.count?.order)}
                            heading="Transactions"
                            color="rgb(255 196 0)"
                        />
                        <WidgetItem
                            percent={stats?.changePercent?.cabs}
                            value={Math.round(stats?.count?.cabs)}
                            heading="Cabs"
                            color="rgb(76 0 255)"
                        />
                    </section>

                    <section className="graph-container">
                        <div className="revenue-chart">
                            <h2>Revenue & Transaction</h2>
                            <BarChart
                                labels={months}
                                data_1={stats?.chart?.order}
                                data_2={stats?.chart?.revenue}
                                title_1="Booking"
                                title_2="Amount"
                                bgColor_1="rgb(0,115,255)"
                                bgColor_2="rgba(53,162,235,0.8)"
                            />
                        </div>

                        <div className="dashboard-categories">
                            <h2>Inventory</h2>
                            <div>
                                {stats?.typeCount.map((item) => (
                                    <CategoryItem
                                        key={item.capacity}
                                        capacity={item.capacity}
                                        count={item.count}
                                        color={`hsl(${item.count * 30}, 70%, 50%)`}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="transaction-container">
                        <div className="gender-chart">
                            <h2>Driver/Passeneger Ratio</h2>
                            <DoughnutChart
                                labels={['Driver', 'Customer', 'Admin']}
                                data={[stats?.userRatio?.Driver, stats?.userRatio?.Passenger, stats?.userRatio?.Admin]}
                                backgroundColor={['hsl(340,82%,56%)', 'rgba(53,162,235,0.8)', 'rgba(75,192,192,0.8)']}
                                cutout={90}
                            />
                            <p>
                                <FaBalanceScale />
                            </p>
                        </div>
                    </section>
                </main>
            )}
        </div>
    )
}

export default AdminDashboard

const WidgetItem = ({ heading, value, percent, color, amount = false }) => (
    <article className="widget">
        <div className="widget-info">
            <p>{heading}</p>
            <h4>{amount ? `₹${value}` : value}</h4>
            {percent > 0 ? (
                <span className="green">
                    <HiTrendingUp /> +{percent}%
                </span>
            ) : (
                <span className="red">
                    <HiTrendingDown /> {percent}%
                </span>
            )}
        </div>
        <div
            className="widget-circle"
            style={{
                background: `conic-gradient(
            ${color} ${(Math.abs(percent) / 100) * 360}deg,
            rgb(255, 255, 255) 0
          )`
            }}>
            <span
                style={{
                    color
                }}>
                {percent}%
            </span>
        </div>
    </article>
)

WidgetItem.propTypes = {
    heading: PropTypes.string.isRequired, // The heading text
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // The value to display, can be a string or a number
    percent: PropTypes.number.isRequired, // The percentage value
    color: PropTypes.string.isRequired, // The color for the gradient
    amount: PropTypes.bool // Optional boolean to format the value as currency
}
const CategoryItem = ({ capacity, count, color }) => (
    <div className="category-item">
        <h5>{capacity}-Seater</h5>
        <div>
            <div
                style={{
                    backgroundColor: color,
                    width: `${(count / 10) * 100}%`,
                    height: '20px',
                    borderRadius: '4px'
                }}></div>
        </div>
        <span>{count} vehicles</span>
    </div>
)
CategoryItem.propTypes = {
    capacity: PropTypes.number.isRequired, // The seating capacity, should be a number
    count: PropTypes.number.isRequired, // The count of vehicles, should be a number
    color: PropTypes.string.isRequired // The color for the progress bar
}
