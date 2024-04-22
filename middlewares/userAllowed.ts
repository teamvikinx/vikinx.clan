import axios, { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function isUserAllowed(request: NextRequest, userId: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/users/${userId}`, { method: "GET" });
    const data = await res.json()
    return data.allowed;
  } catch (error) {
    console.log('error', error);
    return NextResponse.json(
      { message: error },
      { status: HttpStatusCode.BadRequest }
    );
  }
}
