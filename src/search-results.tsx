import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const navigate = useNavigate();
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
    navigate(`/search-results`, { state: { searchData } });
  };

  return (
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
          onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
        />
        <input
          type="date"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black font-bold"
          value={searchData.date}
          onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
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
        <div className="flex space-x-2">
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
      </div>
      <button
        className="w-full md:w-auto mt-4 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
        onClick={handleSearch}
      >
        Search Rides
      </button>
    </div>
  );
};

export default SearchForm;
