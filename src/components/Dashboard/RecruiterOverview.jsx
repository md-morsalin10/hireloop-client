"use client";

import React from "react";
// কোম্পানি লোগো এবং আইকন (ফিগমা ডিজাইনের কাছাকাছি ম্যাচ করার জন্য)
import { SiGoogle, SiMeta, SiStripe, SiTesla } from "react-icons/si";

export default function RecruiterOverview() {
  // ১. Recent Applications-এর জন্য ফেক ডাটা (ডিজাইন অনুযায়ী)
  const applications = [
    {
      id: 1,
      name: "Julianne Moore",
      role: "Senior Product Designer",
      date: "Oct 24, 2023",
      experience: "6 years",
      status: "Interviewing",
    },
    {
      id: 2,
      name: "Robert Downey",
      role: "Backend Engineer",
      date: "Oct 23, 2023",
      experience: "4 years",
      status: "New",
    },
    {
      id: 3,
      name: "Emma Stone",
      role: "Marketing Lead",
      date: "Oct 22, 2023",
      experience: "8 years",
      status: "Reviewing",
    },
    {
      id: 4,
      name: "Chris Pratt",
      role: "Product Manager",
      date: "Oct 21, 2023",
      experience: "5 years",
      status: "Rejected",
    },
  ];

  // ২. Top Companies-এর জন্য ফেক ডাটা (ডিজাইন অনুযায়ী)
  const companies = [
    {
      id: 1,
      name: "Google Inc.",
      type: "Technology",
      location: "Mountain View",
      activeJobs: "24",
      icon: SiGoogle,
      iconColor: "text-[#4285F4]",
    },
    {
      id: 2,
      name: "Meta Platforms",
      type: "Social Media",
      location: "Menlo Park",
      activeJobs: "18",
      icon: SiMeta,
      iconColor: "text-[#0668E1]",
    },
    {
      id: 3,
      name: "Stripe",
      type: "Fintech",
      location: "San Francisco",
      activeJobs: "12",
      icon: SiStripe,
      iconColor: "text-[#635BFF]",
    },
    {
      id: 4,
      name: "Tesla",
      type: "Automotive",
      location: "Austin",
      activeJobs: "31",
      icon: SiTesla,
      iconColor: "text-[#E82127]",
    },
  ];

  // স্ট্যাটাস পিল (Badge) এর জন্য ডাইনামিক স্টাইল ফাংশন
  const getStatusStyles = (status) => {
    switch (status) {
      case "Interviewing":
        return "bg-[#142A1D] text-[#4ade80] border border-[#1b3d27]";
      case "New":
        return "bg-[#222222] text-[#e5e7eb] border border-white/10";
      case "Reviewing":
        return "bg-[#2A1F14] text-[#fbbf24] border border-[#3d2d1b]";
      case "Rejected":
        return "bg-[#2A1414] text-[#f87171] border border-[#3d1b1b]";
      default:
        return "bg-[#222222] text-white";
    }
  };

  return (
    <div className="w-full text-white select-none font-sans mt-8">
      {/* মেইন গ্রিড লেআউট: ডেক্সটপে ৩ ভাগের ২ ভাগ টেবিল, ১ ভাগ কোম্পানি কার্ড */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* ================= বাম পাশের অংশ: Recent Applications ================= */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-wide text-white/90">
              Recent Applications
            </h2>
            <button className="text-xs text-gray-500 hover:text-white transition-colors">
              View all
            </button>
          </div>

          {/* টেবিল কন্টেইনার */}
          <div className="bg-[#121212] border border-white/5 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[11px] font-medium tracking-wider text-gray-500 uppercase">
                    <th className="py-4 px-6">Candidate Name</th>
                    <th className="py-4 px-6">Role</th>
                    <th className="py-4 px-6">Date Applied</th>
                    <th className="py-4 px-6">Experience</th>
                    <th className="py-4 px-6 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03] text-[13.5px]">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-white/[0.01] transition-colors">
                      {/* নাম ও প্রোফাইল ডামি এভাটার */}
                      <td className="py-5 px-6 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#262626] shrink-0" />
                        <span className="font-semibold text-white/90">{app.name}</span>
                      </td>
                      {/* রোল */}
                      <td className="py-5 px-6 text-gray-400 font-normal">
                        {app.role}
                      </td>
                      {/* তারিখ */}
                      <td className="py-5 px-6 text-gray-500">
                        {app.date}
                      </td>
                      {/* এক্সপেরিয়েন্স */}
                      <td className="py-5 px-6 text-gray-400">
                        {app.experience}
                      </td>
                      {/* স্ট্যাটাস ব্যাজ */}
                      <td className="py-5 px-6 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-medium tracking-wide ${getStatusStyles(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ================= ডান পাশের অংশ: My Top Companies ================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-wide text-white/90">
              My Top Companies
            </h2>
            <button className="text-xs text-gray-500 hover:text-white transition-colors">
              View all
            </button>
          </div>

          {/* কোম্পানি লিস্ট কার্ড */}
          <div className="bg-[#121212] border border-white/5 rounded-2xl p-5 flex flex-col justify-between min-h-[385px]">
            <div className="space-y-5">
              {companies.map((company) => {
                const CompanyIcon = company.icon;
                return (
                  <div key={company.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3.5">
                      {/* আইকন বক্স */}
                      <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-white/5 flex items-center justify-center shrink-0">
                        <CompanyIcon className={`text-lg ${company.iconColor}`} />
                      </div>
                      {/* কোম্পানির নাম ও ডিটেইলস */}
                      <div>
                        <h4 className="text-[14px] font-semibold text-white/90 tracking-wide">
                          {company.name}
                        </h4>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          {company.type} • {company.location}
                        </p>
                      </div>
                    </div>

                    {/* একটিভ জব কাউন্ট */}
                    <div className="text-right">
                      <p className="text-[15px] font-bold text-white tracking-tight">
                        {company.activeJobs}
                      </p>
                      <p className="text-[9px] text-gray-500 uppercase tracking-widest font-medium mt-0.5">
                        Active Jobs
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* নিচের ভিউ অল বাটন */}
            <button className="w-full mt-6 py-2.5 text-center text-[12.5px] font-medium bg-transparent border border-white/5 hover:border-white/10 rounded-xl text-gray-300 hover:text-white transition-all active:scale-[0.99]">
              View All Companies
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}