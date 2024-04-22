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
      name: string;
      profile_picture: string;
    };

    const docRef = db.collection(constants.tables.rides).doc(payload.ride_id);
    const docRef2 = db.collection(constants.tables.users).doc(payload.user_id);

    const rideData = await docRef.get();
    const userData = await docRef2.get();
    if (rideData.exists && userData.exists) {
      const ride = rideData.data() as IRide;
      const ridersArray = [...ride.users_joined];
      ridersArray.push({
        joined_at: payload.joined_at,
        user_id: payload.user_id,
        name: payload.name,
        profile_picture: payload.profile_picture,
      });

      ride.users_joined = ridersArray;
      await docRef.update(ride as any);

      const user = userData.data() as IUser;
      const ridesJoinedArray = user.rides_joined ? [...user.rides_joined] : [];
      ridesJoinedArray.push({
        joined_at: payload.joined_at,
        ride_id: payload.ride_id,
      });
      user.rides_joined = ridesJoinedArray;
      await docRef2.update(user as any);

      revalidatePath("/events/:id");
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
    console.log(error);

    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
