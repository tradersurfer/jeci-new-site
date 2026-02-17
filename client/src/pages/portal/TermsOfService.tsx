import { Link } from 'wouter';
import { ArrowLeft, Scale } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-[#0f172a] text-white px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/tax-portal/login">
            <button className="p-2 hover:bg-white/10 rounded-lg" data-testid="back-button">
              <ArrowLeft size={20} />
            </button>
          </Link>
          <Scale size={24} className="text-amber-500" />
          <h1 className="text-lg font-bold">Terms of Service</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 font-['Playfair_Display']" data-testid="terms-title">Terms of Service</h2>
            <p className="text-slate-500 mt-1">Last updated: February 2026</p>
          </div>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">1. Acceptance of Terms</h3>
            <p className="text-slate-600 leading-relaxed">By accessing and using the JECI Tax Portal ("Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service. These terms constitute a legally binding agreement between you and JECI Group.</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">2. Description of Service</h3>
            <p className="text-slate-600 leading-relaxed">The JECI Tax Portal is a secure platform that enables you to upload tax documents, review and electronically sign tax returns, communicate with your assigned tax professional, track cryptocurrency transactions for tax reporting, and manage your tax preparation process.</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">3. Account Registration</h3>
            <p className="text-slate-600 leading-relaxed">You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account.</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">4. Electronic Signatures</h3>
            <p className="text-slate-600 leading-relaxed">By using the electronic signature feature of the Service, you acknowledge that your electronic signature is legally binding and has the same legal effect as a handwritten signature under the Electronic Signatures in Global and National Commerce Act (E-SIGN Act) and the Uniform Electronic Transactions Act (UETA). You agree to review all documents thoroughly before applying your signature.</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">5. Document Upload and Storage</h3>
            <p className="text-slate-600 leading-relaxed">You are responsible for ensuring that all documents you upload are accurate, complete, and belong to you or that you have authorization to share them. We implement reasonable security measures to protect uploaded documents but cannot guarantee absolute security. You should retain your own copies of all documents.</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">6. Cryptocurrency Tax Reporting</h3>
            <p className="text-slate-600 leading-relaxed">The cryptocurrency transaction tracking and capital gains calculation features are provided as tools to assist in tax preparation. While we strive for accuracy, you are ultimately responsible for the accuracy of your cryptocurrency tax reporting. We recommend consulting with your tax professional for complex cryptocurrency tax situations.</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">7. Professional Tax Services</h3>
            <p className="text-slate-600 leading-relaxed">Tax preparation services provided through the JECI Tax Portal are performed by qualified tax professionals. However, the Service does not constitute legal or financial advice. The accuracy of your tax return depends on the completeness and accuracy of the information you provide.</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">8. Fees and Payment</h3>
            <p className="text-slate-600 leading-relaxed">Fees for tax preparation services are as quoted during the booking process. Payment terms are agreed upon at the time of service engagement. The use of the Tax Portal itself does not incur additional fees beyond the agreed service charges.</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">9. Prohibited Uses</h3>
            <p className="text-slate-600 leading-relaxed">You agree not to use the Service to upload malicious files or software, impersonate another person or entity, submit fraudulent tax documents, attempt to gain unauthorized access to other accounts, interfere with or disrupt the Service, or use the Service for any illegal purpose.</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">10. Limitation of Liability</h3>
            <p className="text-slate-600 leading-relaxed">To the maximum extent permitted by law, JECI Group shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service. Our total liability shall not exceed the amount of fees paid by you for the services in question.</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">11. Modifications</h3>
            <p className="text-slate-600 leading-relaxed">We reserve the right to modify these Terms at any time. Material changes will be communicated through the portal or via email. Continued use of the Service after changes constitutes acceptance of the modified terms.</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">12. Governing Law</h3>
            <p className="text-slate-600 leading-relaxed">These Terms shall be governed by and construed in accordance with the laws of the District of Columbia, without regard to its conflict of law provisions.</p>
          </section>

          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">13. Contact Information</h3>
            <p className="text-slate-600 leading-relaxed">For questions about these Terms of Service, please contact us:</p>
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
