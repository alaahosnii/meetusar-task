import { GetUserInfoResponse } from "@/app/_types/Types";
import {
    Users,
    TrendingUp,
    DollarSign,
    Activity
} from "lucide-react";


interface DashboardWidgetsProps {
    user: GetUserInfoResponse;
}

const DashboardWidgets = ({ user }: DashboardWidgetsProps) => {
    const stats = [
        {
            name: 'Total Users',
            value: '2,543',
            change: '+12%',
            changeType: 'positive' as const,
            icon: Users,
        },
        {
            name: 'Revenue',
            value: '$45,231',
            change: '+8.2%',
            changeType: 'positive' as const,
            icon: DollarSign,
        },
        {
            name: 'Active Sessions',
            value: '1,234',
            change: '-2.1%',
            changeType: 'negative' as const,
            icon: Activity,
        },
        {
            name: 'Conversion Rate',
            value: '3.24%',
            change: '+0.5%',
            changeType: 'positive' as const,
            icon: TrendingUp,
        },
    ];



    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">
                            Welcome back, {user?.name?.split(' ')[0] || 'User'}!
                        </h2>
                        <p className="text-blue-100 mt-1">
                            Here&apos;s what&apos;s happening with your business today.
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                            <Users className="w-8 h-8" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                    <Icon className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center">
                                <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {stat.change}
                                </span>
                                <span className="text-sm text-gray-500 ml-2">from last month</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* User Profile Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Your Profile</h3>
                </div>
                <div className="p-6">
                    <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                            {user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'U'}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900">{user?.name || "User"}</h4>
                            <p className="text-gray-600">{user?.email || "No email available"}</p>
                            <div className="flex items-center space-x-4 mt-3">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user?.is_influencer
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-blue-100 text-blue-800'
                                    }`}>
                                    {user?.is_influencer ? "Employee" : "Customer"}
                                </span>
                                {user?.organization_id && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        Org #{user.organization_id}
                                    </span>
                                )}
                                {user?.shop_id && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        Shop #{user.shop_id}
                                    </span>
                                )}
                            </div>
                            {user?.roles?.length > 0 && (
                                <div className="mt-3">
                                    <p className="text-sm text-gray-600 mb-2">Roles:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {user.roles.map((role: string) => (
                                            <span
                                                key={role}
                                                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700"
                                            >
                                                {role}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardWidgets;
