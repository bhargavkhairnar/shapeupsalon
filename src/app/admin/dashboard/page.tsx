"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  Calendar, 
  IndianRupee, 
  TrendingUp, 
  Clock, 
  Loader2,
  RefreshCw,
  ArrowRight
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { getDashboardStats } from "./actions";

const StatCard = ({ title, value, icon: Icon, trend, trendValue, colorClass, href }: any) => (
  <Link href={href} className="group block">
    <div className="glow-card bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden h-full">
      <div className={`absolute top-0 left-0 w-1 h-full ${colorClass.border}`}></div>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${colorClass.bg} ${colorClass.text} group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm">
          <TrendingUp className={`w-4 h-4 mr-1 ${trend === 'up' ? 'text-emerald-500' : 'text-emerald-500'}`} />
          <span className={trend === 'up' ? 'text-emerald-500 font-medium' : 'text-emerald-500 font-medium'}>
            {trendValue}
          </span>
          <span className="text-neutral-500 dark:text-neutral-400 ml-1 text-xs">since start</span>
        </div>
        <ArrowRight className="w-4 h-4 text-neutral-300 dark:text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
      </div>
    </div>
  </Link>
);

export default function AdminDashboard() {
  const [isClient, setIsClient] = useState(false);
  const [timeframe, setTimeframe] = useState("This Month");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    let mounted = true;
    
    if (timeframe === "Custom" && (!customStart || !customEnd)) {
      return;
    }
    
    setLoading(true);
    getDashboardStats(timeframe, customStart, customEnd).then(stats => {
      if (mounted) {
        setData(stats);
        setLoading(false);
      }
    }).catch(err => {
      console.error("Failed to fetch dashboard stats", err);
      if (mounted) setLoading(false);
    });
    return () => { mounted = false; };
  }, [timeframe, customStart, customEnd, refreshKey]);

  if (!isClient) return null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header section with title and manual refresh */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">Overview</h2>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">Real-time metrics for your business.</p>
        </div>
        <button 
          onClick={() => setRefreshKey(k => k + 1)}
          className="flex items-center gap-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-4 py-2 rounded-xl text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-300 shadow-sm"
          disabled={loading}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-purple-500' : ''}`} />
          {loading ? 'Updating...' : 'Refresh Data'}
        </button>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        <StatCard 
          href="/admin/billing"
          title={`Revenue`} 
          value={`₹${data?.totalRevenue?.toLocaleString('en-IN') || 0}`} 
          icon={IndianRupee}
          trend="up"
          trendValue="+12%"
          colorClass={{ bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400", border: "bg-emerald-500" }}
        />
        <StatCard 
          href="/admin/appointments"
          title="Today's Appointments" 
          value={data?.todayAppointments || 0} 
          icon={Calendar}
          trend="up"
          trendValue="+5%"
          colorClass={{ bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400", border: "bg-blue-500" }}
        />
        <StatCard 
          href="/admin/customers"
          title="Total Customers" 
          value={data?.totalCustomers || 0} 
          icon={Users}
          trend="up"
          trendValue="+8%"
          colorClass={{ bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-600 dark:text-purple-400", border: "bg-purple-500" }}
        />
        <StatCard 
          href="/admin/billing"
          title="Pending Payments" 
          value="₹0" 
          icon={Clock}
          trend="up"
          trendValue="0%"
          colorClass={{ bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-400", border: "bg-amber-500" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="glow-card lg:col-span-2 bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm relative flex flex-col">
          {loading && (
            <div className="absolute inset-0 z-10 bg-white/50 dark:bg-neutral-950/50 flex items-center justify-center backdrop-blur-sm rounded-2xl rounded-2xl"></div>
          )}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Revenue Trends</h3>
            <div className="flex flex-wrap items-center gap-3">
              {timeframe === "Custom" && (
                <div className="flex items-center gap-2 bg-neutral-50 dark:bg-neutral-800/50 p-1 rounded-lg border border-neutral-200 dark:border-neutral-700">
                  <input 
                    type="date" 
                    value={customStart}
                    onChange={(e) => setCustomStart(e.target.value)}
                    className="bg-transparent border-none text-sm text-neutral-600 dark:text-neutral-300 px-2 py-1 outline-none"
                  />
                  <span className="text-neutral-400 text-sm">to</span>
                  <input 
                    type="date" 
                    value={customEnd}
                    onChange={(e) => setCustomEnd(e.target.value)}
                    className="bg-transparent border-none text-sm text-neutral-600 dark:text-neutral-300 px-2 py-1 outline-none"
                  />
                </div>
              )}
              <select 
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-400 text-sm font-medium rounded-xl px-4 py-2 outline-none cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors focus:ring-2 focus:ring-purple-500/20 shadow-sm"
              >
                <option value="Today">Today</option>
                <option value="This Week">This Week</option>
                <option value="This Month">This Month</option>
                <option value="6 Months">Last 6 Months</option>
                <option value="1 Year">1 Year</option>
                <option value="Custom">Custom Dates</option>
              </select>
            </div>
          </div>
          <div className="h-72 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data?.chartData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" className="dark:opacity-20" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888888', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888888', fontSize: 12}} tickFormatter={(value) => `₹${value}`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => [`₹${value.toLocaleString('en-IN')}`, "Revenue"]}
                  cursor={{ stroke: '#a855f7', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" activeDot={{ r: 6, fill: '#a855f7', stroke: '#fff', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Services Chart */}
        <div className="glow-card bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm relative flex flex-col">
          {loading && (
            <div className="absolute inset-0 z-10 bg-white/50 dark:bg-neutral-950/50 flex items-center justify-center backdrop-blur-sm rounded-2xl"></div>
          )}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Top Services</h3>
            <Link href="/admin/services" className="text-purple-600 hover:text-purple-700 text-sm font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="h-72 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data?.topServices || []} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e5e5" className="dark:opacity-20" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#525252', fontSize: 12, fontWeight: 500}} width={100} />
                <Tooltip 
                  cursor={{fill: 'rgba(168, 85, 247, 0.05)'}} 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                  formatter={(value: any) => [`${value} sessions`, "Bookings"]}
                />
                <Bar dataKey="value" fill="#ec4899" radius={[0, 6, 6, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1">
        <div className="glow-card bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm relative">
          {loading && (
            <div className="absolute inset-0 z-10 bg-white/50 dark:bg-neutral-950/50 flex items-center justify-center backdrop-blur-sm rounded-2xl"></div>
          )}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Recent Transactions</h3>
            <Link href="/admin/billing" className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline flex items-center gap-1 bg-purple-50 dark:bg-purple-900/20 px-3 py-1.5 rounded-lg transition-colors hover:bg-purple-100 dark:hover:bg-purple-900/40">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {(!data?.recentActivity || data.recentActivity.length === 0) && (
              <div className="text-center py-8">
                <div className="bg-neutral-100 dark:bg-neutral-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <IndianRupee className="w-8 h-8 text-neutral-400" />
                </div>
                <p className="text-neutral-500 dark:text-neutral-400 font-medium">No recent transactions</p>
                <p className="text-neutral-400 dark:text-neutral-500 text-sm mt-1">Transactions will appear here once processed.</p>
              </div>
            )}
            {data?.recentActivity?.map((activity: any) => {
              return (
                <div key={activity.id} className="flex items-center justify-between p-4 rounded-xl border border-neutral-100 dark:border-neutral-800/50 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${activity.bg} ${activity.color} shrink-0`}>
                      <IndianRupee className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-neutral-800 dark:text-neutral-200 font-semibold">{activity.message.split(' from ')[1]}</p>
                      <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-neutral-800 dark:text-neutral-200">
                      ₹{activity.message.match(/₹([0-9.,]+)/)?.[1]}
                    </p>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 mt-1">
                      Completed
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
