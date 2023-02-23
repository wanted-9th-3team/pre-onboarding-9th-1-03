import axios, {AxiosRequestConfig} from "axios";

export const baseURL = 'https://pre-onboarding-selection-task.shop';

const axiosConfig: AxiosRequestConfig = {
  baseURL: baseURL,
  timeout: 180000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  }
}

export const client = axios.create(axiosConfig);

client.interceptors.request.use((config) => {
  if (!config.headers) return config;

  let token: string | null = localStorage.getItem('ACCESS_TOKEN');
  if(token !== null){
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});