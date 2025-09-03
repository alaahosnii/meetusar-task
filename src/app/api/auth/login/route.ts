
import axiosInstance from "@/app/_utils/axiosInstance";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const response = await axiosInstance.post("/yeshtery/token", {
            ...body,
            isEmployee: true,
        });
        
        const res = NextResponse.json(response.data);
        res.cookies.set("meetusartoken", response.data.token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/",
        });
        return res;
    } catch (error: unknown) {
        const axiosError = error as AxiosError;

        return NextResponse.json(
            { error: axiosError?.response?.data || "Something went wrong" },
            { status: axiosError?.response?.status || 400 }
        );
    }
}
