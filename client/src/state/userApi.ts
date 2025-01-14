import { User } from "@/types/admin";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getUsers: build.query<User[], void>({
		  query: () => ({
			url: "/keycloak/users",
			method: "GET",
		  }),
		  providesTags: ["User"],
		}),
		addUser: build.mutation<User, Partial<User>>({
			query: (body) => ({
			  url: "/keycloak/users",
			  method: "POST",
			  body,
			}),
			invalidatesTags: ["User"],
		}),
		updateUser: build.mutation<void, { id: string; data: Partial<User> }>({
		  query: ({ id, data }) => ({
			url: `/keycloak/users/${id}`,
			method: "PUT",
			body: data,
		  }),
		  invalidatesTags: ["User"],
		}),
		deleteUser: build.mutation<void, string>({
		  query: (id) => ({
			url: `/keycloak/users/${id}`,
			method: "DELETE",
		  }),
		  invalidatesTags: ["User"],
		}),
	}),
});

export const {
	useGetUsersQuery,
	useAddUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
} = userApi;