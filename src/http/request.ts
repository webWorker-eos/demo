// axios 封装
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { getMessageInfo } from './status';
import { ElMessage } from 'element-plus';

interface BaseResponse<T = any> {
  code: number | string;
  message: string;
  data: T;
  status?: number | string;
}

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response.data;
    }
    ElMessage({
      message: getMessageInfo(response.status),
      type: 'error',
    });
    return response.data;
  },
  (error: any) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      ElMessage({
        message: getMessageInfo(response.status),
        type: 'error',
      });
      return Promise.reject(response.data);
    }
    ElMessage({
      message: '网络异常,请稍后再试!',
      type: 'error',
    });
    return Promise.reject(error);
  }
);

// 此处相当于二次响应拦截
// 为响应数据进行定制化处理
const requestInstance = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  const conf = config;
  return new Promise((resolve, reject) => {
    service
      .request<any, AxiosResponse<BaseResponse>>(conf)
      .then((res: AxiosResponse<BaseResponse>) => {
        const data = res.data; // 如果data.code为错误代码返回message信息
        if (data.code != 0) {
          ElMessage({
            message: data.message,
            type: 'error',
          });
          reject(data.message);
        } else {
          ElMessage({
            message: data.message,
            type: 'success',
          }); // 此处返回data信息 也就是 api 中配置好的 Response类型
          resolve(data.data as T);
        }
      });
  });
};
export function get<T = any, U = any>(
  config: AxiosRequestConfig,
  url: string,
  parms?: U
): Promise<T> {
  return requestInstance({ ...config, url, method: 'GET', params: parms });
}
export function post<T = any, U = any>(
  config: AxiosRequestConfig,
  url: string,
  data: U
): Promise<T> {
  return requestInstance({ ...config, url, method: 'POST', data: data });
}

export function put<T = any, U = any>(
  config: AxiosRequestConfig,
  url: string,
  parms?: U
): Promise<T> {
  return requestInstance({ ...config, url, method: 'PUT', params: parms });
}
export function del<T = any, U = any>(
  config: AxiosRequestConfig,
  url: string,
  data: U
): Promise<T> {
  return requestInstance({ ...config, url, method: 'DELETE', data: data });
}

// export default service;
