import request from "@/utils/request";

const serviceName = "api";

export const listPost = (payload: any) =>
  request.get(`/posts`, {
    data: {
      ...payload,
    },
  });

export const register = (payload: any) =>
  request.post(`/register`, {
    data: {
      ...payload,
    },
  });
