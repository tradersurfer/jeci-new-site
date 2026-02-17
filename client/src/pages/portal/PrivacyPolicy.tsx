import { Link } from 'wouter';
import { ArrowLeft, Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-[#0f172a] text-white px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/tax-portal/login">
            <button className="p-2 hover:bg-white/10 rounded-lg" data-testid="back-button">
              <ArrowLeft size={20} />
            </button>
          </Link>
          <Shield size={24} className="text-amber-500" />
          <h1 className="text-lg font-bold">Privacy Policy</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-['Playfair_Display']" data-testid="privacy-title">Privacy Policy</h2>
            <p className="text-slate-500 mt-1">Last updated: February 2026</p>
          </div>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">1. Information We Collect</h3>
            <p className="text-slate-600 leading-relaxed">When you use the JECI Tax Portal, we collect information you provide directly, including your name, email address, phone number, mailing address, tax filing status, and financial documents you upload. We also collect technical information such as your IP address, browser type, and device information when you access our services.</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">2. How We Use Your Information</h3>
            <p className="text-slate-600 leading-relaxed">We use your personal information to provide tax preparation and financial consulting services, process and manage your tax documents, communicate with you about your tax returns and account, comply with legal and regulatory requirements, improve our services, and protect against fraud and unauthorized access.</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">3. Data Security</h3>
            <p className="text-slate-600 leading-relaxed">We implement industry-standard security measures to protect your personal and financial information. This includes encrypted data transmission (SSL/TLS), secure password hashing, role-based access controls, and regular security audits. Your documents are stored in encrypted formats and are only accessible to authorized personnel.</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">4. Data Retention</h3>
            <p className="text-slate-600 leading-relaxed">We retain your personal information and tax documents for as long as necessary to provide our services and comply with legal obligations. Tax records are retained for a minimum of seven (7) years in accordance with IRS requirements. You may request deletion of your account and non-essential data at any time.</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">5. Sharing of Information</h3>
            <p className="text-slate-600 leading-relaxed">We do not sell, trade, or rent your personal information to third parties. We may share your information with authorized tax professionals within JECI Group who are directly involved in your tax preparation, government agencies as required by law (e.g., IRS filings), and service providers who assist in our operations under strict confidentiality agreements.</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">6. Your Rights</h3>
            <p className="text-slate-600 leading-relaxed">You have the right to access, correct, or delete your personal information, request a copy of data we hold about you, opt out of marketing communications, and withdraw consent for data processing where applicable. To exercise these rights, contact us at info@jecigroup.com.</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">7. Cookies and Tracking</h3>
            <p className="text-slate-600 leading-relaxed">Our portal uses essential cookies to maintain your session and authentication state. We may use analytics tools to understand how our services are used and to improve the user experience. You can control cookie settings through your browser preferences.</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">8. Changes to This Policy</h3>
            <p className="text-slate-600 leading-relaxed">We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on our website and updating the "Last updated" date above.</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">9. Contact Us</h3>
            <p className="text-slate-600 leading-relaxed">If you have questions about this Privacy Policy or our data practices, please contact us at:</p>
            <div className="bg-slate-50 rounded-lg p-4 text-slate-700">
              <p className="font-semibold">JECI Group</p>
              <p>80 M St SE, Washington, DC</p>
              <p>Email: info@jecigroup.com</p>
              <p>Phone: 202-430-5058</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
