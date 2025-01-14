import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
    prepareHeaders: (headers) => {
      // required headers for Keycloak authentication
      const token = localStorage.getItem('keycloak-token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "api",
  tagTypes: ["Equipment", "Item", "Unit", "Location", "User"],
  endpoints: () => ({}),
});
