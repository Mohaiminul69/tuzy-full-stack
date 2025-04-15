import { apiSlice } from "..";

const destinationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSingleDestination: builder.query({
      query: (id) => `destinations/${id}`,
    }),
    getDestinations: builder.query({
      query: () => "destinations",
      providesTags: ["Destination"],
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
} = destinationApi;
