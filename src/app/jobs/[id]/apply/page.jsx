import { getUserSeason } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import ApplyForm from './ApplyForm'; // ফর্মটির পাথ অনুযায়ী চেঞ্জ করে নিবেন
import { getJobById } from '@/lib/api/job';

const ApplyPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUserSeason();
      const job = await getJobById(id);
    
    if (!user) {
        redirect(`/login?redirect=/jobs/${id}/apply`); 
    }

    if (user.role !== 'seeker') {
        return (
            <div className='text-center h-[50vh] flex flex-col items-center justify-center my-30 text-white'>
                <h1 className='text-2xl font-bold'>Access Denied</h1>
                <p className='text-gray-500 mt-4'>Only job seekers can apply for jobs. Please login with a seeker account.</p>
            </div>  
        );
    }
    
    return (
        <div className="min-h-screen bg-black py-30 p-6 flex flex-col items-center justify-center">
            <div className="text-center mb-8">
                <h2 className="text-white text-3xl font-bold tracking-tight">Job Application</h2>
                <p className="text-[#86868b] text-sm mt-2">Please fill in the details below to complete your application.</p>
            </div>

            {/* Client Component Form */}
            <ApplyForm job={job} userEmail={user?.email} />
        </div>
    );
};

export default ApplyPage;