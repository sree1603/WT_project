// Fetch all upcoming rides from Firebase (backend logic)
import { database,  onValue } from "./firebaseConfig";
import {ref} from "firebase/database";
import { useState, useEffect } from "react";

// Define the interface for the ride details
interface Ride {
  start: string;
  destination: string;
  date: string;
  time: string;
  price: string;
  driver: string;
  seats:string;
  emailid:string;
}


const useFetchUpcomingRides = () => {
  const [rides, setRides] = useState<Ride[]>([]);

  useEffect(() => {
    const ridesRef = ref(database, "users"); // Reference to all users' data

    // Listen to changes in the database
    onValue(ridesRef, (snapshot) => {
      if (snapshot.exists()) {
        const allUsersData = snapshot.val(); // Get all users data
        const rideList: Ride[] = [];

        const now = new Date(); // Current timestamp for comparison

        // Loop through each user's data to get their rides
        Object.values(allUsersData).forEach((user: any) => {
          if (user.rides) {
            // Loop through the user's rides
            Object.values(user.rides).forEach((ride: any) => {
              const rideDateTime = new Date(`${ride.date}T${ride.time}`); // Combine date and time

              // Only show upcoming rides
              if (rideDateTime > now) {
                rideList.push({
                  start: ride.start,
                  destination: ride.destination,
                  date: ride.date,
                  time: ride.time,
                  price: ride.price,
                  driver: user.username || "Unknown Driver",
                  seats:ride.seats,
                  emailid:user.email // Get the driver's name
                });
              }
            });
          }
        });

        // Sort the rides by date and time
        rideList.sort((a, b) => new Date(`${a.date}T${a.time}`).getTime() - new Date(`${b.date}T${b.time}`).getTime());

        setRides(rideList); // Set the upcoming rides in the state
      }
    });
  }, []);

  return rides; // Return the fetched rides
};

export default useFetchUpcomingRides;
