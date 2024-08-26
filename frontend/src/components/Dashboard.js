// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import Transactions from './Transactions';
import Stats from './Stats';
import { Select, Spin } from 'antd';

const options = [
  "All Months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const Dashboard = () => {
  const [month, setMonth] = useState(3);
  const [loading, setLoading] = useState(false);

  const handleMonthChange = (value) => {
    setMonth(parseInt(value));
  };

  useEffect(() => {
    // Any additional logic can be added here if needed
  }, [month]);

  return (
    <>
      <Select
        size="large"
        defaultValue={options[month]}
        onChange={handleMonthChange}
        style={{ width: 200, marginBottom: '20px' }}
        options={options.map((text, i) => ({
          value: i,
          label: text
        }))}
      />

      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <Transactions month={month} monthText={options[month]} />
          <Stats month={month} monthText={options[month]} />
        </>
      )}
    </>
  );
};

export default Dashboard;
