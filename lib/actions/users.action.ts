"use server";
import { constants } from "../utils";
import admin from "../config/firebase";
import { revalidatePath } from "next/cache";

const db = admin.firestore();

export const fetchUser = async (userId: string): Promise<IUser | null> => {
  const docRef = db.collection(constants.tables.users).doc(userId);

  try {
    const data = await docRef.get();

    if (data.exists) {
      return data.data() as IUser;
    } else {
      return null;
    }
  } catch (error: any) {
    throw new Error(`Failed to fetch user:  ${error.message}`);
  }
};

export const createUser = async (payload: IUser) => {
  let finalPayload = { ...payload };
  try {
    const querySnapshot = await db.collection(constants.tables.users).get();

    const usersRegistered = querySnapshot.size;

    if (usersRegistered <= 100) {
      finalPayload = { ...finalPayload, is_original: true };
    }

    const docRef = db.collection(constants.tables.users).doc(payload.user_id);
    const docRef2 = db
      .collection("pageSizes")
      .doc("users")
      .collection("count")
      .doc("vikin");

    const countData = (await docRef2.get()).data() as {
      active: number;
      deactivated: number;
      count: number;
    };

    await docRef.set(finalPayload);
    await docRef2.update({
      active: countData.active + 1,
      count: countData.count + 1,
    });
  } catch (error: any) {
    throw new Error(`Failed to fetch user:  ${error.message}`);
  }
};

export const updateSessionStatus = async (
  isOnline: boolean,
  userId: string,
  lastLoggedIn: number
) => {
  const docRef = db.collection(constants.tables.users).doc(userId);

  try {
    await docRef.update({
      is_active: isOnline,
      last_login: JSON.stringify(lastLoggedIn),
    });
  } catch (error: any) {
    throw new Error(`Failed to fetch user:  ${error.message}`);
  }
};

export const getTotalActiveUsersCount = async () => {
  try {
    const querySnapshot = await db
      .collection(constants.tables.users)
      .where("status", "==", "active")
      .get();

    return querySnapshot.size;
  } catch (error: any) {
    throw new Error(`Failed to fetch active users count: ${error.message}`);
  }
};

export const startRide = async (payload: {
  user_id: string;
  ride_id: string;
}) => {
  try {
    const docRef = db.collection(constants.tables.rides).doc(payload.ride_id);
    const docRef2 = db.collection(constants.tables.users).doc(payload.user_id);

    const rideData = await docRef.get();
    const userData = await docRef2.get();

    if (rideData.exists && userData.exists) {
      const ride = rideData.data() as IRide;
      const ridersArray = [...ride.users_joined];

      const userRideDetailsIdx = ridersArray.findIndex(
        (rider) => rider.user_id === payload.user_id
      );

      ridersArray[userRideDetailsIdx].completed = true;
      ride.status = "ongoing";
      ride.users_joined = ridersArray;
      await docRef.update(ride as any);

      const user = userData.data() as IUser;
      const ridesJoinedArray = user.rides_joined ? [...user.rides_joined] : [];

      const userRideJoinedIdx = ridesJoinedArray.findIndex(
        (ride) => ride.ride_id === payload.ride_id
      );

      ridesJoinedArray[userRideJoinedIdx].completed = true;
      user.rides_joined = ridesJoinedArray;
      await docRef2.update(user as any);

      revalidatePath(`/profile`);
    } else {
      throw new Error(`Ride does not exist!`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(`Ride does not exist!: ${error.message}`);
  }
};
