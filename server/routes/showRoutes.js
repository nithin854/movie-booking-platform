const crypto = require('crypto');
const authMiddleware = require("../middlewares/authMiddleWare");
const router = require("express").Router();
const Booking = require('../models/showSchema')
const Show = require('../models/showSchema');
const razorpayInstance = require('../razorpay/instance');


console.log(razorpayInstance);


router.post('/make-payment', authMiddleware, async (req, res) => {
    const { totalAmount } = req.body;
    const order = await razorpayInstance.orders.create({
        amount: totalAmount * 100,
        currency: "INR",
    })
    res.send({
        success: true,
        message: "Order ID created",
        data: order
    })
})

router.post('/validate-payment', authMiddleware, async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const sha = crypto.createHmac("sha256", "2THmiXI8YMzNOCCZlsNekQmd");
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
        res.status(400).json({ msg: 'Transaction not right it seems' });
    }
    res.send({
        success: true,
        message: "Transaction validated",
        data: {
            orderId: razorpay_order_id,
            transactionId: razorpay_payment_id
        }
    })
})



//get show by id
router.get('/:showId', authMiddleware, async (req, res) => {
    try {
        const show = await Show.findById(req.params.showId)
            .populate("movie")
            .populate("theatre")
        res.send({
            success: true,
            message: "Show fetched",
            data: show,
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
})


module.exports = router;