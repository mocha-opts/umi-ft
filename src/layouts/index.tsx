import React from 'react';
import { Link, Outlet } from 'umi';
import styles from './index.less';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/posts/create">Create</Link>
        </li>
        <li>
          <Link to="login">login</Link>
        </li>
        <li>
          <Link to="register">register</Link>
        </li>
        <li>
          <Link to="topology">topology</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
