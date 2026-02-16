import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';
import { ArrowLeft, Clock, Calendar, ChevronRight, Mail } from 'lucide-react';

const NEWSLETTERS = [
  {
    id: 1,
    issue: 1,
    date: "February 14, 2026",
    title: "Tax Season Alert: 2025 Returns Due April 15",
    excerpt: "Crypto rules tightening + gig worker wins inside. Free tips + your edge starts here.",
    link: "/newsletter/issue-1"
  }
];

export default function NewsletterArchive() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      <div className="pt-24 pb-12 bg-white border-b border-slate-200">
        <div className="container px-4 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-primary mb-4 tracking-tight">JECI Edge Weekly</h1>
          <p className="text-xl text-slate-500 font-serif italic mb-6">Innovate. Optimize. Grow.</p>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Your no-BS briefing on staying ahead in finances, taxes, and business growth. Join thousands of founders optimizing their wealth.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#667eea] to-[#764ba2] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-white font-bold px-8 h-14 rounded-full"
              onClick={() => window.open('https://adrianjordanio.substack.com', '_blank')}
            >
              Subscribe on Substack <Mail className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container px-4 py-16 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px bg-slate-200 flex-grow"></div>
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Newsletter Archive</span>
          <div className="h-px bg-slate-200 flex-grow"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {NEWSLETTERS.map((issue) => (
            <Card key={issue.id} className="hover:shadow-xl transition-all duration-300 border-slate-200 group overflow-hidden">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <span className="inline-block bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                    Issue #{issue.issue}
                  </span>
                  <span className="text-slate-400 text-sm font-medium flex items-center gap-1.5">
                    <Calendar size={14} /> {issue.date}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#667eea] transition-colors leading-tight">
                  {issue.title}
                </h3>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  {issue.excerpt}
                </p>
                
                <Link href={issue.link}>
                  <a className="inline-flex items-center text-[#0066cc] font-bold hover:text-[#0052a3] hover:underline transition-all group-hover:gap-2">
                    Read Full Issue <ChevronRight size={18} />
                  </a>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
