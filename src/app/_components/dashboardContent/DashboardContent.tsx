"use client"
import { AppDispatch, RootState } from "@/app/_redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUser, logOutUser } from "@/app/_redux/slices/AuthSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const DashboardContent = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getLoggedInUser());
    }, []);
    const { user, isLogoutLoading, getLoggedInUserError } = useSelector((state: RootState) => state.auth);
    useEffect(() => {
        if (getLoggedInUserError) {
            console.log("getLoggedInUserError", getLoggedInUserError);
            
            router.replace("/login");
        }
    }, [getLoggedInUserError]);
    const handleLogout = async () => {
        try {
            await dispatch(logOutUser()).unwrap();
            router.replace("/login");
        } catch (error) {
            console.error("Logout failed:", error);
            // Even if logout fails, clear local state and redirect
            router.replace("/login");
        }
    };

    const getInitials = (fullName?: string) => {
        if (!fullName) return "U";
        const parts = fullName.trim().split(" ").filter(Boolean);
        const first = parts[0]?.[0] ?? "";
        const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
        return (first + last || first).toUpperCase();
    };

    return (
        user && (
            <div className="min-h-[60vh] w-full px-4 py-6 flex items-center justify-center">
                <div className="w-full max-w-2xl rounded-xl border bg-card/60 backdrop-blur p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="h-16 w-16 shrink-0 rounded-full bg-gradient-to-br from-sidebar-primary to-chart-2 text-primary-foreground grid place-items-center text-xl font-semibold">

                            <span>{getInitials(user?.name)}</span>
                        </div>

                        <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div>
                                    <h2 className="text-lg font-semibold tracking-tight">
                                        {user?.name || "User"}
                                    </h2>
                                    <p className="text-sm text-muted-foreground">
                                        {user?.email || "No email available"}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {user?.is_influencer ? (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                                            Employee
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                                            Customer
                                        </span>
                                    )}
                                    {user?.organization_id ? (
                                        <span className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium">
                                            Org #{user.organization_id}
                                        </span>
                                    ) : null}
                                    {user?.shop_id ? (
                                        <span className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium">
                                            Shop #{user.shop_id}
                                        </span>
                                    ) : null}
                                </div>
                            </div>

                            {!!user?.roles?.length && (
                                <div className="mt-4 flex flex-wrap items-center gap-2">
                                    {user.roles.map((role) => (
                                        <span
                                            key={role}
                                            className="inline-flex items-center rounded-md bg-accent px-2.5 py-1 text-xs font-medium text-accent-foreground"
                                        >
                                            {role}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div className="rounded-lg border p-4">
                                    <p className="text-xs text-muted-foreground">User ID</p>
                                    <p className="mt-1 font-medium">{user?.id ?? "—"}</p>
                                </div>
                                <div className="rounded-lg border p-4">
                                    <p className="text-xs text-muted-foreground">Status</p>
                                    <p className="mt-1 font-medium">{user ? "Active" : "Guest"}</p>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="cursor-pointer inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 active:opacity-100 transition-opacity"
                                >
                                    {!isLogoutLoading ? (
                                        <span>Logout</span>
                                    ) : <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-t-2 border-white"></div>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    )
}

export default DashboardContent