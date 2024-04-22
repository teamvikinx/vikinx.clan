import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import admin from "@/lib/config/firebase";
import { constants } from "@/lib/utils";

const db = admin.firestore();

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as IReview;
    const _docRef = await db
      .collection(constants.tables.review)
      .where("review_by.id", "==", payload.review_by.id)
      .get();
    const alreadyExist = _docRef.docs.map((x) => x.data());
    if (alreadyExist.length > 0) {
      return NextResponse.json(
        { message: "You already have submitted you story with us!" },
        { status: 200 }
      );
    }

    const docRef = db.collection(constants.tables.review).doc(payload.uuid);

    await docRef.set(payload);

    return NextResponse.json(
      { message: "Thank you so much for sharing your story with us! 🎉" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
