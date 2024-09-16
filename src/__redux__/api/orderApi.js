import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const server = import.meta.env.VITE_SERVER
export const orderAPI = createApi({
    reducerPath: 'orderAPI',
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
        bookCab: builder.mutation({
            query: (orderDetails) => ({
                url: `/placeOrder`,
                method: 'POST',
                body: orderDetails
            }),
            invalidatesTags: ['orders'],
            transformResponse: (response) => {
                return response.data
            }
        }),
        paymentVerification: builder.mutation({
            query: ({ razorpay_payment_id, razorpay_order_id, razorpay_signature, orderOptions }) => ({
                url: `/paymentverification`,
                method: 'POST',
                body: {
                    razorpay_payment_id,
                    razorpay_order_id,
                    razorpay_signature,
                    orderOptions
                },
                transformResponse: (response) => {
                    return response.data
                }
            }),
            invalidatesTags: ['orders']
        }),
        myOrder: builder.query({
            query: () => ({
                url: 'mybooking',
                method: 'GET'
            }),
            providesTags: ['orders'],

            transformResponse: (response) => {
                return response.data
            }
        }),
        orderDetail: builder.query({
            query: (id) => `mybooking/${id}`,
            providesTags: ['orders'],
            transformResponse: (response) => {
                return response.data
            }
        }),
        orderDetailForCustomer: builder.query({
            query: (id) => `bookingForCustomer/${id}`,
            providesTags: ['orders'],
            invalidatesTags: ['orders', 'cabs'],
            transformResponse: (response) => {
                return response.data
            }
        }),
        getPendingOrder: builder.query({
            query: () => 'pendingOrders',
            providesTags: ['orders', 'cab', 'user'],
            transformResponse: (response) => {
                return response.data
            }
        })
    })
})

export const {
    useBookCabMutation,
    useOrderDetailForCustomerQuery,
    usePaymentVerificationMutation,
    useMyOrderQuery,
    useOrderDetailQuery,
    useGetPendingOrderQuery
} = orderAPI
