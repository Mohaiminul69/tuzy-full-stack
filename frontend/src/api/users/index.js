import { apiSlice } from "..";

const users = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: ({ payload }) => ({
        url: "users/register",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = users;
