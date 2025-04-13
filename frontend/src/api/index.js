// src/api/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // optional, just the key in your store
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/" }),
  endpoints: (builder) => ({
    getDestinations: builder.query({
      query: () => "destinations", // GET /api/ping
    }),
    createDestination: builder.mutation({
      query: (destination) => ({
        url: "destinations",
        method: "POST",
        body: destination,
      }),
    }),
  }),
});

export const { useGetDestinationsQuery, useCreateDestinationMutation } =
  apiSlice;
