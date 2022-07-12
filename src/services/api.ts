import { Password } from "@formily/antd";
import request from "@/utils/request";

const serviceName = "api";

export const listPost = (payload: any) =>
  request.get(`/posts`, {
    data: {
      ...payload,
    },
  });
export const postDetail = ({ postId }: any) =>
  request.get(`/posts/${String(postId)}`);

export const register = (payload: any) =>
  request.post(`/register`, {
    data: {
      ...payload,
    },
  });

type Password = {
  username: string;
  password: string;
};

export const login = (payload: Password) => {
  request.post("/login", {
    data: {
      ...payload,
    },
  });
};

export const name = 1 ;