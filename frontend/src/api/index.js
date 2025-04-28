import toast from "react-hot-toast";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001/api/",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Token is invalid/expired
    localStorage.removeItem("token"); // Remove bad token
    toast.error("Session expired. Please log in again.");
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000); // 2 second delay
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api", // optional, just the key in your store
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Destination", "GallaryImage", "User"],
  endpoints: () => ({}),
});
