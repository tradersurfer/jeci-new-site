import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from "@tanstack/react-query";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SERVICE_CATEGORIES } from '@/data/services';
import { 
  Users, DollarSign, Calendar, TrendingUp, Search, 
  BarChart2, FileText, Settings, ShieldCheck, PieChart 
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const { data: dashboardData, isLoading } = useQuery<{
    totalBookings: number;
    totalRevenue: number;
    totalContacts: number;
    totalSubscribers: number;
    recentBookings: Array<{
      id: string;
      clientName: string;
      serviceName: string;
      date: string;
      time: string;
      totalAmount: number;
      status: string;
      createdAt: string;
    }>;
  }>({
    queryKey: ["/api/admin/dashboard"],
  });

  const stats = [
    { label: "Total Bookings", value: String(dashboardData?.totalBookings || 0), icon: <Calendar className="text-blue-500" /> },
    { label: "Revenue", value: `$${(dashboardData?.totalRevenue || 0).toLocaleString()}`, icon: <DollarSign className="text-green-500" /> },
    { label: "Contacts", value: String(dashboardData?.totalContacts || 0), icon: <Users className="text-orange-500" /> },
    { label: "Subscribers", value: String(dashboardData?.totalSubscribers || 0), icon: <TrendingUp className="text-purple-500" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <Navbar />
      
      <div className="flex pt-20 h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-white hidden md:block pt-6">
          <div className="px-6 mb-8">
            <h2 className="font-serif font-bold text-xl">JECI Admin</h2>
          </div>
          <nav className="space-y-1">
            {['Overview', 'Bookings', 'Availability', 'Clients', 'Analytics', 'Settings'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item.toLowerCase())}
                className={`w-full text-left px-6 py-3 hover:bg-slate-800 transition-colors flex items-center gap-3 ${
                  activeTab === item.toLowerCase() ? 'bg-secondary text-primary font-bold' : 'text-slate-400'
                }`}
              >
                {item === 'Overview' && <BarChart2 size={18} />}
                {item === 'Bookings' && <Calendar size={18} />}
                {item === 'Availability' && <Settings size={18} />}
                {item === 'Clients' && <Users size={18} />}
                {item === 'Analytics' && <PieChart size={18} />}
                {item === 'Settings' && <ShieldCheck size={18} />}
                {item}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-8 capitalize">{activeTab}</h1>

            {activeTab === 'overview' && (
              <>
                {isLoading ? (
                  <div className="text-center py-20 text-slate-500">
                    <p>Loading dashboard data...</p>
                  </div>
                ) : (
                  <>
                    <div className="grid md:grid-cols-4 gap-6 mb-8">
                      {stats.map((stat, i) => (
                        <Card key={i} className="border-slate-200 shadow-sm">
                          <CardContent className="p-6 flex items-center justify-between">
                            <div>
                              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                              <p className="text-2xl font-bold text-slate-900" data-testid={`stat-value-${i}`}>{stat.value}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                              {stat.icon}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <Card className="border-slate-200 shadow-sm">
                      <CardHeader>
                        <CardTitle>Recent Bookings</CardTitle>
                        <CardDescription>Latest appointments scheduled.</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {dashboardData?.recentBookings && dashboardData.recentBookings.length > 0 ? (
                            dashboardData.recentBookings.map(booking => (
                              <div key={booking.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100" data-testid={`booking-row-${booking.id}`}>
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    {booking.clientName.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="font-bold text-slate-900">{booking.clientName}</p>
                                    <p className="text-sm text-slate-500">{booking.serviceName}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-slate-900">{booking.date} {booking.time}</p>
                                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                    booking.status.toLowerCase() === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                  }`}>
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                  </span>
                                </div>
                                <div className="text-right ml-4">
                                  <p className="font-bold text-slate-900">${booking.totalAmount}</p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-8 text-slate-500" data-testid="no-bookings-message">
                              <p>No bookings yet</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </>
            )}
            
            {activeTab !== 'overview' && (
              <div className="text-center py-20 text-slate-500">
                <p>Module under construction.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
