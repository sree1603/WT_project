import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {  ref, push,update} from "firebase/database";
import { database } from "./firebaseConfig";
import {auth} from "./firebaseConfig"
import {onAuthStateChanged} from "./firebaseConfig";
import type { User } from "firebase/auth";
import {useEffect} from "react";
import useFetchUpcomingRides from "./useFetchUpComingRides.ts";
import FilteredRides from "./FilteredRides";




import { 
  Car, 
  Leaf, 
  Shield, 
  DollarSign, 
  Facebook, 
  Twitter, 
  Instagram,
  Menu,
  X,
  History,
  Settings,
  BarChart,
  Plus
} from 'lucide-react';


function App() {
  const navigate = useNavigate(); // Add this inside the App component
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('search');

    // Hook to navigate
  
    const handleRideClick = (ride: any) => {
      // Navigate to RideDetails page and pass the selected ride via URL state
      navigate("/RideDetails", {
        state: { ride }, // Passing ride data as state
      });
    };
  
 
  const [rideDetails, setRideDetails] = useState({
    start: '',
    destination: '',
    date: '',
    time: '',
    price: '',
    seats: '',
    model:'',
    license:''
  });
const rides = useFetchUpcomingRides();

const [user, setUser] = useState<User | null>(null); // Ensure user type is correctly defined

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser); // Set user on auth state change
  });

  return () => unsubscribe();
}, []);
  

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    if (!rideDetails.start || !rideDetails.destination || !rideDetails.date || !rideDetails.time || !rideDetails.price || !rideDetails.seats) {
      alert("Please fill in all fields!");
      return;
    }
    if (!user) {
      alert("You must be logged in to offer a ride!");
      return;
    }
  
  
    try {
      // Reference to Firebase Database
      const rideRef = push(ref(database, `users/${user.uid}/rides`)); // Creates a unique ride entry
      await update(rideRef, rideDetails); // Stores data
  
      alert("Ride published successfully!");
      
      // Reset the form after submission
      setRideDetails({
        start: "",
        destination: "",
        date: "",
        time: "",
        price: "",
        seats: "",
        model:"",
        license:""

      });
  
    } catch (error) {
      console.error("Error adding ride: ", error);
      alert("Failed to publish ride. Try again.");
    }
  };
  const [searchData, setSearchData] = useState({
    start: "",
    destination: "",
    date: "",
    time: "",
    seats: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleSearch = () => {
    navigate(`/FilteredRides`, { state: { searchData } });
  };
  





  

  const benefits = [
    { icon: <Leaf className="w-12 h-12 text-green-500" />, title: 'Eco-Friendly', description: 'Reduce your carbon footprint by sharing rides' },
    { icon: <DollarSign className="w-12 h-12 text-blue-500" />, title: 'Affordable', description: 'Split costs and save money on every journey' },
    { icon: <Shield className="w-12 h-12 text-purple-500" />, title: 'Secure', description: 'Verified users and secure payment system' }
  ];

  const steps = [
    { number: '1', title: 'Sign Up', description: 'Create your account in minutes' },
    { number: '2', title: 'Post or Search', description: 'Find rides or offer your own' },
    { number: '3', title: 'Confirm', description: 'Book your seat instantly' },
    { number: '4', title: 'Share the Journey', description: 'Meet your co-travelers and go' }
  ];

  const featuredRides = [
    { start: 'San Francisco', destination: 'Los Angeles', date: '2024-03-20', driver: 'John D.', price: '$45' },
    { start: 'Seattle', destination: 'Portland', date: '2024-03-21', driver: 'Sarah M.', price: '$30' },
    { start: 'Boston', destination: 'New York', date: '2024-03-22', driver: 'Mike R.', price: '$35' }
  ];

  const bookingHistory = [
    { id: 1, type: 'Offered', start: 'San Francisco', destination: 'Los Angeles', date: '2024-03-15', status: 'Completed', earnings: '$45' },
    { id: 2, type: 'Booked', start: 'Seattle', destination: 'Portland', date: '2024-03-18', status: 'Upcoming', price: '$30' },
    { id: 3, type: 'Offered', start: 'Boston', destination: 'New York', date: '2024-03-20', status: 'Cancelled', earnings: '$0' }
  ];

  const riderStats = {
    totalRides: 45,
    totalDistance: '2,890 km',
    averageRating: 4.8,
    co2Saved: '487 kg',
    monthlyData: [28, 32, 45, 38, 42, 45]
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-blue-600">CarpoolConnect</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => setActiveSection('search')}
                className={`text-gray-600 hover:text-blue-600 ${activeSection === 'search' ? 'text-blue-600' : ''}`}>
                Find Rides
              </button>
              <button 
                onClick={() => setActiveSection('offer')}
                className={`text-gray-600 hover:text-blue-600 flex items-center ${activeSection === 'offer' ? 'text-blue-600' : ''}`}>
                <Plus className="w-4 h-4 mr-1" /> Offer a Ride
              </button>
              <button 
                onClick={() => setActiveSection('history')}
                className={`text-gray-600 hover:text-blue-600 flex items-center ${activeSection === 'history' ? 'text-blue-600' : ''}`}>
                <History className="w-4 h-4 mr-1" /> History
              </button>
              <button 
                onClick={() => setActiveSection('stats')}
                className={`text-gray-600 hover:text-blue-600 flex items-center ${activeSection === 'stats' ? 'text-blue-600' : ''}`}>
                <BarChart className="w-4 h-4 mr-1" /> Stats
              </button>
              <button 
                onClick={() => setActiveSection('settings')}
                className={`text-gray-600 hover:text-blue-600 flex items-center ${activeSection === 'settings' ? 'text-blue-600' : ''}`}>
                <Settings className="w-4 h-4 mr-1" /> Settings
              </button>

              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                onClick={() => navigate("/Login")} // Navigate to the Login page
              >
                Login / Sign Up
              </button>
                  
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button 
                onClick={() => setActiveSection('search')}
                className="block w-full text-left px-3 py-2 text-gray-600">
                Find Rides
              </button>
              <button 
                onClick={() => setActiveSection('offer')}
                className="block w-full text-left px-3 py-2 text-gray-600 flex items-center">
                <Plus className="w-4 h-4 mr-1" /> Offer a Ride
              </button>
              <button 
                onClick={() => setActiveSection('history')}
                className="block w-full text-left px-3 py-2 text-gray-600 flex items-center">
                <History className="w-4 h-4 mr-1" /> History
              </button>
              <button 
                onClick={() => setActiveSection('stats')}
                className="block w-full text-left px-3 py-2 text-gray-600 flex items-center">
                <BarChart className="w-4 h-4 mr-1" /> Stats
              </button>
              <button 
                onClick={() => setActiveSection('settings')}
                className="block w-full text-left px-3 py-2 text-gray-600 flex items-center">
                <Settings className="w-4 h-4 mr-1" /> Settings
              </button>
              <button className="block w-full text-left px-3 py-2 text-blue-600">
                Login / Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        {activeSection === 'search' && (
          <>
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6">
                    Share Rides, Save Costs, Connect People
                  </h1>
                  <p className="text-xl mb-12 max-w-2xl mx-auto">
                    Join thousands of people who trust CarpoolConnect for their daily commute and long-distance travels.
                  </p>

                  {/* Search Form */}
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="Start Location"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold placeholder-gray-500"
                        value={searchData.start}
                        onChange={(e) => setSearchData({ ...searchData, start: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="Destination"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold placeholder-gray-500"
                        value={searchData.destination}
                        onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                      />
                      <input
                        type="date"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold"
                        value={searchData.date}
                        onChange={(e) => setSearchData({...searchData, date: e.target.value})}
                      />
                      <input
                        type="time"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold"
                        value={searchData.time}
                        onChange={(e) => setSearchData({ ...searchData, time: e.target.value })}
                      />
                      <input
                        type="number"
                        placeholder="Seats Required"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold"
                        value={searchData.seats}
                        onChange={(e) => setSearchData({ ...searchData, seats: e.target.value })}
                      />
                       <input
                        type="number"
                        placeholder="Min Price"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold"
                        value={searchData.minPrice}
                        onChange={(e) => setSearchData({ ...searchData, minPrice: e.target.value })}
                      />
                      <input
                        type="number"
                        placeholder="Max Price"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold"
                        value={searchData.maxPrice}
                        onChange={(e) => setSearchData({ ...searchData, maxPrice: e.target.value })}
                      />
                    </div>
                    <button className="w-full md:w-auto mt-4 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
                    onClick={handleSearch}>
                      Search Rides
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Section */}
            <div className="py-24 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                      <div className="flex flex-col items-center text-center">
                        {benefit.icon}
                        <h3 className="mt-4 text-xl font-semibold">{benefit.title}</h3>
                        <p className="mt-2 text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Featured Rides */}
            <div className="py-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12">Featured Rides</h2>
                <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {rides.length > 0 ? (
              rides.map((ride, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md"
                onClick={() => handleRideClick(ride)} >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold">{ride.start} → {ride.destination}</p>
                      <p className="text-gray-600 text-sm">{ride.date} | {ride.time}</p>
                    </div>
                    <span className="text-blue-600 font-bold">{ride.price}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <span className="ml-2 text-gray-600">{ride.driver}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No upcoming rides available.</p>
            )}
                </div>
              </div>
            </div>
            </div>
          </>
        )}

        {activeSection === 'offer' && (
          <div className="bg-gradient-to-br from-blue-500 to-purple-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
            <h2 className="text-3xl font-bold mb-8">Offer a Ride</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="space-y-6">
                <div>
                  
                  <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold" 
                  onChange={(e) => setRideDetails({ ...rideDetails, start: e.target.value } ) } />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                  <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold"
                  onChange={(e) => setRideDetails({ ...rideDetails, destination: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input type="date" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold"
                    onChange={(e) => setRideDetails({ ...rideDetails, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input type="time" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold"
                    onChange={(e) => setRideDetails({ ...rideDetails, time: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per seat</label>
                  <input type="number" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold" placeholder="$"
                  onChange={(e) => setRideDetails({ ...rideDetails, price: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Available seats</label>
                  <input type="number" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold" min="1" max="8" 
                  
                  onChange={(e) => setRideDetails({ ...rideDetails, seats: e.target.value })}/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Car Model</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold" 
                    onChange={(e) => setRideDetails({ ...rideDetails, model: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">License Plate</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold"
                    onChange={(e) => setRideDetails({ ...rideDetails, license: e.target.value })} />
                  </div>
                <button className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
                onClick = {handleSubmit}
                >
                  Publish Ride
                </button>
                
              </div>
            </div>
          </div>
          </div>
          
        )}

        {activeSection === 'history' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8">Booking History</h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookingHistory.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.start} → {booking.destination}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.earnings || booking.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === 'stats' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8">Rider Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-medium text-gray-500">Total Rides</h3>
                <p className="text-3xl font-bold">{riderStats.totalRides}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-medium text-gray-500">Distance Covered</h3>
                <p className="text-3xl font-bold">{riderStats.totalDistance}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-medium text-gray-500">Average Rating</h3>
                <p className="text-3xl font-bold">{riderStats.averageRating}/5.0</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-medium text-gray-500">CO2 Saved</h3>
                <p className="text-3xl font-bold">{riderStats.co2Saved}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Monthly Rides</h3>
              <div className="h-64 flex items-end justify-between space-x-2">
                {riderStats.monthlyData.map((value, index) => (
                  <div key={index} className="w-full">
                    <div 
                      className="bg-blue-500 rounded-t"
                      style={{ height: `${(value / Math.max(...riderStats.monthlyData)) * 100}%` }}
                    ></div>
                    <p className="text-center text-sm mt-2">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'settings' && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-3xl font-bold mb-8">Settings</h2>
            <div className="bg-white rounded-lg shadow-lg divide-y">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Profile Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="tel" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Vehicle Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Car Model</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">License Plate</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Email Notifications</span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">Enabled</button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">SMS Notifications</span>
                    <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">Disabled</button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <button className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <Car className="h-8 w-8" />
                <span className="ml-2 text-xl font-bold">CarpoolConnect</span>
              </div>
              <p className="mt-4 text-gray-400">Making travel sustainable, affordable, and social.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {new Date().getFullYear()} CarpoolConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


export default App;