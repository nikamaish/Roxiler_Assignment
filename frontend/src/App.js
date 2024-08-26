// src/App.js
import './App.css';
import React from 'react';
import { Layout, Menu } from 'antd';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './components/Dashboard';

const { Header, Content } = Layout;

const navItems = [
  {
    key: 1,
    label: <NavLink to="/"></NavLink>
  }
];

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <h1 style={{ color: "white" }}>Dashboard</h1>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={navItems}
            style={{
              flex: 1,
              padding: "0 60px"
            }}
          />
        </Header>
        <Content
          style={{
            padding: "0px 48px",
            backgroundColor: "white",
            minHeight: 600
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
