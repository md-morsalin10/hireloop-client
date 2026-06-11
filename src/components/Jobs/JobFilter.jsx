'use client';

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Label, ListBox, Select } from "@heroui/react";

export default function JobFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL থেকে কারেন্ট ভ্যালুগুলো ইনিশিয়াল স্টেট হিসেবে নেওয়া
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");

  // ফিল্টার অ্যাপ্লাই করার ফাংশন
  const handleApplyFilters = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // সার্চ সাবমিট হ্যান্ডলার
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleApplyFilters("search", search);
  };

  const handleReset = () => {
    setSearch("");
    setType("");
    setLocation("");
    router.push("?", { scroll: false });
  };

  return (
    <div className="w-full max-w-7xl mb-10 p-5 bg-[#0c0c0e] border border-[#1e1e21] rounded-[24px] flex flex-col md:flex-row items-center gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
      
      {/* Search Input & Button */}
      <form onSubmit={handleSearchSubmit} className="relative w-full md:flex-1 flex gap-2">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-[#636366]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by job title or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#161618] border border-[#242427] rounded-xl text-sm text-[#f5f5f7] placeholder-[#636366] focus:outline-none focus:border-[#bf5af2]/50 transition-colors duration-200"
          />
        </div>
        
        {/* সার্চ বাটন */}
        <button 
          type="submit"
          className="px-5 py-3 bg-[#bf5af2] hover:bg-[#ac49dd] text-white text-sm font-medium rounded-xl transition-colors cursor-pointer"
        >
          Search
        </button>
      </form>

      {/* HeroUI Job Type Select */}
      <div className="w-full md:w-48 text-white">
        <Select 
          placeholder="All Job Types"
          selectedKey={type} 
          onSelectionChange={(key) => {
            setType(key);
            handleApplyFilters("type", key);
          }}
          className="w-full"
        >
          <Select.Trigger className="w-full px-4 py-3 bg-[#161618] border border-[#242427] rounded-xl text-sm text-[#d1d1d6] flex justify-between items-center cursor-pointer hover:border-[#bf5af2]/30 transition-colors min-h-[46px] h-[46px]">
            <Select.Value />
            {/* অ্যারো ইন্ডিকেটর এবং ভেতরের SVG ফিক্স */}
            <Select.Indicator className="text-[#636366] ml-2 flex items-center justify-center w-4 h-4 min-w-[16px] min-h-[16px]">
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="w-4 h-4 block"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </Select.Indicator>
          </Select.Trigger>
          <Select.Popover className="bg-[#161618] border border-[#242427] rounded-xl overflow-hidden mt-1 shadow-xl min-w-[var(--trigger-width)]">
            <ListBox className="p-1 text-white">
              <ListBox.Item id="" textValue="All Job Types" className="px-3 py-2 text-sm text-[#86868b] hover:bg-[#242427] hover:text-white rounded-lg cursor-pointer transition-colors focus:outline-none">
                All Job Types
              </ListBox.Item>
              <ListBox.Item id="Full-time" textValue="Full-time" className="px-3 py-2 text-sm text-[#d1d1d6] hover:bg-[#242427] hover:text-white rounded-lg cursor-pointer transition-colors focus:outline-none">
                Full-time
              </ListBox.Item>
              <ListBox.Item id="Part-time" textValue="Part-time" className="px-3 py-2 text-sm text-[#d1d1d6] hover:bg-[#242427] hover:text-white rounded-lg cursor-pointer transition-colors focus:outline-none">
                Part-time
              </ListBox.Item>
              <ListBox.Item id="Contract" textValue="Contract" className="px-3 py-2 text-sm text-[#d1d1d6] hover:bg-[#242427] hover:text-white rounded-lg cursor-pointer transition-colors focus:outline-none">
                Contract
              </ListBox.Item>
              <ListBox.Item id="Internship" textValue="Internship" className="px-3 py-2 text-sm text-[#d1d1d6] hover:bg-[#242427] hover:text-white rounded-lg cursor-pointer transition-colors focus:outline-none">
                Internship
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* HeroUI Location Select */}
      <div className="w-full md:w-48 text-white">
        <Select 
          placeholder="All Locations"
          selectedKey={location} 
          onSelectionChange={(key) => {
            setLocation(key);
            handleApplyFilters("location", key);
          }}
          className="w-full"
        >
          <Select.Trigger className="w-full px-4 py-3 bg-[#161618] border border-[#242427] rounded-xl text-sm text-[#d1d1d6] flex justify-between items-center cursor-pointer hover:border-[#bf5af2]/30 transition-colors min-h-[46px] h-[46px]">
            <Select.Value />
            {/* অ্যারো ইন্ডিকেটর এবং ভেতরের SVG ফিক্স */}
            <Select.Indicator className="text-[#636366] ml-2 flex items-center justify-center w-4 h-4 min-w-[16px] min-h-[16px]">
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="w-4 h-4 block"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </Select.Indicator>
          </Select.Trigger>
          <Select.Popover className="bg-[#161618] border border-[#242427] rounded-xl overflow-hidden mt-1 shadow-xl min-w-[var(--trigger-width)]">
            <ListBox className="p-1 text-white">
              <ListBox.Item id="" textValue="All Locations" className="px-3 py-2 text-sm text-[#86868b] hover:bg-[#242427] hover:text-white rounded-lg cursor-pointer transition-colors focus:outline-none">
                All Locations
              </ListBox.Item>
              <ListBox.Item id="Dhaka" textValue="Dhaka" className="px-3 py-2 text-sm text-[#d1d1d6] hover:bg-[#242427] hover:text-white rounded-lg cursor-pointer transition-colors focus:outline-none">
                Dhaka
              </ListBox.Item>
              <ListBox.Item id="Remote" textValue="Remote" className="px-3 py-2 text-sm text-[#d1d1d6] hover:bg-[#242427] hover:text-white rounded-lg cursor-pointer transition-colors focus:outline-none">
                Remote
              </ListBox.Item>
              <ListBox.Item id="Hybrid" textValue="Hybrid" className="px-3 py-2 text-sm text-[#d1d1d6] hover:bg-[#242427] hover:text-white rounded-lg cursor-pointer transition-colors focus:outline-none">
                Hybrid
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* Clear Button */}
      {(search || type || location) && (
        <button
          onClick={handleReset}
          className="w-full md:w-auto px-4 py-2 text-xs font-medium text-[#bf5af2] hover:bg-[#bf5af2]/10 rounded-xl transition-colors duration-200 cursor-pointer"
        >
          Clear
        </button>
      )}
    </div>
  );
}