import axios from "axios";
import Utils from "@/utils/wx";
import { getToken, removeToken } from "@/utils/cache";
import { Notify, Toast } from "vant";
import qs from "qs";

import router from "@/router";

const instance = axios.create({
  baseURL: "/",
});

const reportErrorUrl =
  "https://msg-plat-test.yy.com/car/agentApi/base/exceptionReport?bizid=15";

const reportErrorCount: any = {};

// Add a request interceptor
instance.interceptors.request.use(
  function({ hideLoading, ...config }: any) {
    // Do something before request is sent
    config.headers.accessToken = getToken();
    // config.headers.bizid = 15

    if (!hideLoading) {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
      });
    }

    return config;
  },
  function(error) {
    Toast.clear();
    // Do something with request error
    return false;
  }
);
// Add a response interceptor
instance.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    const { code, status, message } = response.data || {};

    Toast.clear();
    if (code !== 200 && status !== 200 && code !== 20000) {
      if (message) {
        Notify({ type: "danger", message });
      }
      return false;
    }

    return response.data || true;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    Toast.clear();
    Toast.setDefaultOptions({ duration: 3000 });

    const { data, config } = error.response || {};
    const { code, message } = data || {};
    if (code === 40102) {
      Toast.fail(message);
      return router.replace("/login");
    }

    const url = config?.url || "";
    if (url !== reportErrorUrl) {
      reportError(url, error?.response || error);
    }

    const errorCode = data?.data?.code || data?.data?.errcode;

    if ([500001, 401002].indexOf(errorCode) !== -1) {
      if (!sessionStorage.getItem(`_auth_times_${errorCode}`)) {
        sessionStorage.setItem(`_auth_times_${errorCode}`, "1"); // 只请允许重新授权一次
        removeToken();
      } else {
        Utils.loading.hide();
        Utils.dialog.show("授权失败，请重新进入");
      }
    } else {
      const message = error?.message || data?.message;
      if (message) {
        Toast.fail(message);
      } else if (typeof error === "string") {
        Toast.fail(error);
      } else if (url !== reportErrorUrl) {
        Toast.fail(`服务器开小差啦${url}`);
      }
    }

    return false;
  }
);

export const reportError = async (url: string, error: any) => {
  // const strError = JSON.stringify(error);
  // const count = reportErrorCount[url];
  // if (count > 3 || process.env.NODE_ENV !== "production") {
  //   return;
  // }
  // reportErrorCount[url] = (count || 0) + 1;
  // try {
  //   await request(`${reportErrorUrl}`, {
  //     content: `${url}${strError}`,
  //   });
  // } catch (e) {
  //   console.info(e);
  // }
};

const request = (url: string, data: any, config: any = {}) => {
  if (config?.method?.toUpperCase() === "GET") {
    return instance({
      url,
      params: data,
      ...config,
      paramsSerializer: (params) => {
        return qs.stringify(params);
      },
    });
  }
  return instance({
    method: "post",
    url,
    data,
    ...config,
  });
};

export default request;
