"use client";

import React, { useState } from "react";
// HeroUI v3 Components
import { TextField, Input, TextArea, Select, Label, ListBox, Button, Switch } from "@heroui/react";
// Icons
import { FiBriefcase, FiDollarSign, FiMapPin, FiCalendar, FiClock, FiChevronDown, FiAlertCircle } from "react-icons/fi";
import { createJob } from "@/lib/action/jobs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"; 

export default function NewJobForm({ company }) {
    console.log("Logged in Recruiter's Company:", company);
    const router = useRouter(); 

    const [isRemote, setIsRemote] = useState(false);
    const [loading, setLoading] = useState(false);

    // সিলেক্টেড স্টেটের জন্য ভ্যালু
    const [category, setCategory] = useState("");
    const [jobType, setJobType] = useState("");
    const [currency, setCurrency] = useState("USD");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // কোম্পানি পেন্ডিং বা অ্যাপ্রুভড না থাকলে অ্যালার্ট বা টোস্ট দেখাবে
        // if (company?.status !== "approved") {
        //     toast.error("Your company is not approved to post jobs yet! Current status: " + (company?.status || "unknown"));
        //     return;
        // }

        // লগইনড রিক্রুটারের কোম্পানির আইডি না থাকলে ব্যাকএন্ডে সাবমিট করতে দিবে না
        // if (!company?._id) {
        //     toast.error("No associated company found for your account!");
        //     return;
        // }

        setLoading(true);
        const formData = new FormData(e.target);

        const jobData = {
            title: formData.get("jobTitle")?.trim(),
            category: category,
            type: jobType,
            salaryMin: formData.get("salaryMin"),
            salaryMax: formData.get("salaryMax"),
            currency: currency,
            location: isRemote ? "Remote" : formData.get("location")?.trim(),
            deadline: formData.get("deadline"),
            description: formData.get("description")?.trim(),
            responsibilities: formData.get("responsibilities")?.trim(),
            requirements: formData.get("requirements")?.trim(),
            benefits: formData.get("benefits")?.trim(),
            companyId: company._id,             
            companyName: company?.name || "",
            companyLogo: company?.logo || "",
            status: "active",
            isPublic: true,
        };

        let isSuccess = false;

        try {
            const res = await createJob(jobData);

            if (res?.insertedId || res) {
                toast.success("Job posted successfully!");
                e.target.reset();
                setCategory("");
                setJobType("");
                setCurrency("USD");
                setIsRemote(false);
                isSuccess = true; 
            } else {
                toast.error("Failed to post job. Please try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }

        if (isSuccess) {
            router.push("/dashboard/recruiter/jobs");
        }
    };

    const labelClass = "text-gray-400 font-medium text-[13px] mb-1 font-sans block";
    const inputGroupClass = "w-full flex items-center px-3 bg-[#1A1A1A] border border-white/5 hover:border-white/10 focus-within:!border-white/20 rounded-xl h-12 transition-all";
    const nativeInputClass = "w-full h-full bg-transparent text-white placeholder:text-gray-600 text-[14px] outline-none border-none";
    const selectTriggerClass = "w-full flex items-center justify-between px-3 bg-[#1A1A1A] border border-white/5 hover:border-white/10 rounded-xl h-12 text-left text-[14px] text-white transition-all outline-none focus:border-white/20";

    return (
        <div className="w-full max-w-4xl mx-auto bg-[#121212] border border-white/5 rounded-2xl overflow-hidden font-sans select-none my-6">

            {/* হেডার */}
            <div className="p-6 border-b border-white/5">
                <h1 className="text-xl font-semibold tracking-wide text-white">Post a New Job</h1>
                <p className="text-xs text-gray-500 mt-1">
                    Posting as: <span className="text-gray-300 font-medium">{company?.name || "Loading..."}</span>
                </p>
            </div>

            {/* কোম্পানি স্ট্যাটাস পেন্ডিং হলে ওয়ার্নিং নোটিশ */}
            {company && company.status !== "approved" && (
                <div className="mx-6 mt-6 flex items-center gap-3 bg-amber-500/5 border border-amber-500/10 text-amber-500/80 p-3.5 rounded-xl text-xs">
                    <FiAlertCircle className="text-sm shrink-0" />
                    <span>Your company workspace is current <strong>{company.status}</strong>. You can draft the form, but publishing requires active admin approval.</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="p-6 space-y-8">

                {/* ================= SECTION 1: JOB INFO ================= */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase flex items-center gap-2">
                        <FiBriefcase /> Job Info
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField isRequired>
                            <Label className={labelClass}>Job Title</Label>
                            <div className={inputGroupClass}>
                                <Input
                                    name="jobTitle"
                                    placeholder="e.g. Senior Frontend Engineer"
                                    className={nativeInputClass}
                                />
                            </div>
                        </TextField>

                        <div className="flex flex-col">
                            <Label className={labelClass}>Job Category <span className="text-red-500">*</span></Label>
                            <Select placeholder="Select category" value={category} onChange={setCategory}>
                                <Select.Trigger className={selectTriggerClass}>
                                    <Select.Value />
                                    <Select.Indicator><FiChevronDown className="text-gray-500" /></Select.Indicator>
                                </Select.Trigger>
                                <Select.Popover className="bg-[#1A1A1A] border border-white/5 rounded-xl text-white">
                                    <ListBox>
                                        <ListBox.Item id="technology" textValue="Technology" className="hover:bg-white/5 p-2 rounded-lg cursor-pointer text-sm">Technology</ListBox.Item>
                                        <ListBox.Item id="design" textValue="Design" className="hover:bg-white/5 p-2 rounded-lg cursor-pointer text-sm">Design</ListBox.Item>
                                        <ListBox.Item id="marketing" textValue="Marketing" className="hover:bg-white/5 p-2 rounded-lg cursor-pointer text-sm">Marketing</ListBox.Item>
                                        <ListBox.Item id="management" textValue="Management" className="hover:bg-white/5 p-2 rounded-lg cursor-pointer text-sm">Management</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <Label className={labelClass}>Job Type <span className="text-red-500">*</span></Label>
                            <Select placeholder="Select job type" value={jobType} onChange={setJobType}>
                                <Select.Trigger className={selectTriggerClass}>
                                    <Select.Value />
                                    <Select.Indicator><FiChevronDown className="text-gray-500" /></Select.Indicator>
                                </Select.Trigger>
                                <Select.Popover className="bg-[#1A1A1A] border border-white/5 rounded-xl text-white">
                                    <ListBox>
                                        <ListBox.Item id="Full-time" textValue="Full-time" className="hover:bg-white/5 p-2 rounded-lg cursor-pointer text-sm">Full-time</ListBox.Item>
                                        <ListBox.Item id="Part-time" textValue="Part-time" className="hover:bg-white/5 p-2 rounded-lg cursor-pointer text-sm">Part-time</ListBox.Item>
                                        <ListBox.Item id="Remote" textValue="Remote" className="hover:bg-white/5 p-2 rounded-lg cursor-pointer text-sm">Remote</ListBox.Item>
                                        <ListBox.Item id="Contract" textValue="Contract" className="hover:bg-white/5 p-2 rounded-lg cursor-pointer text-sm">Contract</ListBox.Item>
                                        <ListBox.Item id="Internship" textValue="Internship" className="hover:bg-white/5 p-2 rounded-lg cursor-pointer text-sm">Internship</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>

                        <TextField isRequired>
                            <Label className={labelClass}>Application Deadline</Label>
                            <div className={inputGroupClass}>
                                <Input
                                    name="deadline"
                                    type="date"
                                    className={`${nativeInputClass} scheme-dark`}
                                />
                                <FiCalendar className="text-gray-500 ml-2 pointer-events-none" />
                            </div>
                        </TextField>
                    </div>
                </div>

                {/* ================= SECTION 2: SALARY & LOCATION ================= */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase flex items-center gap-2">
                        <FiDollarSign /> Salary & Location
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <TextField isRequired>
                            <Label className={labelClass}>Min Salary</Label>
                            <div className={inputGroupClass}>
                                <Input
                                    name="salaryMin"
                                    type="number"
                                    placeholder="e.g. 40000"
                                    className={nativeInputClass}
                                />
                            </div>
                        </TextField>

                        <TextField isRequired>
                            <Label className={labelClass}>Max Salary</Label>
                            <div className={inputGroupClass}>
                                <Input
                                    name="salaryMax"
                                    type="number"
                                    placeholder="e.g. 70000"
                                    className={nativeInputClass}
                                />
                            </div>
                        </TextField>

                        <div className="flex flex-col">
                            <Label className={labelClass}>Currency <span className="text-red-500">*</span></Label>
                            <Select placeholder="USD" value={currency} onChange={setCurrency}>
                                <Select.Trigger className={selectTriggerClass}>
                                    <Select.Value />
                                    <Select.Indicator><FiChevronDown className="text-gray-500" /></Select.Indicator>
                                </Select.Trigger>
                                <Select.Popover className="bg-[#1A1A1A] border border-white/5 rounded-xl text-white">
                                    <ListBox>
                                        <ListBox.Item id="USD" textValue="USD ($)" className="hover:bg-white/5 p-2 rounded-lg cursor-pointer text-sm">USD ($)</ListBox.Item>
                                        <ListBox.Item id="EUR" textValue="EUR (€)" className="hover:bg-white/5 p-2 rounded-lg cursor-pointer text-sm">EUR (€)</ListBox.Item>
                                        <ListBox.Item id="BDT" textValue="BDT (৳)" className="hover:bg-white/5 p-2 rounded-lg cursor-pointer text-sm">BDT (৳)</ListBox.Item>
                                        <ListBox.Item id="GBP" textValue="GBP (£)" className="hover:bg-white/5 p-2 rounded-lg cursor-pointer text-sm">GBP (£)</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>
                    </div>

                    {/* Location & Remote Switch Row */}
                    <div className="flex flex-col md:flex-row items-start md:items-end gap-6 bg-[#161616] p-4 rounded-xl border border-white/5">
                        <div className="flex-1 w-full">
                            <TextField isRequired={!isRemote}>
                                <Label className={labelClass}>Location</Label>
                                <div className={`${inputGroupClass} ${isRemote ? "opacity-40 pointer-events-none bg-zinc-900" : ""}`}>
                                    <FiMapPin className="text-gray-500 mr-2" />
                                    <Input
                                        name="location"
                                        placeholder="City, Country"
                                        value={isRemote ? "Remote" : undefined}
                                        disabled={isRemote}
                                        className={nativeInputClass}
                                    />
                                </div>
                            </TextField>
                        </div>

                        {/* Switch Toggle */}
                        <div className="h-12 flex items-center pb-1">
                            <Switch
                                isSelected={isRemote}
                                aria-label="Toggle Remote Job"
                                className="cursor-pointer"
                            >
                                <Switch.Control onClick={() => setIsRemote(!isRemote)}>
                                    <Switch.Thumb />
                                </Switch.Control>
                                <Switch.Content onClick={() => setIsRemote(!isRemote)}>
                                    <span className="text-sm font-medium text-gray-300 ml-2 cursor-pointer select-none">
                                        Remote Job
                                    </span>
                                </Switch.Content>
                            </Switch>
                        </div>
                    </div>
                </div>

                {/* ================= SECTION 3: JOB DESCRIPTION ================= */}
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase flex items-center gap-2">
                        <FiClock /> Detailed Content
                    </h3>

                    <TextField isRequired>
                        <Label className={labelClass}>Job Description</Label>
                        <div className="w-full bg-[#1A1A1A] border border-white/5 hover:border-white/10 focus-within:!border-white/20 rounded-xl p-3 transition-all">
                            <TextArea
                                name="description"
                                placeholder="Provide a general overview of the job role..."
                                rows={3}
                                className="w-full bg-transparent text-white placeholder:text-gray-600 text-[14px] outline-none resize-y"
                            />
                        </div>
                    </TextField>

                    <TextField isRequired>
                        <Label className={labelClass}>Responsibilities</Label>
                        <div className="w-full bg-[#1A1A1A] border border-white/5 hover:border-white/10 focus-within:!border-white/20 rounded-xl p-3 transition-all">
                            <TextArea
                                name="responsibilities"
                                placeholder="List day-to-day responsibilities (one per line)..."
                                rows={3}
                                className="w-full bg-transparent text-white placeholder:text-gray-600 text-[14px] outline-none resize-y"
                            />
                        </div>
                    </TextField>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TextField isRequired>
                            <Label className={labelClass}>Requirements</Label>
                            <div className="w-full bg-[#1A1A1A] border border-white/5 hover:border-white/10 focus-within:!border-white/20 rounded-xl p-3 transition-all">
                                <TextArea
                                    name="requirements"
                                    placeholder="Required skills, experience, degrees..."
                                    rows={3}
                                    className="w-full bg-transparent text-white placeholder:text-gray-600 text-[14px] outline-none resize-y"
                                />
                            </div>
                        </TextField>

                        <TextField>
                            <Label className={labelClass}>Benefits (Optional)</Label>
                            <div className="w-full bg-[#1A1A1A] border border-white/5 hover:border-white/10 focus-within:!border-white/20 rounded-xl p-3 transition-all">
                                <TextArea
                                    name="benefits"
                                    placeholder="e.g. Health insurance, Remote allowance..."
                                    rows={3}
                                    className="w-full bg-transparent text-white placeholder:text-gray-600 text-[14px] outline-none resize-y"
                                />
                            </div>
                        </TextField>
                    </div>
                </div>

                {/* ================= FOOTER / ACTION BUTTONS ================= */}
                <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
                    <Button
                        type="button"
                        onClick={() => router.back()}
                        className="bg-transparent border border-white/5 hover:border-white/10 text-gray-300 rounded-xl px-6 h-11 text-xs font-semibold"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        isLoading={loading}
                        className="bg-white text-black font-semibold text-xs rounded-xl px-8 h-11 hover:bg-gray-200 transition-colors"
                    >
                        Publish Job
                    </Button>
                </div>

            </form>
        </div>
    );
}