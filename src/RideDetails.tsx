import { useLocation, useNavigate } from "react-router-dom";

const RideDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ride } = location.state || {};

  if (!ride) {
    return <div>Loading...</div>;
  }

  const handlePayment = () => {
    const options = {
      key: "rzp_test_0PVX9J5kjzUSdT",
      amount: ride.price * 100,
      currency: "INR",
      name: "Carpool Ride",
      description: `Ride from ${ride.start} to ${ride.destination}`,
      handler: (response: { razorpay_payment_id: string }) => {
        navigate("/success", { state: { ride, paymentId: response.razorpay_payment_id } });
      },
      prefill: { name: "User Name", email: ride.email, contact: "9999999999" },
      theme: { color: "#3399cc" },
    };

    const razorpayInstance = new (window as any).Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <div className="py-24 flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-4xl font-bold text-blue-700 text-center mb-6">Ride Details</h2>
        <div className="text-center space-y-4">
          <p className="text-lg text-gray-700">Rider: <span className="font-bold">{ride.driver}</span></p>
          <p className="text-lg text-gray-700">Email: <span className="font-bold">{ride.email}</span></p>
          <p className="text-xl font-semibold">{ride.start} → {ride.destination}</p>
          <p className="text-lg text-gray-700">Date: <span className="font-bold">{ride.date}</span></p>
          <p className="text-lg text-gray-700">Time: <span className="font-bold">{ride.time}</span></p>
          <p className="text-lg text-gray-700">Price: <span className="text-blue-600 font-bold">₹{ride.price}</span></p>
          <p className="text-lg text-gray-700">Seats Available: <span className="font-bold">{ride.seats}</span></p>
        </div>

        {/* Payment Button */}
        <button
          className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-bold py-3 w-full rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition"
          onClick={handlePayment}
        >
          Book Ride
        </button>

        <button
          className="mt-4 text-gray-200 underline block mx-auto hover:text-gray-100"
          onClick={() => navigate(-1)}
        >
          Back to Rides
        </button>
      </div>
    </div>
  );
};

export default RideDetails;
