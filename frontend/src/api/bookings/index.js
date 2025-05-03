import { apiSlice } from "..";

const bookingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: ({ payload }) => ({
        url: "bookings",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Booking"],
    }),
    checkBooking: builder.query({
      query: (params) => ({
        url: "bookings/check_booking",
        method: "GET",
        params,
      }),
      providesTags: ["Booking"],
    }),
    getCurrentUsersBookings: builder.query({
      query: () => "bookings/my_bookings",
      providesTags: ["Booking"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useCheckBookingQuery,
  useGetCurrentUsersBookingsQuery,
} = bookingApi;
