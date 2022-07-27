import { useStore } from "@/stores";
import { observer } from "mobx-react";
import React from "react";
import { Link } from "umi";
export default observer(() => {
  const { UserStore } = useStore();
  const { user } = UserStore;
  console.log(user.id, "22");
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/posts/create">Create</Link>
      </li>
      {!user.id && (
        <>
          <li>
            <Link to="login">login</Link>
          </li>
          <li>
            <Link to="register">register</Link>
          </li>
        </>
      )}
      <li>
        <Link to="topology">topology</Link>
      </li>
    </ul>
  );
});
