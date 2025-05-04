import { apiSlice } from "..";

const packages = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPackages: builder.query({
      query: () => "packages",
      providesTags: ["Package"],
    }),
    getSinglePackage: builder.query({
      query: (id) => `packages/${id}`,
    }),
    createPackage: builder.mutation({
      query: ({ payload }) => ({
        url: "packages",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Package"],
    }),
    deletePackage: builder.mutation({
      query: (id) => ({
        url: `packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Package"],
    }),
  }),
});

export const {
  useGetAllPackagesQuery,
  useCreatePackageMutation,
  useGetSinglePackageQuery,
  useDeletePackageMutation,
} = packages;
