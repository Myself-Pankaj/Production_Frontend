import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const server = import.meta.env.VITE_SERVER
export const driverAPI = createApi({
    reducerPath: 'driverAPI',
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
        docVerification: builder.mutation({
            query: (doc) => {
                return {
                    url: 'docVerification',
                    method: 'PUT',
                    body: doc
                }
            },
            invalidatesTags: ['users']
        }),
        driverBookings: builder.query({
            query: () => `getDriverUpcomingBookings`,
            providesTags: ['cabs', 'users', 'orders'],
            transformResponse: (response) => {
                return response.data // Assuming the actual data is in the 'data' property
            }
        }),
        confirmBooking: builder.mutation({
            query: ({ orderId }) => ({
                url: 'confirm-driver-booking',
                method: 'PUT',
                body: { orderId }
            }),
            invalidatesTags: ['users', 'cabs', 'orders']
        }),
        cancelBooking: builder.mutation({
            query: ({ orderId }) => ({
                url: 'cancel-driver-booking',
                method: 'PUT',
                body: { orderId }
            }),
            invalidatesTags: ['users', 'cabs', 'orders']
        }),
        driverCompletedBooking: builder.query({
            query: ({ page, limit }) => ({
                url: 'getDriverAllBookings',
                method: 'GET',
                params: { page, limit }
            }),
            providesTags: ['orders']
        })
    })
})

export const {
    useDocVerificationMutation,
    useDriverBookingsQuery,
    useCancelBookingMutation,
    useConfirmBookingMutation,
    useDriverCompletedBookingQuery
} = driverAPI
