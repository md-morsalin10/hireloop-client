"use client";

import React, { useState, useEffect } from "react";
import { TextField, Input, TextArea, Select, Label, ListBox, Button } from "@heroui/react";
import { FiBriefcase, FiGlobe, FiMapPin, FiUsers, FiEdit3, FiPlusCircle, FiChevronDown, FiAlertCircle, FiImage } from "react-icons/fi";
import toast from "react-hot-toast";

export default function MyCompany() {
    // 🏢 বাই-ডিফল্ট এটি null থাকবে (কারণ নতুন ইউজারের কোনো কোম্পানি থাকে না)
    const [company, setCompany] = useState(null); 
    
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true); // ব্যাকএন্ড থেকে ডেটা লোড হওয়ার স্টেট
    
    const [industry, setIndustry] = useState("");
    const [employeeCount, setEmployeeCount] = useState("");

    // 🔄 ১. ব্যাকএন্ড থেকে কোম্পানির ডেটা ফেচ করার ইফেক্ট
    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                // আপনার API এন্ডপয়েন্ট অনুযায়ী এখানে কল হবে
                // const res = await fetch("/api/recruiter/my-company");
                // const data = await res.json();
                
                // যদি ব্যাকএন্ডে কোম্পানি ডাটা পায়:
                // setCompany(data); 
                
                // ডেমো টেস্টের জন্য এটিকে আপাতত null রাখছি
                setCompany(null); 
            } catch (error) {
                console.error("Error fetching company:", error);
            } finally {
                setPageLoading(false);
            }
        };

        fetchCompanyData();
    }, []);

    // ফর্ম ওপেন করার লজিক
    const handleOpenEdit = () => {
        if (company) {
            setIndustry(company.industry);
            setEmployeeCount(company.employeeCount);
        } else {
            setIndustry("");
            setEmployeeCount("");
        }
        setIsEditing(true);
    };

    // 📨 ২. সাবমিট হ্যান্ডলার (ডাটাবেজে পাঠানো বা আপডেট করার জন্য)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const companyData = {
            name: formData.get("companyName"),
            industry: industry,
            websiteUrl: formData.get("websiteUrl"),
            location: formData.get("location"),
            employeeCount: employeeCount,
            logo: formData.get("logoUrl") || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150", 
            description: formData.get("description"),
            status: "pending" // নতুন বা এডিটেড কোম্পানি সবসময় প্রথমে 'pending' থাকবে
        };

        try {
            // 🌐 এখানে আপনার Axios বা Fetch মেথড বসবে:
            // const url = company ? "/api/recruiter/my-company/update" : "/api/recruiter/my-company/register";
            // const method = company ? "PUT" : "POST";
            // await fetch(url, { method, body: JSON.stringify(companyData) });

            setCompany(companyData); // স্টেট আপডেট
            toast.success(company ? "Company profile updated!" : "Company registered successfully!");
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "approved": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
            case "rejected": return "bg-rose-500/10 text-rose-400 border-rose-500/20";
            default: return "bg-amber-500/10 text-amber-400 border-amber-500/20"; 
        }
    };

    const labelClass = "text-gray-400 font-medium text-[13px] mb-1 font-sans block";
    const inputGroupClass = "w-full flex items-center px-3 bg-[#1A1A1A] border border-white/5 hover:border-white/10 focus-within:!border-white/20 rounded-xl h-12 transition-all";
    const nativeInputClass = "w-full h-full bg-transparent text-white placeholder:text-gray-600 text-[14px] outline-none border-none";
    const selectTriggerClass = "w-full flex items-center justify-between px-3 bg-[#1A1A1A] border border-white/5 hover:border-white/10 rounded-xl h-12 text-left text-[14px] text-white transition-all outline-none focus:border-white/20";

    // ব্যাকএন্ড থেকে ডেটা আসার আগ পর্যন্ত লোড প্রিভিউ
    if (pageLoading) {
        return <div className="text-center text-gray-500 my-12 font-sans">Loading corporate profile...</div>;
    }

    // -----------------------------------------------------------------
    // ১. কোম্পানি না থাকলে: "No Company Registered" প্রম্পট শো করবে
    // -----------------------------------------------------------------
    if (!company && !isEditing) {
        return (
            <div className="w-full max-w-2xl mx-auto my-12 p-8 bg-[#121212] border border-white/5 rounded-2xl text-center font-sans">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                    <FiBriefcase className="text-2xl text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-white tracking-wide">No Company Registered</h2>
                <p className="text-sm text-gray-500 max-w-sm mx-auto mt-2 mb-6 leading-relaxed">
                    To start hosting jobs and recruiting talent, you need to set up your organization profile first.
                </p>
                <Button
                    onClick={handleOpenEdit}
                    className="bg-white text-black font-semibold text-xs rounded-xl px-6 h-11 hover:bg-gray-200 transition-colors inline-flex items-center gap-2"
                >
                    <FiPlusCircle className="text-base" /> Register Company
                </Button>
            </div>
        );
    }

    // -----------------------------------------------------------------
    // ২. রেজিস্ট্রেশন অথবা এডিট ফর্ম ভিউ
    // -----------------------------------------------------------------
    if (isEditing) {
        return (
            <div className="w-full max-w-4xl mx-auto bg-[#121212] border border-white/5 rounded-2xl overflow-hidden font-sans my-6">
                <div className="p-6 border-b border-white/5">
                    <h1 className="text-xl font-semibold tracking-wide text-white">
                        {company ? "Edit Company Details" : "Register Your Company"}
                    </h1>
                    <p className="text-xs text-gray-500 mt-1">Provide accurate corporate profiles. Changes are subject to admin approval.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    {/* Core Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase flex items-center gap-2"><FiBriefcase /> Profile Core</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextField isRequired>
                                <Label className={labelClass}>Company Name</Label>
                                <div className={inputGroupClass}>
                                    <Input name="companyName" defaultValue={company?.name} placeholder="e.g. TechLoop Inc." className={nativeInputClass} />
                                </div>
                            </TextField>
                            <div className="flex flex-col">
                                <Label className={labelClass}>Industry <span className="text-red-500">*</span></Label>
                                <Select placeholder="Select industry" value={industry} onChange={setIndustry}>
                                    <Select.Trigger className={selectTriggerClass}>
                                        <Select.Value />
                                        <Select.Indicator><FiChevronDown className="text-gray-500" /></Select.Indicator>
                                    </Select.Trigger>
                                    <Select.Popover className="bg-[#1A1A1A] border border-white/5 rounded-xl text-white">
                                        <ListBox>
                                            <ListBox.Item id="technology" textValue="Technology" className="hover:bg-white/5 p-2 rounded-lg text-sm cursor-pointer">Technology</ListBox.Item>
                                            <ListBox.Item id="fintech" textValue="Fintech" className="hover:bg-white/5 p-2 rounded-lg text-sm cursor-pointer">Fintech</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Logistics */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase flex items-center gap-2"><FiGlobe /> Channels & Metrics</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextField isRequired>
                                <Label className={labelClass}>Website URL</Label>
                                <div className={inputGroupClass}>
                                    <FiGlobe className="text-gray-500 mr-2" />
                                    <Input name="websiteUrl" defaultValue={company?.websiteUrl} type="url" placeholder="https://example.com" className={nativeInputClass} />
                                </div>
                            </TextField>
                            <TextField isRequired>
                                <Label className={labelClass}>Location</Label>
                                <div className={inputGroupClass}>
                                    <FiMapPin className="text-gray-500 mr-2" />
                                    <Input name="location" defaultValue={company?.location} placeholder="e.g. Dhaka, Bangladesh" className={nativeInputClass} />
                                </div>
                            </TextField>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <Label className={labelClass}>Employee Count Range <span className="text-red-500">*</span></Label>
                                <Select placeholder="Select size" value={employeeCount} onChange={setEmployeeCount}>
                                    <Select.Trigger className={selectTriggerClass}>
                                        <Select.Value />
                                        <Select.Indicator><FiChevronDown className="text-gray-500" /></Select.Indicator>
                                    </Select.Trigger>
                                    <Select.Popover className="bg-[#1A1A1A] border border-white/5 rounded-xl text-white">
                                        <ListBox>
                                            <ListBox.Item id="11-50" textValue="11-50 employees" className="hover:bg-white/5 p-2 rounded-lg text-sm cursor-pointer">11-50 employees</ListBox.Item>
                                            <ListBox.Item id="51-200" textValue="51-200 employees" className="hover:bg-white/5 p-2 rounded-lg text-sm cursor-pointer">51-200 employees</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>
                            <TextField>
                                <Label className={labelClass}>Logo Image URL</Label>
                                <div className={inputGroupClass}>
                                    <FiImage className="text-gray-500 mr-2" />
                                    <Input name="logoUrl" defaultValue={company?.logo} placeholder="https://link-to-logo.png" className={nativeInputClass} />
                                </div>
                            </TextField>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase flex items-center gap-2"><FiEdit3 /> Overview</h3>
                        <TextField isRequired>
                            <Label className={labelClass}>Company Description</Label>
                            <div className="w-full bg-[#1A1A1A] border border-white/5 hover:border-white/10 focus-within:!border-white/20 rounded-xl p-3 transition-all">
                                <TextArea name="description" defaultValue={company?.description} placeholder="Provide a general summary..." rows={4} className="w-full bg-transparent text-white placeholder:text-gray-600 text-[14px] outline-none resize-y" />
                            </div>
                        </TextField>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
                        <Button type="button" onClick={() => setIsEditing(false)} className="bg-transparent border border-white/5 text-gray-300 rounded-xl px-6 h-11 text-xs font-semibold">Cancel</Button>
                        <Button type="submit" isLoading={loading} className="bg-white text-black font-semibold text-xs rounded-xl px-8 h-11 hover:bg-gray-200 transition-colors">
                            {company ? "Update Company" : "Register Company"}
                        </Button>
                    </div>
                </form>
            </div>
        );
    }

    // -----------------------------------------------------------------
    // ৩. কোম্পানি রেজিস্টার্ড থাকলে: মেইন ডিটেইলস প্যানেল ভিউ
    // -----------------------------------------------------------------
    return (
        <div className="w-full max-w-4xl mx-auto font-sans select-none my-6 space-y-6">
            <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <img src={company.logo} alt={company.name} className="w-20 h-20 rounded-2xl object-cover bg-zinc-900 border border-white/5" />
                        <div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-2xl font-bold text-white tracking-wide">{company.name}</h1>
                                <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${getStatusBadgeClass(company.status)}`}>
                                    {company.status}
                                </span>
                            </div>
                            <p className="text-sm text-gray-400 capitalize mt-1 flex items-center gap-1.5">
                                <FiBriefcase className="text-xs text-gray-500" /> {company.industry} Sector
                            </p>
                        </div>
                    </div>
                    <Button onClick={handleOpenEdit} className="bg-[#1A1A1A] hover:bg-zinc-800 border border-white/5 hover:border-white/10 text-gray-200 font-semibold text-xs rounded-xl px-5 h-10 transition-all flex items-center gap-2">
                        <FiEdit3 /> Edit Profile
                    </Button>
                </div>

                {/* কন্ডিশনাল অ্যাডমিন স্ট্যাটাস নোটিশ */}
                {company.status === "pending" && (
                    <div className="mt-6 flex items-center gap-3 bg-amber-500/5 border border-amber-500/10 text-amber-500/80 p-3.5 rounded-xl text-xs">
                        <FiAlertCircle className="text-sm shrink-0" />
                        <span>Verification pending. Jobs will go live once platform admins approve your business account.</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#121212] border border-white/5 rounded-2xl p-5 space-y-4 h-fit">
                    <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Information</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-gray-300">
                            <FiGlobe className="text-gray-500 text-sm shrink-0" />
                            <div className="overflow-hidden">
                                <p className="text-[10px] text-gray-500 uppercase font-medium">Website</p>
                                <a href={company.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline text-blue-400 truncate block mt-0.5">{company.websiteUrl}</a>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                            <FiMapPin className="text-gray-500 text-sm shrink-0" />
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase font-medium">Headquarters</p>
                                <p className="text-sm text-gray-200 mt-0.5">{company.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                            <FiUsers className="text-gray-500 text-sm shrink-0" />
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase font-medium">Size Range</p>
                                <p className="text-sm text-gray-200 mt-0.5">{company.employeeCount} employees</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 bg-[#121212] border border-white/5 rounded-2xl p-6 space-y-3">
                    <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Detailed Profile</h3>
                    <p className="text-sm text-gray-300 leading-relaxed font-sans whitespace-pre-wrap">{company.description}</p>
                </div>
            </div>
        </div>
    );
}