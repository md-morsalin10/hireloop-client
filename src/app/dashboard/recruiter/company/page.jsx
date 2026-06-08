import React from 'react';
import MyCompany from './MyCompany';
import { getUserSeason } from '@/lib/core/session';
import { getRecruiterCompany } from '@/lib/api/company';

const CompanyPage = async () => {
    const user = await getUserSeason();
    const company = await getRecruiterCompany(user?.id);
    // console.log(user);
    return (
        <div>
            <MyCompany recruiter={user} recruiterCompany={company} />
        </div>
    );
};

export default CompanyPage;