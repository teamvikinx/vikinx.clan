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
      active: countData.active++,
      count: countData.count++,
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

