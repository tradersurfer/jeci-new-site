import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { Lock, Mail, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePortalAuth } from '@/components/portal/PortalAuthContext';

export default function PortalLogin() {
  const { login, user } = usePortalAuth();
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);

  if (user) {
    setLocation('/tax-portal/documents');
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      setLocation('/tax-portal/documents');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotMsg('');
    try {
      const res = await fetch('/api/portal/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await res.json();
      setForgotMsg(data.message || 'If an account exists, a reset link has been sent.');
    } catch {
      setForgotMsg('Something went wrong. Please try again.');
    }
    setForgotLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white border-0 shadow-xl">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-14 h-14 bg-[#0f172a] rounded-full flex items-center justify-center mb-3">
            <Lock className="text-amber-500" size={24} />
          </div>
          <CardTitle className="text-2xl font-bold text-[#0f172a]" data-testid="login-title">JECI Tax Portal</CardTitle>
          <p className="text-slate-500 text-sm mt-1">Sign in to access your tax documents</p>
        </CardHeader>
        <CardContent>
          {forgotMode ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <button type="button" onClick={() => { setForgotMode(false); setForgotMsg(''); }} className="flex items-center gap-1 text-sm text-slate-600 mb-2" data-testid="back-to-login">
                <ArrowLeft size={16} /> Back to login
              </button>
              <p className="text-sm text-slate-600">Enter your email to receive a password reset link.</p>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="pl-10 h-12"
                  required
                  data-testid="input-forgot-email"
                />
              </div>
              {forgotMsg && <p className="text-sm text-green-600" data-testid="forgot-message">{forgotMsg}</p>}
              <Button type="submit" className="w-full h-12 bg-[#0f172a] hover:bg-slate-800 text-white" disabled={forgotLoading} data-testid="button-send-reset">
                {forgotLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm" data-testid="login-error">
                  {error}
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  required
                  data-testid="input-email"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12"
                  required
                  data-testid="input-password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" data-testid="toggle-password">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="text-right">
                <button type="button" onClick={() => setForgotMode(true)} className="text-sm text-amber-600 hover:underline" data-testid="link-forgot-password">
                  Forgot Password?
                </button>
              </div>
              <Button type="submit" className="w-full h-12 bg-[#0f172a] hover:bg-slate-800 text-white text-base" disabled={loading} data-testid="button-sign-in">
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
              <p className="text-center text-sm text-slate-600">
                Don't have an account?{' '}
                <Link href="/tax-portal/register" className="text-amber-600 font-semibold hover:underline" data-testid="link-register">
                  Register
                </Link>
              </p>
            </form>
          )}
          <div className="mt-4 pt-4 border-t text-center text-xs text-slate-400 space-x-3">
            <Link href="/tax-portal/privacy" className="hover:text-slate-600" data-testid="link-privacy">Privacy Policy</Link>
            <Link href="/tax-portal/terms" className="hover:text-slate-600" data-testid="link-terms">Terms of Service</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
