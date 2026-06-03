import React from 'react';

const StatCard = ({ icon: Icon, label, value }) => {
    return (
            <div className="flex flex-col justify-between p-6 bg-[#121212] border border-white/5 rounded-xl h-44 transition-all duration-200 hover:border-white/10 select-none">
                {/* আইকন কন্টেইনার */}
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 text-gray-400 border border-white/5">
                    <Icon className="text-[18px]" />
                </div>

                {/* টেক্সট ও নাম্বার সেকশন */}
                <div className="mt-auto space-y-2">
                    <p className="text-[12px] font-medium text-gray-500 tracking-wide font-sans">
                        {label}
                    </p>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight font-sans">
                        {value}
                    </h3>
                </div>
            </div>
    );
};

export default StatCard;