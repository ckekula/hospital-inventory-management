import { baseApi } from "./baseApi";
import { Unit } from "@/types/admin";

export const unitApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getUnits: build.query<Unit[], void>({
      query: () => "/unit",
      providesTags: ["Unit"],
    }),
    addUnit: build.mutation<Unit, Partial<Unit>>({
      query: (body) => ({
        url: "/unit",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Unit"],
    }),
    updateUnit: build.mutation<Unit, { id: number; data: Partial<Unit> }>({
      query: ({ id, data }) => ({
        url: `/unit/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Unit"],
    }),
    deleteUnit: build.mutation<void, number>({
      query: (id) => ({
        url: `/unit/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Unit"],
    }),
  }),
});

export const {
  useGetUnitsQuery,
  useAddUnitMutation,
  useUpdateUnitMutation,
  useDeleteUnitMutation,
} = unitApi;
