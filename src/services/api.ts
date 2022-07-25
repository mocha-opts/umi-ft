import request from "@/utils/request";
import type { Password } from "@/types/login";
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

export const login = (payload: Password) => {
  request.post("/login", {
    ...payload,
  });
};

export const name = 1;
