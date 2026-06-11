import { getUserSeason } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';

const ApplyPage = async ({params}) => {
    const { id } = await params;
    const user =await getUserSeason();
    if (!user) {
        redirect(`/login?redirect=/jobs/${id}/apply`); // Redirect to login if user is not authenticated
    }

    if(user.role !== 'seeker') {
        return(
            <div className='text-center h-[50vh] flex flex-col items-center justify-center my-30'>
                <h1 className='text-2xl font-bold'>Access Denied</h1>
                <p className='text-gray-500 mt-4'>Only job seekers can apply for jobs. Please login with a seeker account.</p>
            </div>  
        )
    }
    
    return (
        <div>
            Apply Page
        </div>
    );
};

export default ApplyPage;