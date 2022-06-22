import React, { useEffect } from "react";
import styles from "./post.less";
export default function Page() {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Page post</h1>
    </div>
  );
}
