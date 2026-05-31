"use client";

import React from 'react';
import Link from "next/link";

const CTASection = () => {
    return (
        <section className="relative w-full bg-black overflow-hidden py-32 sm:py-40 px-6 flex flex-col items-center justify-center font-sans select-none text-center">
            
            <div 
                className="absolute inset-0 w-full h-full bg-bottom bg-no-repeat pointer-events-none transition-opacity opacity-80 duration-300"
                style={{
                    backgroundImage: "url('/images/cta-bg.png')",
                    backgroundSize: "1300px auto", 
                }}
            />

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-indigo-600/8 rounded-full blur-[140px] pointer-events-none" />

           
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                <h2 className="text-white text-3xl sm:text-[46px] font-bold tracking-tight leading-[1.15] mb-6 max-w-2xl">
                    Your next role is <br className="hidden sm:block" /> already looking for you
                </h2>
                <p className="text-gray-400 text-sm sm:text-[15px] font-light tracking-wide leading-relaxed max-w-lg mb-10 opacity-90">
                    Build a profile in three minutes. The matches start arriving tomorrow morning.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"> 
                    <Link 
                        href="/register" 
                        className="w-full sm:w-auto px-7 h-12 bg-white text-black font-semibold rounded-xl text-[14px] flex items-center justify-center hover:bg-gray-100 transition-all duration-200 shadow-[0_4px_20px_rgba(255,255,255,0.08)]"
                    >
                        Create a free account
                    </Link>

                   
                    <Link 
                        href="/pricing" 
                        className="w-full sm:w-auto px-7 h-12 bg-[#121624]/40 border border-white/6 text-gray-300 font-medium rounded-xl text-[14px] flex items-center justify-center hover:text-white hover:bg-[#121624]/80 hover:border-white/12 transition-all duration-200"
                    >
                        View pricing
                    </Link>

                </div>

            </div>

        </section>
    );
};

export default CTASection;