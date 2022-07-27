import React from "react";

import { UserStore } from "./UserStore";

export const stores = { UserStore };

export const Store = React.createContext(stores);

// StoreProvide组件，用来给子组件传递store
export const StoreProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  //@ts-ignore
  return <Store.Provider value={stores}>{children}</Store.Provider>;
};

export const useStore = () => {
  const store = React.useContext(Store);
  if (!store) {
    // this is especially useful in TypeScript so you don't need to be checking for null all the time
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return store;
};
