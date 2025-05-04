import { apiSlice } from "..";

const gallaryImages = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllGallaryImages: builder.query({
      query: () => "gallary_images",
      providesTags: ["GallaryImage"],
    }),
    getSingleGallaryImage: builder.query({
      query: (id) => ({
        url: `gallary_images/${id}`,
      }),
    }),
    createGallaryImage: builder.mutation({
      query: ({ payload }) => ({
        url: "gallary_images",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["GallaryImage"],
    }),
    updateGallaryImage: builder.mutation({
      query: ({ id, payload }) => ({
        url: `gallary_images/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["GallaryImage"],
    }),
    deleteGallaryImage: builder.mutation({
      query: (id) => ({
        url: `gallary_images/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["GallaryImage"],
    }),
  }),
});

export const {
  useGetAllGallaryImagesQuery,
  useGetSingleGallaryImageQuery,
  useCreateGallaryImageMutation,
  useUpdateGallaryImageMutation,
  useDeleteGallaryImageMutation,
} = gallaryImages;
