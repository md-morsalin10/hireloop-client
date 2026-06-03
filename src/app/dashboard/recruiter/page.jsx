'use client';
import RecruiterOverview from "@/components/Dashboard/RecruiterOverview";
import StatsGrid from "@/components/Dashboard/StatsGrid";
import { authClient } from "@/lib/auth-client";
import { FiBriefcase, FiSend, FiBookmark, FiCheckCircle } from "react-icons/fi";

const RecruiterPage = () => {
    const { data: session, isPending } = authClient.useSession();

    if(isPending) return <div>Loading...</div>

    const user = session?.user
    console.log(user);

    const RecruiterStats = [
        { label: "Total Job Posts", value: "24", icon: FiSend },
        { label: "Total Applications", value: "5", icon: FiCheckCircle },
        { label: "Total Job Posts", value: "12", icon: FiBookmark },
        { label: "Jobs Closed", value: "340", icon: FiBriefcase },
    ];
    return (
        <div className="py-6">
            <h2 className="text-2xl font-semibold mb-6">Welcome back, {user?.name}!</h2>
            <StatsGrid statsData={RecruiterStats} />
            <RecruiterOverview />
        </div>
    );
};

export default RecruiterPage;