import React from 'react';
import { Outlet } from "umi";
import styles from "./index.less";
import { StoreProvider } from "@/stores";
// import { isSynchronized } from "mobx-persist-store";
import "@/sula";
import Menu from "@/components/Menu";

export default () => {
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
    <StoreProvider>
      <div className={styles.navs}>
        <Menu></Menu>
        <Outlet />
      </div>
    </StoreProvider>
  );
};

