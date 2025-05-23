import { apiSlice } from "..";

const users = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: ({ payload }) => ({
        url: "users/register",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
    userLogin: builder.mutation({
      query: ({ payload }) => ({
        url: "users/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
    getCurrentUser: builder.query({
      query: () => "users/me",
      providesTags: ["User"],
    }),
    getSingleUser: builder.query({
      query: (id) => `users/${id}`,
      providesTags: ["User"],
    }),
    updateCurrentUserInfo: builder.mutation({
      query: ({ payload }) => ({
        url: "users/me",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useUserRegisterMutation,
  useUserLoginMutation,
  useGetCurrentUserQuery,
  useGetSingleUserQuery,
  useUpdateCurrentUserInfoMutation,
} = users;
