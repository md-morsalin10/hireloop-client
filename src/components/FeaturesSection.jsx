"use client";
import React from 'react';
import { 
    Magnifier, 
    ChartLine, 
    LayoutCellsLarge, 
    Bookmark,  
    Layers, 
    ArrowUpRight, 
    NodesUp
} from "@gravity-ui/icons";
import { HiCursorClick } from 'react-icons/hi';

const FeaturesSection = () => {
    const features = [
        {
            title: "Smart Search",
            desc: "Find your ideal job with advanced filters.",
            icon: Magnifier
        },
        {
            title: "Salary Insights",
            desc: "Get real salary data to negotiate confidently.",
            icon: ChartLine
        },
        {
            title: "Top Companies",
            desc: "Apply to vetted companies that are hiring.",
            icon: LayoutCellsLarge
        },
        {
            title: "Saved Jobs",
            desc: "Manage apps & favorites on your dashboard.",
            icon: Bookmark
        },
        {
            title: "One-Click Apply",
            desc: "Simplify your job applications for an easier process!",
            icon: HiCursorClick
        },
        {
            title: "Resume Builder",
            desc: "Create professional resumes with modern templates.",
            icon: Layers
        },
        {
            title: "Skill-Based Matching",
            desc: "Discover jobs that match your skills and experience.",
            icon: NodesUp 
        },
        {
            title: "Career Growth Resources",
            desc: "Boost your career with quick interview tips.",
            icon: ArrowUpRight
        }
    ];

    return (
        <section className="w-full bg-black py-24 px-6 sm:px-12 flex flex-col items-center justify-center font-sans select-none overflow-hidden">
            
           
            <div className="flex items-center gap-2 mb-5">
                <span className="w-1.5 h-1.5 bg-[#4F46E5] rounded-sm" />
                <span className="text-[#5850EC] text-[12px] font-mono tracking-[0.25em] uppercase font-bold">
                    FEATURES JOB
                </span>
                <span className="w-1.5 h-1.5 bg-[#4F46E5] rounded-sm" />
            </div>

          
            <h2 className="text-white text-center text-3xl sm:text-[44px] font-bold tracking-tight leading-tight max-w-xl mb-20">
                Everything you need <br /> to succeed
            </h2>

            <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                {features.map((item, index) => {
                    const IconComponent = item.icon;
                    
                    return (
                        <div 
                            key={index} 
                            className="flex items-start gap-4 group transition-all duration-200"
                        >
                       
                            <div className="w-14 h-14 rounded-2xl bg-[#0F1322] border border-white/4 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.5)] flex items-center justify-center shrink-0 group-hover:border-white/8 group-hover:bg-[#13182b] transition-all duration-200">
                                <div className="drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]">
                                    <IconComponent className="text-pink-500/90 w-5 h-5" />
                                </div>
                            </div>

                           
                            <div className="flex flex-col gap-1.5 pt-1">
                                <h3 className="text-white text-[15px] font-semibold tracking-wide group-hover:text-indigo-400 transition-colors duration-150">
                                    {item.title}
                                </h3>
                                <p className="text-[#898F9C] text-[13px] font-light leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

        </section>
    );
};

export default FeaturesSection;