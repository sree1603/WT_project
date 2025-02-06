import { useLocation } from "react-router-dom";
import useFetchFilteredRides from "./useFetchFilteredRides";
import { useNavigate } from "react-router-dom";

const FilteredRides = () => {
  const location = useLocation();
  const  navigate = useNavigate();
  const searchFilters = location.state?.searchData || {}; // Default to empty object
  const rides = useFetchFilteredRides(searchFilters);
  const handleRideClick = (ride: any) => {
    // Navigate to RideDetails page and pass the selected ride via URL state
    navigate("/RideDetails", {
      state: { ride }, // Passing ride data as state
    });
  };


  console.log("Filters received:", searchFilters);
  console.log("Filtered Rides:", rides);

  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600">
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Search Results</h2>

        <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rides.length > 0 ? (
              rides.map((ride, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md"
                onClick={() => handleRideClick(ride)}>
                  <p className="font-semibold">{ride.start} → {ride.destination}</p>
                  <p className="text-gray-600 text-sm">{ride.date} | {ride.time}</p>
                  <p className="text-blue-600 font-bold">{ride.price}</p>
                  <p className="text-gray-600">Seats: {ride.seats}</p>
                  <p className="text-gray-600">Driver: {ride.driver}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No rides found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default FilteredRides;
