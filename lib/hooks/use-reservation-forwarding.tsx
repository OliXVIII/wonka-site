import { useState } from "react";

interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  message: string;
}

interface ReservationHook {
  forwardReservation: (reservationData: ReservationData) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const useReservationForwarding = (): ReservationHook => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const forwardReservation = async (
    reservationData: ReservationData,
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      // Check if user is authenticated
      const user = firebase.auth().currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Send reservation data to Firebase Firestore
      await dbAdmin.collection("reservations").add({
        ...reservationData,
        userId: user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      // Forward reservation details to email address
      // You can implement email forwarding logic here
      // For example, using Firebase Functions to send an email

      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return { forwardReservation, loading, error };
};

export default useReservationForwarding;
