import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowLeft, Home, Share2 } from 'lucide-react';

interface ChecklistCategory {
  icon: string;
  title: string;
  items: string[];
}

const CATEGORIES: ChecklistCategory[] = [
  {
    icon: "📊",
    title: "Exchange & Platform Activity",
    items: [
      "Provide full transaction history (CSV preferred) from all exchanges used",
      "Include buys, sells, swaps, transfers, staking, and rewards",
      "Upload any 1099 forms received (1099-B, 1099-MISC, 1099-NEC)"
    ]
  },
  {
    icon: "👛",
    title: "Wallet Activity",
    items: [
      "Provide wallet addresses and export files if available",
      "Include DeFi transactions and NFT activity",
      "Confirm internal transfers between your own wallets"
    ]
  },
  {
    icon: "💰",
    title: "Crypto Income",
    items: [
      "Staking rewards",
      "Mining income",
      "Airdrops",
      "Referral bonuses",
      "Payments received for services"
    ]
  },
  {
    icon: "🔗",
    title: "DeFi & Advanced Transactions",
    items: [
      "Liquidity pool deposits/withdrawals",
      "Yield farming activity",
      "Wrapped tokens",
      "Bridging between chains",
      "Token migrations"
    ]
  },
  {
    icon: "🎨",
    title: "NFT Transactions",
    items: [
      "NFT purchases and sales records",
      "Minting costs",
      "Royalties received"
    ]
  },
  {
    icon: "🔄",
    title: "Stablecoins & Transfers",
    items: [
      "List all stablecoin conversions (USDT, USDC, etc.)",
      "Confirm which transfers were non-taxable wallet transfers"
    ]
  },
  {
    icon: "📅",
    title: "Prior Year Information",
    items: [
      "Prior year crypto losses",
      "Unused capital loss carryforward",
      "Prior crypto tax reports (if applicable)"
    ]
  }
];

const TOTAL_ITEMS = CATEGORIES.reduce((sum, cat) => sum + cat.items.length, 0);
const STORAGE_KEY = 'cryptoTaxChecklist';

export default function CryptoTaxChecklist() {
  const [, setLocation] = useLocation();
  const [checkedItems, setCheckedItems] = useState<boolean[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === TOTAL_ITEMS) return parsed;
      }
    } catch {}
    return new Array(TOTAL_ITEMS).fill(false);
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleItem = useCallback((globalIndex: number) => {
    setCheckedItems(prev => {
      const next = [...prev];
      next[globalIndex] = !next[globalIndex];
      return next;
    });
  }, []);

  const checkedCount = checkedItems.filter(Boolean).length;
  const percentage = Math.round((checkedCount / TOTAL_ITEMS) * 100);

  const handleShare = () => {
    const text = `Free interactive crypto tax prep checklist from JECI Group 🪙 ${window.location.href}`;
    if (navigator.share) {
      navigator.share({ title: 'Crypto Tax Health Checklist', text, url: window.location.href });
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  let globalIndex = 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
        .ctc-page {
          --ctc-primary: #00d9ff;
          --ctc-primary-dark: #00b8d4;
          --ctc-secondary: #7c3aed;
          --ctc-accent: #10b981;
          --ctc-dark: #0f172a;
          --ctc-dark-card: #1e293b;
          --ctc-text: #f8fafc;
          --ctc-text-muted: #94a3b8;
          --ctc-border: #334155;
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: var(--ctc-text);
          min-height: 100vh;
          padding: 40px 20px;
        }
        .ctc-nav {
          max-width: 900px;
          margin: 0 auto 20px auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ctc-nav a, .ctc-nav button {
          color: var(--ctc-primary);
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: opacity 0.2s;
          cursor: pointer;
          background: none;
          border: none;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ctc-nav a:hover, .ctc-nav button:hover { opacity: 0.8; }
        .ctc-container {
          max-width: 900px;
          margin: 0 auto;
          background: var(--ctc-dark-card);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
          border: 1px solid var(--ctc-border);
        }
        .ctc-header {
          background: linear-gradient(135deg, #00d9ff 0%, #7c3aed 100%);
          padding: 50px 40px;
          position: relative;
          overflow: hidden;
        }
        .ctc-header::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(124,58,237,0.3) 0%, transparent 50%);
          pointer-events: none;
        }
        .ctc-header-content { position: relative; z-index: 1; }
        .ctc-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }
        .ctc-brand-icon {
          width: 48px; height: 48px;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          border: 1px solid rgba(255,255,255,0.3);
        }
        .ctc-brand-text {
          font-family: 'Sora', sans-serif;
          font-weight: 800;
          font-size: 24px;
          color: white;
          letter-spacing: -0.5px;
        }
        .ctc-title {
          font-family: 'Sora', sans-serif;
          font-size: 42px;
          font-weight: 800;
          color: white;
          margin-bottom: 12px;
          letter-spacing: -1px;
          line-height: 1.1;
        }
        .ctc-subtitle {
          font-size: 18px;
          color: rgba(255,255,255,0.9);
          font-weight: 500;
          line-height: 1.6;
        }
        .ctc-year-badge {
          display: inline-block;
          background: rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          padding: 8px 20px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 700;
          color: white;
          margin-top: 20px;
          border: 1px solid rgba(255,255,255,0.3);
        }
        .ctc-progress-section {
          padding: 30px 40px;
          background: rgba(0,217,255,0.05);
          border-bottom: 1px solid var(--ctc-border);
        }
        .ctc-progress-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .ctc-progress-text {
          font-size: 14px;
          font-weight: 600;
          color: var(--ctc-text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .ctc-progress-count {
          font-size: 18px;
          font-weight: 700;
          color: var(--ctc-primary);
        }
        .ctc-progress-bar-bg {
          height: 12px;
          background: rgba(0,217,255,0.1);
          border-radius: 100px;
          overflow: hidden;
          border: 1px solid rgba(0,217,255,0.2);
        }
        .ctc-progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--ctc-primary) 0%, var(--ctc-secondary) 100%);
          border-radius: 100px;
          transition: width 0.5s cubic-bezier(0.4,0,0.2,1);
          box-shadow: 0 0 20px rgba(0,217,255,0.5);
        }
        .ctc-content { padding: 40px; }
        .ctc-category {
          margin-bottom: 40px;
          animation: ctcFadeInUp 0.6s ease-out both;
        }
        .ctc-category:nth-child(1) { animation-delay: 0.1s; }
        .ctc-category:nth-child(2) { animation-delay: 0.2s; }
        .ctc-category:nth-child(3) { animation-delay: 0.3s; }
        .ctc-category:nth-child(4) { animation-delay: 0.4s; }
        .ctc-category:nth-child(5) { animation-delay: 0.5s; }
        .ctc-category:nth-child(6) { animation-delay: 0.6s; }
        .ctc-category:nth-child(7) { animation-delay: 0.7s; }
        @keyframes ctcFadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .ctc-category-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--ctc-border);
        }
        .ctc-category-icon {
          width: 56px; height: 56px;
          background: linear-gradient(135deg, var(--ctc-primary) 0%, var(--ctc-secondary) 100%);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          flex-shrink: 0;
          box-shadow: 0 8px 16px rgba(0,217,255,0.3);
        }
        .ctc-category-title {
          font-family: 'Sora', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: var(--ctc-text);
          letter-spacing: -0.5px;
        }
        .ctc-category-number {
          font-size: 14px;
          color: var(--ctc-text-muted);
          font-weight: 600;
          margin-left: auto;
          background: rgba(0,217,255,0.1);
          padding: 6px 14px;
          border-radius: 100px;
          border: 1px solid rgba(0,217,255,0.2);
          white-space: nowrap;
        }
        .ctc-checklist {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .ctc-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 18px;
          background: rgba(0,217,255,0.02);
          border: 1px solid var(--ctc-border);
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          user-select: none;
        }
        .ctc-item::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 4px; height: 100%;
          background: linear-gradient(180deg, var(--ctc-primary) 0%, var(--ctc-secondary) 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .ctc-item:hover {
          background: rgba(0,217,255,0.05);
          border-color: rgba(0,217,255,0.3);
          transform: translateX(4px);
        }
        .ctc-item:hover::before { opacity: 1; }
        .ctc-item.ctc-checked {
          background: rgba(16,185,129,0.05);
          border-color: rgba(16,185,129,0.3);
        }
        .ctc-item.ctc-checked::before {
          background: var(--ctc-accent);
          opacity: 1;
        }
        .ctc-checkbox {
          appearance: none;
          -webkit-appearance: none;
          width: 24px; height: 24px;
          border: 2px solid var(--ctc-border);
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          background: rgba(0,217,255,0.05);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .ctc-checkbox:hover {
          border-color: var(--ctc-primary);
          background: rgba(0,217,255,0.1);
        }
        .ctc-checkbox:checked {
          background: linear-gradient(135deg, var(--ctc-primary) 0%, var(--ctc-accent) 100%);
          border-color: var(--ctc-accent);
        }
        .ctc-checkbox:checked::after {
          content: '✓';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%,-50%) scale(1);
          color: white;
          font-weight: 700;
          font-size: 14px;
          animation: ctcCheckPop 0.3s cubic-bezier(0.68,-0.55,0.265,1.55);
        }
        @keyframes ctcCheckPop {
          0% { transform: translate(-50%,-50%) scale(0); }
          100% { transform: translate(-50%,-50%) scale(1); }
        }
        .ctc-text {
          flex: 1;
          font-size: 16px;
          line-height: 1.6;
          color: var(--ctc-text);
          font-weight: 500;
        }
        .ctc-item.ctc-checked .ctc-text {
          color: var(--ctc-text-muted);
          text-decoration: line-through;
        }
        .ctc-footer {
          padding: 40px;
          background: rgba(0,217,255,0.03);
          border-top: 1px solid var(--ctc-border);
          text-align: center;
        }
        .ctc-footer-logo {
          font-family: 'Sora', sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--ctc-primary);
          margin-bottom: 12px;
        }
        .ctc-footer-text {
          font-size: 14px;
          color: var(--ctc-text-muted);
          line-height: 1.8;
        }
        .ctc-footer-contact {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid var(--ctc-border);
        }
        .ctc-contact-info {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 24px;
          font-size: 14px;
          color: var(--ctc-text-muted);
        }
        .ctc-contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .ctc-cta-section {
          padding: 30px 40px;
          background: linear-gradient(135deg, rgba(0,217,255,0.08) 0%, rgba(124,58,237,0.08) 100%);
          border-top: 1px solid var(--ctc-border);
          text-align: center;
        }
        .ctc-cta-title {
          font-family: 'Sora', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--ctc-text);
          margin-bottom: 8px;
        }
        .ctc-cta-desc {
          font-size: 14px;
          color: var(--ctc-text-muted);
          margin-bottom: 16px;
        }
        .ctc-cta-btn {
          display: inline-block;
          background: linear-gradient(135deg, var(--ctc-primary) 0%, var(--ctc-secondary) 100%);
          color: white;
          padding: 12px 32px;
          border-radius: 100px;
          font-weight: 700;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.3s;
          border: none;
          cursor: pointer;
        }
        .ctc-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,217,255,0.4);
        }
        .ctc-share-section {
          padding: 20px 40px;
          background: rgba(124,58,237,0.05);
          border-top: 1px solid var(--ctc-border);
          text-align: center;
        }
        .ctc-share-text {
          font-size: 13px;
          color: var(--ctc-text-muted);
          margin-bottom: 10px;
        }
        .ctc-share-buttons {
          display: flex;
          justify-content: center;
          gap: 12px;
        }
        .ctc-share-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 20px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          color: white;
          transition: all 0.2s;
        }
        .ctc-share-btn:hover { transform: translateY(-1px); }
        .ctc-share-btn.ctc-twitter { background: #1da1f2; }
        .ctc-share-btn.ctc-linkedin { background: #0077b5; }
        @media (max-width: 768px) {
          .ctc-header { padding: 40px 24px; }
          .ctc-title { font-size: 32px; }
          .ctc-subtitle { font-size: 16px; }
          .ctc-content { padding: 24px; }
          .ctc-category-title { font-size: 20px; }
          .ctc-category-icon { width: 48px; height: 48px; font-size: 24px; }
          .ctc-footer, .ctc-cta-section, .ctc-share-section { padding-left: 24px; padding-right: 24px; }
          .ctc-contact-info { flex-direction: column; gap: 12px; }
          .ctc-progress-section { padding: 20px 24px; }
        }
        @media print {
          .ctc-page { background: white; padding: 0; }
          .ctc-container { box-shadow: none; border: none; }
          .ctc-item { page-break-inside: avoid; }
          .ctc-progress-section, .ctc-share-section, .ctc-cta-section, .ctc-nav { display: none; }
        }
      `}</style>

      <div className="ctc-page">
        <nav className="ctc-nav">
          <Link href="/resources">
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#00d9ff', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
              <ArrowLeft size={16} /> Back to Resources
            </span>
          </Link>
          <Link href="/">
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#00d9ff', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
              <Home size={16} /> Home
            </span>
          </Link>
        </nav>

        <div className="ctc-container">
          <div className="ctc-header">
            <div className="ctc-header-content">
              <div className="ctc-brand">
                <div className="ctc-brand-icon">🪙</div>
                <div className="ctc-brand-text">JECI GROUP</div>
              </div>
              <h1 className="ctc-title" data-testid="text-checklist-title">Crypto Tax Health Checklist</h1>
              <p className="ctc-subtitle">Complete this checklist before tax season to ensure all your crypto transactions are properly documented and reported.</p>
              <div className="ctc-year-badge">TAX YEAR 2025 • FILING 2026</div>
            </div>
          </div>

          <div className="ctc-progress-section">
            <div className="ctc-progress-label">
              <span className="ctc-progress-text">Completion Progress</span>
              <span className="ctc-progress-count" data-testid="text-progress-count">{checkedCount} / {TOTAL_ITEMS}</span>
            </div>
            <div className="ctc-progress-bar-bg">
              <div className="ctc-progress-bar-fill" style={{ width: `${percentage}%` }} data-testid="progress-bar" />
            </div>
          </div>

          <div className="ctc-content">
            {CATEGORIES.map((cat, catIndex) => {
              const catItems = cat.items.map((item, itemIndex) => {
                const idx = globalIndex++;
                return (
                  <div
                    key={idx}
                    className={`ctc-item ${checkedItems[idx] ? 'ctc-checked' : ''}`}
                    onClick={() => toggleItem(idx)}
                    data-testid={`checklist-item-${idx}`}
                  >
                    <input
                      type="checkbox"
                      className="ctc-checkbox"
                      checked={checkedItems[idx]}
                      onChange={() => toggleItem(idx)}
                      onClick={(e) => e.stopPropagation()}
                      data-testid={`checkbox-${idx}`}
                    />
                    <span className="ctc-text">{item}</span>
                  </div>
                );
              });

              return (
                <div key={catIndex} className="ctc-category">
                  <div className="ctc-category-header">
                    <div className="ctc-category-icon">{cat.icon}</div>
                    <h2 className="ctc-category-title">{cat.title}</h2>
                    <span className="ctc-category-number">Category {catIndex + 1}</span>
                  </div>
                  <div className="ctc-checklist">{catItems}</div>
                </div>
              );
            })}
          </div>

          <div className="ctc-share-section">
            <p className="ctc-share-text">Found this helpful? Share it:</p>
            <div className="ctc-share-buttons">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('Free interactive crypto tax prep checklist from @adrianjordan_io 🪙')}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ctc-share-btn ctc-twitter"
                data-testid="button-share-twitter"
              >
                Share on X
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ctc-share-btn ctc-linkedin"
                data-testid="button-share-linkedin"
              >
                Share on LinkedIn
              </a>
            </div>
          </div>

          <div className="ctc-cta-section">
            <p className="ctc-cta-title">Need Help With Crypto Taxes?</p>
            <p className="ctc-cta-desc">Our crypto tax specialists can help you navigate complex reporting requirements and maximize your deductions.</p>
            <button className="ctc-cta-btn" onClick={() => setLocation('/services/crypto-tax')} data-testid="button-book-crypto-tax">
              Book Crypto Tax Consultation →
            </button>
          </div>

          <div className="ctc-footer">
            <div className="ctc-footer-logo">JECI GROUP</div>
            <p className="ctc-footer-text">
              Professional tax preparation and consulting services<br />
              Prepared by Adrian Jordan, CMA
            </p>
            <div className="ctc-footer-contact">
              <div className="ctc-contact-info">
                <div className="ctc-contact-item">
                  <span>📞</span>
                  <span>202-430-5058</span>
                </div>
                <div className="ctc-contact-item">
                  <span>✉️</span>
                  <span>info@jecigroup.com</span>
                </div>
                <div className="ctc-contact-item">
                  <span>🌐</span>
                  <span>www.jecigroup.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
