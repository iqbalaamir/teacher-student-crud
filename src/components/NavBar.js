import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

function NavBar() {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="students">
        <Link to="/students">Students</Link>
      </Menu.Item>
      <Menu.Item key="teachers">
        <Link to="/teachers">Teachers</Link>
      </Menu.Item>
    </Menu>
  );
}

export default NavBar;
