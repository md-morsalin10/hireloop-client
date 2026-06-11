import JobCard from "@/components/Jobs/JobCard";
import JobFilter from "@/components/Jobs/JobFilter";
import { getJobs } from "@/lib/api/job";

export default async function JobList({ searchParams }) {
  // ১. এপিআই থেকে রিয়েল ডাটা ফেচ করা
  const jobs = await getJobs();

  // ২. Next.js-এর নতুন ভার্সনে searchParams এসিঙ্ক হওয়ায় এটি রিজলভ করে নেওয়া হলো
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams?.search || "";
  const type = resolvedSearchParams?.type || "";
  const location = resolvedSearchParams?.location || "";

  // ৩. ডাটা ফিল্টারিং লজিক
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      !search ||
      job.title?.toLowerCase().includes(search.toLowerCase()) ||
      job.companyName?.toLowerCase().includes(search.toLowerCase());

    const matchesType = !type || job.type === type;

    const matchesLocation = !location || job.location?.toLowerCase().includes(location.toLowerCase());

    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-black py-20 p-8 flex flex-col items-center">
      <h2 className="text-white text-3xl font-bold mb-8 tracking-tight">
        Available Jobs
      </h2>

      {/* ফিল্টার কম্পোনেন্ট রেন্ডার */}
      <JobFilter />
      
      {/* জবের গ্রিড লেআউট */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full justify-items-center">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job._id?.["$oid"] || job._id} job={job} />
          ))
        ) : (
          <div className="col-span-full py-16 flex flex-col items-center justify-center gap-2">
            <p className="text-[#86868b] text-base">No jobs found matching your criteria.</p>
            <p className="text-sm text-[#636366]">Try refining your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}