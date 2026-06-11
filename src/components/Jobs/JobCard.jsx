'use client';

import { useState } from "react";
import { Link } from "@heroui/react";

// Company name থেকে domain বানানোর helper
const getCompanyDomain = (name) => {
  if (!name) return null;
  const domainMap = {
    google: "google.com",
    apple: "apple.com",
    meta: "meta.com",
    netflix: "netflix.com",
    amazon: "amazon.com",
    microsoft: "microsoft.com",
    stripe: "stripe.com",
    shopify: "shopify.com",
    airbnb: "airbnb.com",
    uber: "uber.com",
    grameenphone: "grameenphone.com",
    bkash: "bkash.com",
    pathao: "pathao.com",
    shohoz: "shohoz.com",
  };
  const key = name.toLowerCase().replace(/\s+/g, "");
  return domainMap[key] || `${key}.com`;
};

export default function JobCard({ job }) {
  const {
    _id,
    title,
    description,
    location,
    type,
    salaryMin,
    salaryMax,
    currency,
    company,
    companyLogo,
    deadline,
    status,
  } = job;

  // Clearbit লোগো ফেইল করলে initials দেখানোর জন্য React State ব্যবহার
  const [logoFailed, setLogoFailed] = useState(false);

  const formatSalary = (amt) => (amt ? Number(amt).toLocaleString() : "");
  const jobId = _id?.["$oid"] || _id;

  const logoUrl = companyLogo || (company ? `https://logo.clearbit.com/${getCompanyDomain(company)}` : null);
  const initials = company ? company.slice(0, 2).toUpperCase() : "CO";

  const formatDeadline = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="relative w-full max-w-[400px] rounded-[24px] bg-[#0c0c0e] border border-[#1e1e21] p-6 overflow-hidden transition-all duration-300 group hover:border-[#bf5af2]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
      {/* Top Shimmer Effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#bf5af2]/30 to-transparent" />

      {/* Company Info Row */}
      <div className="flex items-center gap-2.5 mb-4">
        {logoUrl && !logoFailed ? (
          <div className="w-7 h-7 rounded-lg bg-white border border-[#2c2c30] flex items-center justify-center overflow-hidden shrink-0 p-[3px]">
            <img
              src={logoUrl}
              alt={company}
              className="w-full h-full object-contain"
              onError={() => setLogoFailed(true)} // React-way error handling
            />
          </div>
        ) : (
          <div className="w-7 h-7 rounded-lg bg-[#161618] border border-[#252528] flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-[#bf5af2] tracking-wider">{initials}</span>
          </div>
        )}

        <span className="text-[11px] font-bold tracking-[0.06em] text-[#86868b] uppercase">
          {company}
        </span>

        {status === "active" && (
          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#32d583] shadow-[0_0_8px_rgba(50,213,131,0.4)] shrink-0" />
        )}
      </div>

      {/* Job Title */}
      <h3 className="text-xl font-semibold text-[#f5f5f7] leading-snug tracking-tight mb-2 group-hover:text-white transition-colors duration-200">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[13px] leading-relaxed text-[#86868b] line-clamp-2 mb-5 font-normal">
        {description}
      </p>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#1e1e21] to-transparent mb-5" />

      {/* Clean Premium Side-by-Side Pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {/* Location */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-normal bg-[#161618] border border-[#242427] text-[#d1d1d6]">
          <svg className="w-3.5 h-3.5 text-[#bf5af2]/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
          </svg>
          {location}
        </span>

        {/* Job Type */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-normal bg-[#161618] border border-[#242427] text-[#d1d1d6]">
          <svg className="w-3.5 h-3.5 text-[#bf5af2]/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.214.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.453.254-.718.254H3.922c-.265 0-.524-.09-.718-.254m16.5 0c-.49.51-1.247.56-1.8.12A47.306 47.306 0 0112 15.75c-2.116 0-4.16-.175-5.653-.485-.552-.44-1.31-.39-1.8.12m-1.5-8.006a2.18 2.18 0 01-.75-1.66V4.34c0-1.082.768-2.015 1.837-2.175a48.114 48.114 0 013.413-.387m1.113 1.113a45.6 45.6 0 0110.457 0" />
          </svg>
          {type}
        </span>

        {/* Salary */}
        {salaryMin && salaryMax && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-normal bg-[#161618] border border-[#242427] text-[#d1d1d6]">
            <svg className="w-3.5 h-3.5 text-[#bf5af2]/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.214-.165c.993-.765 2.58-.765 3.574 0 .465.358.9.758 1.304 1.198a2.235 2.235 0 003.3-.435" />
            </svg>
            {formatSalary(salaryMin)} – {formatSalary(salaryMax)} {currency}
          </span>
        )}
      </div>

      {/* Footer Area */}
      <div className="flex items-center justify-between mt-auto">
        <Link
          href={`/jobs/${jobId}`}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#f5f5f7] hover:text-[#bf5af2] transition-colors relative group/link py-1"
        >
          <span className="relative">
            Apply Now
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#bf5af2] transition-all duration-300 group-hover/link:w-full" />
          </span>
          <svg 
            className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover/link:translate-x-1 text-[#86868b] group-hover/link:text-[#bf5af2]" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>

        {deadline && (
          <span className="text-[11px] text-[#636366] font-medium tracking-wide">
            Ends {formatDeadline(deadline)}
          </span>
        )}
      </div>
    </div>
  );
}