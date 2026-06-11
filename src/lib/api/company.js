
import { serverFetch } from "../core/server";
import { getUserSeason } from "../core/session";

export const getRecruiterCompany = async (recruiterId) => {
    return  serverFetch(`/api/my/companies?recruiterId=${recruiterId}`);
}


export const getLoggedInRecruiterCompany = async () => {
    const user = await getUserSeason();
    return getRecruiterCompany(user?.id);
}