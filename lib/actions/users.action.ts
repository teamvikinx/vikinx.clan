import { constants } from "../utils";
import admin from "../config/firebase";

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
  const docRef = db.collection(constants.tables.users).doc(payload.user_id);

  try {
    await docRef.set(payload);
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
    let ride = await db.collection(constants.tables.rides).doc(rideId).get();
    let riders;
    if (ride.exists) {
      const rideData = ride.data() as IRide;
      riders = await db
        .collection(constants.tables.users)
        .where("id", "in", rideData.users_joined)
        .get();

      rideData.users_joined = riders.docs.map((user) => user.data() as IUser);
    }
    return ride.data() as IRide;
  } catch (error: any) {
    throw new Error(`Failed to fetch ride details: ${error.message}`);
  }
};
