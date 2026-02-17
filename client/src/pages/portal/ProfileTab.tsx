import { useState, useEffect } from 'react';
import { Save, Lock, LogOut, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePortalAuth, portalFetch } from '@/components/portal/PortalAuthContext';
import PortalLayout from '@/components/portal/PortalLayout';

const FILING_STATUSES = ['Single', 'Married Filing Jointly', 'Married Filing Separately', 'Head of Household'];

export default function ProfileTab() {
  const { user, logout, refreshUser } = usePortalAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [filingStatus, setFilingStatus] = useState('');
  const [taxYear, setTaxYear] = useState('2025');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState('');

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('portal_notifications');
      return saved ? JSON.parse(saved) : { email: true, sms: false, documents: true, messages: true };
    } catch {
      return { email: true, sms: false, documents: true, messages: true };
    }
  });

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
      setFilingStatus(user.filingStatus || '');
      setTaxYear(user.taxYear || '2025');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('portal_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveMsg('');
    try {
      const res = await portalFetch('/api/portal/me', {
        method: 'PATCH',
        body: JSON.stringify({ fullName, phone, address, filingStatus, taxYear }),
      });
      if (res.ok) {
        setSaveMsg('Profile updated successfully');
        await refreshUser();
      } else {
        const data = await res.json();
        setSaveMsg(data.error || 'Failed to update');
      }
    } catch {
      setSaveMsg('Connection failed');
    }
    setSaving(false);
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg('');
    if (newPassword.length < 8) { setPwMsg('New password must be at least 8 characters'); return; }
    if (newPassword !== confirmNewPassword) { setPwMsg('Passwords do not match'); return; }
    setPwSaving(true);
    try {
      const res = await portalFetch('/api/portal/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setPwMsg('Password changed successfully');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        setPwMsg(data.error || 'Failed to change password');
      }
    } catch {
      setPwMsg('Connection failed');
    }
    setPwSaving(false);
  };

  return (
    <PortalLayout>
      <div className="space-y-4">
        <h1 className="text-xl font-bold text-[#0f172a]" data-testid="profile-title">Profile & Settings</h1>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-11 mt-1" required data-testid="input-profile-name" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Email</label>
                <Input value={user?.email || ''} className="h-11 mt-1 bg-slate-50" readOnly data-testid="input-profile-email" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Phone</label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="h-11 mt-1" placeholder="(555) 555-5555" data-testid="input-profile-phone" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Address</label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} className="h-11 mt-1" placeholder="Street, City, State, ZIP" data-testid="input-profile-address" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Filing Status</label>
                <select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value)} className="w-full h-11 rounded-md border border-slate-300 px-3 text-sm bg-white mt-1" data-testid="select-filing-status">
                  <option value="">Select status</option>
                  {FILING_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Tax Year</label>
                <Input value={taxYear} onChange={(e) => setTaxYear(e.target.value)} className="h-11 mt-1" data-testid="input-tax-year" />
              </div>
              {saveMsg && (
                <p className={`text-sm ${saveMsg.includes('success') ? 'text-green-600' : 'text-red-600'}`} data-testid="save-message">{saveMsg}</p>
              )}
              <Button type="submit" disabled={saving} className="w-full h-11 bg-[#0f172a] hover:bg-slate-800 text-white" data-testid="button-save-profile">
                <Save size={16} className="mr-2" /> {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2"><Lock size={16} /> Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-3">
              <div>
                <label className="text-sm font-medium text-slate-700">Current Password</label>
                <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="h-11 mt-1" required data-testid="input-current-password" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">New Password</label>
                <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="h-11 mt-1" required minLength={8} data-testid="input-new-password" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Confirm New Password</label>
                <Input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="h-11 mt-1" required data-testid="input-confirm-new-password" />
              </div>
              {pwMsg && (
                <p className={`text-sm ${pwMsg.includes('success') ? 'text-green-600' : 'text-red-600'}`} data-testid="password-message">{pwMsg}</p>
              )}
              <Button type="submit" disabled={pwSaving} className="w-full h-11 bg-[#0f172a] hover:bg-slate-800 text-white" data-testid="button-change-password">
                {pwSaving ? 'Changing...' : 'Change Password'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2"><Bell size={16} /> Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { key: 'email', label: 'Email notifications' },
                { key: 'sms', label: 'SMS notifications' },
                { key: 'documents', label: 'Document update alerts' },
                { key: 'messages', label: 'New message alerts' },
              ].map((item) => (
                <label key={item.key} className="flex items-center justify-between cursor-pointer min-h-[44px]">
                  <span className="text-sm text-slate-700">{item.label}</span>
                  <input
                    type="checkbox"
                    checked={notifications[item.key as keyof typeof notifications]}
                    onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                    className="w-5 h-5 rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                    data-testid={`check-notif-${item.key}`}
                  />
                </label>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button onClick={logout} className="w-full h-12 bg-red-600 hover:bg-red-700 text-white text-base" data-testid="button-logout">
          <LogOut size={18} className="mr-2" /> Sign Out
        </Button>
      </div>
    </PortalLayout>
  );
}
