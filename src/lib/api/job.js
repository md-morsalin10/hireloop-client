import { serverFetch } from "../core/server";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL

export const getJobs = async () => {
   return serverFetch(`/api/jobs`);
}


export const getCompanyJobs = async (companyId, status = "active") => {
    const res = await fetch(`${API_URL}/api/jobs?companyId=${companyId}&status=${status}`);
    const data = await res.json();
    return data;
}