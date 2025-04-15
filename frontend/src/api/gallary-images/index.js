import { apiSlice } from "..";

const gallaryImages = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllGallaryImages: builder.query({
      query: () => "gallary_images",
      providesTags: ["GallaryImage"],
    }),
    createGallaryImage: builder.mutation({
      query: ({ payload }) => ({
        url: "gallary_images",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useGetAllGallaryImagesQuery, useCreateGallaryImageMutation } =
  gallaryImages;
