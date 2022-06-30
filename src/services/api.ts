import request from "@/utils/request";

const serviceName = "api";

export const listPost = (payload: any) =>
  request.post(`/posts`, {
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
