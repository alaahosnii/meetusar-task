import DashboardContent from "../_components/dashboardContent/DashboardContent"
import { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'MeetUsar Dashboard',
    description: 'MeetUsar Dashboard',
}

const Dashboard = () => {
    return (
        <div>
            <DashboardContent />
        </div>
    )
}

export default Dashboard