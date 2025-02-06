import { useEffect, useState } from "react";
import { database, onValue } from "./firebaseConfig";
import { ref } from "firebase/database";

interface Ride {
  start: string;
  destination: string;
  date: string;
  time: string;
  seats: number;
  price: number;
  driver: string;
}

const useFetchFilteredRides = (filters: any) => {
  const [rides, setRides] = useState<Ride[]>([]);

  useEffect(() => {
    const ridesRef = ref(database, "users");

    onValue(ridesRef, (snapshot) => {
      if (!snapshot.exists()) {
        console.log("No ride data found in Firebase.");
        setRides([]);
        return;
      }

      const allUsersData = snapshot.val();
      const filteredRides: Ride[] = [];

      Object.values(allUsersData).forEach((user: any) => {
        if (!user.rides) return; // ✅ Fix: Ensure rides exist

        Object.values(user.rides).forEach((ride: any) => {
          if (!ride.date) return; // ✅ Fix: Ensure date/time exist

          const rideDateTime = new Date(`${ride.date}T${ride.time}`);
          const now = new Date();

          if (
            rideDateTime > now &&
            (!filters.start || ride.start.includes(filters.start)) &&
            (!filters.destination || ride.destination.includes(filters.destination)) &&
            (!filters.date || ride.date === filters.date) &&
            (!filters.seats || ride.seats >= filters.seats) &&
            (!filters.minPrice || ride.price >= filters.minPrice) &&
            (!filters.maxPrice || ride.price <= filters.maxPrice)
          ) {
            filteredRides.push({
              ...ride,
              driver: user.username || "Unknown Driver",
            });
          }
        });
      });

      setRides(filteredRides.sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime()));
    });

    return () => {
      console.log("Cleanup: Unsubscribing from Firebase listener.");
    };
  }, [filters]);

  return rides;
};

export default useFetchFilteredRides;
