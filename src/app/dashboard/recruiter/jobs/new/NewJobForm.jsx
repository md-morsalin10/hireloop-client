"use client";

import React, { useState } from "react";
// HeroUI v3 Components
import { TextField, Input, TextArea, Select, Label, ListBox, Button, Switch } from "@heroui/react";
// Icons
import { FiBriefcase, FiDollarSign, FiMapPin, FiCalendar, FiChevronDown, FiAlertCircle, FiEye, FiLock } from "react-icons/fi";
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

    const isApproved = company?.status === "approved";

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isApproved) {
            toast.error("Your company is not approved to post jobs yet!");
            return;
        }

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
            companyId: company?._id,             
            companyName: company?.name || "",
            companyLogo: company?.logo || "",
            status: company?.status || "pending",
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
            loading(false);
        }

        if (isSuccess) {
            router.push("/dashboard/recruiter/jobs");
        }
    };

    const labelClass = "text-[11px] font-bold uppercase tracking-widest text-[#86868b] mb-1.5 block";
    const inputGroupClass = "w-full flex items-center px-3.5 bg-[#121214] border border-[#222226] focus-within:!border-[#bf5af2] focus-within:ring-1 focus-within:ring-[#bf5af2]/30 rounded-xl h-12 transition-all duration-200";
    const nativeInputClass = "w-full h-full bg-transparent text-[#f5f5f7] placeholder:text-[#48484a] text-sm outline-none border-none";
    const selectTriggerClass = "w-full flex items-center justify-between px-3.5 bg-[#121214] border border-[#222226] focus:border-[#bf5af2] rounded-xl h-12 text-left text-sm text-[#f5f5f7] transition-all outline-none";

    // =================IF NOT APPROVED: SHOW WARNING BOX ONLY =================
    if (!isApproved) {
        return (
            <div className="w-full max-w-2xl mx-auto bg-[#0a0a0c] border border-[#1a1a1e] rounded-[24px] shadow-[0_24px_60px_rgba(0,0,0,0.8)] overflow-hidden font-sans select-none my-12 p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 animate-pulse">
                    <FiLock className="text-2xl" />
                </div>
                
                <h2 className="text-xl font-bold tracking-tight text-white mb-2">Workspace Approval Required</h2>
                
                <p className="text-sm text-zinc-400 max-w-md mx-auto mb-4 leading-relaxed">
                    Your company workspace <span className="text-amber-400 font-semibold">({company?.name || "Pending Workspace"})</span> is currently <span className="text-amber-400 underline font-medium capitalize">{company?.status || "pending"}</span>.
                </p>
                
                <p className="text-xs text-zinc-500 max-w-sm mx-auto mb-8 leading-relaxed">
                    You cannot post any job offers until an administrator reviews and approves your workspace application.
                </p>

                <div className="flex gap-4">
                    <Button
                        type="button"
                        onClick={() => router.back()}
                        className="bg-transparent border border-[#222226] hover:bg-[#121214] text-zinc-400 hover:text-white rounded-xl px-6 h-11 text-xs font-semibold transition-colors duration-200"
                    >
                        Go Back
                    </Button>
                    <Button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-400 rounded-xl px-6 h-11 text-xs font-semibold transition-colors duration-200"
                    >
                        Check Status
                    </Button>
                </div>
            </div>
        );
    }

    // ================= IF APPROVED: RENDER FORM =================
    return (
        <div className="w-full max-w-4xl mx-auto bg-[#0a0a0c] border border-[#1a1a1e] rounded-[24px] shadow-[0_24px_60px_rgba(0,0,0,0.8)] overflow-hidden font-sans select-none my-8">

            {/* হেডার */}
            <div className="p-8 border-b border-[#1a1a1e] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Post a New Job</h1>
                    <p className="text-xs text-zinc-500 mt-1">
                        Workspace: <span className="text-zinc-300 font-medium">{company?.name || "Loading..."}</span>
                    </p>
                </div>
                
                {/* Status Badge */}
                <div className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border self-start sm:self-center capitalize bg-emerald-500/10 border-emerald-500/30 text-emerald-400">
                    Status: Approved
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-10">

                {/* ================= SECTION 1: JOB INFO ================= */}
                <div className="space-y-5">
                    <h3 className="text-xs font-bold tracking-widest text-[#bf5af2] uppercase flex items-center gap-2 pb-2 border-b border-[#1a1a1e]">
                        <FiBriefcase className="text-sm" /> Job Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                            <Label className={labelClass}>Job Category <span className="text-red-500/70">*</span></Label>
                            <Select placeholder="Select category" value={category} onChange={setCategory}>
                                <Select.Trigger className={selectTriggerClass}>
                                    <Select.Value />
                                    <Select.Indicator><FiChevronDown className="text-zinc-500" /></Select.Indicator>
                                </Select.Trigger>
                                <Select.Popover className="bg-[#121214] border border-[#222226] rounded-xl text-white shadow-xl">
                                    <ListBox className="p-1">
                                        <ListBox.Item id="technology" textValue="Technology" className="hover:bg-zinc-900 p-2.5 rounded-lg cursor-pointer text-sm text-zinc-300 hover:text-white">Technology</ListBox.Item>
                                        <ListBox.Item id="design" textValue="Design" className="hover:bg-zinc-900 p-2.5 rounded-lg cursor-pointer text-sm text-zinc-300 hover:text-white">Design</ListBox.Item>
                                        <ListBox.Item id="marketing" textValue="Marketing" className="hover:bg-zinc-900 p-2.5 rounded-lg cursor-pointer text-sm text-zinc-300 hover:text-white">Marketing</ListBox.Item>
                                        <ListBox.Item id="management" textValue="Management" className="hover:bg-zinc-900 p-2.5 rounded-lg cursor-pointer text-sm text-zinc-300 hover:text-white">Management</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col">
                            <Label className={labelClass}>Job Type <span className="text-red-500/70">*</span></Label>
                            <Select placeholder="Select job type" value={jobType} onChange={setJobType}>
                                <Select.Trigger className={selectTriggerClass}>
                                    <Select.Value />
                                    <Select.Indicator><FiChevronDown className="text-zinc-500" /></Select.Indicator>
                                </Select.Trigger>
                                <Select.Popover className="bg-[#121214] border border-[#222226] rounded-xl text-white shadow-xl">
                                    <ListBox className="p-1">
                                        <ListBox.Item id="Full-time" textValue="Full-time" className="hover:bg-zinc-900 p-2.5 rounded-lg cursor-pointer text-sm text-zinc-300 hover:text-white">Full-time</ListBox.Item>
                                        <ListBox.Item id="Part-time" textValue="Part-time" className="hover:bg-zinc-900 p-2.5 rounded-lg cursor-pointer text-sm text-zinc-300 hover:text-white">Part-time</ListBox.Item>
                                        <ListBox.Item id="Remote" textValue="Remote" className="hover:bg-zinc-900 p-2.5 rounded-lg cursor-pointer text-sm text-zinc-300 hover:text-white">Remote</ListBox.Item>
                                        <ListBox.Item id="Contract" textValue="Contract" className="hover:bg-zinc-900 p-2.5 rounded-lg cursor-pointer text-sm text-zinc-300 hover:text-white">Contract</ListBox.Item>
                                        <ListBox.Item id="Internship" textValue="Internship" className="hover:bg-zinc-900 p-2.5 rounded-lg cursor-pointer text-sm text-zinc-300 hover:text-white">Internship</ListBox.Item>
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
                                    className={`${nativeInputClass} scheme-dark cursor-pointer text-zinc-300`}
                                />
                                <FiCalendar className="text-zinc-500 ml-2 pointer-events-none" />
                            </div>
                        </TextField>
                    </div>
                </div>

                {/* ================= SECTION 2: SALARY & LOCATION ================= */}
                <div className="space-y-5">
                    <h3 className="text-xs font-bold tracking-widest text-[#bf5af2] uppercase flex items-center gap-2 pb-2 border-b border-[#1a1a1e]">
                        <FiDollarSign className="text-sm" /> Salary & Position Location
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                            <Label className={labelClass}>Currency <span className="text-red-500/70">*</span></Label>
                            <Select placeholder="USD" value={currency} onChange={setCurrency}>
                                <Select.Trigger className={selectTriggerClass}>
                                    <Select.Value />
                                    <Select.Indicator><FiChevronDown className="text-zinc-500" /></Select.Indicator>
                                </Select.Trigger>
                                <Select.Popover className="bg-[#121214] border border-[#222226] rounded-xl text-white shadow-xl">
                                    <ListBox className="p-1">
                                        <ListBox.Item id="USD" textValue="USD ($)" className="hover:bg-zinc-900 p-2.5 rounded-lg cursor-pointer text-sm text-zinc-300 hover:text-white">USD ($)</ListBox.Item>
                                        <ListBox.Item id="EUR" textValue="EUR (€)" className="hover:bg-zinc-900 p-2.5 rounded-lg cursor-pointer text-sm text-zinc-300 hover:text-white">EUR (€)</ListBox.Item>
                                        <ListBox.Item id="BDT" textValue="BDT (৳)" className="hover:bg-zinc-900 p-2.5 rounded-lg cursor-pointer text-sm text-zinc-300 hover:text-white">BDT (৳)</ListBox.Item>
                                        <ListBox.Item id="GBP" textValue="GBP (£)" className="hover:bg-zinc-900 p-2.5 rounded-lg cursor-pointer text-sm text-zinc-300 hover:text-white">GBP (£)</ListBox.Item>
                                    </ListBox>
                                </Select.Popover>
                            </Select>
                        </div>
                    </div>

                    {/* Location & Remote Switch Row */}
                    <div className="flex flex-col md:flex-row items-start md:items-end gap-6 bg-[#121214] p-5 rounded-2xl border border-[#222226]">
                        <div className="flex-1 w-full">
                            <TextField isRequired={!isRemote}>
                                <Label className={labelClass}>Location Base</Label>
                                <div className={`${inputGroupClass} ${isRemote ? "opacity-30 bg-[#161619] border-[#1c1c1f]" : ""}`}>
                                    <FiMapPin className="text-zinc-500 mr-2" />
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
                                    <span className="text-sm font-medium text-zinc-300 ml-2 cursor-pointer select-none">
                                        Remote-friendly Job
                                    </span>
                                </Switch.Content>
                            </Switch>
                        </div>
                    </div>
                </div>

                {/* ================= SECTION 3: JOB DESCRIPTION ================= */}
                <div className="space-y-5">
                    <h3 className="text-xs font-bold tracking-widest text-[#bf5af2] uppercase flex items-center gap-2 pb-2 border-b border-[#1a1a1e]">
                        <FiEye className="text-sm" /> Job Content & Details
                    </h3>

                    <TextField isRequired>
                        <Label className={labelClass}>Job Description</Label>
                        <div className="w-full bg-[#121214] border border-[#222226] focus-within:!border-[#bf5af2] focus-within:ring-1 focus-within:ring-[#bf5af2]/30 rounded-xl p-3.5 transition-all duration-200">
                            <TextArea
                                name="description"
                                placeholder="Provide a general high-level overview of the job role and department expectations..."
                                rows={4}
                                className="w-full bg-transparent text-[#f5f5f7] placeholder:text-[#48484a] text-sm outline-none resize-y min-h-[80px]"
                            />
                        </div>
                    </TextField>

                    <TextField isRequired>
                        <Label className={labelClass}>Responsibilities</Label>
                        <div className="w-full bg-[#121214] border border-[#222226] focus-within:!border-[#bf5af2] focus-within:ring-1 focus-within:ring-[#bf5af2]/30 rounded-xl p-3.5 transition-all duration-200">
                            <TextArea
                                name="responsibilities"
                                placeholder="List core day-to-day responsibilities (preferably one statement per line)..."
                                rows={4}
                                className="w-full bg-transparent text-[#f5f5f7] placeholder:text-[#48484a] text-sm outline-none resize-y min-h-[80px]"
                            />
                        </div>
                    </TextField>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <TextField isRequired>
                            <Label className={labelClass}>Core Requirements</Label>
                            <div className="w-full bg-[#121214] border border-[#222226] focus-within:!border-[#bf5af2] focus-within:ring-1 focus-within:ring-[#bf5af2]/30 rounded-xl p-3.5 transition-all duration-200">
                                <TextArea
                                    name="requirements"
                                    placeholder="Required skills, experience frameworks, degrees..."
                                    rows={4}
                                    className="w-full bg-transparent text-[#f5f5f7] placeholder:text-[#48484a] text-sm outline-none resize-y min-h-[80px]"
                                />
                            </div>
                        </TextField>

                        <TextField>
                            <Label className={labelClass}>Benefits & Perks (Optional)</Label>
                            <div className="w-full bg-[#121214] border border-[#222226] focus-within:!border-[#bf5af2] focus-within:ring-1 focus-within:ring-[#bf5af2]/30 rounded-xl p-3.5 transition-all duration-200">
                                <TextArea
                                    name="benefits"
                                    placeholder="e.g., Global remote allowances, Health coverage, Learning budget..."
                                    rows={4}
                                    className="w-full bg-transparent text-[#f5f5f7] placeholder:text-[#48484a] text-sm outline-none resize-y min-h-[80px]"
                                />
                            </div>
                        </TextField>
                    </div>
                </div>

                {/* ================= FOOTER / ACTION BUTTONS ================= */}
                <div className="pt-6 border-t border-[#1a1a1e] flex justify-end gap-4">
                    <Button
                        type="button"
                        onClick={() => router.back()}
                        className="bg-transparent border border-[#222226] hover:bg-[#121214] text-zinc-400 hover:text-white rounded-xl px-6 h-12 text-xs font-semibold transition-colors duration-200"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="font-semibold text-xs rounded-xl px-8 h-12 transition-all duration-250 bg-[#bf5af2] hover:bg-[#ac49dc] text-white shadow-[0_4px_24px_rgba(191,90,242,0.25)] active:scale-[0.98]"
                    >
                        {loading ? "Publishing Job..." : "Publish Job"}
                    </Button>
                </div>

            </form>
        </div>
    );
}