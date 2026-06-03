import React from 'react';
import { FiMapPin, FiSearch } from 'react-icons/fi';

const StatsSection = () => {
    return (
        <div className='bg-black pt-60'>
            <div className="w-full  mx-auto flex flex-col items-center text-center px-4 font-sans select-none">

                <div className="relative flex items-center justify-center mb-8 w-full max-w-135">

                    <div className="flex-1 h-px bg-linear-to-r from-transparent via-white/12 to-white/20" />


                    <div className="flex items-center gap-2.5 border border-white/10 bg-[#111420]/80 rounded-full px-5 py-2 mx-4 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">

                        <div className="w-4 h-4 bg-[#FF6B00] rounded-md flex items-center justify-center shadow-[0_0_12px_rgba(255,107,0,0.5)]">
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                <rect x="1" y="3" width="10" height="7" rx="1.5" stroke="white" strokeWidth="1.2" />
                                <path d="M4 3V2.5a2 2 0 0 1 4 0V3" stroke="white" strokeWidth="1.2" />
                            </svg>
                        </div>

                        <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-white">
                            <span className="text-white font-bold">50,000+</span> NEW JOBS THIS MONTH
                        </div>
                    </div>

                    <div className="flex-1 h-px bg-linear-to-l from-transparent via-white/12 to-white/20" />
                </div>


                <h1 className="text-white text-4xl sm:text-[56px] font-bold tracking-tight leading-[1.12] max-w-170 mb-5">
                    Find Your Dream Job Today
                </h1>


                <p className="text-white text-[14px] sm:text-[15.5px] font-normal leading-[1.6] max-w-135 mb-10 opacity-75">
                    HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster.
                </p>

                <div className="flex items-center w-full max-w-160 bg-[#0E1017] border border-white/8 rounded-[20px] p-2 pl-6 mb-7 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.8)]">

                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                        <FiSearch className="text-gray-500 text-[17px] shrink-0" />
                        <input
                            type="text"
                            placeholder="Job title, skill, or company"
                            className="bg-transparent border-none outline-none text-white placeholder-gray-600 text-[13.5px] w-full font-normal tracking-wide"
                        />
                    </div>


                    <div className="w-px h-6 bg-white/8 mx-3 shrink-0" />

                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                        <FiMapPin className="text-gray-500 text-[17px] shrink-0" />
                        <input
                            type="text"
                            placeholder="Location or Remote"
                            className="bg-transparent border-none outline-none text-white placeholder-gray-600 text-[13.5px] w-full font-normal tracking-wide"
                        />
                    </div>


                    <button className="bg-[#4F46E5] hover:bg-[#4338CA] w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0 ml-2 shadow-[0_4px_20px_rgba(79,70,229,0.35)] transition-all duration-200 active:scale-95">
                        <FiSearch className="text-white text-[18px] stroke-[2.5]" />
                    </button>
                </div>


                <div className="flex items-center gap-2.5 flex-wrap justify-center text-[12px]">
                    <span className="text-gray-500 font-normal tracking-wide mr-1">Trending Position</span>
                    {["Product Designer", "AI Engineering", "Dev-ops Engineer"].map((tag) => (
                        <button
                            key={tag}
                            className="bg-[#161922]/60 hover:bg-[#1C202B] border border-white/6 rounded-full px-4 py-1.5 text-[#A3AED0] font-normal transition-colors duration-200"
                        >
                            {tag}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default StatsSection;