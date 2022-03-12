//configuración básica para axios.
import Axios from "axios";
import { deleteToken } from "./auth-helpers";

//pude haberlo puesto en una variable de entorno :#
const baseURL = "http://localhost:8000/api";

let headers = {};

if (localStorage.token) {
  headers.Authorization = `token ${localStorage.token}`;
}

const axiosInstance = Axios.create({
  baseURL: baseURL,
  headers,
});

export default axiosInstance;

//interceptar si hay un error 401 (token invalido)
export function axiosInterceptors() {
  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 401) {
        deleteToken();
        window.location = "/accounts/login";
      } else {
        return Promise.reject(error);
      }
    }
  );
}

export function modifiedUrlImage(url) {
  let newBaseUrl = baseURL.split("/api")[0] + "/media/http%3A/";
  let newBaseUrl2 = baseURL.split("/api")[0] + "/media/https%3A/";

  if (url.includes(newBaseUrl)) {
    return url.replace(newBaseUrl, "http://");
  } else if (url.includes(newBaseUrl2)) {
    return url.replace(newBaseUrl2, "https://");
  }

  return url;
}
