import { getUserSeason } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import ApplyForm from './ApplyForm'; 
import { getJobById } from '@/lib/api/job';
import { getApplicationsByApplicantId } from '@/lib/api/application';
import Link from 'next/link';
import { getPlanById } from '@/lib/api/plan';

const ApplyPage = async ({ params }) => {
    const { id } = await params;
    const user = await getUserSeason();
    
    // ১. ইউজার লগইন না থাকলে রিডাইরেক্ট
    if (!user) {
        redirect(`/login?redirect=/jobs/${id}/apply`); 
    }

    // ২. ইউজার রোল 'seeker' না হলে অ্যাক্সেস ডেনাইড
    if (user.role !== 'seeker') {
        return (
            <div className='text-center h-[70vh] flex flex-col items-center justify-center px-4 bg-black text-white'>
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-full mb-4">
                    <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h1 className='text-3xl font-bold tracking-tight'>Access Denied</h1>
                <p className='text-[#86868b] max-w-md mt-3 text-sm leading-relaxed'>
                    Only job seekers can apply for jobs. Please login with a seeker account to proceed.
                </p>
                <Link href="/jobs" className="mt-6 px-5 py-2.5 bg-[#1c1c1f] hover:bg-[#2c2c2e] border border-[#2c2c2e] rounded-xl text-sm font-medium transition-colors">
                    Back to Jobs
                </Link>
            </div>  
        );
    }

    // API ডাটা ফেচিং
    const job = await getJobById(id);
    const applicant = await getApplicationsByApplicantId(user?.email);
    const planData = await getPlanById(user?.plan || "seeker_free");

    console.log("Applicant Data:", applicant);
    console.log("User Plan Data:", planData);
    
    // ৩. সেফগার্ড চেক: Next.js র‍্যাপার অ্যারে থেকে সঠিক লেন্থ বা কাউন্ট নেওয়া
    const currentCount = Array.isArray(applicant) ? applicant.length : 0;

    // ৪. কনসোল ইমেজ অনুযায়ী dynamic plan ডেটা রিড করা (planData[0] থেকে)
    const activePlan = Array.isArray(planData) && planData.length > 0 ? planData[0] : null;
    
    const planName = activePlan?.name || "Basic Plan";
    const maxApplications = activePlan?.maxApplicationPerMonth || 3; // ইমেজ অনুযায়ী key হলো maxApplicationPerMonth

    const isLimitReached = currentCount >= maxApplications;
    
    // প্রোগ্রেস বারের পার্সেন্টেজ ক্যালকুলেশন
    const progressPercentage = Math.min((currentCount / maxApplications) * 100, 100);

    return (
        <div className="min-h-screen bg-black pt-24 pb-16 px-4 flex flex-col items-center justify-start">
            
            {/* Header Section */}
            <div className="text-center mb-10 max-w-xl">
                <span className="text-xs text-[#bf5af2] bg-[#bf5af2]/10 border border-[#bf5af2]/20 px-3 py-1 rounded-full font-medium uppercase tracking-wider">
                    Application Portal
                </span>
                <h2 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight mt-3">
                    Submit Your Application
                </h2>
                <p className="text-[#86868b] text-sm mt-2">
                    Review your tier usage and fill out the details carefully to apply for <span className="text-white font-medium">{job?.title}</span>.
                </p>
            </div>

            {/* Application Counter & Plan Banner Card */}
            <div className="w-full max-w-3xl bg-[#0a0a0c] border border-[#1a1a1e] rounded-[24px] p-6 mb-8 flex flex-col gap-4 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="text-[#e5e5ea] text-base font-semibold">Application Usage</h3>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#2c2c2e] text-[#a1a1aa] rounded-md">
                                {planName}
                            </span>
                        </div>
                        <p className="text-[#86868b] text-xs mt-1">
                            {isLimitReached 
                                ? `You have reached your ${planName} limit. Upgrade to continue applying.` 
                                : `You can apply ${maxApplications - currentCount} more times on your current cycle.`
                            }
                        </p>
                    </div>
                    
                    <div className="sm:text-right flex sm:flex-col items-baseline sm:items-end gap-1.5 shrink-0">
                        <span className="text-2xl font-bold text-white">
                            {currentCount} <span className="text-sm font-normal text-[#636366]">/ {maxApplications}</span>
                        </span>
                        <span className="text-xs text-[#636366]">applied</span>
                    </div>
                </div>

                {/* Apple-style Custom Progress Bar */}
                <div className="w-full h-2 bg-[#1c1c1f] rounded-full overflow-hidden">
                    <div 
                        className={`h-full transition-all duration-500 rounded-full ${
                            isLimitReached ? 'bg-red-500' : progressPercentage > 66 ? 'bg-amber-500' : 'bg-[#bf5af2]'
                        }`}
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>

                {/* Upgrade Invitation banner */}
                <div className="flex items-center justify-between border-t border-[#1a1a1e] pt-3 mt-1 text-xs">
                    <span className="text-[#86868b]">Want unlimited applications?</span>
                    <Link href="/pricing" className="text-[#bf5af2] font-medium hover:underline flex items-center gap-1 transition-all">
                        View Premium Plans
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Client Component Form Condition */}
            {!isLimitReached ? (
                <div className="w-full flex justify-center">
                    <ApplyForm job={job} userEmail={user?.email} />
                </div>
            ) : (
                /* Limit Exceeded Premium Block */
                <div className="w-full max-w-3xl bg-[#0a0a0c] border border-red-500/10 rounded-[24px] p-10 text-center flex flex-col items-center justify-center shadow-lg">
                    <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-2xl mb-4 text-red-400">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m0-6v2m0-8H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-5z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-white">Application Limit Blocked</h3>
                    <p className="text-sm text-[#86868b] max-w-md mt-2 leading-relaxed">
                        You have hit the maximum allowance of {maxApplications} applications for the basic tier. Please unlock premium access to apply for this <span className="text-[#e5e5ea] font-medium">{job?.title}</span> position.
                    </p>
                    <Link href="/pricing" className="mt-6 px-6 py-3 bg-[#bf5af2] hover:bg-[#ac49dc] text-white font-semibold rounded-xl text-sm transition-all shadow-[0_4px_20px_rgba(191,90,242,0.2)]">
                        Upgrade Account Now
                    </Link>
                </div>
            )}
        </div>
    );
};

export default ApplyPage;