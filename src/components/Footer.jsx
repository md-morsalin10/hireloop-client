"use client";

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";

const Footer = () => {
    const footerLinks = [
        {
            title: "Product",
            links: [
                { label: "Job discovery", href: "/jobs" },
                { label: "Worker AI", href: "/worker-ai" },
                { label: "Companies", href: "/company" },
                { label: "Salary data", href: "/salary" }
            ]
        },
        {
            title: "Navigations",
            links: [
                { label: "Help center", href: "/help" },
                { label: "Career library", href: "/library" },
                { label: "Contact", href: "/contact" }
            ]
        },
        {
            title: "Resources",
            links: [
                { label: "Brand Guideline", href: "/brand" },
                { label: "Newsroom", href: "/news" }
            ]
        }
    ];

    return (
        <footer className="w-full bg-[#0B0F19] border-t border-white/3 pt-20 pb-10 px-6 sm:px-12 font-sans select-none">
            <div className="max-w-7xl mx-auto">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
                    
                    <div className="lg:col-span-5 flex flex-col items-start max-w-sm">
                        <Link href="/" className="mb-6 block transition-opacity duration-150 hover:opacity-90">
                            <Image
                                src="/images/logo.png"
                                alt="HireLoop Logo"
                                width={130}
                                height={36}
                                priority
                            />
                        </Link>
                        
                        <p className="text-[#6B7280] text-[14px] leading-relaxed mb-8 font-light">
                            The AI-native career platform. Built for people who take their work seriously.
                        </p>

                        <div className="flex items-center gap-3">
                            <a href="#" className="w-10 h-10 rounded-xl bg-white/2 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/6 transition-all duration-200">
                                <FaFacebookF className="text-[15px]" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-[#4F46E5]/10 border border-[#4F46E5]/20 flex items-center justify-center text-[#6366F1] hover:text-white hover:bg-[#4F46E5] transition-all duration-200">
                                <FaThreads className="text-[15px]" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-white/2 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/6 transition-all duration-200">
                                <FaLinkedinIn className="text-[15px]" />
                            </a>
                        </div>
                    </div>

                    <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
                        {footerLinks.map((group, index) => (
                            <div key={index} className="flex flex-col gap-5">
                                <h3 className="text-[#4F46E5] text-[14px] font-semibold tracking-wider uppercase">
                                    {group.title}
                                </h3>

                                <ul className="flex flex-col gap-3.5">
                                    {group.links.map((link, idx) => (
                                        <li key={idx}>
                                            <Link 
                                                href={link.href} 
                                                className="text-[#9CA3AF] hover:text-white text-[13.5px] font-light transition-colors duration-150 block"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                </div>

                <div className="w-full h-px bg-white/4 mb-8" />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-gray-500 font-light">
                    <div>
                        Copyright 2024 — Programming Hero
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/terms" className="hover:text-gray-400 transition-colors duration-150">Terms & Policy</Link>
                        <span className="w-1 h-1 rounded-full bg-gray-700 block" />
                        <Link href="/privacy" className="hover:text-gray-400 transition-colors duration-150">Privacy Guideline</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;