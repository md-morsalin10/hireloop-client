"use client";

import React, { useState } from 'react';

import { Thunderbolt,  Plus, ArrowRight, ChartAreaStacked } from "@gravity-ui/icons";
import { BiCrown } from 'react-icons/bi';

const PricingSection = () => {
    const [isYearly, setIsYearly] = useState(false);

    const pricingPlans = [
        {
            id: "starter",
            name: "Starter",
            icon: <BiCrown className="text-pink-500 text-lg" />,
            monthlyPrice: 0,
            yearlyPrice: 0,
            features: [
                "Daily AI match brief (top 5)",
                "Verified salary bands",
                "Company insight dashboards",
                "1-click apply, unlimited"
            ],
            isPopular: false
        },
        {
            id: "growth",
            name: "Growth",
            icon: <ChartAreaStacked className="text-[#818CF8] text-lg" />, 
            monthlyPrice: 17,
            yearlyPrice: 12,
            features: [
                "Daily AI match brief (top 5)",
                "Verified salary bands",
                "Company insight dashboards",
                "1-click apply, unlimited"
            ],
            isPopular: true
        },
        {
            id: "premium",
            name: "Premium",
            icon: <Thunderbolt className="text-purple-500 text-lg" />,
            monthlyPrice: 99,
            yearlyPrice: 74,
            features: [
                "Everything in Pro",
                "Multi-profile career portfolios",
                "Shared talent rooms",
                "Recruiter view (read-only)"
            ],
            isPopular: false
        }
    ];

    return (
        <section className="w-full bg-black pt-24 pb-28 px-6 flex flex-col items-center justify-center font-sans select-none overflow-hidden">
            
            <div className="absolute w-125 h-62.5 bg-indigo-600/3 rounded-full blur-[120px] pointer-events-none" />

            <div className="flex items-center gap-1.5 mb-4">
                <span className="w-1 h-1 bg-[#4F46E5] rounded-full" />
                <span className="text-[#4F46E5] text-[11px] font-mono tracking-[0.2em] uppercase font-semibold">PRICING</span>
                <span className="w-1 h-1 bg-[#4F46E5] rounded-full" />
            </div>

            <h2 className="text-white text-center text-3xl sm:text-[44px] font-bold tracking-tight leading-tight max-w-xl mb-8">
                Pay for the leverage, not the listings
            </h2>

            <div className="flex items-center bg-[#121624] border border-white/4 p-1 rounded-full mb-16 shadow-inner">
                <button
                    onClick={() => setIsYearly(false)}
                    className={`px-5 py-2 rounded-full text-[13px] font-medium tracking-wide transition-all duration-200 ${
                        !isYearly ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-white'
                    }`}
                >
                    Monthly
                </button>
                <button
                    onClick={() => setIsYearly(true)}
                    className={`relative px-5 py-2 rounded-full text-[13px] font-medium tracking-wide flex items-center gap-2 transition-all duration-200 ${
                        isYearly ? 'bg-white text-black shadow-md' : 'text-gray-400 hover:text-white'
                    }`}
                >
                    Yearly
                    <span className="text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#E01A8A]">
                        25%
                    </span>
                </button>
            </div>

            <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {pricingPlans.map((plan) => (
                    <div
                        key={plan.id}
                        className={`relative rounded-[24px] p-8 transition-all duration-300 flex flex-col justify-between h-full min-h-125 border ${
                            plan.isPopular
                                ? 'bg-[#0E1220] border-white/8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] scale-105 z-10 md:py-10'
                                : 'bg-[#0D0F1A]/60 border-white/3 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] opacity-85 hover:opacity-100 hover:border-white/6'
                        }`}
                    >
                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-white/2 border border-white/5 flex items-center justify-center">
                                        {plan.icon}
                                    </div>
                                    <span className="text-gray-300 text-base font-medium tracking-wide">
                                        {plan.name}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-baseline text-white gap-1 mb-8">
                                <span className="text-[46px] font-bold tracking-tight">
                                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                                </span>
                                <span className="text-gray-500 text-[13px] font-light tracking-wide">
                                    /month
                                </span>
                            </div>

                            <div className="w-full h-px bg-white/4 mb-8" />

                            <p className="text-white text-[13.5px] font-medium tracking-wide mb-5">
                                Start building your insights hub:
                            </p>
                            <ul className="flex flex-col gap-4">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-400 text-[13.5px] font-light leading-relaxed">
                                        <div className="w-4 h-4 rounded-lg bg-white/3 border border-white/8 flex items-center justify-center shrink-0 mt-0.5">
                                            <Plus className="text-[12px] text-gray-500" />
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-10">
                            <button
                                className={`w-full h-12 rounded-xl flex items-center justify-center gap-2 text-[14px] font-semibold tracking-wide transition-all duration-200 ${
                                    plan.isPopular
                                        ? 'bg-white text-black hover:bg-gray-100 shadow-[0_4px_20px_rgba(255,255,255,0.1)]'
                                        : 'bg-white/3 border border-white/6 text-gray-300 hover:text-white hover:bg-white/6'
                                }`}
                            >
                                Choose This Plan
                                <ArrowRight className="text-sm" />
                            </button>
                        </div>

                    </div>
                ))}
            </div>

        </section>
    );
};

export default PricingSection;