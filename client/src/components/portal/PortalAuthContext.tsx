import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface PortalUser {
  id: string;
  email: string;
  fullName: string;
  role: string;
  phone?: string;
  address?: string;
  filingStatus?: string;
  taxYear?: string;
}

interface AuthContextType {
  user: PortalUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: { email: string; password: string; fullName: string; phone?: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function usePortalAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("usePortalAuth must be used within PortalAuthProvider");
  return ctx;
}

export function portalFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('portal_token');
  return fetch(path, {
    ...options,
    headers: {
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.body && typeof options.body === 'string' ? { 'Content-Type': 'application/json' } : {}),
    },
  });
}

export function PortalAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PortalUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('portal_token'));
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    const t = localStorage.getItem('portal_token');
    if (!t) { setLoading(false); return; }
    try {
      const res = await fetch('/api/portal/me', {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        setToken(t);
      } else {
        localStorage.removeItem('portal_token');
        setUser(null);
        setToken(null);
      }
    } catch {
      localStorage.removeItem('portal_token');
      setUser(null);
      setToken(null);
    }
    setLoading(false);
  };

  useEffect(() => { refreshUser(); }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('/api/portal/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('portal_token', data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch {
      return { success: false, error: 'Connection failed' };
    }
  };

  const register = async (regData: { email: string; password: string; fullName: string; phone?: string }) => {
    try {
      const res = await fetch('/api/portal/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regData),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('portal_token', data.token);
        setToken(data.token);
        setUser(data.user);
        return { success: true };
      }
      return { success: false, error: data.error };
    } catch {
      return { success: false, error: 'Connection failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('portal_token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}
