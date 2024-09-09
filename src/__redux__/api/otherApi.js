import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const server = import.meta.env.VITE_SERVER
export const otherAPI = createApi({
    reducerPath: 'otherAPI',
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
    tagTypes: ['users', 'orders', 'cabs', 'distance'],
    endpoints: (builder) => ({
        calculateDistance: builder.query({
            query: ({ origin, destination }) => ({
                url: 'distance',
                method: 'GET',
                params: { origin, destination }
            }),
            providesTags: ['distance'],

            transformResponse: (response) => {
                return response.data
            }
        })
    })
})
export const { useCalculateDistanceQuery } = otherAPI
