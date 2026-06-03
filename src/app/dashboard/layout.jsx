
import { DashboardSidebar } from '@/components/Dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({ children }) => {
    return (
        <div className='flex gap-10 pt-30 min-h-screen w-full bg-[#0A0A0A] pr-10'>

            <DashboardSidebar />
            
            
            <div className='flex-1 w-full'>
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;