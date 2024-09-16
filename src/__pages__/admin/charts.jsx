// eslint-disable-next-line no-unused-vars
import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import PropTypes from 'prop-types'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement, Filler)
const BarChart = ({ data_1 = [], data_2 = [], title_1, title_2, bgColor_1, bgColor_2, horizontal = false, labels = [] }) => {
    const options = {
        responsive: true,
        indexAxis: horizontal ? 'y' : 'x',
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Booking & Transaction Amount'
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y1: {
                type: 'linear',
                position: 'left',
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Booking Count'
                },
                grid: {
                    display: false
                }
            },
            y2: {
                type: 'linear',
                position: 'right',
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Transactions Amount'
                },
                grid: {
                    display: false
                }
            }
        }
    }

    const data = {
        labels,
        datasets: [
            {
                label: title_1,
                data: data_1,
                backgroundColor: bgColor_1,
                yAxisID: 'y1'
            },
            {
                label: title_2,
                data: data_2,
                backgroundColor: bgColor_2,
                yAxisID: 'y2'
            }
        ]
    }

    return (
        <Bar
            options={options}
            data={data}
        />
    )
}
BarChart.propTypes = {
    data_1: PropTypes.arrayOf(PropTypes.number),
    data_2: PropTypes.arrayOf(PropTypes.number),
    title_1: PropTypes.string.isRequired,
    title_2: PropTypes.string.isRequired,
    bgColor_1: PropTypes.string.isRequired,
    bgColor_2: PropTypes.string.isRequired,
    horizontal: PropTypes.bool,
    labels: PropTypes.arrayOf(PropTypes.string)
}
const DoughnutChart = ({ labels, data, backgroundColor, cutout, legends = true, offset }) => {
    const doughnutData = {
        labels,
        datasets: [
            {
                data,
                backgroundColor,
                borderWidth: 0,
                offset
            }
        ]
    }

    const doughnutOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: legends,
                position: 'bottom',
                labels: {
                    padding: 40
                }
            }
        },
        cutout
    }

    return (
        <Doughnut
            data={doughnutData}
            options={doughnutOptions}
        />
    )
}
DoughnutChart.propTypes = {
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    backgroundColor: PropTypes.arrayOf(PropTypes.string).isRequired,
    cutout: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    legends: PropTypes.bool,
    offset: PropTypes.number
}
export { BarChart, DoughnutChart }
