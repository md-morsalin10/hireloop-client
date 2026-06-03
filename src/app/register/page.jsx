"use client";

import React, { useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeSlash, Person, At, ShieldCheck } from "@gravity-ui/icons";
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Label, Radio, RadioGroup } from '@heroui/react';

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    // 📩 ১. ইমেইল সাইন আপ হ্যান্ডলার
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const users = Object.fromEntries(formData.entries());

        console.log(users);

        const { data, error } = await authClient.signUp.email({
            name: users.name,
            image: users.image,
            email: users.email,
            password: users.password,
            role: users.role
        });

        console.log(data);

        if (data) {
            toast.success('Sign up Successful');
            router.push("/login");
        }
        if (error) {
            toast.error(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (err) {
            toast.error("Google Sign-In failed. Please try again.");
            console.error(err);
        }
    };

    return (
        <section className="relative w-full min-h-screen bg-[#0B0F19] flex items-center justify-center py-40 px-4 sm:px-6 font-sans overflow-hidden select-none">

            <div className="absolute top-1/4 left-1/4 w-100 h-100 bg-indigo-600/3 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-100 h-100 bg-purple-600/2 rounded-full blur-[120px] pointer-events-none" />


            <div className="relative z-10 w-full max-w-120 bg-[#0E1220]/70 backdrop-blur-xl border border-white/5 rounded-[28px] p-8 sm:p-10 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.7)]">


                <div className="flex flex-col items-center text-center mb-8">
                    <Link href="/" className="mb-5 block transition-opacity duration-150 hover:opacity-90">
                        <Image
                            src="/images/logo.png"
                            alt="HireLoop Logo"
                            width={130}
                            height={36}
                            priority
                        />
                    </Link>
                    <h2 className="text-white text-2xl font-bold tracking-tight mb-2">
                        Create your account
                    </h2>
                    <p className="text-gray-400 text-[13.5px] font-light">
                        Join HireLoop to accelerate your career growth
                    </p>
                </div>


                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-300 text-[13px] font-medium tracking-wide">Full Name</label>
                        <div className="relative w-full h-12 bg-[#121624]/60 border border-white/6 rounded-xl flex items-center px-4 transition-all duration-200 focus-within:border-indigo-500/50 focus-within:shadow-[0_0_12px_rgba(99,102,241,0.15)]">
                            <Person className="text-gray-500 text-base shrink-0 mr-3" />
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="John Doe"
                                className="w-full bg-transparent text-white text-[13.5px] font-light placeholder-gray-600 outline-none"
                            />
                        </div>
                    </div>

                    {/* email */}
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-300 text-[13px] font-medium tracking-wide">Email Address</label>
                        <div className="relative w-full h-12 bg-[#121624]/60 border border-white/6 rounded-xl flex items-center px-4 transition-all duration-200 focus-within:border-indigo-500/50 focus-within:shadow-[0_0_12px_rgba(99,102,241,0.15)]">
                            <At className="text-gray-500 text-base shrink-0 mr-3" />
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="name@example.com"
                                className="w-full bg-transparent text-white text-[13.5px] font-light placeholder-gray-600 outline-none"
                            />
                        </div>
                    </div>

                    {/* image */}
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-300 text-[13px] font-medium tracking-wide">Image</label>
                        <div className="relative w-full h-12 bg-[#121624]/60 border border-white/6 rounded-xl flex items-center px-4 transition-all duration-200 focus-within:border-indigo-500/50 focus-within:shadow-[0_0_12px_rgba(99,102,241,0.15)]">
                            <Person className="text-gray-500 text-base shrink-0 mr-3" />
                            <input
                                type="url"
                                name="image"
                                required
                                placeholder="Enter image url"
                                className="w-full bg-transparent text-white text-[13.5px] font-light placeholder-gray-600 outline-none"
                            />
                        </div>
                    </div>
                    {/* password */}
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-300 text-[13px] font-medium tracking-wide">Password</label>
                        <div className="relative w-full h-12 bg-[#121624]/60 border border-white/6 rounded-xl flex items-center px-4 transition-all duration-200 focus-within:border-indigo-500/50 focus-within:shadow-[0_0_12px_rgba(99,102,241,0.15)]">
                            <ShieldCheck className="text-gray-500 text-base shrink-0 mr-3" />
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                placeholder="••••••••"
                                className="w-full bg-transparent text-white text-[13.5px] font-light placeholder-gray-600 outline-none tracking-widest"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-gray-500 hover:text-gray-300 transition-colors duration-150 pl-2 outline-none"
                            >
                                {showPassword ? <EyeSlash className="text-base" /> : <Eye className="text-base" />}
                            </button>
                        </div>
                    </div>
                    {/* role */}
                    <div className="flex flex-col text-white gap-4">
                        <Label className='text-white'>Select Role</Label>
                        <RadioGroup defaultValue="seeker" name="role" orientation="horizontal">
                            <Radio value="seeker">
                                <Radio.Control>
                                    <Radio.Indicator />
                                </Radio.Control>
                                <Radio.Content>
                                    <Label className='text-white' >Seeker</Label>
                                </Radio.Content>
                            </Radio>
                            <Radio value="recruiter">
                                <Radio.Control>
                                    <Radio.Indicator />
                                </Radio.Control>
                                <Radio.Content>
                                    <Label className='text-white'>Recruiter</Label>
                                </Radio.Content>
                            </Radio>
                        </RadioGroup>
                    </div>
                    <button
                        type="submit"
                        className="w-full h-12 bg-[#6366F1] hover:bg-[#4F46E5] text-white text-[14px] font-semibold rounded-xl shadow-[0_4px_20px_rgba(99,102,241,0.25)] hover:shadow-[0_4px_25px_rgba(99,102,241,0.35)] transition-all duration-200 flex items-center justify-center gap-2 mt-2 hover:scale-[1.01] active:scale-[0.99]"
                    >
                        Create Account
                    </button>
                </form>


                <div className="relative flex py-5 items-center">
                    <div className="grow border-t border-white/6"></div>
                    <span className="shrink mx-4 text-gray-500 text-[12px] font-mono tracking-wider uppercase">Or continue with</span>
                    <div className="grow border-t border-white/6"></div>
                </div>


                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full h-12 bg-[#121624]/60 border border-white/6 hover:bg-[#161b2c] text-white text-[13.5px] font-medium rounded-xl transition-all duration-150 flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.99]"
                >
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                        <path
                            fill="#EA4335"
                            d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.48 14.98 1 12 1 7.35 1 3.37 3.66 1.39 7.56l3.89 3.02C6.21 7.42 8.87 5.04 12 5.04z"
                        />
                        <path
                            fill="#4285F4"
                            d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.44h6.44c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.39-4.87 3.39-8.49z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.28 14.58c-.23-.69-.36-1.42-.36-2.18s.13-1.49.36-2.18L1.39 5.2C.5 6.98 0 8.98 0 11s.5 4.02 1.39 5.8l3.89-3.02z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.66-2.84c-1.01.67-2.31 1.08-4.3 1.08-3.13 0-5.79-2.38-6.74-5.54L1.39 15.8C3.37 19.7 7.35 23 12 23z"
                        />
                    </svg>
                    Continue with Google
                </button>

                <div className="mt-8 pt-6 border-t border-white/4 text-center">
                    <p className="text-gray-400 text-[13px] font-light">
                        Already have an account?{" "}
                        <Link href="/login" className="text-[#6366F1] font-medium hover:text-[#818CF8] hover:underline transition-colors duration-150">
                            Sign In
                        </Link>
                    </p>
                </div>

            </div>
        </section>
    );
};

export default RegisterPage;