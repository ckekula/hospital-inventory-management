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
		getUserRoles: build.query<string[], string>({
			query: (userId) => ({
			  url: `/keycloak/users/${userId}/roles`,
			  method: "GET",
			}),
			providesTags: (result, error, userId) => [{ type: 'User', id: userId }],
		}),
	
		assignUserRole: build.mutation<void, { userId: string, role: string }>({
		query: ({ userId, role }) => ({
			url: `/keycloak/users/${userId}/roles`,
			method: "POST",
			body: { role },
		}),
		invalidatesTags: (result, error, { userId }) => [
			{ type: 'User', id: userId },
			'User'
		],
		}),
	
		removeUserRole: build.mutation<void, { userId: string, role: string }>({
		query: ({ userId, role }) => ({
			url: `/keycloak/users/${userId}/roles/${role}`,
			method: "DELETE",
		}),
		invalidatesTags: (result, error, { userId }) => [
			{ type: 'User', id: userId },
			'User'
		],
		}),
	}),
});

export const {
	useGetUsersQuery,
	useAddUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
	useGetUserRolesQuery,
	useAssignUserRoleMutation,
	useRemoveUserRoleMutation,
} = userApi;