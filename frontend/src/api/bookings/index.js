import { apiSlice } from "..";

const bookingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: ({ payload }) => ({
        url: "bookings",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCreateBookingMutation } = bookingApi;
