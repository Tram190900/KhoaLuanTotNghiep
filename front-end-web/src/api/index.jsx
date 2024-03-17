import axios from "axios";

var api = axios.create({
  baseURL: "http://localhost:8080",
});

export const getAPI = (url) => {
  return api.get(url);
};
export const postAPI = (url, formData) => {
  return api.post(url, formData);
};
export const postAPIWithImg = (url, data) => {
  return api.post(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
export const deleteAPI = (url) => {
  return api.delete(url);
};
export const putAPI = (url, data) => {
  return api.put(url, data);
};
export const putApiWithImage = (url, data) => {
  return api.put(url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
