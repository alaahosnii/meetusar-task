"use client"
import { AppDispatch, RootState } from "@/app/_redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUser, logOutUser } from "@/app/_redux/slices/Auth/thunks/authThunks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import DashboardWidgets from "./DashboardWidgets";
import DashboardLoading from "./DashboardLoading";
import { GetUserInfoResponse } from "@/app/_types/Types";

const DashboardContent = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getLoggedInUser());
    }, []);

    const { user, isLogoutLoading, getLoggedInUserError, getLoggedInUserLoading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (getLoggedInUserError) {
            if (getLoggedInUserError.status === 401) {
                router.replace("/login");
            }
        }
    }, [getLoggedInUserError]);

    const handleLogout = async () => {
        await dispatch(logOutUser()).unwrap();
        router.replace("/login");
    };


    return !user && getLoggedInUserLoading ? (
        <DashboardLoading />
    ) : (
          <DashboardLayout
            user={user as GetUserInfoResponse}
            onLogout={handleLogout}
            isLogoutLoading={isLogoutLoading}
        >
            {user && <DashboardWidgets user={user} />}
        </DashboardLayout>
    )
}

export default DashboardContent