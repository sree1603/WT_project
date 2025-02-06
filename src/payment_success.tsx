import { useLocation, useNavigate } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ride, paymentId } = location.state || {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold text-green-600">Payment Successful! 🎉</h2>
        <p className="text-lg text-gray-700 mt-4">Your ride has been booked successfully.</p>

        {ride && (
          <div className="mt-6 text-left">
            <p className="text-lg"><strong>Rider:</strong> {ride.driver}</p>
            <p className="text-lg"><strong>From:</strong> {ride.start}</p>
            <p className="text-lg"><strong>To:</strong> {ride.destination}</p>
            <p className="text-lg"><strong>Date:</strong> {ride.date}</p>
            <p className="text-lg"><strong>Time:</strong> {ride.time}</p>
            <p className="text-lg"><strong>Amount Paid:</strong> ₹{ride.price}</p>
            <p className="text-lg text-gray-500"><strong>Payment ID:</strong> {paymentId}</p>
          </div>
        )}

        <div className="mt-8">
          <button 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-md hover:bg-blue-700 transition"
            onClick={() => navigate("/my-bookings")}
          >
            View My Bookings
          </button>

          <button 
            className="ml-4 text-gray-600 underline"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
