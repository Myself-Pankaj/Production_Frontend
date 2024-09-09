import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const server = import.meta.env.VITE_SERVER
export const cabAPI = createApi({
    reducerPath: 'cabAPI',
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
        displayCabs: builder.query({
            query: () => ({
                url: 'getRateDefinedCabs',
                method: 'GET'
            }),
            providesTags: ['cabs'],

            transformResponse: (response) => {
                return response.data
            }
        }),
        cabDetail: builder.query({
            query: (id) => `getSingleCabs/${id}`,
            providesTags: ['cabs'],
            transformResponse: (response) => {
                return response.data // Assuming the actual data is in the 'data' property
            }
        })
    })
})

export const { useDisplayCabsQuery, useCabDetailQuery } = cabAPI
