import { getJobById } from '@/lib/api/job';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const JobDetails = async ({ params }) => {
    const { id } = await params;
    const job = await getJobById(id);

    if (!job) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <p className="text-[#86868b]">Job not found or has been removed.</p>
            </div>
        );
    }

    // নিউ-লাইন (\n) টেক্সটগুলোকে অ্যারেতে কনভার্ট করার ফাংশন
    const parseList = (text) => text ? text.split('\n').filter(line => line.trim() !== '') : [];

    return (
        <div className="min-h-screen bg-black text-[#f5f5f7] py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                
                {/* ব্যাক বাটন */}
                <Link 
                    href="/jobs" 
                    className="inline-flex items-center gap-2 text-sm text-[#bf5af2] hover:underline mb-8 transition-all"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Jobs
                </Link>

                {/* জব হেডার কার্ড */}
                <div className="p-6 sm:p-8 bg-[#0c0c0e] border border-[#1e1e21] rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div className="flex items-center gap-5">
                        {/* কোম্পানি লোগো */}
                        <div className="w-16 h-16 rounded-2xl bg-[#161618] border border-[#242427] p-2 flex items-center justify-center overflow-hidden">
                            {job.companyLogo ? (
                                <img 
                                    src={job.companyLogo} 
                                    alt={`${job.companyName} Logo`} 
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <span className="text-xl font-bold text-[#bf5af2]">{job.companyName?.[0]}</span>
                            )}
                        </div>
                        
                        {/* টাইটেল ও কোম্পানি */}
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
                                {job.title}
                            </h1>
                            <p className="text-sm text-[#86868b] font-medium">{job.companyName}</p>
                        </div>
                    </div>

                    {/* অ্যাকশন বাটন */}
                    <Link 
                        href={`/jobs/${id}/apply`} 
                        className="w-full sm:w-auto px-6 py-3 bg-[#bf5af2] hover:bg-[#ac49dd] text-white text-sm font-semibold rounded-xl transition-all shadow-[0_4px_20px_rgba(191,90,242,0.3)] cursor-pointer"
                    >
                        Apply Now
                    </Link>
                </div>

                {/* মেইন কন্টেন্ট গ্রিড */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* বাম পাশের মূল ডিটেইলস (২ কলাম) */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* জব ডেসক্রিপশন */}
                        <div className="p-6 bg-[#0c0c0e] border border-[#1e1e21] rounded-[20px]">
                            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 bg-[#bf5af2] rounded-full inline-block"></span>
                                Job Description
                            </h2>
                            <p className="text-sm text-[#d1d1d6] leading-relaxed">
                                {job.description}
                            </p>
                        </div>

                        {/* জব রেসপন্সিবিলিটিজ */}
                        {job.responsibilities && (
                            <div className="p-6 bg-[#0c0c0e] border border-[#1e1e21] rounded-[20px]">
                                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="w-1 h-5 bg-[#bf5af2] rounded-full inline-block"></span>
                                    Key Responsibilities
                                </h2>
                                <ul className="space-y-3">
                                    {parseList(job.responsibilities).map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-[#d1d1d6] leading-relaxed">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#bf5af2] shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* জব রিকোয়ারমেন্টস */}
                        {job.requirements && (
                            <div className="p-6 bg-[#0c0c0e] border border-[#1e1e21] rounded-[20px]">
                                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="w-1 h-5 bg-[#bf5af2] rounded-full inline-block"></span>
                                    Requirements
                                </h2>
                                <ul className="space-y-3">
                                    {parseList(job.requirements).map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-[#d1d1d6] leading-relaxed">
                                            <svg className="w-4 h-4 text-[#bf5af2] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* সুযোগ-সুবিধা (Benefits) */}
                        {job.benefits && (
                            <div className="p-6 bg-[#0c0c0e] border border-[#1e1e21] rounded-[20px]">
                                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="w-1 h-5 bg-[#bf5af2] rounded-full inline-block"></span>
                                    Benefits & Perks
                                </h2>
                                <ul className="space-y-3">
                                    {parseList(job.benefits).map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-sm text-[#d1d1d6] leading-relaxed">
                                            <span className="text-[#bf5af2] text-sm">✦</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* ডান পাশের সাইডবার মেটাডাটা (১ কলাম) */}
                    <div className="space-y-6">
                        <div className="p-6 bg-[#0c0c0e] border border-[#1e1e21] rounded-[20px] space-y-5">
                            <h3 className="text-base font-bold text-white border-b border-[#1e1e21] pb-3">
                                Job Overview
                            </h3>

                            {/* সেলারি */}
                            <div>
                                <p className="text-xs text-[#636366] uppercase tracking-wider mb-1">Salary Range</p>
                                <p className="text-sm font-semibold text-white">
                                    {job.salaryMin && job.salaryMax 
                                        ? `${Number(job.salaryMin).toLocaleString()} - ${Number(job.salaryMax).toLocaleString()} ${job.currency || 'BDT'} / month`
                                        : 'Negotiable'
                                    }
                                </p>
                            </div>

                            {/* জব টাইপ */}
                            <div>
                                <p className="text-xs text-[#636366] uppercase tracking-wider mb-1">Job Type</p>
                                <span className="inline-flex px-2.5 py-1 rounded-md text-xs font-medium bg-[#bf5af2]/10 text-[#bf5af2] border border-[#bf5af2]/20">
                                    {job.type}
                                </span>
                            </div>

                            {/* লোকেশন */}
                            <div>
                                <p className="text-xs text-[#636366] uppercase tracking-wider mb-1">Location</p>
                                <p className="text-sm text-[#d1d1d6] flex items-center gap-1.5">
                                    <svg className="w-4 h-4 text-[#636366]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {job.location}
                                </p>
                            </div>

                            {/* ডেডলাইন */}
                            <div>
                                <p className="text-xs text-[#636366] uppercase tracking-wider mb-1">Application Deadline</p>
                                <p className="text-sm text-[#ff453a] font-medium flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {job.deadline}
                                </p>
                            </div>

                            {/* ক্যাটাগরি */}
                            <div>
                                <p className="text-xs text-[#636366] uppercase tracking-wider mb-1">Category</p>
                                <p className="text-sm text-[#d1d1d6] capitalize">{job.category}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default JobDetails;