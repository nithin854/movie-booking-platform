const Razorpay = require('razorpay');

const razorpayInstance = new Razorpay({
    key_id: 'rzp_test_YHkrQHEq7eaR6T',
    key_secret: '2THmiXI8YMzNOCCZlsNekQmd',
})

module.exports = razorpayInstance;