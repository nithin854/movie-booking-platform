import { baseAppApi } from './baseService'

export const showServices = baseAppApi.injectEndpoints({
    endpoints: (build) => ({
        getSingleShow: build.query({
            query: (id) => `/shows/${id}`,
            transformResponse: (apiResponse) => apiResponse.data,
            providesTags: ["SHOW"]
        }),
        makePayment: build.mutation({ // POST, PUT, PATCH, DELETE
            query: (payload) => ({
                url: '/shows/make-payment',
                method: 'POST',
                body: payload
            }),
            transformResponse: (apiResponse) => apiResponse.data
        }),
        validatePayment: build.mutation({ // POST, PUT, PATCH, DELETE
            query: (payload) => ({
                url: '/shows/validate-payment',
                method: 'POST',
                body: payload
            }),
            transformResponse: (apiResponse) => apiResponse.data
        }),
    }),
    overrideExisting: false,
})

export const { useGetSingleShowQuery, useMakePaymentMutation, useValidatePaymentMutation, useBookSeatsMutation } = showServices