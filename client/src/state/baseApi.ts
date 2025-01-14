import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
  }),
  reducerPath: "api",
  tagTypes: ["Equipment", "Item", "Unit", "Location"],
  endpoints: () => ({}),
});
