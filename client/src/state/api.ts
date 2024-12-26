import {EquipmentTypes} from "@/types/state";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1`,
  }),
  reducerPath: "api",
  tagTypes: ["EquipmentTypes", "Units", "Locations"],
  endpoints: (build) => ({
    getEquipmentTypes: build.query<EquipmentTypes, void>({
      query: () => "/equipment-types",
      providesTags: ["EquipmentTypes"],
    }),
  }),
});

export const {useGetEquipmentTypesQuery} = api;
