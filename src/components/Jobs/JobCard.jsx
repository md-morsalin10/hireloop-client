'use client';
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
    companyLogo, // optional — থাকলে directly use করব
    deadline,
    status,
  } = job;

  const formatSalary = (amt) =>
    amt ? Number(amt).toLocaleString() : "";

  const jobId = _id?.["$oid"] || _id;

  // Logo URL — আগে companyLogo দেখব, না থাকলে Clearbit
  const logoUrl =
    companyLogo ||
    (company
      ? `https://logo.clearbit.com/${getCompanyDomain(company)}`
      : null);

  const initials = company
    ? company.slice(0, 2).toUpperCase()
    : "CO";

  const formatDeadline = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="relative w-full max-w-[400px] rounded-[24px] bg-[#0e0e10] border border-[#252528] p-7 overflow-hidden transition-all duration-300 group hover:border-[#bf5af2]/35 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(191,90,242,0.08)]">
      {/* Top shimmer */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#bf5af2]/45 to-transparent" />

      {/* Company Row */}
      <div className="flex items-center gap-2.5 mb-4">
        {logoUrl ? (
          <div className="w-[30px] h-[30px] rounded-lg bg-white border border-[#2e2e32] flex items-center justify-center overflow-hidden shrink-0 p-[3px]">
            <img
              src={logoUrl}
              alt={company}
              className="w-full h-full object-contain"
              onError={(e) => {
                // Clearbit fail করলে initials দেখাও
                e.currentTarget.parentElement.outerHTML = `
                  <div class="w-[30px] h-[30px] rounded-lg bg-[#1e1e22] border border-[#2e2e32] flex items-center justify-center shrink-0">
                    <span class="text-[10px] font-bold text-[#bf5af2]">${initials}</span>
                  </div>`;
              }}
            />
          </div>
        ) : (
          <div className="w-[30px] h-[30px] rounded-lg bg-[#1e1e22] border border-[#2e2e32] flex items-center justify-center shrink-0">
            <span className="text-[10px] font-bold text-[#bf5af2]">{initials}</span>
          </div>
        )}

        <span className="text-[11px] font-semibold tracking-[0.08em] text-[#5c5c66] uppercase">
          {company}
        </span>

        {status === "active" && (
          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#32d583] shadow-[0_0_6px_rgba(50,213,131,0.5)] shrink-0" />
        )}
      </div>

      {/* Title */}
      <h3 className="text-[20px] font-semibold text-[#f0f0f5] leading-snug tracking-[-0.02em] mb-2.5 group-hover:text-white transition-colors duration-200">
        {title}
      </h3>

      {/* Description */}
      <p className="text-[13px] leading-relaxed text-[#5c5c66] line-clamp-2 mb-5">
        {description}
      </p>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-[#1e1e22] via-[#2a2a2e] to-[#1e1e22] mb-5" />

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium bg-[#bf5af2]/[0.06] border border-[#bf5af2]/20 text-[#bf5af2]">
          <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
          </svg>
          {location}
        </span>

        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium bg-[#32d583]/[0.06] border border-[#32d583]/20 text-[#32d583]">
          <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
          </svg>
          {type}
        </span>

        {salaryMin && salaryMax && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium bg-[#e5c000]/[0.06] border border-[#e5c000]/20 text-[#e5c000]">
            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.214-.165c.993-.765 2.58-.765 3.574 0" />
            </svg>
            {formatSalary(salaryMin)} – {formatSalary(salaryMax)} {currency}
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <Link
          href={`/jobs/${jobId}`}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#bf5af2]/10 border border-[#bf5af2]/25 text-[#bf5af2] text-[13px] font-semibold tracking-[0.01em] hover:bg-[#bf5af2]/18 hover:border-[#bf5af2]/45 hover:-translate-y-px transition-all duration-200 group/btn"
        >
          Apply Now
          <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>

        {deadline && (
          <span className="text-[11px] text-[#3c3c42] font-medium">
            Deadline: {formatDeadline(deadline)}
          </span>
        )}
      </div>
    </div>
  );
}