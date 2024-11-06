import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const server = import.meta.env.VITE_SERVER

export const addAPI = createApi({
    reducerPath: 'addAPI',
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
    tagTypes: ['add'],
    endpoints: (builder) => ({
        getBanner: builder.query({
            query: () => 'get-banner',
            providesTags: ['add']
        })
    })
})

export const { useGetBannerQuery } = addAPI
