"use client";

import React, { useState } from "react";
import Link from "next/link";

type Tab = {
  id: string;
  label: string;
  icon: string;
};

const tabs: Tab[] = [
  { id: "intro", label: "Executive Summary", icon: "📝" },
  { id: "part1", label: "Part 1: Customer Intelligence", icon: "🧠" },
  { id: "part2", label: "Part 2: Sales Forecasting", icon: "📈" },
  { id: "part3", label: "Part 3: Competitive Intelligence", icon: "🕵️" },
  { id: "part4", label: "Part 4: Marketing Automation", icon: "🤖" },
  { id: "part5", label: "Part 5: Decision Challenge", icon: "⚖️" },
  { id: "conclusion", label: "Conclusion", icon: "🎯" },
];

export default function Assignment4() {
  const [activeTab, setActiveTab] = useState("intro");

  return (
    <div className="bg-cream py-10 md:py-16 text-charcoal min-h-screen">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mb-10 text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-mango">
            The Dhamaka Blueprint
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold sm:text-5xl md:text-6xl text-charcoal">
            Customer Feedback & Analytics
          </h1>
          <p className="mt-4 text-lg text-charcoal/70 max-w-2xl mx-auto">
            From Trend to Scale: Building an AI-Driven Food Truck Growth Engine
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="md:w-1/4 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-3xl p-4 shadow-sm border border-charcoal/10">
              <nav className="flex flex-col space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-left font-semibold transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-chili text-white shadow-md transform scale-[1.02]"
                        : "text-charcoal/70 hover:bg-charcoal/5 hover:text-charcoal"
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span className="text-sm">{tab.label}</span>
                  </button>
                ))}
              </nav>
              
              <div className="mt-8 pt-6 border-t border-charcoal/10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-charcoal/50 mb-3 px-2">Team Info</h3>
                <div className="bg-charcoal/5 rounded-2xl p-4 text-xs text-charcoal/70">
                  <p className="font-bold text-charcoal mb-2">Fundamentals of Marketing (AIUE3013)</p>
                  <ul className="space-y-1">
                    <li>Hassan (L1F22BSAI0055)</li>
                    <li>M. Saad (L1F22BSAI0014)</li>
                    <li>Faiq Fawad (L1F22BSAI0042)</li>
                    <li>Ghaniya (L1F22BSAI0040)</li>
                    <li>Ahmad Ibrahim (L1F22BSAI0047)</li>
                    <li>Maryam (L1F22BSAI0015)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="md:w-3/4 bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-charcoal/10 relative overflow-hidden">
            {activeTab === "intro" && (
              <div className="animate-fade-in prose prose-charcoal max-w-none">
                <h2 className="font-display text-3xl font-extrabold text-chili flex items-center gap-2">
                  <span className="text-4xl">📝</span> Executive Summary
                </h2>
                <p className="text-lg leading-relaxed text-charcoal/80">
                  Chatak Patak is a Lahore-based customizable street-food truck that builds flavour-forward snack bowls using branded chip bases (Kurkure, Lays, Nachos) layered with chaat-style toppings, sauces, grilled chicken, and specialty beverages. Launched targeting the youth demographic of University of Central Punjab and surrounding campuses, the brand has grown through three progressive academic assignments that established its market research foundation (Assignment 1), product and pricing strategy (Assignment 2), and Integrated Marketing Communications plan (Assignment 3).
                </p>
                <p className="text-lg leading-relaxed text-charcoal/80">
                  Assignment 4 applies artificial intelligence and data analytics thinking to four critical business challenges: (i) developing deep, AI-validated customer personas; (ii) building predictive sales forecasts across daily, weekly, monthly, and quarterly horizons; (iii) conducting competitive intelligence benchmarking against five direct and three indirect competitors; and (iv) designing an AI driven marketing automation ecosystem including a customer chatbot and loyalty workflow.
                </p>

                <h3 className="font-display text-2xl font-bold text-charcoal mt-10">1. Introduction</h3>
                <div className="bg-mango/10 rounded-2xl p-6 border border-mango/20">
                  <p className="text-charcoal/90 mb-0">
                    The Chatak Patak journey began with a problem: the Lahore youth market was caught between two unsatisfying extremes — unhygienic traditional street stalls and overpriced branded cafes. Assignments 1 through 3 systematically addressed this gap. Assignment 4 now advances Chatak Patak into its next strategic phase: scaling intelligently using AI powered customer intelligence, predictive analytics, competitive monitoring, and marketing automation.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "part1" && (
              <div className="animate-fade-in prose prose-charcoal max-w-none">
                <h2 className="font-display text-3xl font-extrabold text-chili flex items-center gap-2">
                  <span className="text-4xl">🧠</span> AI Customer Intelligence
                </h2>
                <p className="text-lg text-charcoal/80">
                  AI-driven customer intelligence deepens the segmentation established in Assignment 1 by adding psychographic, behavioural, and digital-journey dimensions.
                </p>

                <div className="grid gap-6 md:grid-cols-2 mt-8">
                  <div className="bg-gradient-to-br from-charcoal/5 to-charcoal/10 p-6 rounded-3xl border border-charcoal/10 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl bg-white rounded-full p-2 shadow-sm">🎒</span>
                      <h3 className="text-xl font-bold text-charcoal my-0">Zain Malik <span className="block text-sm font-normal text-chili">&apos;The Hype Hunter&apos;</span></h3>
                    </div>
                    <ul className="text-sm space-y-2 mb-0">
                      <li><strong>Age/Gender:</strong> 20 | Male</li>
                      <li><strong>Occupation:</strong> BS Computer Science student</li>
                      <li><strong>Tech Usage:</strong> Instagram, TikTok (daily 3-5 hrs)</li>
                      <li><strong>Buying Behaviour:</strong> Impulse purchase; 2–3 visits/week</li>
                      <li><strong>Pain Points:</strong> Cafeteria queues, &apos;boring&apos; food</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-mango/10 to-mango/20 p-6 rounded-3xl border border-mango/20 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl bg-white rounded-full p-2 shadow-sm">💼</span>
                      <h3 className="text-xl font-bold text-charcoal my-0">Hira Noor <span className="block text-sm font-normal text-mango-dark">&apos;The Mindful Muncher&apos;</span></h3>
                    </div>
                    <ul className="text-sm space-y-2 mb-0">
                      <li><strong>Age/Gender:</strong> 27 | Female</li>
                      <li><strong>Occupation:</strong> Junior Software Engineer</li>
                      <li><strong>Tech Usage:</strong> LinkedIn, Instagram</li>
                      <li><strong>Buying Behaviour:</strong> Planned purchase; 1–2 visits/week</li>
                      <li><strong>Pain Points:</strong> Unhygienic preparation, slow service</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/20 p-6 rounded-3xl border border-emerald-500/20 hover:shadow-md transition-shadow md:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl bg-white rounded-full p-2 shadow-sm">👨‍👩‍👧</span>
                      <h3 className="text-xl font-bold text-charcoal my-0">Asim & Saba Butt <span className="block text-sm font-normal text-emerald-600">&apos;The Saturday Snackers&apos;</span></h3>
                    </div>
                    <ul className="text-sm space-y-2 mb-0 md:columns-2">
                      <li><strong>Age/Gender:</strong> Family Unit</li>
                      <li><strong>Occupation:</strong> Bank officer & Teacher</li>
                      <li><strong>Tech Usage:</strong> Facebook (primary)</li>
                      <li><strong>Buying Behaviour:</strong> Weekend-only</li>
                      <li><strong>Pain Points:</strong> Inconsistent quality, no mild options</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "part2" && (
              <div className="animate-fade-in prose prose-charcoal max-w-none">
                <h2 className="font-display text-3xl font-extrabold text-chili flex items-center gap-2">
                  <span className="text-4xl">📈</span> Predictive Sales Forecasting
                </h2>
                <p className="text-lg text-charcoal/80">
                  Translating marketing assumptions into financial projections that guide inventory, staffing, and expansion decisions.
                </p>

                <div className="mt-8 overflow-hidden rounded-3xl border border-charcoal/10 shadow-sm">
                  <div className="bg-charcoal px-6 py-4">
                    <h3 className="text-white text-lg font-bold my-0">Monthly Revenue Forecast (Months 1–6)</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap mb-0">
                      <thead>
                        <tr className="bg-charcoal/5 text-charcoal">
                          <th className="px-6 py-4 font-bold">Month</th>
                          <th className="px-6 py-4 font-bold">Avg Daily Customers</th>
                          <th className="px-6 py-4 font-bold">Monthly Revenue (PKR)</th>
                          <th className="px-6 py-4 font-bold">Cumulative (PKR)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-charcoal/10">
                        <tr className="hover:bg-mango/5"><td className="px-6 py-4">Month 1 (Launch)</td><td className="px-6 py-4 font-semibold text-chili">60</td><td className="px-6 py-4">312,000</td><td className="px-6 py-4">312,000</td></tr>
                        <tr className="hover:bg-mango/5"><td className="px-6 py-4">Month 2</td><td className="px-6 py-4 font-semibold text-chili">65</td><td className="px-6 py-4">338,000</td><td className="px-6 py-4">650,000</td></tr>
                        <tr className="bg-mango/10 hover:bg-mango/20"><td className="px-6 py-4 font-bold">Month 3 (Peak)</td><td className="px-6 py-4 font-bold text-chili">72</td><td className="px-6 py-4 font-bold">374,400</td><td className="px-6 py-4">1,024,400</td></tr>
                        <tr className="hover:bg-mango/5"><td className="px-6 py-4">Month 4</td><td className="px-6 py-4 font-semibold text-chili">68</td><td className="px-6 py-4">353,600</td><td className="px-6 py-4">1,378,000</td></tr>
                        <tr className="hover:bg-mango/5"><td className="px-6 py-4">Month 5</td><td className="px-6 py-4 font-semibold text-chili">75</td><td className="px-6 py-4">390,000</td><td className="px-6 py-4">1,768,000</td></tr>
                        <tr className="hover:bg-mango/5"><td className="px-6 py-4">Month 6</td><td className="px-6 py-4 font-semibold text-chili">82</td><td className="px-6 py-4">426,400</td><td className="px-6 py-4">2,194,400</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-8 bg-chili text-white p-6 rounded-3xl shadow-md">
                  <h3 className="text-white mt-0 mb-2">Quarterly Outlook</h3>
                  <p className="text-white/90 mb-0 font-semibold">
                    The model shows that achieving annual revenue of PKR 5,084,400 is realistic if the 8% monthly customer growth rate is sustained.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "part3" && (
              <div className="animate-fade-in prose prose-charcoal max-w-none">
                <h2 className="font-display text-3xl font-extrabold text-chili flex items-center gap-2">
                  <span className="text-4xl">🕵️</span> Competitive Intelligence & SWOT
                </h2>
                
                <h3 className="font-display text-2xl font-bold">Competitor Benchmark</h3>
                <p className="text-sm text-charcoal/80 mb-6">Chatak Patak leads in Hygiene, Customisation, and Speed.</p>
                
                <div className="grid md:grid-cols-2 gap-6 my-6">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-5xl">💪</div>
                    <h3 className="text-emerald-700 mt-0 flex items-center gap-2">
                      <span>✓</span> STRENGTHS
                    </h3>
                    <ul className="text-sm text-emerald-800/90 list-none pl-0 space-y-2 mb-0">
                      <li className="flex items-start gap-2"><span>•</span> Hygienic open-kitchen preparation</li>
                      <li className="flex items-start gap-2"><span>•</span> Strong visual brand identity (red+yellow)</li>
                      <li className="flex items-start gap-2"><span>•</span> Highly customisable menu (7+ core items)</li>
                      <li className="flex items-start gap-2"><span>•</span> Active Instagram/TikTok presence</li>
                      <li className="flex items-start gap-2"><span>•</span> Mobile — multi-location flexibility</li>
                    </ul>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-5xl">⚠️</div>
                    <h3 className="text-red-700 mt-0 flex items-center gap-2">
                      <span>✕</span> WEAKNESSES
                    </h3>
                    <ul className="text-sm text-red-800/90 list-none pl-0 space-y-2 mb-0">
                      <li className="flex items-start gap-2"><span>•</span> Single truck limits capacity</li>
                      <li className="flex items-start gap-2"><span>•</span> No seating area reduces dwell time</li>
                      <li className="flex items-start gap-2"><span>•</span> No digital ordering system yet</li>
                      <li className="flex items-start gap-2"><span>•</span> Dependence on weather</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "part4" && (
              <div className="animate-fade-in prose prose-charcoal max-w-none">
                <h2 className="font-display text-3xl font-extrabold text-chili flex items-center gap-2">
                  <span className="text-4xl">🤖</span> AI Marketing Automation
                </h2>
                
                <div className="bg-charcoal text-cream rounded-3xl p-8 my-8 relative overflow-hidden shadow-xl">
                  <div className="absolute -right-4 -top-4 opacity-5 text-9xl">💬</div>
                  <h3 className="text-white mt-0 mb-6 font-display">WhatsApp Chatbot Flow</h3>
                  
                  <div className="space-y-4 relative z-10">
                    <div className="flex gap-4">
                      <div className="bg-white/10 rounded-xl p-3 flex-1 backdrop-blur-sm border border-white/5">
                        <span className="text-xs uppercase tracking-wider text-mango mb-1 block">Trigger: &quot;Hi&quot;</span>
                        <p className="text-sm mb-0">Assalam-o-Alaikum! Welcome to Chatak Patak 🔍 How can we help you? Reply 1=Menu, 2=Location...</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-white/10 rounded-xl p-3 flex-1 backdrop-blur-sm border border-white/5">
                        <span className="text-xs uppercase tracking-wider text-mango mb-1 block">Trigger: &quot;1&quot;</span>
                        <p className="text-sm mb-0">Sends menu image + price list PDF. &quot;Want to build your bowl? Reply BASE to start!&quot;</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="bg-white/10 rounded-xl p-3 flex-1 backdrop-blur-sm border border-white/5">
                        <span className="text-xs uppercase tracking-wider text-mango mb-1 block">Trigger: &quot;POINTS&quot;</span>
                        <p className="text-sm mb-0">Your current points: [X]. Earn 10 points per bowl. 100 points = 1 FREE Dhamaka Bowl!</p>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold">Marketing Automation Workflow</h3>
                <ul className="text-charcoal/80 space-y-3">
                  <li><strong>Content Scheduling:</strong> Meta Business Suite auto-posts 3×/week.</li>
                  <li><strong>New Customer Welcome:</strong> Automated WhatsApp message + PKR 30 off.</li>
                  <li><strong>Win-Back Campaign:</strong> Message to inactive users after 14 days with 15% discount.</li>
                  <li><strong>Review Request:</strong> Sent 2 hrs post-purchase encouraging Google Maps review.</li>
                </ul>
              </div>
            )}

            {activeTab === "part5" && (
              <div className="animate-fade-in prose prose-charcoal max-w-none">
                <h2 className="font-display text-3xl font-extrabold text-chili flex items-center gap-2">
                  <span className="text-4xl">⚖️</span> Executive Decision Challenge
                </h2>
                
                <div className="bg-amber-100 border-l-4 border-amber-500 p-6 rounded-r-2xl my-6">
                  <h3 className="text-amber-900 mt-0 flex items-center gap-2">
                    <span>🚨</span> The Scenario
                  </h3>
                  <p className="text-amber-800/90 mb-0">
                    After three months of successful operations, Chatak Patak experiences a sudden <strong>25% decline</strong> in daily customers (from 72 to 54).
                  </p>
                </div>

                <h3 className="font-display text-xl font-bold">Root Cause Analysis</h3>
                <div className="grid sm:grid-cols-2 gap-4 my-6">
                  <div className="bg-charcoal/5 p-4 rounded-2xl border border-charcoal/10">
                    <span className="font-bold text-chili block mb-1">Seasonality (High Risk)</span>
                    <span className="text-sm text-charcoal/70">University exams reduce campus foot traffic by 40–60%.</span>
                  </div>
                  <div className="bg-charcoal/5 p-4 rounded-2xl border border-charcoal/10">
                    <span className="font-bold text-chili block mb-1">Competitive Entry (High Risk)</span>
                    <span className="text-sm text-charcoal/70">A copycat chip-bowl cart appeared near UCP gate at PKR 100.</span>
                  </div>
                </div>

                <h3 className="font-display text-xl font-bold">90-Day Recovery Strategy</h3>
                <ul className="space-y-4 pl-0 list-none mt-6">
                  <li className="flex gap-4">
                    <div className="bg-mango text-charcoal font-bold w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">1</div>
                    <div>
                      <strong className="text-charcoal block">Launch &apos;Dhamaka Refresh&apos;</strong>
                      <span className="text-sm text-charcoal/70">Combat menu fatigue with new seasonal items (Monsoon Masala Bowl).</span>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-mango text-charcoal font-bold w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">2</div>
                    <div>
                      <strong className="text-charcoal block">Win-Back WhatsApp Campaign</strong>
                      <span className="text-sm text-charcoal/70">Recover 20–30% of lapsed customers within 2 weeks.</span>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-mango text-charcoal font-bold w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">3</div>
                    <div>
                      <strong className="text-charcoal block">Campus Diversification</strong>
                      <span className="text-sm text-charcoal/70">Partner with COMSATS + UMT to offset UCP exam-period loss.</span>
                    </div>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === "conclusion" && (
              <div className="animate-fade-in prose prose-charcoal max-w-none">
                <h2 className="font-display text-3xl font-extrabold text-chili flex items-center gap-2">
                  <span className="text-4xl">🎯</span> Conclusion & Reflection
                </h2>
                
                <p className="text-lg text-charcoal/80">
                  This Assignment 4 report completes the strategic arc of Chatak Patak&apos;s academic journey from a field research concept to a commercialised brand, a full IMC campaign, and now a data-driven, AI-powered growth engine.
                </p>

                <div className="bg-emerald-500 text-white rounded-3xl p-8 my-8 shadow-lg">
                  <h3 className="text-white mt-0">The Bottom Line</h3>
                  <p className="text-white/90 mb-0 font-medium">
                    Chatak Patak is not merely a food truck — it is a scalable, insight-led food brand with the infrastructure to grow to a PKR 5 million annual revenue within its first operating year.
                  </p>
                </div>

                <h3 className="font-display text-2xl font-bold">Reflection on AI Usage</h3>
                <p className="text-charcoal/80 mb-6">
                  Artificial intelligence tools played a significant and transparent role in the production of this report. AI was used primarily as a structured thinking partner rather than a content generator: it helped the team frame business problems, suggested relevant marketing frameworks, and identified patterns in the data.
                </p>
                
                <blockquote className="border-l-4 border-chili pl-6 text-charcoal italic bg-charcoal/5 p-6 rounded-r-2xl">
                  &quot;The key lesson learned is that AI accelerates the structuring and articulation of business thinking, but it cannot replace the irreplaceable: primary human research, local market knowledge, and entrepreneurial judgment.&quot;
                </blockquote>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
