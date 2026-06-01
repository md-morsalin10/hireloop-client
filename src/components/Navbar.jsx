"use client";

import React from 'react';
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 w-full px-6 py-4 bg-transparent z-50">
            <div className="max-w-7xl mx-auto bg-[#111420]/40 backdrop-blur-md border border-white/5 rounded-[20px] h-20 px-8 flex items-center justify-between shadow-[0_12px_40px_0_rgba(0,0,0,0.5)]">
                
                <Link href="/" className="flex items-center transition-opacity duration-150 hover:opacity-90">
                    <Image
                        src="/images/logo.png"
                        alt="HireLoop Logo"
                        width={130}
                        height={36}
                        priority
                    />
                </Link>

                <div className="flex items-center gap-8">
                    <Link href="/jobs" className="text-[#9CA3AF] hover:text-white text-sm font-medium transition-colors duration-150">
                        Browse Jobs
                    </Link>
                    <Link href="/company" className="text-[#9CA3AF] hover:text-white text-sm font-medium transition-colors duration-150">
                        Company
                    </Link>
                    <Link href="/pricing" className="text-[#9CA3AF] hover:text-white text-sm font-medium transition-colors duration-150">
                        Pricing
                    </Link>

                    <div className="h-5 w-px bg-white/10" />

                    <Link href="/register" className="text-[#6366F1] hover:text-[#818CF8] text-sm font-semibold transition-colors duration-150">
                        Sign In
                    </Link>

                    <Link
                        href="/login"
                        className="bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-[0_4px_14px_0_rgba(99,102,241,0.35)] transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Get Started
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Navbar;