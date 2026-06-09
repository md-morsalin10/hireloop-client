import JobCard from "@/components/Jobs/JobCard";
import { getJobs } from "@/lib/api/job";


export default async function JobList() {
  
  const jobs = await getJobs();
  return (
    <div className="min-h-screen bg-black py-30 p-8 flex flex-col items-center">
      <h2 className="text-white text-3xl font-bold mb-8 tracking-tight">
        Available Jobs
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full justify-items-center">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
}