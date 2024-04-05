import { constants } from "../utils";
import admin from "../config/firebase";

const db = admin.firestore();

export const getFeaturedRides = async () => {
  try {
    const querySnapshot = await db
      .collection(constants.tables.rides)
      .where("is_featured", "==", true)
      .get();

    const data = querySnapshot.docs.map((data) => data.data() as IRide);

    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch featured rides: ${error.message}`);
  }
};
export const getRides = async () => {
  try {
    const querySnapshot = await db
      .collection(constants.tables.rides)
      .where("status", "==", "active")
      .get();

    const data = querySnapshot.docs.map((data) => data.data() as IRide);

    return data;
  } catch (error: any) {
    throw new Error(`Failed to fetch rides: ${error.message}`);
  }
};
export const getRideById = async (rideId: string) => {
  try {
    const ride = await db.collection(constants.tables.rides).doc(rideId).get();

    return ride.data() as IRide;
  } catch (error: any) {
    throw new Error(`Failed to fetch ride details: ${error.message}`);
  }
};