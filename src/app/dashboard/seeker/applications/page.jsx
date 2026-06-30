import { getApplicationsByApplicantId } from '@/lib/api/application';
import { getUserSeason } from '@/lib/core/session';
import React from 'react';
import Link from 'next/link';
import { Table } from "@heroui/react";

// ISO Date থেকে রিলেটিভ টাইম জেনারেট করার ফাংশন
function timeAgo(dateString) {
  if (!dateString) return "Just now";
  const now = new Date();
  const past = new Date(dateString);
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerWeek = msPerDay * 7;

  const elapsed = now - past;

  if (elapsed < msPerMinute) {
    return 'Just now';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + 'm ago';
  } else if (elapsed < msPerDay) {
    const hours = Math.round(elapsed / msPerHour);
    return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
  } else if (elapsed < msPerDay * 2) {
    return '1 day ago';
  } else if (elapsed < msPerWeek) {
    return Math.round(elapsed / msPerDay) + ' days ago';
  } else {
    const weeks = Math.round(elapsed / msPerWeek);
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
  }
}

// স্ট্যাটাস অনুযায়ী ডিজাইন বর্ডার ও কালার ম্যাপিং
const statusStyles = {
  applied: "border border-zinc-800 bg-zinc-900/40 text-zinc-300",
  review: "border border-amber-500/30 bg-amber-500/10 text-amber-400",
  shortlisted: "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  rejected: "border border-red-500/30 bg-red-500/10 text-red-400",
  offered: "border border-purple-500/30 bg-purple-500/10 text-purple-400",
};

const ApplicationPage = async () => {
    const user = await getUserSeason();
    const applicationData = await getApplicationsByApplicantId(user?.id);
    
    // সেফগার্ড ডাটা অ্যারে চেকিং
    const applications = Array.isArray(applicationData) ? applicationData : [];

    return (
        <div className="min-h-screen bg-black text-white px-4 md:px-8 pt-24 pb-12">
            
            {/* Header Section */}
            <div className="max-w-6xl mx-auto mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Your Applications</h1>
                    <p className="text-sm text-zinc-500 mt-1">Track and manage your submitted job applications.</p>
                </div>
                <div className="bg-zinc-900/50 border border-zinc-800/80 px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 tracking-wide self-start sm:self-center">
                    Total Applications: <span className="text-white text-sm ml-1 font-mono">{applications.length}</span>
                </div>
            </div>

            {/* Premium Table Container */}
            <div className="max-w-6xl mx-auto bg-[#0a0a0c] border border-[#1a1a1e] rounded-[24px] shadow-[0_24px_60px_rgba(0,0,0,0.8)] overflow-hidden">
                {applications.length === 0 ? (
                    <div className="text-center py-20 px-4">
                        <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-4 text-zinc-500">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <h3 className="text-base font-semibold text-zinc-300">No applications found</h3>
                        <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">You havent submitted any job applications yet.</p>
                    </div>
                ) : (
                    <Table className="w-full bg-transparent border-none shadow-none p-0 m-0">
                        <Table.ScrollContainer>
                            <Table.Content aria-label="Job Applications" className="min-w-[700px] bg-transparent border-none">
                                <Table.Header className="bg-zinc-900/20 border-b border-[#1c1c21]">
                                    {/* এখানে isRowHeader যুক্ত করে এররটি ফিক্স করা হয়েছে */}
                                    <Table.Column isRowHeader className="py-4 px-6 text-xs font-bold text-zinc-400 uppercase tracking-widest bg-transparent border-none">Job Title</Table.Column>
                                    <Table.Column className="py-4 px-6 text-xs font-bold text-zinc-400 uppercase tracking-widest bg-transparent border-none">Company</Table.Column>
                                    <Table.Column className="py-4 px-6 text-xs font-bold text-zinc-400 uppercase tracking-widest bg-transparent border-none">Applied</Table.Column>
                                    <Table.Column className="py-4 px-6 text-xs font-bold text-zinc-400 uppercase tracking-widest bg-transparent border-none">Status</Table.Column>
                                    <Table.Column className="py-4 px-6 text-xs font-bold text-zinc-400 uppercase tracking-widest bg-transparent border-none text-right">Action</Table.Column>
                                </Table.Header>
                                <Table.Body className="divide-y divide-[#121214]">
                                    {applications.map((app) => {
                                        const statusKey = (app?.status || "applied").toLowerCase();
                                        const badgeStyleClass = statusStyles[statusKey] || statusStyles.applied;
                                        const dateValue = app?.createdAt?.$date || app?.createdAt;

                                        return (
                                            <Table.Row key={app?._id?.$oid || app?._id} className="hover:bg-zinc-900/30 transition-colors duration-150 group border-b border-[#121214]/40">
                                                
                                                {/* Job Title with Premium Box Logo */}
                                                <Table.Cell className="py-5 px-6 border-none">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-[#121214] border border-zinc-800/80 rounded-xl flex items-center justify-center text-zinc-400 font-mono text-xs font-bold uppercase tracking-wider shrink-0 group-hover:border-zinc-700 transition-colors">
                                                            {app?.jobTitle ? app.jobTitle.substring(0, 2) : "MERN"}
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-zinc-100 group-hover:text-white transition-colors text-sm">
                                                                {app?.jobTitle || "MERN Stack Developer"}
                                                            </div>
                                                            <div className="text-[11px] text-zinc-500 font-medium mt-0.5 flex items-center gap-1.5">
                                                                <span>Full-time</span>
                                                                <span className="w-1 h-1 rounded-full bg-zinc-800" />
                                                                <span>Remote</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Table.Cell>

                                                {/* Company Name */}
                                                <Table.Cell className="py-5 px-6 text-zinc-400 font-medium border-none">
                                                    {app?.companyName || "Adobe"}
                                                </Table.Cell>

                                                {/* Applied TimeAgo */}
                                                <Table.Cell className="py-5 px-6 text-zinc-400 border-none font-medium">
                                                    {timeAgo(dateValue)}
                                                </Table.Cell>

                                                {/* Status Badge */}
                                                <Table.Cell className="py-5 px-6 border-none">
                                                    <span className={`inline-flex items-center justify-center px-3 py-0.5 min-w-[76px] text-center rounded-full text-[11px] font-semibold tracking-wide capitalize ${badgeStyleClass}`}>
                                                        {app?.status || "Applied"}
                                                    </span>
                                                </Table.Cell>

                                                {/* View Details Link */}
                                                <Table.Cell className="py-5 px-6 text-right border-none">
                                                    <Link 
                                                        href={`/dashboard/seeker/applications/${app?._id?.$oid || app?._id}`}
                                                        className="inline-flex items-center justify-center h-8 px-3 rounded-lg text-xs font-semibold text-zinc-400 hover:text-white border border-transparent hover:border-zinc-800/80 hover:bg-zinc-900/60 transition-all active:scale-[0.97]"
                                                    >
                                                        Details
                                                    </Link>
                                                </Table.Cell>
                                                
                                            </Table.Row>
                                        );
                                    })}
                                </Table.Body>
                            </Table.Content>
                        </Table.ScrollContainer>
                    </Table>
                )}
            </div>
        </div>
    );
};

export default ApplicationPage;