import { baseAppApi } from './baseService'

export const bookingServices = baseAppApi.injectEndpoints({
    endpoints: (build) => ({
        getBookings: build.query({
            query: (id) => `/bookings/get-bookings/${id}`,
            transformResponse: (apiResponse) => apiResponse.data,
            providesTags: ['BOOKINGS']
        }),
        bookSeats: build.mutation({ // POST, PUT, PATCH, DELETE
            query: (payload) => ({
                url: '/bookings/book-show',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['MOVIES', 'SHOW']
        }),

    }),
    overrideExisting: false,
})

export const { useGetBookingsQuery, useBookSeatsMutation } = bookingServices