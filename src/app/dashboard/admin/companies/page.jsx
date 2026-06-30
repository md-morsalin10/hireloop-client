import { getCompanies } from '@/lib/api/company';
import React from 'react';

const AdminCompaniesPage = async() => {
    const companies = await getCompanies()
    return (
        <div>
            Admin Companies{companies.length}
        </div>
    );
};

export default AdminCompaniesPage;