import React from 'react';
import NewJobForm from './NewJobForm';
import { getLoggedInRecruiterCompany } from '@/lib/api/company';

const NewJobPage = async () => {
    const company = await getLoggedInRecruiterCompany();
    return (
        <div>
            <NewJobForm company={company} />
        </div>
    );
};

export default NewJobPage;