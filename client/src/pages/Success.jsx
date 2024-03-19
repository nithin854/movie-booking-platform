import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBookSeatsMutation } from "../services/bookingService";
function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.state);
  const [bookSeats] = useBookSeatsMutation();

  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("orderId");
  const transactionId = params.get("transactionId");
  const showId = params.get("showId");
  const userId = params.get("userId");

  useEffect(() => {
    async function confirmSeats() {
      const response = {
        show: showId,
        user: userId,
        seats: location.state,
        transactionId: transactionId,
        orderId: orderId,
      };
      await bookSeats(response);
      alert(
        "Your tickets have been booked and the ticket has been sent to your registered email address"
      );
      navigate("/");
    }
    confirmSeats();
  }, []);
  return (
    <section className="success-page">
      <div className="success-texts">
        <h1>Payment Successful</h1>
        <p>OrderId: {orderId}</p>
        <p>TransactionId: {transactionId}</p>
        <p>Please wait while we confirm your seats...</p>
      </div>
    </section>
  );
}

export default SuccessPage;
