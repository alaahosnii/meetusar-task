import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  
  // Remove the token cookie with proper settings
  cookieStore.delete("meetusartoken");

  return NextResponse.json({ message: "Logged out successfully" });
}
