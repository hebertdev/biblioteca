import axiosInstance from "../helpers/axios-helpers";

export async function whoami() {
  const { data } = await axiosInstance.get("/users/whoami/me/");
  return data;
}
