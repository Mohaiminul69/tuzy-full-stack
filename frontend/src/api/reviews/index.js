import { apiSlice } from "..";

const reviews = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => "reviews",
      providesTags: ["Review"],
    }),
    getSpecificTourReviews: builder.query({
      query: ({ tourType, id }) => ({
        url: "reviews",
        params: { [`${tourType}_id`]: id },
      }),
      providesTags: ["Review"],
    }),
    createReview: builder.mutation({
      query: ({ payload }) => ({
        url: "reviews",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetAllReviewsQuery,
  useGetSpecificTourReviewsQuery,
} = reviews;
