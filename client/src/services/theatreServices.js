import { baseAppApi } from './baseService'

export const theatreServices = baseAppApi.injectEndpoints({
    endpoints: (build) => ({
        getAllTheatres: build.query({ // GET
            query: () => '/theatres/get-all-theatres',
            transformResponse: (apiResponse) => apiResponse.data,
            providesTags: ["THEATRES"]
        }),
        getSingleTheatre: build.query({
            query: (id) => `/theatres/${id}`,
            transformResponse: (apiResponse) => apiResponse.data,
            providesTags: ["THEATRE"]
        }),
        getTheatresByOwner: build.query({
            query: (id) => `/theatres/theatres-by-owner/${id}`,
            transformResponse: (apiResponse) => apiResponse.data,
            providesTags: ["THEATRE-BY-OWNER"]
        }),
        addNewTheatre: build.mutation({ // POST, PUT, PATCH, DELETE
            query: (payload) => ({
                url: '/theatres/add-theatre',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['THEATRES']
        }),
        updateTheatre: build.mutation({ // POST, PUT, PATCH, DELETE
            query: (payload) => ({
                url: '/theatres/update-theatre',
                method: 'PUT',
                body: payload
            }),
            invalidatesTags: ['THEATRES']
        }),
        addShow: build.mutation({ // POST, PUT, PATCH, DELETE
            query: (payload) => ({
                url: '/theatres/add-show',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['SHOWS']
        }),
        getTheatresByMovie: build.mutation({ // POST, PUT, PATCH, DELETE
            query: (payload) => ({
                url: '/theatres/get-all-theatres-by-movie',
                method: 'POST',
                body: payload
            }),
        }),

    }),
    overrideExisting: false,
})

export const { useGetAllTheatresQuery, useGetSingleTheatreQuery, useGetTheatresByOwnerQuery, useAddNewTheatreMutation, useUpdateTheatreMutation, useAddShowMutation, useGetTheatresByMovieMutation } = theatreServices