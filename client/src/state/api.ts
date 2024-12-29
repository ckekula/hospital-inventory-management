import { Equipment } from "@/types/inventory";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
  }),
  reducerPath: "api",
  tagTypes: ["Equipment", "Units", "Locations"],
  endpoints: (build) => ({
    getEquipment: build.query<Equipment[], void>({
      query: () => "/equipment",
      providesTags: ["Equipment"],
    }),
    addEquipment: build.mutation<Equipment, Partial<Equipment>>({
      query: (body) => ({
        url: "/equipment",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Equipment"],
    }),
    updateEquipment: build.mutation<Equipment,
      { id: string; data: Partial<Equipment> }
    >({
      query: ({ id, data }) => ({
        url: `/equipment/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Equipment"],
    }),
    deleteEquipment: build.mutation<void, string>({
      query: (id) => ({
        url: `/equipment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Equipment"],
    }),
  }),
});

export const {
  useGetEquipmentQuery,
  useAddEquipmentMutation,
  useUpdateEquipmentMutation,
  useDeleteEquipmentMutation,
} = api;
