import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import admin from "@/lib/config/firebase";
import { constants } from "@/lib/utils";

const db = admin.firestore();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await db
      .collection(constants.tables.users)
      .doc(params.id)
      .get();

    const user = data.data() as IUser;
    
    return NextResponse.json(
      { allowed: user ? user.status : true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
