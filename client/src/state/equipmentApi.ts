import { baseApi } from "./baseApi";
import { Equipment } from "@/types/inventory";

export const equipmentApi = baseApi.injectEndpoints({
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
    updateEquipment: build.mutation<Equipment, { id: number; data: Partial<Equipment> }>({
      query: ({ id, data }) => ({
        url: `/equipment/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Equipment"],
    }),
    deleteEquipment: build.mutation<void, number>({
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
} = equipmentApi;
