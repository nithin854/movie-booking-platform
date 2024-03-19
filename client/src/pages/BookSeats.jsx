import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import { Flex, Space, Button } from "antd";
import { useGetSingleShowQuery } from "../services/showServices";
import {
  useMakePaymentMutation,
  useValidatePaymentMutation,
} from "../services/showServices";

function BookSeatsPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const { showId } = useParams();
  const { data: showDetails, isLoading } = useGetSingleShowQuery(showId);
  const [makePayment] = useMakePaymentMutation();
  const [validatePayment] = useValidatePaymentMutation();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalTicketPrice, setTotalTicketPrice] = useState(0);

  console.log(totalTicketPrice);

  const onSeatClickHandler = (seat) => {
    const selected = [...selectedSeats];
    if (selected.includes(seat)) {
      setSelectedSeats(selected.filter((el) => el !== seat));
      setTotalTicketPrice((prev) => prev - showDetails.ticketPrice);
      return false;
    }
    selected.push(seat);
    setTotalTicketPrice((prev) => prev + showDetails.ticketPrice);
    setSelectedSeats(selected);
  };

  const onConfirmSeatsHandler = async () => {
    const { data } = await makePayment({
      totalAmount: totalTicketPrice,
    });
    console.log(data);
    const options = {
      key: "rzp_test_YHkrQHEq7eaR6T",
      amount: totalTicketPrice * 100,
      currency: "INR",
      name: "Scaler-Bookshow",
      description: "Scaler-Bookshow Ticket booking",
      order_id: data.id,
      handler: async function (response) {
        console.log(response);
        await validatePayment({ ...response });
        navigate(
          `/success?orderId=${response.razorpay_order_id}&transactionId=${response.razorpay_payment_id}&showId=${showId}&userId=${user.userId}`,
          {
            state: selectedSeats,
          }
        );
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Flex justify="space-between">
        <Space direction="vertical">
          <h3>
            Booking for : {showDetails.movie.title} - {showDetails.name}{" "}
          </h3>
          <h4>Booking Time : {showDetails.time}</h4>
        </Space>
        <Space direction="vertical">
          <h3>Ticket Price : Rs {showDetails.ticketPrice}</h3>
          {/* <h4>Total Seats Available : {showDetails.totalSeats.length}</h4> */}
          <h3>Total Price : Rs.{totalTicketPrice}</h3>

          <Button
            onClick={onConfirmSeatsHandler}
            disabled={totalTicketPrice === 0}
            type="primary"
          >
            Confirm Booking
          </Button>
        </Space>
      </Flex>
      <div className="screen"></div>
      <Flex justify="center">
        <div className="theatre-seats">
          {showDetails.totalSeats.map((seat) => {
            const findIndex = showDetails.bookedSeats.findIndex(
              (el) => el._id === seat._id
            );
            console.log(findIndex);
            if (
              showDetails.bookedSeats.findIndex((el) => el._id === seat._id) >=
              0
            ) {
              return (
                <div
                  onClick={() => onSeatClickHandler(seat)}
                  key={seat._id}
                  className={`seat booked`}
                >
                  {seat.seatNumber + 1}
                </div>
              );
            }
            return (
              <div
                onClick={() => onSeatClickHandler(seat)}
                key={seat._id}
                className={`seat ${
                  selectedSeats.includes(seat) ? "selected" : ""
                }`}
              >
                {seat.seatNumber + 1}
              </div>
            );
          })}
        </div>
      </Flex>
    </>
  );
}

export default BookSeatsPage;
