import React from 'react';
import ServiceLandingPage from '../ServiceLandingPage';

export default function CryptoTax() {
  return (
    <ServiceLandingPage
      title="Crypto Tax Consultation"
      subtitle="Navigate DeFi, NFTs, and Mining Taxes with Confidence"
      price="$149"
      description="Don't let the IRS catch you off guard. We specialize in complex crypto reconciliations, staking income, and minimizing your digital asset liability."
      benefits={[
        "IRS Audit Protection",
        "Loss Harvesting Strategy",
        "DeFi & NFT Expertise"
      ]}
      features={[
        "Full transaction history review",
        "Mining & Staking income classification",
        "DeFi protocol analysis",
        "Tax-loss harvesting opportunities",
        "FBAR/8938 reporting guidance"
      ]}
      process={[
        "Connect your wallets/exchanges (Read-Only)",
        "We analyze transactions for missing cost basis",
        "classify income types (staking, airdrops)",
        "Generate Form 8949 for your return"
      ]}
      faqs={[
        { question: "What crypto transactions are taxable?", answer: "Selling crypto for fiat, trading one crypto for another, spending crypto, and earning crypto (staking/mining) are all taxable events." },
        { question: "Can I deduct crypto losses?", answer: "Yes! You can offset capital gains and up to $3,000 of ordinary income annually." },
        { question: "Do you handle DeFi?", answer: "Absolutely. We are experts in liquidity pool tokens, yield farming, and complex wrapper transactions." }
      ]}
      testimonials={[
        { text: "Saved me $12k in taxes by finding missing cost basis from 2021.", author: "Michael R.", role: "DeFi Investor" },
        { text: "Finally a CPA that understands what a liquidity pool is.", author: "Sarah L.", role: "NFT Artist" }
      ]}
    />
  );
}
