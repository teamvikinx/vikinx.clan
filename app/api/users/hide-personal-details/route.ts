import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import admin from "@/lib/config/firebase";
import { constants } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const db = admin.firestore();

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as {
      hide_details: boolean;
      user_id: string;
    };

    const docRef = db.collection(constants.tables.users).doc(payload.user_id);
    await docRef.update({ hide_details: payload.hide_details });
    revalidatePath("/profile");
    return NextResponse.json(
      { message: "Preference set successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
