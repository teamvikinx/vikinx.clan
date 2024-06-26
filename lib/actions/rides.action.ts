"use server";
import { constants } from "../utils";
import admin from "../config/firebase";

const db = admin.firestore();

export const getFeaturedRides = async () => {
  try {
    const querySnapshot = await db
      .collection(constants.tables.rides)
      .where("is_featured", "==", true)
      .where("is_published", "==", true)
      .where("status", "==", "active")
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
      .where("status", "!=", "deleted")
      .where("is_published", "==", true)
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
export const getRules = async () => {
  try {
    const data = await db.collection(constants.tables.rules).doc("rule").get();

    return data.data() as { rule: string };
  } catch (error: any) {
    throw new Error(`Failed to fetch ride rules: ${error.message}`);
  }
};
export const getEventsByIds = async (eventIds: string[]) => {
  try {
    const fetchPromises = eventIds.map((id) => {
      const docRef = db.collection(constants.tables.rides).doc(id); // replace with your collection name
      return docRef.get();
    });

    const docSnaps = await Promise.all(fetchPromises);

    const documentsData = docSnaps
      .map((docSnap, index) => {
        if (docSnap.exists) {
          return docSnap.data() as IRide;
        } else {
          console.log(`No such document with id: ${eventIds[index]}`);
          return null;
        }
      })
      .filter((data) => data !== null);

    return documentsData;
  } catch (error: any) {
    throw new Error(
      `Something went wrong while getting event details: ${error.message}`
    );
  }
};
