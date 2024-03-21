import { constants } from '../utils';
import admin from '../config/firebase';

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
