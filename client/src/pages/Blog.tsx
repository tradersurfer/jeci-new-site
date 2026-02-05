import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Search, MessageSquare, Share2, ArrowBigUp, ArrowBigDown, 
  Menu, Filter, LayoutGrid, List, Sparkles, Bitcoin, DollarSign, 
  Briefcase, Landmark, Calculator, Cpu, Globe, ExternalLink, Bookmark
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Future of Blockchain Accounting: Beyond the Ledger",
    author: "Adrian Jordan",
    source: "Medium",
    url: "https://medium.com/@adrianjordan.io",
    category: "Accounting",
    votes: "2.4k",
    comments: 142,
    excerpt: "Traditional double-entry accounting is evolving. Explore how triple-entry blockchain systems are creating immutable trust in the back office.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
    tags: ["Blockchain", "Web3", "FutureTech"]
  },
  {
    id: 2,
    title: "How to Secure $250k in Business Funding Without a 800 FICO",
    author: "Adrian Jordan",
    source: "Substack",
    url: "https://substack.com/@adrianjordanio",
    category: "Capital",
    votes: "1.8k",
    comments: 89,
    excerpt: "Institutional capital isn't just for elite credit holders. Learn the 'Revenue-Based' strategies founders are using to scale today.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
    tags: ["Funding", "Scaling", "Entrepreneurship"]
  },
  {
    id: 3,
    title: "Crypto Tax Laws in 2026: What Every Founder Needs to Know",
    author: "JECI Research",
    source: "NerdWallet (Curated)",
    category: "Taxes",
    votes: "3.1k",
    comments: 215,
    excerpt: "From wash sales to DeFi staking, the IRS has updated its guidance. We break down the tax architecture for digital asset sovereignty.",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=800",
    tags: ["Crypto", "IRS", "Compliance"]
  },
  {
    id: 4,
    title: "AI in the Back Office: Automating Your Sovereign CEO Journey",
    author: "Tech Insider",
    source: "Medium",
    category: "Back Office",
    votes: "950",
    comments: 45,
    excerpt: "Stop working IN your business. Use these 5 AI agents to handle your bookkeeping, email, and social strategy while you sleep.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    tags: ["AI", "Automation", "Efficiency"]
  },
  {
    id: 5,
    title: "Real Estate vs Bitcoin: The New Diversification Paradigm",
    author: "Earn Your Leisure (Inspired)",
    category: "Investing",
    votes: "4.2k",
    comments: 512,
    excerpt: "Is digital gold replacing physical brick? A deep dive into liquidity ratios and inflation hedging in the new economy.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    tags: ["Real Estate", "BTC", "Wealth"]
  }
];

const CATEGORIES = [
  "All", "Money", "Credit", "Business", "Taxes", "Accounting", "Capital", "Real Estate", "Back Office", "Crypto", "AI"
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
      {/* Blog Hero/Header */}
      <div className="bg-white border-b border-slate-200 pt-32 pb-6 sticky top-0 z-30">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-black text-primary tracking-tight flex items-center gap-3">
                <Sparkles className="text-secondary" /> THE HUB
              </h1>
              <p className="text-slate-500 text-sm mt-1">The Business Hub for Entrepreneurs & Wealth Builders</p>
            </div>
            
            {/* Search & Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search the Hub..." 
                  className="w-full pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-full gap-2 shrink-0">
                    <Filter size={16} /> Category: {activeCategory}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {CATEGORIES.map(cat => (
                    <DropdownMenuItem 
                      key={cat} 
                      onClick={() => setActiveCategory(cat)}
                      className={activeCategory === cat ? "bg-slate-100 font-bold" : ""}
                    >
                      {cat}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex border rounded-full p-1 bg-slate-100 shrink-0">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1 rounded-full transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-slate-400'}`}
                >
                  <LayoutGrid size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1 rounded-full transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-slate-400'}`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <main className="lg:col-span-8 space-y-6">
            {BLOG_POSTS.filter(post => activeCategory === "All" || post.category === activeCategory).map((post) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="hover:border-slate-300 transition-all overflow-hidden border-slate-200 shadow-sm group">
                  <div className={`flex flex-col ${viewMode === 'list' ? 'md:flex-row' : ''}`}>
                    {/* Voting Sidebar (Reddit Style) */}
                    <div className="hidden md:flex flex-col items-center p-3 bg-slate-50/50 border-r border-slate-100 shrink-0">
                      <button className="text-slate-400 hover:text-orange-600 transition-colors">
                        <ArrowBigUp size={24} />
                      </button>
                      <span className="text-xs font-black my-1 text-slate-700">{post.votes}</span>
                      <button className="text-slate-400 hover:text-blue-600 transition-colors">
                        <ArrowBigDown size={24} />
                      </button>
                    </div>

                    <div className="flex-grow">
                      {/* Post Header */}
                      <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-white">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-secondary/10 text-primary font-black uppercase tracking-tighter text-[10px]">
                            {post.category}
                          </Badge>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            Posted by {post.author} • {post.source}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="text-slate-400 hover:text-primary"><Bookmark size={16} /></button>
                          {post.url && (
                            <a href={post.url} target="_blank" rel="noopener" className="text-slate-400 hover:text-primary">
                              <ExternalLink size={16} />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Post Body */}
                      <div className="p-6 bg-white">
                        <div className={`flex flex-col md:flex-row gap-6 ${viewMode === 'list' ? 'items-center' : ''}`}>
                          <div className="flex-grow">
                            <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-tight mb-3 group-hover:text-secondary transition-colors cursor-pointer">
                              {post.title}
                            </h2>
                            <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>
                          </div>
                          {post.image && (
                            <div className={`shrink-0 overflow-hidden rounded-xl border border-slate-100 ${viewMode === 'grid' ? 'w-full md:w-48 h-32' : 'w-24 h-24'}`}>
                              <img src={post.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Post Footer */}
                      <div className="p-4 bg-slate-50/30 flex items-center gap-6">
                        <div className="flex items-center gap-1.5 text-slate-500 hover:bg-slate-100 px-3 py-1.5 rounded-lg cursor-pointer transition-all">
                          <MessageSquare size={16} />
                          <span className="text-xs font-bold">{post.comments} Comments</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-500 hover:bg-slate-100 px-3 py-1.5 rounded-lg cursor-pointer transition-all">
                          <Share2 size={16} />
                          <span className="text-xs font-bold">Share</span>
                        </div>
                        <div className="flex gap-2 ml-auto">
                          {post.tags.map(tag => (
                            <span key={tag} className="text-[10px] text-slate-400 font-medium">#{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </main>

          {/* Sidebar Area */}
          <aside className="lg:col-span-4 space-y-6">
            {/* About Hub Card */}
            <Card className="border-slate-200 bg-primary text-white overflow-hidden rounded-2xl">
              <div className="h-20 bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579621970795-87faff2f9050?auto=format&fit=crop&q=80')] bg-cover opacity-20" />
              </div>
              <CardContent className="p-6 relative">
                <div className="absolute -top-10 left-6 w-20 h-20 bg-white p-2 rounded-2xl shadow-xl">
                  <div className="w-full h-full bg-primary flex items-center justify-center text-white font-serif font-black text-3xl rounded-xl">J</div>
                </div>
                <div className="mt-12">
                  <h3 className="text-xl font-black mb-2 tracking-tight">The Hub by JECI</h3>
                  <p className="text-sm text-white/70 leading-relaxed mb-6">
                    A curated digital ecosystem for the modern Sovereign CEO. Stay locked in on capital, credit, and futuristic accounting.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div>
                      <p className="text-2xl font-black text-secondary">12k</p>
                      <p className="text-[10px] uppercase font-bold text-white/40">Members</p>
                    </div>
                    <div>
                      <p className="text-2xl font-black text-secondary">350+</p>
                      <p className="text-[10px] uppercase font-bold text-white/40">Articles</p>
                    </div>
                  </div>
                  <Button className="w-full bg-secondary text-primary hover:bg-white font-black uppercase tracking-widest text-xs h-12">
                    Create Post
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Trending Sections */}
            <Card className="border-slate-200 rounded-2xl overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Trending Topics</h4>
              </div>
              <CardContent className="p-0">
                {[
                  { topic: "Bitcoin 80k Prediction", count: "24.5k posts", icon: <Bitcoin className="text-orange-500" /> },
                  { topic: "Tax Loss Harvesting AI", count: "12.2k posts", icon: <Cpu className="text-blue-500" /> },
                  { topic: "SALT Nexus Studies", count: "8.9k posts", icon: <Landmark className="text-green-500" /> },
                  { topic: "Remote Back Office", count: "5.4k posts", icon: <Globe className="text-cyan-500" /> }
                ].map((item, i) => (
                  <div key={i} className="p-4 hover:bg-slate-50 cursor-pointer transition-all flex items-center gap-4 border-b border-slate-50 last:border-0">
                    <div className="shrink-0">{item.icon}</div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{item.topic}</p>
                      <p className="text-[10px] text-slate-500">{item.count}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* External Links */}
            <div className="p-6 bg-slate-100 rounded-2xl text-center">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Official Channels</h4>
              <div className="flex justify-center gap-4">
                <a href="https://medium.com/@adrianjordan.io" target="_blank" className="p-2 bg-white rounded-full hover:shadow-md transition-all text-primary"><LayoutGrid size={20} /></a>
                <a href="https://substack.com/@adrianjordanio" target="_blank" className="p-2 bg-white rounded-full hover:shadow-md transition-all text-orange-500"><TrendingUp size={20} /></a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}
