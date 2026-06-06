import { getCompanyJobs } from '@/lib/api/job';
import React from 'react';
import { Chip, Table, Button, Tooltip } from "@heroui/react";
// অ্যাকশন বাটনের জন্য আইকন ইম্পোর্ট
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

const RecruiterJobs = async () => {
    const companyId = "comp_02"; // Actual company ID থেকে লোড হচ্ছে
    const jobs = await getCompanyJobs(companyId);

    // স্ট্যাটাস অনুযায়ী চিপের কালার সেট করার হেল্পার ফাংশন
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "active":
                return "success";
            case "inactive":
                return "danger";
            default:
                return "warning";
        }
    };

    return (
        <div className="p-6 space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-white">Manage All Jobs</h2>
                <p className="text-sm text-gray-400">Total Jobs: {jobs?.length || 0}</p>
            </div>

            <Table>
                <Table.ResizableContainer>
                    <Table.Content aria-label="Company jobs management table" className="min-w-[700px]">
                        <Table.Header>
                            <Table.Column isRowHeader defaultWidth="2fr" id="title" minWidth={200}>
                                Job Title
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1.2fr" id="type" minWidth={120}>
                                Type / Category
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1.5fr" id="salary" minWidth={150}>
                                Salary Range
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1.2fr" id="deadline" minWidth={130}>
                                Deadline
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="status" minWidth={100}>
                                Status
                                <Table.ColumnResizer />
                            </Table.Column>
                            <Table.Column defaultWidth="1fr" id="actions" minWidth={120}>
                                Actions
                            </Table.Column>
                        </Table.Header>

                        <Table.Body emptyContent={"No jobs found for this company."}>
                            {jobs && jobs.map((job) => (
                                <Table.Row key={job._id || job._id?.$oid}>
                                    {/* ১. জব টাইটেল এবং লোকেশন */}
                                    <Table.Cell>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-white">{job.title || job.jobTitle}</span>
                                            <span className="text-xs text-gray-400">{job.location}</span>
                                        </div>
                                    </Table.Cell>

                                    {/* ২. টাইপ এবং ক্যাটাগরি */}
                                    <Table.Cell>
                                        <div className="flex flex-col">
                                            <span className="text-sm capitalize text-gray-200">{job.type || job.jobType}</span>
                                            <span className="text-xs text-gray-400 capitalize">{job.category || job.jobCategory}</span>
                                        </div>
                                    </Table.Cell>

                                    {/* ৩. সেলারি রেঞ্জ */}
                                    <Table.Cell>
                                        <span className="text-sm text-gray-200">
                                            {job.salaryMin || job.minSalary} - {job.salaryMax || job.maxSalary} {job.currency}
                                        </span>
                                    </Table.Cell>

                                    {/* ৪. ডেডলাইন */}
                                    <Table.Cell>
                                        <span className="text-sm text-gray-300">{job.deadline}</span>
                                    </Table.Cell>

                                    {/* ৫. স্ট্যাটাস চিপ */}
                                    <Table.Cell>
                                        <Chip 
                                            color={getStatusColor(job.status)} 
                                            size="sm" 
                                            variant="soft"
                                            className="capitalize"
                                        >
                                            {job.status || "Active"}
                                        </Chip>
                                    </Table.Cell>

                                    {/* ৬. অ্যাকশন বাটন গ্রুপ */}
                                    <Table.Cell>
                                        <div className="flex items-center gap-2">
                                            <Tooltip content="Details">
                                                <Button isIconOnly size="sm" variant="light" className="text-gray-400 hover:text-white">
                                                    <FiEye size={16} />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip content="Edit Job">
                                                <Button isIconOnly size="sm" variant="light" className="text-blue-400 hover:text-blue-500">
                                                    <FiEdit2 size={16} />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip content="Delete Job">
                                                <Button isIconOnly size="sm" variant="light" className="text-danger hover:text-red-500">
                                                    <FiTrash2 size={16} />
                                                </Button>
                                            </Tooltip>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ResizableContainer>
            </Table>
        </div>
    );
};

export default RecruiterJobs;