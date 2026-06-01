"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeSlash, Person, At, ShieldCheck } from "@gravity-ui/icons";
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()

    // স্টেট ছাড়াই ফর্ম সাবমিশন হ্যান্ডলার
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const users = Object.fromEntries(formData.entries())

        console.log(users);

        const { data, error } = await authClient.signUp.email({
            name: users.name,
            image: users.image,
            email: users.email,
            password: users.password,

        })
        console.log(data);


        if (data) {
            toast.success('Sign up Successful');
            router.push("/login");
        }
        if (error) {
            toast.error(error.message);
        }



        // আপনার অথেন্টিকেশন বা এপিআই লজিক এখানে দিন...
    };

    return (
        <section className="relative w-full min-h-screen bg-[#0B0F19] flex items-center justify-center py-40 px-4 sm:px-6 font-sans overflow-hidden select-none">

            {/* 🌌 ব্যাকগ্রাউন্ড আল্ট্রা-সফট গলো ইফেক্টস */}
            <div className="absolute top-1/4 left-1/4 w-100 h-100 bg-indigo-600/3 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-100 h-100 bg-purple-600/2 rounded-full blur-[120px] pointer-events-none" />

            {/* 📦 সেন্ট্রাল গ্লাস-মরফিজম কার্ড কন্টেইনার */}
            <div className="relative z-10 w-full max-w-120 bg-[#0E1220]/70 backdrop-blur-xl border border-white/[0.05] rounded-[28px] p-8 sm:p-10 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.7)]">

                {/* 🏷️ লোগো সেকশন */}
                <div className="flex flex-col items-center text-center mb-8">
                    <Link href="/" className="mb-5 block transition-opacity duration-150 hover:opacity-90">
                        <Image
                            src="/images/logo.png"
                            alt="HireLoop Logo"
                            width={130}
                            height={36}
                            priority
                        />
                    </Link>
                    <h2 className="text-white text-2xl font-bold tracking-tight mb-2">
                        Create your account
                    </h2>
                    <p className="text-gray-400 text-[13.5px] font-light">
                        Join HireLoop to accelerate your career growth
                    </p>
                </div>

                {/* 📝 রেজিস্ট্রেশন ফর্ম */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* ১. ফুল নেম ইনপুট */}
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-300 text-[13px] font-medium tracking-wide">Full Name</label>
                        <div className="relative w-full h-12 bg-[#121624]/60 border border-white/[0.06] rounded-xl flex items-center px-4 transition-all duration-200 focus-within:border-indigo-500/50 focus-within:shadow-[0_0_12px_rgba(99,102,241,0.15)]">
                            <Person className="text-gray-500 text-base shrink-0 mr-3" />
                            <input
                                type="text"
                                name="name" // 👈 FormData ট্র্যাক করার জন্য name এট্রিবিউট জরুরি
                                required
                                placeholder="John Doe"
                                className="w-full bg-transparent text-white text-[13.5px] font-light placeholder-gray-600 outline-none"
                            />
                        </div>
                    </div>

                    {/* ২. ইমেইল ইনপুট */}
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-300 text-[13px] font-medium tracking-wide">Email Address</label>
                        <div className="relative w-full h-12 bg-[#121624]/60 border border-white/[0.06] rounded-xl flex items-center px-4 transition-all duration-200 focus-within:border-indigo-500/50 focus-within:shadow-[0_0_12px_rgba(99,102,241,0.15)]">
                            <At className="text-gray-500 text-base shrink-0 mr-3" />
                            <input
                                type="email"
                                name="email" // 👈 name এট্রিবিউট
                                required
                                placeholder="name@example.com"
                                className="w-full bg-transparent text-white text-[13.5px] font-light placeholder-gray-600 outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-gray-300 text-[13px] font-medium tracking-wide">Image</label>
                        <div className="relative w-full h-12 bg-[#121624]/60 border border-white/[0.06] rounded-xl flex items-center px-4 transition-all duration-200 focus-within:border-indigo-500/50 focus-within:shadow-[0_0_12px_rgba(99,102,241,0.15)]">
                            <Person className="text-gray-500 text-base shrink-0 mr-3" />
                            <input
                                type="url"
                                name="image" 
                                required
                                placeholder="Enter image url"
                                className="w-full bg-transparent text-white text-[13.5px] font-light placeholder-gray-600 outline-none"
                            />
                        </div>
                    </div>

                    {/* ৩. পাসওয়ার্ড ইনপুট */}
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-300 text-[13px] font-medium tracking-wide">Password</label>
                        <div className="relative w-full h-12 bg-[#121624]/60 border border-white/[0.06] rounded-xl flex items-center px-4 transition-all duration-200 focus-within:border-indigo-500/50 focus-within:shadow-[0_0_12px_rgba(99,102,241,0.15)]">
                            <ShieldCheck className="text-gray-500 text-base shrink-0 mr-3" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password" // 👈 name এট্রিবিউট
                                required
                                placeholder="••••••••"
                                className="w-full bg-transparent text-white text-[13.5px] font-light placeholder-gray-600 outline-none tracking-widest"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-500 hover:text-gray-300 transition-colors duration-150 pl-2 outline-none"
                            >
                                {showPassword ? <EyeSlash className="text-base" /> : <Eye className="text-base" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-12 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-[14px] font-semibold rounded-xl shadow-[0_4px_20px_rgba(99,102,241,0.25)] hover:shadow-[0_4px_25px_rgba(99,102,241,0.35)] transition-all duration-200 flex items-center justify-center gap-2 mt-2 hover:scale-[1.01] active:scale-[0.99]"
                    >
                        Create Account
                    </button>
                </form>

                {/* ➖ ডিভাইডার এবং সাইন ইন লিংক */}
                <div className="mt-8 pt-6 border-t border-white/[0.04] text-center">
                    <p className="text-gray-400 text-[13px] font-light">
                        Already have an account?{" "}
                        <Link href="/login" className="text-[#6366F1] font-medium hover:text-[#818CF8] hover:underline transition-colors duration-150">
                            Sign In
                        </Link>
                    </p>
                </div>

            </div>
        </section>
    );
};

export default RegisterPage;