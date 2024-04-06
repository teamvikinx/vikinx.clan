import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import admin from "@/lib/config/firebase";
import { constants, helpers } from "@/lib/utils";

const db = admin.firestore();

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as INewsletterForm;
    const docRef = db
      .collection(constants.tables.newsletter)
      .doc(helpers.generateUniqueId());

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
