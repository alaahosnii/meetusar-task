import axiosInstance from "@/app/_utils/axiosInstance";
import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("meetusartoken")?.value;

        // If no token is found, you can either throw an error or proceed without it
        if (!token) {
            return NextResponse.json({ error: "No token provided" }, { status: 401 });
        }

        const response = await axiosInstance.get("/user/info");

        return NextResponse.json(response.data);
    } catch (error: unknown) {
        const axiosError = error as AxiosError;
        const cookieStore = await cookies();
        cookieStore.delete("meetusartoken");
        return NextResponse.json(
            { error: axiosError?.response?.data || "Something went wrong" },
            { status: axiosError?.response?.status || 400 }
        );
    }
}
