"use client";

import React, { useState } from "react";
import { TextField, Input, TextArea, Label, ListBox, Button, Select } from "@heroui/react";
import { FiBriefcase, FiGlobe, FiMapPin, FiUsers, FiEdit3, FiPlusCircle, FiChevronDown, FiAlertCircle, FiImage } from "react-icons/fi";
import toast from "react-hot-toast";
import { getCompany } from "@/lib/action/company";

export default function MyCompany({ recruiter, recruiterCompany }) {
    // 🏢 মেইন কোম্পানি স্টেট (প্রপস থেকে আসা ডাটা সরাসরি ইনিশিয়াল ভ্যালু হিসেবে সেট)
    const [company, setCompany] = useState(recruiterCompany);

    // UI কন্ট্রোল এবং লোডিং স্টেটস
    const [isEditing, setIsEditing] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    // সিলেক্টেড ভ্যালু স্টেটস (এডিটিং মোডের জন্য)
    const [industry, setIndustry] = useState("");
    const [employeeCount, setEmployeeCount] = useState("");

    // ইমেজ প্রিভিউ স্টেট
    const [imagePreview, setImagePreview] = useState(null);

    // 🔑 আপনার ImgBB API Key
    const IMGBB_API_KEY = process.env.NEXT_PUBLIC_LOGO_URL;

    // ✏️ ফর্ম ওপেন বা এডিট মোড টগল করার হ্যান্ডলার
    const handleOpenEdit = () => {
        if (company) {
            setIndustry(company.industry || "");
            setEmployeeCount(company.employeeCount || "");
            setImagePreview(company.logo || null);
        } else {
            setIndustry("");
            setEmployeeCount("");
            setImagePreview(null);
        }
        setIsEditing(true);
    };

    // 📸 ফাইল ইনপুট চেঞ্জ হ্যান্ডলার
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // 📨 সাবমিট হ্যান্ডলার (ImgBB আপলোড + ব্যাকএন্ড সেভ)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);

        const formData = new FormData(e.target);
        const imageFile = formData.get("logoFile");

        let finalLogoUrl = company?.logo || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150";

        if (imageFile && imageFile.name) {
            const imgFormData = new FormData();
            imgFormData.append("image", imageFile);

            try {
                toast.loading("Uploading logo to ImgBB...", { id: "imgbb-upload" });

                const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                    method: "POST",
                    body: imgFormData,
                });
                const imgbbData = await response.json();

                if (imgbbData.success) {
                    finalLogoUrl = imgbbData.data.url;
                    toast.success("Logo uploaded successfully!", { id: "imgbb-upload" });
                } else {
                    throw new Error("ImgBB upload error");
                }
            } catch (error) {
                console.error(error);
                toast.error("Image upload failed.", { id: "imgbb-upload" });
                setSubmitLoading(false);
                return;
            }
        }

        const companyPayload = {
            name: formData.get("companyName")?.trim(),
            industry: industry,
            websiteUrl: formData.get("websiteUrl")?.trim() || "",
            location: formData.get("location")?.trim(),
            employeeCount: employeeCount,
            logo: finalLogoUrl,
            description: formData.get("description")?.trim(),
            status: company?.status || "pending",
            recruiterId: recruiter?.id
        };
        setCompany(companyPayload);

        try {
            const payload = await getCompany(companyPayload);

            if (payload?.InsertedId || payload) {
                const savedCompany = { ...company, _id: payload.InsertedId }
                setCompany(savedCompany);
                toast.success(company ? "Company profile updated!" : "Company registered successfully!");
                setIsEditing(false);
            } else {
                throw new Error("Failed to store data in DB");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to save profile changes.");
        } finally {
            setSubmitLoading(false);
        }
    };

    // কাস্টম সিএসএস ক্লাস ভ্যারিয়েবল
    const labelClass = "text-gray-400 font-medium text-[13px] mb-1 font-sans block";
    const inputGroupClass = "w-full flex items-center px-3 bg-[#1A1A1A] border border-white/5 hover:border-white/10 focus-within:!border-white/20 rounded-xl h-12 transition-all";
    const nativeInputClass = "w-full h-full bg-transparent text-white placeholder:text-gray-600 text-[14px] outline-none border-none";
    const selectTriggerClass = "w-full flex items-center justify-between px-3 bg-[#1A1A1A] border border-white/5 hover:border-white/10 rounded-xl h-12 text-left text-[14px] text-white transition-all outline-none focus:border-white/20";

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "approved": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
            case "rejected": return "bg-rose-500/10 text-rose-400 border-rose-500/20";
            default: return "bg-amber-500/10 text-amber-400 border-amber-500/20";
        }
    };

    // =================================================================
    // ১. ভিউ: নো কোম্পানি স্টেট
    // =================================================================
    if (!company?._id && !isEditing) {
        return (
            <div className="w-full max-w-2xl mx-auto my-12 p-8 bg-[#121212] border border-white/5 rounded-2xl text-center font-sans">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                    <FiBriefcase className="text-2xl text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-white tracking-wide">No Company Registered</h2>
                <p className="text-sm text-gray-500 max-w-sm mx-auto mt-2 mb-6 leading-relaxed">
                    To start hosting job postings and manage applicant funnels, you must initialize an employer workspace.
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

    // =================================================================
    // ২. ভিউ: ফর্ম (এডিট বা রেজিস্ট্রেশন)
    // =================================================================
    if (isEditing) {
        return (
            <div className="w-full max-w-4xl mx-auto bg-[#121212] border border-white/5 rounded-2xl overflow-hidden font-sans my-6">
                <div className="p-6 border-b border-white/5">
                    <h1 className="text-xl font-semibold tracking-wide text-white">
                        {company ? "Edit Company Details" : "Register Your Company"}
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase flex items-center gap-2"><FiBriefcase /> Profile Core</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextField isRequired>
                                <Label className={labelClass}>Company Name</Label>
                                <div className={inputGroupClass}>
                                    <Input name="companyName" defaultValue={company?.name || ""} placeholder="e.g. HireLoop Inc" className={nativeInputClass} />
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
                                            <ListBox.Item id="ecommerce" textValue="E-Commerce" className="hover:bg-white/5 p-2 rounded-lg text-sm cursor-pointer">E-Commerce</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase flex items-center gap-2"><FiGlobe /> Channels</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <TextField>
                                <Label className={labelClass}>Website URL</Label>
                                <div className={inputGroupClass}>
                                    <FiGlobe className="text-gray-500 mr-2" />
                                    <Input name="websiteUrl" defaultValue={company?.websiteUrl || ""} type="text" placeholder="e.g. hireloop.com" className={nativeInputClass} />
                                </div>
                            </TextField>

                            <TextField isRequired>
                                <Label className={labelClass}>Location</Label>
                                <div className={inputGroupClass}>
                                    <FiMapPin className="text-gray-500 mr-2" />
                                    <Input name="location" defaultValue={company?.location || ""} placeholder="e.g. Dhaka, Bangladesh" className={nativeInputClass} />
                                </div>
                            </TextField>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <Label className={labelClass}>Employee Scale <span className="text-red-500">*</span></Label>
                                <Select placeholder="Select organization size" value={employeeCount} onChange={setEmployeeCount}>
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

                            <div className="flex flex-col">
                                <Label className={labelClass}>Company Logo Graphic</Label>
                                <div className="w-full flex items-center px-3 bg-[#1A1A1A] border border-white/5 hover:border-white/10 rounded-xl h-12 transition-all relative overflow-hidden">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-7 h-7 rounded-md object-cover mr-2 bg-zinc-800 border border-white/10" />
                                    ) : (
                                        <FiImage className="text-gray-500 mr-2 shrink-0" />
                                    )}
                                    <input
                                        type="file"
                                        name="logoFile"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="w-full h-full bg-transparent text-gray-400 text-[13px] file:mr-3 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[11px] file:font-semibold file:bg-zinc-800 file:text-gray-300 hover:file:bg-zinc-700 file:cursor-pointer pt-2.5 outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold tracking-wider text-gray-400 uppercase flex items-center gap-2"><FiEdit3 /> Summary</h3>
                        <TextField isRequired>
                            <Label className={labelClass}>Corporate Manifesto</Label>
                            <div className="w-full bg-[#1A1A1A] border border-white/5 hover:border-white/10 focus-within:!border-white/20 rounded-xl p-3 transition-all">
                                <TextArea name="description" defaultValue={company?.description || ""} placeholder="Tell applicants about company scope..." rows={4} className="w-full bg-transparent text-white placeholder:text-gray-600 text-[14px] outline-none resize-y" />
                            </div>
                        </TextField>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
                        <Button type="button" onClick={() => setIsEditing(false)} className="bg-transparent border border-white/5 text-gray-300 rounded-xl px-6 h-11 text-xs font-semibold">Cancel</Button>
                        <Button type="submit" isLoading={submitLoading} className="bg-white text-black font-semibold text-xs rounded-xl px-8 h-11 hover:bg-gray-200 transition-colors">
                            {company ? "Update Profile" : "Register Profile"}
                        </Button>
                    </div>
                </form>
            </div>
        );
    }

    // =================================================================
    // ৩. ভিউ: শো কোম্পানি ডিটেইলস
    // =================================================================
    return (
        <div className="w-full max-w-4xl mx-auto font-sans select-none my-6 space-y-6">
            <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <img src={company?.logo} alt={company?.name} className="w-20 h-20 rounded-2xl object-cover bg-zinc-900 border border-white/5" />
                        <div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-2xl font-bold text-white tracking-wide">{company?.name}</h1>
                                <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border ${getStatusBadgeClass(company?.status)}`}>
                                    {company?.status}
                                </span>
                            </div>
                            <p className="text-sm text-gray-400 capitalize mt-1 flex items-center gap-1.5">
                                <FiBriefcase className="text-xs text-gray-500" /> {company?.industry} Sector
                            </p>
                        </div>
                    </div>
                    <Button onClick={handleOpenEdit} className="bg-[#1A1A1A] hover:bg-zinc-800 border border-white/5 hover:border-white/10 text-gray-200 font-semibold text-xs rounded-xl px-5 h-10 transition-all flex items-center gap-2">
                        <FiEdit3 /> Edit Profile
                    </Button>
                </div>

                {company?.status === "pending" && (
                    <div className="mt-6 flex items-center gap-3 bg-amber-500/5 border border-amber-500/10 text-amber-500/80 p-3.5 rounded-xl text-xs">
                        <FiAlertCircle className="text-sm shrink-0" />
                        <span>Corporate identity validation pending operator authorization.</span>
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
                                {company?.websiteUrl ? (
                                    <a href={company.websiteUrl.startsWith('http') ? company.websiteUrl : `https://${company.websiteUrl}`} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline text-blue-400 truncate block mt-0.5">{company.websiteUrl}</a>
                                ) : (
                                    <p className="text-sm text-gray-600 italic mt-0.5">Not Provided</p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                            <FiMapPin className="text-gray-500 text-sm shrink-0" />
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase font-medium">Headquarters</p>
                                <p className="text-sm text-gray-200 mt-0.5">{company?.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                            <FiUsers className="text-gray-500 text-sm shrink-0" />
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase font-medium">Size Range</p>
                                <p className="text-sm text-gray-200 mt-0.5">{company?.employeeCount} employees</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 bg-[#121212] border border-white/5 rounded-2xl p-6 space-y-3">
                    <h3 className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Detailed Profile</h3>
                    <p className="text-sm text-gray-300 leading-relaxed font-sans whitespace-pre-wrap">{company?.description}</p>
                </div>
            </div>
        </div>
    );
}