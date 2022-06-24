import React, { useEffect, useState } from "react";
import { history } from "umi";
import { useRequest } from "ahooks";
import { listPost } from "@/services/api";
import "antd/dist/antd.less";
export default function HomePage() {
  const { data: posts, error, loading } = useRequest(listPost);

  return (
    <div>
      {!posts && <p>Loading...</p>}
      {posts && (
        <div>
          {/* {posts?.map((post) => (
            <div key={post.id}>
              <div onClick={() => history.push(`/posts/${post.id}`)}>
                <p>{post.title}</p>
              </div>
            </div>
          ))} */}
        </div>
      )}
    </div>
  );
}
