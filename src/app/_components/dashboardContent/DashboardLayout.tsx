"use client"
import { useState } from "react";
import Image from "next/image";
import {
    Home,
    Users,
    BarChart3,
    Settings,
    Menu,
    X,
    LogOut,
} from "lucide-react";
import { GetUserInfoResponse } from "@/app/_types/Types";

interface DashboardLayoutProps {
    children: React.ReactNode;
    user: GetUserInfoResponse;
    onLogout: () => void;
    isLogoutLoading: boolean;
}

const DashboardLayout = ({ children, user, onLogout, isLogoutLoading }: DashboardLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: Home, current: true },
        { name: 'Users', icon: Users, current: false },
        { name: 'Analytics', icon: BarChart3, current: false },
        { name: 'Settings', icon: Settings, current: false },
    ];

    const getInitials = (fullName?: string) => {
        if (!fullName) return "U";
        const parts = fullName.trim().split(" ").filter(Boolean);
        const first = parts[0]?.[0] ?? "";
        const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
        return (first + last || first).toUpperCase();
    };

    return (
        <div className="bg-gray-50">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="fixed inset-0 bg-black/70" onClick={() => setSidebarOpen(false)} />
                </div>
            )}
            <div className="grid grid-cols-12">
                <div className="col-span-12 lg:col-span-2">
                    <div className={`min-h-screen fixed inset-y-0 left-0 z-50 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}>
                        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
                            <div className="w-full">
                                <Image
                                    src="/logo.svg"
                                    alt="MeetUsar Logo"
                                    width={100}
                                    height={100}
                                    className="w-full h-full"
                                />
                            </div>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <nav className="mt-8 px-4">
                            <div className="space-y-2">
                                {navigation.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${item.current
                                                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                                                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                                }`}
                                        >
                                            <Icon className="mr-3 h-5 w-5" />
                                            {item.name}
                                        </a>
                                    );
                                })}
                            </div>
                        </nav>

                        {/* User section at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                            <div className="flex items-center space-x-3 mb-3">
                                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                    {getInitials(user?.name)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {user?.name || "User"}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {user?.email || "No email"}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onLogout}
                                disabled={isLogoutLoading}
                                className="w-full cursor-pointer flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
                            >
                                {isLogoutLoading ? (
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                                ) : (
                                    <>
                                        <LogOut className="w-4 h-4 mr-2" />
                                        Logout
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-10">
                    {/* Main content */}
                    <div>
                        {/* Header */}
                        <header className="bg-white shadow-sm border-b border-gray-200">
                            <div className="flex items-center justify-between h-16 px-6">
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => setSidebarOpen(true)}
                                        className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
                                    >
                                        <Menu className="w-5 h-5" />
                                    </button>
                                    <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                                </div>

                                <div className="flex items-center space-x-4">
                                    {/* User menu */}
                                    <div className="flex items-center space-x-3">
                                        <div className="hidden md:block text-right">
                                            <p className="text-sm font-medium text-gray-900">{user?.name || "User"}</p>
                                            <p className="text-xs text-gray-500">
                                                {user?.is_influencer ? "Employee" : "Customer"}
                                            </p>
                                        </div>
                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                            {getInitials(user?.name)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Main content area */}
                        <main className="p-6 w-full">
                            {children}
                        </main>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DashboardLayout;
