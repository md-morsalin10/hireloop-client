"use client";

import React, { useState } from "react";
import { Card, Button, Accordion, AccordionItem } from "@heroui/react";

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState("seekers");

  const seekerPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/forever",
      description: "Perfect for exploring the platform and starting your search.",
      features: [
        "Browse & save up to 10 jobs",
        "Apply to up to 3 jobs per month",
        "Basic profile status",
        "Standard email alerts",
      ],
      buttonText: "Get Started",
      featured: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "Accelerate your job hunt with advanced tracking tools.",
      features: [
        "Apply to up to 30 jobs per month",
        "Unlimited saved jobs",
        "Full application tracking",
        "Deep salary insights",
      ],
      buttonText: "Upgrade to Pro",
      featured: true,
    },
    {
      name: "Premium",
      price: "$39",
      period: "/month",
      description: "Ultimate visibility and priority tools for top professionals.",
      features: [
        "Everything in Pro",
        "Unlimited job applications",
        "Profile boost to elite recruiters",
        "Early access to new job listings",
        "Priority customer support",
      ],
      buttonText: "Go Premium",
      featured: false,
    },
  ];

  const recruiterPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/forever",
      description: "Great for a company's first year of hiring and testing features.",
      features: [
        "Up to 3 active job posts",
        "Basic applicant management",
        "Standard listing visibility",
      ],
      buttonText: "Post a Job Free",
      featured: false,
    },
    {
      name: "Growth",
      price: "$49",
      period: "/month",
      description: "Perfect for expanding teams needing better candidate insights.",
      features: [
        "Up to 10 active job posts",
        "Full applicant tracking system",
        "Basic recruitment analytics",
        "Dedicated email support",
      ],
      buttonText: "Choose Growth",
      featured: true,
    },
    {
      name: "Enterprise",
      price: "$149",
      period: "/month",
      description: "Complete hiring suite for high-volume recruitment needs.",
      features: [
        "Up to 50 active job posts",
        "Advanced analytics dashboard",
        "Featured job listings boost",
        "Team collaboration tools",
        "Custom company branding",
        "Priority 24/7 support",
      ],
      buttonText: "Contact Sales",
      featured: false,
    },
  ];

  const faqs = [
    {
      title: "How do I switch between plans?",
      content:
        "You can upgrade or downgrade your plan at any time from your account billing settings. Upgrades are applied instantly with prorated charges, while downgrades take effect at the end of your current billing cycle.",
    },
    {
      title: "What is your cancellation policy?",
      content:
        "You can cancel your subscription whenever you want. Once cancelled, you will retain access to your plan's premium features until your paid monthly cycle officially expires.",
    },
    {
      title: "Can I get a refund if I change my mind?",
      content:
        "We offer a 7-day refund guarantee for new subscriptions if the core features do not match your requirements. Please contact our support team with your transaction details to process a claim.",
    },
    {
      title: "What payment methods are supported?",
      content:
        "We accept all major international and local credit cards, debit cards, and secure digital payment gateways through our encrypted checkout flow.",
    },
  ];



  const displayPlans = activeTab === "seekers" ? seekerPlans : recruiterPlans;
  const tabs = [
    { key: "seekers", label: "For Job Seekers" },
    { key: "recruiters", label: "For Recruiters" },
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20 px-4 md:px-8 flex flex-col items-center">

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-[radial-gradient(circle_at_center,rgba(191,90,242,0.07)_0%,transparent_65%)] pointer-events-none" />

      {/* Hero Header */}
      <div className="text-center max-w-xl mb-12 z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white to-[#86868b] bg-clip-text text-transparent">
          Plans for Every Stage
        </h1>
        <p className="text-[#86868b] text-sm md:text-base mt-3">
          Get transparent, predictable pricing whether you are looking for your
          next tech role or building a massive engineering team.
        </p>
      </div>

      {/* ─── Custom Tab Toggle — HeroUI Tabs replace করা হয়েছে ─── */}
      <div className="mb-14 z-10 flex items-center gap-1 p-1 rounded-xl bg-[#0f0f12] border border-[#1a1a1e]">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${activeTab === tab.key
                ? "bg-[#bf5af2] text-white shadow-[0_2px_12px_rgba(191,90,242,0.35)]"
                : "text-[#86868b] hover:text-white"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Pricing Cards */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-28 z-10">
        {displayPlans.map((plan, index) => (
          <Card
            key={index}
            className={`bg-[#0a0a0c] p-8 rounded-[24px] flex flex-col justify-between transition-all duration-300 relative overflow-hidden shadow-xl ${plan.featured
                ? "border-2 border-[#bf5af2] ring-4 ring-[#bf5af2]/10 md:-translate-y-2 scale-[1.02]"
                : "border border-[#1a1a1e] hover:border-[#2a2a2e]"
              }`}
          >
            {plan.featured && (
              <span className="absolute top-4 right-4 bg-[#bf5af2] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md">
                Popular Choice
              </span>
            )}

            <div>
              <h3 className="text-xl font-bold text-[#f5f5f7]">{plan.name}</h3>
              <p className="text-xs text-[#86868b] mt-1.5 min-h-[32px] leading-relaxed">
                {plan.description}
              </p>

              <div className="my-6 flex items-baseline gap-1">
                <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                  {plan.price}
                </span>
                <span className="text-xs text-[#636366] font-medium tracking-wide">
                  {plan.period}
                </span>
              </div>

              <hr className="border-[#1a1a1e] my-4" />

              <ul className="flex flex-col gap-3.5 mt-4">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-xs md:text-sm text-[#e5e5ea]"
                  >
                    <svg
                      className={`w-4 h-4 mt-0.5 shrink-0 ${plan.featured ? "text-[#bf5af2]" : "text-[#86868b]"
                        }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">

              <form action="/api/checkout_sessions" method="POST">
                <section>
                  <button type="submit" role="link"
                   className={`w-full h-11 text-xs md:text-sm font-semibold rounded-xl tracking-wide transition-all duration-200 active:scale-[0.98] ${plan.featured
                    ? "bg-[#bf5af2] hover:bg-[#ac49dc] text-white shadow-[0_4px_20px_rgba(191,90,242,0.25)]"
                    : "bg-[#1c1c1f] hover:bg-[#2c2c2e] text-[#f5f5f7] border border-[#2c2c2e]"
                  }`}
                  >
                    Checkout
                  </button>
                </section>
              </form>
            </div>
          </Card>
        ))}
      </div>

      {/* FAQ */}
      <div className="w-full max-w-3xl z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs md:text-sm text-[#86868b] mt-2">
            Everything you need to know about plans, payments, and tier
            modifications.
          </p>
        </div>

        <Accordion
          variant="splitted"
          className="px-0 gap-3"
          itemClasses={{
            base: "bg-[#0a0a0c] border border-[#1a1a1e] rounded-xl px-4 overflow-hidden data-[open=true]:border-[#bf5af2]/30 transition-all shadow-md",
            title:
              "text-sm md:text-base font-semibold text-[#f5f5f7] hover:text-white py-4",
            trigger: "focus:outline-none",
            indicator:
              "text-[#86868b] data-[open=true]:text-[#bf5af2]",
            content:
              "text-xs md:text-sm text-[#86868b] pb-5 pt-0 leading-relaxed",
          }}
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              aria-label={faq.title}
              title={faq.title}
            >
              <p>{faq.content}</p>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}