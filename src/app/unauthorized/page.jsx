import React from 'react';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-black py-30 text-white flex flex-col items-center justify-center px-4 relative overflow-hidden select-none">
      
      {/* Background Premium Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.08)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-12 left-12 w-72 h-72 bg-red-500/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-12 right-12 w-72 h-72 bg-purple-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="w-full max-w-md z-10">
        <div className="bg-[#0c0c0e]/90 backdrop-blur-md border border-[#1c1c21] p-8 md:p-10 rounded-[28px] shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col items-center text-center relative overflow-hidden">
          
          {/* Top Border Glow Decorator */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

          {/* Unauthorized Alert Icon Animation Wrapper */}
          <div className="relative mb-8 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-red-500/20 blur-md animate-pulse opacity-60" />
            <div className="w-20 h-20 bg-gradient-to-b from-red-500/20 to-red-500/5 rounded-full flex items-center justify-center ring-1 border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.15)]">
              <svg 
                className="w-9 h-9 text-red-400 drop-shadow-[0_2px_8px_rgba(239,68,68,0.4)]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m0-8v4m12 3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          {/* Header & Status Code */}
          <span className="text-[10px] font-bold uppercase tracking-widest text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 mb-4">
            Error Code: 401
          </span>
          
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-b from-white to-[#a1a1a6] bg-clip-text text-transparent">
            Access Denied
          </h1>
          
          <p className="text-sm text-[#86868b] mt-3 px-2 leading-relaxed">
            You do not have permission to view this page, or your current session has expired. Please verify your credentials.
          </p>

          <div className="w-full border-t border-dashed border-[#1c1c21] my-6" />

          {/* Action Buttons */}
          <div className="w-full flex flex-col gap-3">
            <Link 
              href="/"
              className="w-full h-12 flex items-center justify-center text-sm font-semibold rounded-xl tracking-wide bg-gradient-to-r from-[#bf5af2] to-[#ac49dc] text-white hover:from-[#ac49dc] hover:to-[#963bc5] shadow-[0_4px_24px_rgba(191,90,242,0.25)] transition-all duration-300 active:scale-[0.98]"
            >
              Back to Home
            </Link>

            <Link 
              href="/login"
              className="w-full h-12 flex items-center justify-center text-sm font-semibold rounded-xl tracking-wide bg-[#1c1c1f] hover:bg-white text-[#f5f5f7] hover:text-black border border-[#2c2c2e] hover:border-white shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all duration-300 active:scale-[0.98]"
            >
              Sign In with Another Account
            </Link>
          </div>

          {/* Support Info Footer */}
          <p className="text-[11px] text-[#636366] mt-6 leading-normal">
            If you believe this is an error, please contact{' '}
            <a href="mailto:support@hireloop.com" className="text-[#a1a1aa] hover:text-white underline underline-offset-2 transition-colors">
              support
            </a>.
          </p>

        </div>
      </div>
    </div>
  );
}