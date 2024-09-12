import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const server = import.meta.env.VITE_SERVER

// Create API slice
export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${server}/api/v1/`,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        }
    }),
    tagTypes: ['users', 'orders', 'cabs'],
    endpoints: (builder) => ({
        me: builder.query({
            query: () => 'me',
            providesTags: ['users']
        }),
        meId: builder.query({
            query: (id) => `userById/${id}`,
            providesTags: ['users'],
            transformResponse: (response) => {
                return response.data // Assuming the actual data is in the 'data' property
            }
        }),
        logout: builder.query({
            query: () => 'logout',
            providesTags: ['users']
        })
    })
})

// Create async thunks

export const { useMeQuery, useMeIdQuery, useLazyLogoutQuery } = authAPI
