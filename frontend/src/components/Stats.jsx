import { Statistic, message } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

export default function Stats({ month, monthText }) {
    const [statsData, setStatsData] = useState(null);
    const [barChartData, setBarChartData] = useState(null);
    const [pieChartData, setPieChartData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        try {
            setLoading(true);
            const [statsRes, barChartRes, pieChartRes] = await Promise.all([
                axios.get(`http://localhost:8080/api/statistics?month=${month}`),
                axios.get(`http://localhost:8080/api/bar-chart?month=${month}`),
                axios.get(`http://localhost:8080/api/pie-chart?month=${month}`)
            ]);
            setLoading(false);
            setStatsData(statsRes.data);
            setBarChartData(barChartRes.data);
            setPieChartData(pieChartRes.data);
            message.success('Data loaded successfully');
        } catch (error) {
            console.log(error);
            message.error('Error loading data');
        }
    };

    useEffect(() => {
        getData();
        return () => {
            setStatsData(null);
            setBarChartData(null);
            setPieChartData(null);
        };
    }, [month]);

    return (
        <>
            <h2>Stats for {monthText} </h2>

            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '48px',
                }}
            >
                <div style={{ minWidth: '720px' }}>
                    <Totals stats={statsData} loading={loading} />
                    {barChartData && <BarChart data={barChartData} />}
                </div>
                
                {pieChartData && <PieChart data={pieChartData} />}
            </div>
        </>
    );
}

function Totals({ stats, loading }) {
    return (
        <div
            className='stats'
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                maxWidth: '900px',
                padding: '12px 0px',
                borderTop: '1px solid #dadada',
                borderBottom: '1px solid #dadada',
            }}
        >
            <Statistic
                valueStyle={{ fontSize: '32px' }}
                title="Total Sale"
                value={stats?.totalSale}
                loading={loading}
                prefix="₹"
            />
            <Statistic
                valueStyle={{ fontSize: '32px' }}
                title="Total Sold Items"
                value={stats?.soldCount}
                loading={loading}
            />
            <Statistic
                valueStyle={{ fontSize: '32px' }}
                title="Total Unsold Items"
                value={stats?.unsoldCount}
                loading={loading}
            />
        </div>
    );
}

function BarChart({ data }) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            }
        },
        scales: {
            x: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Price Range'
                }
            },
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Product Count'
                },
                ticks: {
                    stepSize: 4
                }
            }
        },
        aspectRatio: 1.6,
        plugins: {
            title: {
                display: true,
                text: 'No of products per price range'
            },
        },
    };

    const labels = Object.keys(data);
    const values = Object.values(data);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'No of products per price range',
                data: values,
                backgroundColor: ['rgba(0, 181, 204, 0.7)']
            }
        ]
    };

    return (
        <Bar
            data={chartData}
            options={options}
            style={{ margin: '24px 0px', maxWidth: '900px', maxHeight: '500px' }}
        />
    );
}

function PieChart({ data }) {
    const labels = Object.keys(data);
    const values = Object.values(data);

    const colors = [
        'rgba(255, 206, 86, 0.8)', // Yellow
        'rgba(75, 192, 192, 0.8)', // Green
        'rgba(153, 102, 255, 0.8)', // Purple
        'rgba(255, 159, 64, 0.8)',  // Orange
        'rgba(255, 99, 132, 0.8)', // Red
        'rgba(54, 162, 235, 0.8)', // Blue
        
    ];

    // Use colors cyclically if there are more segments than colors
    const chartColors = labels.length > colors.length 
        ? colors.concat(Array(labels.length - colors.length).fill(colors[0]))
        : colors.slice(0, labels.length);

    const chartData = {
        labels,
        datasets: [
            {
                label: '# of Products',
                data: values,
                backgroundColor: chartColors,
                borderColor: chartColors.map(color => color.replace('1', '4')), // Make border color darker
                borderWidth: 1
            }
        ]
    };
    return (
        <Doughnut
            data={chartData}
            style={{ margin: '24px 0px', maxHeight: '400px', maxWidth: '400px' }}
        />
    );
}
