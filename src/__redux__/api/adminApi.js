import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const server = import.meta.env.VITE_SERVER

// Create API slice
export const adminAPI = createApi({
    reducerPath: 'adminAPI',
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
        stats: builder.query({
            query: () => `/adminStats`,
            providesTags: ['users', 'order', 'cabs'],
            transformResponse: (response) => {
                return response.data
            }
        }),

        fetchAllCabs: builder.query({
            query: ({ page, limit }) => ({
                url: 'adminCabs',
                method: 'GET',
                params: { page, limit }
            }),
            providesTags: ['cabs']
        }),
        fetchAllUsers: builder.query({
            query: ({ page, limit }) => ({
                url: 'adminUsers',
                method: 'GET',
                params: { page, limit }
            }),
            providesTags: ['users']
        }),
        fetchAllDrivers: builder.query({
            query: ({ page, limit }) => ({
                url: 'adminDrivers',
                method: 'GET',
                params: { page, limit }
            }),
            providesTags: ['users']
        }),
        fetchAllOrders: builder.query({
            query: ({ page, limit }) => ({
                url: 'adminOrders',
                method: 'GET',
                params: { page, limit }
            }),
            providesTags: ['orders']
        }),
        fetchAllAssignedBooking: builder.query({
            query: ({ page, limit }) => ({
                url: 'adminAssignBooking',
                method: 'GET',
                params: { page, limit }
            }),
            providesTags: ['orders']
        }),
        fetchAllUnverifiedDriver: builder.query({
            query: ({ page, limit }) => ({
                url: 'adminUnverifiedDriver',
                method: 'GET',
                params: { page, limit }
            }),
            providesTags: ['users']
        }),

        fetchFreeCab: builder.mutation({
            query: ({ capacity, date, page, limit }) => ({
                url: `adminFreeCabs?page=${page}&limit=${limit}`,
                method: 'POST',
                body: { capacity, date }
            }),
            invalidatesTags: ['cabs']
        }),
        assignBooking: builder.mutation({
            query: ({ orderId, newCabId }) => ({
                url: `assignBooking/${orderId}`,
                method: 'PATCH',
                body: { newCabId }
            }),
            invalidatesTags: ['orders', 'cabs']
        }),
        getDriverInfo: builder.query({
            query: (id) => `driverInfo/${id}`,
            providesTags: ['cabs', 'users', 'orders'],
            transformResponse: (response) => {
                return response.data
            }
        }),
        driverVerification: builder.mutation({
            query: ({ id, flag }) => ({
                url: `verifyDriver/${id}`,
                method: 'PUT',
                body: { flag }
            }),
            invalidatesTags: ['user', 'cabs', 'orders']
        }),
        allPendingPayment: builder.query({
            query: () => ({
                url: 'PendingPayment',
                method: 'GET',
                transformResponse: (response) => {
                    return response.data
                }
            }),

            providesTags: ['user', 'cabs', 'orders']
        }),
        payout: builder.mutation({
            query: ({ orderId, userId, amount }) => ({
                url: 'payout',
                method: 'POST',
                body: { orderId, userId, amount }
            }),

            invalidatesTags: ['user', 'cabs', 'orders']
        })
    })
})

// Create async thunks

export const {
    useStatsQuery,
    useAllPendingPaymentQuery,
    useDriverVerificationMutation,
    useGetDriverInfoQuery,
    useFetchAllAssignedBookingQuery,
    useFetchAllUnverifiedDriverQuery,
    useAssignBookingMutation,
    useFetchFreeCabMutation,
    useFetchAllCabsQuery,
    useFetchAllUsersQuery,
    useFetchAllDriversQuery,
    useFetchAllOrdersQuery,
    usePayoutMutation
} = adminAPI
