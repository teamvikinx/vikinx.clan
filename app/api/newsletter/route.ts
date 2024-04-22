import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import admin from "@/lib/config/firebase";
import { constants, helpers } from "@/lib/utils";

const db = admin.firestore();

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as INewsletterForm;
    const newsletterCollection = db.collection(constants.tables.newsletter);

    // Check if the user's email or mobile number already exists in the collection
    const snapshot = await newsletterCollection
      .where("email", "==", payload.email)
      .get();

    if (!snapshot.empty) {
      // User already exists in the collection
      return NextResponse.json(
        { message: "You are already subscribed" },
        { status: 409 } // Conflict
      );
    }

    // User does not exist in the collection, so subscribe them
    const docRef = newsletterCollection.doc(helpers.generateUniqueId());
    await docRef.set(payload);

    return NextResponse.json(
      { message: "Subscribed successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
