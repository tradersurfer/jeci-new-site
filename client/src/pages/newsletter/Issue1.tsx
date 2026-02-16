import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'wouter';

export default function NewsletterIssue1() {
  
  // SEO Meta Tags Effect
  useEffect(() => {
    document.title = "JECI Edge Weekly #1 - Tax Season Alert | JECI Group";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', "JECI Edge Weekly Issue #1 - Tax Season Alert: Crypto rules tightening + gig worker wins. Your no-BS briefing on staying ahead in finances, taxes, and business growth.");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-sans text-[#333]">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="max-w-[640px] mx-auto px-5 mb-6">
           <Link href="/">
             <a className="inline-flex items-center text-[#0066cc] font-bold hover:underline transition-all">
               ← Back to Home
             </a>
           </Link>
        </div>

        <div className="max-w-[640px] mx-auto bg-white p-8 md:p-10 rounded-xl shadow-sm border border-slate-100">
          
          {/* Header */}
          <div className="text-center border-b-[3px] border-[#0066cc] pb-5 mb-8">
            <h1 className="text-3xl font-bold text-[#0066cc] tracking-wide m-0">JECI EDGE WEEKLY</h1>
            <p className="text-sm text-[#666] italic mt-1 mb-2">Innovate. Optimize. Grow.</p>
            <p className="text-xs text-[#999] uppercase tracking-[1.5px] font-medium">Issue #1 – February 14, 2026</p>
          </div>

          {/* Hero Banner */}
          <div className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white p-10 text-center rounded-lg mb-8 shadow-lg transform -mx-4 md:-mx-8 border border-[#667eea]/30">
            <div className="text-5xl mb-3">🚨</div>
            <p className="text-xl font-bold m-0 leading-tight">Tax Season Alert: 2025 Returns Due April 15, 2026</p>
            <p className="text-white/90 text-sm mt-2 font-medium">Crypto rules tightening + gig worker wins inside</p>
          </div>

          {/* Greeting */}
          <p className="mb-5 text-lg">Hey Edge Subscriber,</p>
          <p className="mb-5 leading-relaxed text-slate-700">
            Welcome to the very first <strong>JECI Edge Weekly</strong> — your no-BS briefing on staying ahead in finances, taxes, and business growth. I'm Adrian Jordan, CMA and founder of JECI Group (JECI™ Tax + JECI™ Consulting).
          </p>

          {/* Intro Box */}
          <div className="bg-[#f8f9fa] p-6 border-l-4 border-[#0066cc] my-6 rounded-r-lg">
            <p className="m-0 mb-4 leading-relaxed">
              <strong>We're in the thick of tax season:</strong> 2025 returns due April 15, 2026. With new crypto reporting kicking in (1099-DA forms rolling out) and gig economy changes (like no-tax-on-tips deductions up to $25k in qualified cases), now's the time to get crystal clear.
            </p>
            <p className="m-0 leading-relaxed">
              <strong>This week:</strong> Quick wins across our core services so you can innovate smarter, optimize harder, and grow faster.
            </p>
          </div>

          {/* Deadline Banner */}
          <div className="bg-gradient-to-br from-[#ff6b6b] to-[#ee5a6f] text-white p-4 rounded-lg text-center my-6 border border-[#ff6b6b]/30 shadow-md">
            <p className="text-lg font-bold m-0">⏰ April 15, 2026 Deadline</p>
            <p className="text-xs opacity-95 mt-1 font-medium">File or Extend to avoid penalties!</p>
          </div>

          {/* SECTION 1: TAX PREP */}
          <div className="my-10">
            <span className="inline-block bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white px-4 py-2 rounded-full text-sm font-bold mb-3 shadow-sm">
              01 | Tax Prep & Planning
            </span>
            <h2 className="text-xl font-bold text-[#1a1a1a] mt-2 mb-2">The "Crypto-Blind" Trap 🛑</h2>
            
            <div className="bg-gradient-to-br from-[#667eea]/5 to-[#764ba2]/5 border-l-4 border-[#667eea] p-5 my-5 rounded-r-lg">
              <div className="font-bold text-[#667eea] text-sm uppercase tracking-wide flex items-center gap-2 mb-3">
                <span className="w-6 h-6 bg-[#667eea] rounded-full text-white flex items-center justify-center text-xs">💡</span>
                Quick Win
              </div>
              <p className="m-0 text-slate-700">
                Don't guess on crypto. If you traded, staked, or used DeFi in 2025, you need a specialized reconciliation.
              </p>
            </div>

            <p className="mb-4 leading-relaxed text-slate-700">Many new clients come to us with "messy wallets." The IRS isn't playing games with digital assets anymore. If you haven't tracked your cost basis, you could be paying taxes on pure revenue instead of net gains.</p>
            
            <ul className="pl-5 mb-6 space-y-2 text-slate-700">
              <li><span className="bg-gradient-to-br from-[#f093fb] to-[#f5576c] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mr-2">Action</span> Connect your exchanges to a tracker (like Koinly or CoinTracker) NOW.</li>
              <li><span className="bg-gradient-to-br from-[#f093fb] to-[#f5576c] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mr-2">Action</span> Review your "gas fees" — they are deductible against gains!</li>
            </ul>

            <Link href="/contact">
              <a className="inline-block bg-gradient-to-br from-[#0066cc] to-[#0052a3] text-white px-7 py-3.5 rounded-md font-bold text-sm hover:-translate-y-0.5 hover:shadow-lg transition-all">
                Book Your Tax Strategy Call
              </a>
            </Link>
          </div>

          <hr className="border-slate-100 my-8" />

          {/* SECTION 2: BOOKKEEPING */}
          <div className="my-10">
            <span className="inline-block bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white px-4 py-2 rounded-full text-sm font-bold mb-3 shadow-sm">
              02 | Bookkeeping & Accounting
            </span>
            <h2 className="text-xl font-bold text-[#1a1a1a] mt-2 mb-2">Stop "Shoeboxing" Your Receipts 📦</h2>
            
            <div className="flex flex-wrap gap-4 my-6">
              <div className="flex-1 min-w-[140px] bg-white border border-slate-200 rounded-lg p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-[#667eea] mb-1">20%</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wide">Avg. Lost Deductions</div>
              </div>
              <div className="flex-1 min-w-[140px] bg-white border border-slate-200 rounded-lg p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-[#667eea] mb-1">10+ hrs</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wide">Wasted Searching</div>
              </div>
            </div>

            <p className="mb-4 leading-relaxed text-slate-700">Are you mixing business meals with personal DoorDash? That's a "piercing the corporate veil" risk. Separate accounts are the #1 defense in an audit.</p>
            
            <div className="bg-[#fffbf0] border-l-4 border-[#ffc107] p-5 my-5 rounded-r-lg">
              <p className="m-0 text-slate-700"><strong>Pro Tip:</strong> Use a dedicated business credit card for EVERYTHING. It auto-generates your expense report.</p>
            </div>

            <Link href="/resources">
              <a className="inline-block bg-transparent text-[#0066cc] font-bold text-sm border-2 border-[#0066cc] px-6 py-3 rounded-md hover:bg-[#0066cc] hover:text-white transition-all">
                Get Your Free Profit Leak Detector Worksheet
              </a>
            </Link>
          </div>

          <hr className="border-slate-100 my-8" />

          {/* SECTION 3: CONSULTING */}
          <div className="my-10">
            <span className="inline-block bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white px-4 py-2 rounded-full text-sm font-bold mb-3 shadow-sm">
              03 | Business Consulting
            </span>
            <h2 className="text-xl font-bold text-[#1a1a1a] mt-2 mb-2">The "Solopreneur" Ceiling 📉</h2>

            <p className="mb-4 leading-relaxed text-slate-700">You can't scale if you are the admin, the CEO, and the janitor. 2026 is the year of <strong>Delegation</strong>.</p>
            
            <div className="bg-gradient-to-r from-[#e3f2fd] to-[#f3e5f5] border border-[#90caf9] p-5 rounded-lg my-5">
              <h3 className="text-lg font-bold text-[#1a1a1a] mt-0 mb-3">The 3-Tier Test:</h3>
              <ol className="pl-5 m-0 space-y-2 text-slate-700">
                <li>Is this a $10/hr task? (Admin)</li>
                <li>Is this a $100/hr task? (Specialist)</li>
                <li>Is this a $1,000/hr task? (Strategy)</li>
              </ol>
              <p className="mt-3 mb-0 text-sm italic text-slate-600">If you're doing #1, you're losing money.</p>
            </div>

            <Link href="/contact">
              <a className="inline-block bg-gradient-to-br from-[#0066cc] to-[#0052a3] text-white px-7 py-3.5 rounded-md font-bold text-sm hover:-translate-y-0.5 hover:shadow-lg transition-all">
                Schedule a Free Coffee Chat Consult
              </a>
            </Link>
          </div>

          {/* RESOURCES BANNER */}
          <div className="bg-gradient-to-r from-[#ffc107]/20 to-[#ff9800]/20 border border-[#ffc107]/40 p-6 rounded-lg my-8 text-center">
            <div className="flex justify-center gap-6 mb-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-2xl shadow-sm mx-auto mb-2 border-2 border-[#ffc107]/30">📝</div>
                <div className="text-[10px] font-bold uppercase tracking-wide text-slate-600">Checklist</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-2xl shadow-sm mx-auto mb-2 border-2 border-[#ffc107]/30">📊</div>
                <div className="text-[10px] font-bold uppercase tracking-wide text-slate-600">Worksheet</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-2xl shadow-sm mx-auto mb-2 border-2 border-[#ffc107]/30">🔍</div>
                <div className="text-[10px] font-bold uppercase tracking-wide text-slate-600">Audit</div>
              </div>
            </div>
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">Want the Tools Mentioned?</h3>
            <p className="text-sm text-slate-600 mb-4">Download the Crypto Tax Health Checklist, Profit Leak Detector, and Ops Quick Audit.</p>
            <Link href="/resources">
              <a className="inline-block bg-[#ffc107] text-slate-900 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#ffb300] hover:shadow-md transition-all">
                Access Free Resources Hub
              </a>
            </Link>
          </div>

          {/* FINAL EDGE */}
          <div className="bg-gradient-to-br from-[#1a1a1a] to-[#333] text-white p-8 rounded-lg my-8">
            <h3 className="text-xl font-bold mt-0 mb-3 text-white">This Week's Edge:</h3>
            <p className="m-0 text-lg leading-relaxed text-white/90 font-medium italic">
              "Revenue is vanity. Profit is sanity. Cash is king." — Unknown
            </p>
            <p className="mt-3 text-sm opacity-70">Focus on cash flow this week. Invoice early. Follow up.</p>
          </div>

          {/* SIGNATURE */}
          <div className="mt-10 pt-6 border-t-2 border-[#e0e0e0]">
            <p className="font-bold text-lg mb-1 text-[#1a1a1a]">Adrian Jordan, CMA</p>
            <p className="text-[#666] text-sm mb-3">Founder, The JECI Group</p>
            <div className="text-sm text-[#666] space-y-1">
              <p>🌐 <a href="https://www.jecigroup.com" className="text-[#0066cc] hover:underline">www.jecigroup.com</a></p>
              <p>📧 <a href="mailto:jecitax@gmail.com" className="text-[#0066cc] hover:underline">jecitax@gmail.com</a></p>
            </div>
          </div>

          {/* FOOTER */}
          <div className="text-center mt-10 pt-6 border-t border-[#e0e0e0] text-xs text-[#999]">
            <p>© 2026 JECI Group. All rights reserved.</p>
            <div className="flex justify-center gap-4 mt-2">
              <a href="https://twitter.com/adrianjordanio" className="text-[#0066cc] hover:underline">X (Twitter)</a>
              <a href="https://linkedin.com/in/adrianjordan" className="text-[#0066cc] hover:underline">LinkedIn</a>
              <a href="https://instagram.com/jecigroup" className="text-[#0066cc] hover:underline">Instagram</a>
            </div>
            <p className="mt-4">
              <Link href="/newsletter">
                <a className="text-[#0066cc] font-bold hover:underline">View Newsletter Archive</a>
              </Link>
            </p>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}
