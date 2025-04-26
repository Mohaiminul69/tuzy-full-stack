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
  }),
});

export const {
  useGetAllPackagesQuery,
  useCreatePackageMutation,
  useGetSinglePackageQuery,
} = packages;
