'user server'
import { constants } from "../utils";
import admin from "../config/firebase";

const db = admin.firestore();

export const getStories = async (isFeatured = false) => {
  try {
    let query = db
      .collection(constants.tables.review)
      .where("is_approved", "==", true).where("is_archive", "==", false);;

    if (isFeatured) {
      query = query.where("is_featured", "==", true);
    }

    const querySnapshot = await query.get();

    const data = querySnapshot.docs.map((doc) => doc.data() as IReview);

    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to fetch user stories: ${error.message}`);
  }
};
