"use client";

import React, { useState } from "react";
import { Form, TextField, Label, Input, FieldError, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { getApplicants } from "@/lib/action/application";

export default function ApplyForm({ job, user }) {
  const [resumeName, setResumeName] = useState("");
  const [loading, setLoading] = useState(false);

  // console.log(job,"jobs");
  

  // ফর্ম রিসেট করার ফাংশন
  const handleFormReset = (formElement) => {
    if (formElement) {
      formElement.reset();
    }
    setResumeName("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const currentForm = e.currentTarget;
    const formData = new FormData(currentForm);
    
    // 💡 একদম সিম্পল ওয়ে: এক লাইনে ফর্মের সব রেগুলার ইনপুট অবজেক্টে রূপান্তর
    const formValues = Object.fromEntries(formData);

    // 💡 প্রো-লেভেল ক্লিন ওয়ে: ফর্ম ডাটার সাথে এক্সট্রা ডাটা স্প্রেড (...) করে ফাইনাল অবজেক্ট তৈরি
    const plainData = {
      ...formValues,
      jobId: job?._id,
      companyLogo:job?.companyLogo,
      companyName: job?.companyName || "Unknown Company",
      jobTitle: job?.title || "Software Engineer", 
      applicantId: user?.id, 
      email: user?.email,
      applicantName:user?.name,
      status:"applied",    
      resume: resumeName ? { name: resumeName } : {} 
    };

    try {
      console.log("Submitting application data...", plainData);
      
      // সার্ভার অ্যাকশনে ডেটা পাঠানো হচ্ছে
      const res = await getApplicants(plainData);
      console.log("API Response:", res);

      // MongoDB insert রেসপন্স হ্যান্ডেলিং
      if (res && (res.insertedId || res.acknowledged || res.success)) {
        toast.success("Application submitted successfully!");
        handleFormReset(currentForm); 
        
        // কাউন্টার সাথে সাথে আপডেট দেখার জন্য পেজ রিফ্রেশ
        window.location.reload();
      } else {
        toast.error("Failed to submit application. Please try again.");
      }
      
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center px-4 py-10 bg-black min-h-[calc(100vh-80px)]">
      <Form
        className="w-full max-w-3xl bg-[#0a0a0c] border border-[#1a1a1e] rounded-[24px] p-8 md:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.8)] flex flex-col gap-6 text-white transition-all duration-300"
        onSubmit={onSubmit}
      >
        <div className="border-b border-[#1a1a1e] pb-4 mb-2">
          <p className="text-xs text-[#bf5af2] font-semibold uppercase tracking-wider">Applying For</p>
          <h1 className="text-xl font-bold text-[#f5f5f7] mt-0.5">{job?.title || "Loading Position..."}</h1>
        </div>

        {/* Full Name Field */}
        <TextField isRequired name="fullName">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-[#86868b] mb-1">Full Name</Label>
          <Input
            placeholder="John Doe"
            className="w-full h-12 bg-[#121214] border border-[#222226] rounded-xl text-sm text-[#f5f5f7] placeholder-[#48484a] focus-within:border-[#bf5af2] focus-within:ring-1 focus-within:ring-[#bf5af2]/30 transition-all duration-200"
          />
          <FieldError className="text-xs text-red-500 mt-1" />
        </TextField>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          <TextField isReadOnly name="email" value={user?.email || ""}>
            <Label className="text-[11px] font-bold uppercase tracking-widest text-[#86868b] mb-1">Email Address</Label>
            <Input
              className="w-full h-12 bg-[#161619]/40 border border-[#1c1c1f] rounded-xl text-sm text-[#636366] cursor-not-allowed"
            />
          </TextField>

          <TextField
            isRequired
            name="phone"
            validate={(value) => {
              if (!/^(?:\+88|88)?01[3-9]\d{8}$/.test(value)) {
                return "Please enter a valid Bangladeshi phone number";
              }
              return null;
            }}
          >
            <Label className="text-[11px] font-bold uppercase tracking-widest text-[#86868b] mb-1">Phone Number</Label>
            <Input
              placeholder="017XXXXXXXX"
              className="w-full h-12 bg-[#121214] border border-[#222226] rounded-xl text-sm text-[#f5f5f7] placeholder-[#48484a] focus-within:border-[#bf5af2] focus-within:ring-1 focus-within:ring-[#bf5af2]/30 transition-all duration-200"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>
        </div>

        {/* Social Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          <TextField name="githubUrl" type="url">
            <Label className="text-[11px] font-bold uppercase tracking-widest text-[#86868b] mb-1">GitHub Portfolio</Label>
            <Input
              placeholder="https://github.com/username"
              className="w-full h-12 bg-[#121214] border border-[#222226] rounded-xl text-sm text-[#f5f5f7] placeholder-[#48484a] focus-within:border-[#bf5af2] focus-within:ring-1 focus-within:ring-[#bf5af2]/30 transition-all duration-200"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          <TextField name="portfolioUrl" type="url">
            <Label className="text-[11px] font-bold uppercase tracking-widest text-[#86868b] mb-1">Live Portfolio</Label>
            <Input
              placeholder="https://yourportfolio.com"
              className="w-full h-12 bg-[#121214] border border-[#222226] rounded-xl text-sm text-[#f5f5f7] placeholder-[#48484a] focus-within:border-[#bf5af2] focus-within:ring-1 focus-within:ring-[#bf5af2]/30 transition-all duration-200"
            />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>
        </div>

        {/* Resume File Upload Field */}
        <div className="flex flex-col gap-1.5 w-full">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-[#86868b]">Upload Resume (PDF) *</Label>
          <div className="relative border border-dashed border-[#28282e] hover:border-[#bf5af2]/50 rounded-xl bg-[#121214] p-8 text-center transition-all duration-200 cursor-pointer group shadow-inner">
            <input
              type="file"
              name="resume"
              accept=".pdf"
              required
              onChange={(e) => {
                if (e.target.files?.[0]) setResumeName(e.target.files[0].name);
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="flex flex-col items-center gap-3 pointer-events-none">
              <div className="p-3 bg-[#1c1c1f] rounded-full group-hover:bg-[#bf5af2]/10 transition-colors duration-200">
                <svg className="w-5 h-5 text-[#86868b] group-hover:text-[#bf5af2] transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <span className="text-sm font-medium text-[#e5e5ea] group-hover:text-white transition-colors">
                {resumeName ? resumeName : "Click to upload or drag & drop"}
              </span>
              <span className="text-xs text-[#636366]">PDF files only (Max 5MB)</span>
            </div>
          </div>
        </div>

        {/* Cover Letter Field */}
        <TextField name="coverLetter">
          <Label className="text-[11px] font-bold uppercase tracking-widest text-[#86868b] mb-1">Cover Letter / Brief Introduction</Label>
          <Input
            placeholder="Tell the hiring manager why you're a great fit..."
            className="w-full min-h-[120px] items-start py-3 bg-[#121214] border border-[#222226] rounded-xl text-sm text-[#f5f5f7] placeholder-[#48484a] focus-within:border-[#bf5af2] focus-within:ring-1 focus-within:ring-[#bf5af2]/30 transition-all duration-200"
          />
          <FieldError className="text-xs text-red-500 mt-1" />
        </TextField>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full">
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 h-12 bg-[#bf5af2] hover:bg-[#ac49dc] text-white font-semibold rounded-xl text-sm tracking-wide transition-all duration-250 shadow-[0_4px_24px_rgba(191,90,242,0.25)] active:scale-[0.98]"
          >
            {loading ? "Submitting Application..." : "Submit Application"}
          </Button>
          <Button
            type="reset"
            onClick={(e) => handleFormReset(e.currentTarget.form)}
            className="h-12 px-6 bg-transparent border border-[#222226] text-[#a1a1aa] hover:text-white hover:bg-[#1c1c1f] font-medium rounded-xl text-sm transition-colors duration-200"
          >
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
}