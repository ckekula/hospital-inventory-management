import { EquipmentType } from "@/types/inventory";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
  }),
  reducerPath: "api",
  tagTypes: ["EquipmentTypes", "Units", "Locations"],
  endpoints: (build) => ({
    getEquipmentTypes: build.query<EquipmentType[], void>({
      query: () => "/equipment-types",
      providesTags: ["EquipmentTypes"],
    }),
    addEquipmentType: build.mutation<EquipmentType, Partial<EquipmentType>>({
      query: (body) => ({
        url: "/equipment-types",
        method: "POST",
        body,
      }),
      invalidatesTags: ["EquipmentTypes"],
    }),
    updateEquipmentType: build.mutation<EquipmentType,
      { id: string; data: Partial<EquipmentType> }
    >({
      query: ({ id, data }) => ({
        url: `/equipment-types/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["EquipmentTypes"],
    }),
    deleteEquipmentType: build.mutation<void, string>({
      query: (id) => ({
        url: `/equipment-types/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EquipmentTypes"],
    }),
  }),
});

export const {
  useGetEquipmentTypesQuery,
  useAddEquipmentTypeMutation,
  useUpdateEquipmentTypeMutation,
  useDeleteEquipmentTypeMutation,
} = api;
