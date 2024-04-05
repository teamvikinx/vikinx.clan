import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import admin from "@/lib/config/firebase";
import { constants } from "@/lib/utils";

const db = admin.firestore();

export async function GET(req: NextRequest) {
  try {
    const snapshot = db.collection(constants.tables.gallery).get();
    const data = (await snapshot).docs.map(
      (data) => data.data() as CloudinaryResponse
    );

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
