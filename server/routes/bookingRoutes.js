const authMiddleware = require("../middlewares/authMiddleWare");
const router = require("express").Router();
const Booking = require('../models/bookingSchema');
const Show = require('../models/showSchema');

//book shows
router.post("/book-show", authMiddleware, async (req, res) => {
    try {
        // save booking
        const newBooking = new Booking(req.body);
        await newBooking.save();

        const show = await Show.findById(req.body.show);
        // update seats
        await Show.findByIdAndUpdate(req.body.show, {
            bookedSeats: [...show.bookedSeats, ...req.body.seats],
        });

        res.send({
            success: true,
            message: "Show booked successfully",
            data: newBooking,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});



router.get("/get-bookings/:userId", authMiddleware, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.params.userId })
            .populate("user")
            .populate("show") // movie id and theatre id
            .populate({
                path: "show",
                populate: {
                    path: "movie",
                    model: "movies",
                },
            })
            .populate({
                path: "show",
                populate: {
                    path: "theatre",
                    model: "theatres",
                },
            });

        res.send({
            success: true,
            message: "Bookings fetched successfully",
            data: bookings,
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});



module.exports = router;