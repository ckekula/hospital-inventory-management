import { baseApi } from "./baseApi";
import { Item } from "@/types/item";

export const itemApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
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
    updateItem: build.mutation<Item, { id: string; data: Partial<Item> }>({
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
  }),
});

export const {
  useGetItemsQuery,
  useAddItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemApi;
