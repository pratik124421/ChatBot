import Axios from "axios";

export class HttpUtil {
  public static async request(config: any) {
    console.log("request......");
    let updatedConfig = {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      transformRequest: config.transformRequest,
      transformResponse: config.transformResponse,
      headers: config.headers,
      params: config.params,
      paramsSerializer: config.paramsSerializer,
      data: config.data,
      // timeout: 3000,
      // timeoutErrorMessage: 'Request time out',
      withCredentials: config.withCredentials,
      adapter: config.adapter,
      auth: config.auth,
      responseType: config.responseType,
      xsrfCookieName: config.xsrfCookieName,
      xsrfHeaderName: config.xsrfHeaderName,
      onUploadProgress: config.onUploadProgress,
      onDownloadProgress: config.onDownloadProgress,
      maxContentLength: Infinity,
      validateStatus: config.validateStatus,
      maxRedirects: config.maxRedirects,
      socketPath: config.socketPath,
      httpAgent: config.httpAgent,
      httpsAgent: config.httpsAgent,
      proxy: config.proxy,
      cancelToken: config.cancelToken,
    };

    try {
      console.log("request came......");

      let response = await Axios.request(updatedConfig);
      return response.data;
    } catch (e) {
      return e;
    }
  }

  public static get(url: string, header?: any, paramsVal?: any) {
    let config = {
      url: url,
      method: "get",
      params: paramsVal,
      headers: header,
    };
    return HttpUtil.request(config);
  }

  public static post(url: string, payload?: any, header?: any) {
    let config = {
      url: url,
      method: "post",
      headers: header,
      data: payload,
    };
    console.log("configg", config);
    return HttpUtil.request(config);
  }

  public static delete(url: string, payload?: any, header?: any) {
    let config = {
      url: url,
      method: "delete", // default
      headers: header,
      data: payload,
    };
    return HttpUtil.request(config);
  }
}
