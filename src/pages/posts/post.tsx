import { postDetail } from "@/services/api";
import { useRequest } from "ahooks";
import React, { useEffect } from "react";
import styles from "./post.less";
import { useParams } from "umi";

export default function Page() {
  const params = useParams();
  console.log(params);
  const { data: detail, error, loading } = useRequest(() => postDetail(params));

  return (
    <div>
      <h1 className={styles.title}>{detail?.title}</h1>
      <div>{detail?.content}</div>
    </div>
  );
}
