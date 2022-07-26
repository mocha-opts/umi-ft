import React, { useEffect, useState } from "react";
import { history } from "umi";
import { useRequest } from "ahooks";
import { listPost } from "@/services/api";
import type { Post } from "@/utils/types";
import { Demo } from "@/components/Demo";
import { Button } from "antd";
export default function HomePage() {
  const { data: posts, error, loading } = useRequest(listPost);
  const [id, setId] = useState(1);
  return (
    <div>
      {/* {loading && <p>Loading...</p>}
      {posts && (
        <div>
          {posts?.map((post: Post) => (
            <div key={post.id}>
              <div onClick={() => history.push(`/posts/${post.id}`)}>
                <p>{post.title}</p>
              </div>
            </div>
          ))}
        </div>
      )} */}
      <Button onClick={() => setId(id + 1)}>dasda</Button>
      {id}
      <Demo id={id}></Demo>
    </div>
  );
}
