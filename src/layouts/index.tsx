import React from 'react';
import { Link, Outlet } from 'umi';
import styles from './index.less';

import { Provider, observer } from "mobx-react";
import { stores } from "@/stores";
// import { isSynchronized } from "mobx-persist-store";
import "@/sula";

export default observer(() => {
  // const allStoreAreSynchronized = () => {
  //   return Object.values(stores).every((store) => {
  //     return isSynchronized(store);
  //   });
  // };
  // if (!allStoreAreSynchronized()) {
  //   console.log("loading");
  //   return <p>Loading...</p>;
  // }
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
      <Provider {...stores}>
        <Outlet />
      </Provider>
    </div>
  );
});

