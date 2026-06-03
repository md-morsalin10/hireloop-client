"use client";

import React from 'react';
import Image from "next/image";
import Link from "next/link";

import {
    Person,
    At,
    Calendar,
    ShieldCheck,
    ArrowLeft,
    Gear,
    Briefcase
} from "@gravity-ui/icons";
import { authClient } from '@/lib/auth-client';

const ProfilePage = () => {
    // Better-Auth সেশন থেকে ডেটা ফেচিং
    const { data: session, isPending } = authClient.useSession();
    const users = session?.user
    // অ্যাকাউন্ট খোলার ডেট ফরম্যাটিং (আপনার কনসোল লগের ডেটা অনুযায়ী)
    const joinedDate = users?.createdAt
        ? new Date(users.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : "June 2026";

    return (
        <section className="relative w-full min-h-screen bg-[#0B0F19] text-white flex items-center justify-center py-28 px-4 sm:px-6 font-sans overflow-hidden select-none">

            {/* 🌌 ব্যাকগ্রাউন্ড আল্ট্রা-সফট মডার্ন গ্লো ইফেক্টস */}
            <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-600/5 rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-600/4 rounded-full blur-[130px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-3xl flex flex-col gap-6">

                {/* 🔙 ব্যাক টু হোম লিংক */}
                <div className="flex items-center justify-between px-2">
                    <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white text-[14px] font-medium transition-colors duration-200 group">
                        <ArrowLeft className="text-base transition-transform duration-200 group-hover:-translate-x-1" />
                        Back to Home
                    </Link>
                    <button className="text-gray-400 hover:text-white transition-colors duration-200">
                        <Gear className="text-lg animate-spin-slow" />
                    </button>
                </div>

                {/* 📦 মেইন গ্লাস-মরফিজম প্রোফাইল কন্টেইনার */}
                <div className="w-full bg-[#0E1220]/70 backdrop-blur-xl border border-white/[0.05] rounded-[28px] p-6 sm:p-10 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.7)] flex flex-col md:flex-row gap-8 items-center md:items-start">

                    {/* 👤 লেফট সাইড: প্রোফাইল পিকচার এবং কুইক স্ট্যাটাস */}
                    <div className="flex flex-col items-center text-center shrink-0">
                        <div className="relative w-32 h-32 rounded-full p-[3px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_25px_rgba(99,102,241,0.2)]">
                            <div className="w-full h-full bg-[#0B0F19] rounded-full flex items-center justify-center overflow-hidden relative">
                                {users?.image ? (
                                    <Image
                                        src={users.image}
                                        alt={users?.name || "User Avatar"}
                                        fill
                                        className="object-cover"
                                        referrerPolicy="no-referrer"
                                        priority
                                    />
                                ) : (
                                    <Person className="text-gray-600 text-5xl" />
                                )}
                            </div>

                            {/* ভেরিফাইড ব্যাজ (যদি ইমেইল ভেরিফাইড থাকে) */}
                            {users?.emailVerified && (
                                <span className="absolute bottom-1 right-1 bg-[#10B981] text-white p-1.5 rounded-full border-2 border-[#0B0F19] shadow-lg flex items-center justify-center" title="Verified Account">
                                    <ShieldCheck className="text-[12px]" />
                                </span>
                            )}
                        </div>

                        <div className="mt-4">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[12px] font-semibold tracking-wide uppercase">
                                Starter Plan
                            </span>
                        </div>
                    </div>

                    {/* 📝 রাইট সাইড: বিস্তারিত ইনফরমেশন */}
                    <div className="w-full flex flex-col gap-6">

                        {/* হেডার ইনফো */}
                        <div className="text-center md:text-left border-b border-white/[0.04] pb-5">
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-1.5">
                                {users?.name || "Guest User"}
                            </h1>
                            <p className="text-gray-400 text-[14px] font-light flex items-center justify-center md:justify-start gap-1.5">
                                <Briefcase className="text-indigo-400 text-sm" />
                                Professional Developer
                            </p>
                        </div>

                        {/* ইনফরমেশন গ্রিড কার্ডস */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* ইমেইল কার্ড */}
                            <div className="bg-[#121624]/40 border border-white/[0.04] p-4 rounded-xl flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                                    <At className="text-indigo-400 text-base" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-[12px] text-gray-500 font-medium uppercase tracking-wider">Email Address</p>
                                    <p className="text-[14px] text-gray-200 font-light truncate">{users?.email || "N/A"}</p>
                                </div>
                            </div>

                            {/* জয়েনিং ডেট কার্ড */}
                            <div className="bg-[#121624]/40 border border-white/[0.04] p-4 rounded-xl flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                                    <Calendar className="text-purple-400 text-base" />
                                </div>
                                <div>
                                    <p className="text-[12px] text-gray-500 font-medium uppercase tracking-wider">Joined HireLoop</p>
                                    <p className="text-[14px] text-gray-200 font-light">{joinedDate}</p>
                                </div>
                            </div>

                        </div>

                        {/* 🛠️ অ্যাকাউন্ট অ্যাকশন এরিয়া */}
                        <div className="mt-2 pt-2 flex flex-col sm:flex-row gap-3 w-full">
                            <button className="flex-1 h-11 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-white text-[13.5px] font-medium rounded-xl transition-all duration-150 active:scale-[0.99]">
                                Edit Profile
                            </button>
                            <Link href="/pricing" className="flex-1">
                                <button className="w-full h-11 bg-gradient-to-r from-[#6366F1] to-[#4F46E5] hover:opacity-95 text-white text-[13.5px] font-semibold rounded-xl shadow-[0_4px_20px_rgba(99,102,241,0.2)] transition-all duration-150 text-center flex items-center justify-center active:scale-[0.99]">
                                    Upgrade to Pro
                                </button>
                            </Link>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default ProfilePage;