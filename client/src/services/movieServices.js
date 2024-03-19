import { baseAppApi } from './baseService'

export const movieServices = baseAppApi.injectEndpoints({
    endpoints: (build) => ({
        getAllMovies: build.query({ // GET
            query: () => '/movies/get-all-movies',
            transformResponse: (apiResponse) => apiResponse.data,
            providesTags: ['MOVIES']
        }),
        getSingleMovie: build.query({
            query: (id) => `/movies//get-movie-by-id/${id}`,
            transformResponse: (apiResponse) => apiResponse.data,
            providesTags: ['MOVIE']
        }),
        addNewMovie: build.mutation({ // POST, PUT, PATCH, DELETE
            query: (payload) => ({
                url: '/movies/add-movie',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['MOVIES']
        }),
        deleteMovie: build.mutation({ // POST, PUT, PATCH, DELETE
            query: (payload) => ({
                url: '/movies/delete-movie',
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['MOVIES']
        }),

    }),
    overrideExisting: false,
})

export const { useGetAllMoviesQuery, useGetSingleMovieQuery, useAddNewMovieMutation, useDeleteMovieMutation } = movieServices