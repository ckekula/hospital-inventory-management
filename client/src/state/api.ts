import { Unit } from "@/types/admin";
import { Equipment } from "@/types/inventory";
import { Item } from "@/types/item";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
  }),
  reducerPath: "api",
  tagTypes: ["Equipment", "Item", "Unit", "Location"],
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
    getItems: build.query<Item[], void>({
      query: () => "/item",
      providesTags: ["Item"],
    }),
    addItem: build.mutation<Item, Partial<Item>>({
      query: (body) => ({
        url: "/item",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Item"],
    }),
    updateItem: build.mutation<Item,
      { id: string; data: Partial<Item> }
    >({
      query: ({ id, data }) => ({
        url: `/item/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Item"],
    }),
    deleteItem: build.mutation<void, string>({
      query: (id) => ({
        url: `/item/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Item"],
    }),
    getUnits: build.query<Unit[], void>({
      query: () => "/unit",
      providesTags: ["Unit"],
    }),
    addUnit: build.mutation<Unit, Partial<Item>>({
      query: (body) => ({
        url: "/unit",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Unit"],
    }),
    deleteUnit: build.mutation<void, string>({
      query: (id) => ({
        url: `/unit/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Unit"],
    }),
  }),
});

export const {
  useGetEquipmentQuery,
  useAddEquipmentMutation,
  useUpdateEquipmentMutation,
  useDeleteEquipmentMutation,
  useGetItemsQuery,
  useAddItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useGetUnitsQuery,
  useAddUnitMutation,
  useDeleteUnitMutation,
} = api;
