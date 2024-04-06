import { NextRequest, NextResponse } from "next/server";
import { HttpStatusCode } from "axios";
import admin from "@/lib/config/firebase";
import { constants } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const db = admin.firestore();

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as {
      joined_at: number;
      user_id: string;
      ride_id: string;
    };

    const docRef = db.collection(constants.tables.rides).doc(payload.ride_id);
    const rideData = await docRef.get();
    if (rideData.exists) {
      const ride = rideData.data() as IRide;
      const ridersArray = [...ride.users_joined];
      ridersArray.push({
        joined_at: payload.joined_at,
        user_id: payload.user_id,
      });

      ride.users_joined = ridersArray;
      await docRef.update(ride as any);
      revalidatePath('/events/:id')
      return NextResponse.json(
        { message: "Enrolled successfully" },
        { status: HttpStatusCode.Ok }
      );
    } else {
      return NextResponse.json(
        { message: "Ride does not exist!" },
        { status: HttpStatusCode.NotFound }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
