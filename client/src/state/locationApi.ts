import { AddLocationRequest } from "@/types/admin";
import { baseApi } from "./baseApi";

export const locationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLocations: build.query<Location[], void>({
      query: () => "/location",
      providesTags: ["Location"],
    }),
    addLocation: build.mutation<Location, AddLocationRequest>({
      query: (body) => ({
        url: "/location",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Location"],
    }),
    deleteLocation: build.mutation<void, string>({
      query: (id) => ({
        url: `/location/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Location"],
    }),
  }),
});

export const {
  useGetLocationsQuery,
  useAddLocationMutation,
  useDeleteLocationMutation,
} = locationApi;
