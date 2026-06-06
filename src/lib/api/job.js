
const API_URL = process.env.NEXT_PUBLIC_BASE_URL
export const getCompanyJobs = async (companyId, status = "active") => {
    const res = await fetch(`${API_URL}/api/jobs?companyId=${companyId}&status=${status}`);
    const data = await res.json();
    return data;
}