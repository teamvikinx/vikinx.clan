import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import admin from "@/lib/config/firebase";
import { constants, helpers } from "@/lib/utils";

const db = admin.firestore();

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as IContactForm;
    const docRef = db
      .collection(constants.tables.contact)
      .doc("vikin")
      .collection("contact")
      .doc(payload.uuid);

    await docRef.set(payload);

    return NextResponse.json({ message: "Message recieved!" }, { status: 200 });
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
