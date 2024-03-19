const router = require('express').Router();
const authMiddleWare = require('../middlewares/authMiddleWare');
const Movie = require('../models/movieSchema');
const Show = require('../models/showSchema');


router.get('/get-all-movies', authMiddleWare, async (req, res) => {
    try {
        const movies = await Movie.find();
        res.send({
            success: true,
            message: "Movies fetched",
            data: movies
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }

})

router.get('/get-movie-by-id/:id', authMiddleWare, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.send({
            success: true,
            message: "Movie Fetched",
            data: movie
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
})

router.post('/add-movie', authMiddleWare, async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save(); // save to db
        res.send({
            success: true,
            message: "Movie added"
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
})


router.post('/update-movie', authMiddleWare, async (req, res) => {
    try {
        await Movie.findByIdAndUpdate(req.body.movieId, req.body);
        res.send({
            success: true,
            message: "Movie updated"
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        })
    }

})

router.post('/delete-movie', authMiddleWare, async (req, res) => {

    try {
        await Movie.findByIdAndDelete(req.body.movieId);
        await Show.deleteMany({ movie: req.body.movieId });
        res.send({
            success: true,
            message: "Movie Deleted"
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }

})


module.exports = router;
