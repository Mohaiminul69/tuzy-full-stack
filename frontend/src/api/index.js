// src/api/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // optional, just the key in your store
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/" }),
  endpoints: (builder) => ({
    getSingleDestination: builder.query({
      query: (id) => `destinations/${id}`,
      providesTags: ["Destination"],
    }),
    getDestinations: builder.query({
      query: () => "destinations",
    }),
    createDestination: builder.mutation({
      query: ({ payload }) => ({
        url: "destinations",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Destination"],
    }),
    updateDestination: builder.mutation({
      query: ({ id, payload }) => ({
        url: `destinations/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Destination"],
    }),
    deleteDestination: builder.mutation({
      query: (id) => ({
        url: `destinations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Destination"],
    }),
  }),
});

export const {
  useGetDestinationsQuery,
  useCreateDestinationMutation,
  useGetSingleDestinationQuery,
  useUpdateDestinationMutation,
  useDeleteDestinationMutation,
} = apiSlice;
