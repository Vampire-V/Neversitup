import axios, { AxiosInstance } from "axios";

const fetchClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: "https://candidate-assignment.neversitup.com",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
  );
  return instance;
};

const instance = fetchClient();

export { instance };
