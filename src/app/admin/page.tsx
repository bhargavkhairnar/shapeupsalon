"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  Calendar, 
  IndianRupee, 
  TrendingUp, 
  Clock, 
  Star,
  Gift,
  MessageCircle
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

// Mock Data
const revenueData = [
  { name: "Mon", revenue: 4000 },
  { name: "Tue", revenue: 3000 },
  { name: "Wed", revenue: 5500 },
  { name: "Thu", revenue: 4500 },
  { name: "Fri", revenue: 7000 },
  { name: "Sat", revenue: 9500 },
  { name: "Sun", revenue: 8000 },
];

const topServices = [
  { name: "Bridal Makeup", value: 35 },
  { name: "Keratin Treatment", value: 25 },
  { name: "Hydra Facial", value: 20 },
  { name: "Global Hair Color", value: 15 },
  { name: "Nail Art", value: 5 },
];

const recentActivities = [
  { id: 1, type: "booking", message: "New appointment: Sarah for Bridal Makeup", time: "10 mins ago", icon: Calendar, color: "text-blue-500", bg: "bg-blue-100" },
  { id: 2, type: "payment", message: "Payment received: ₹4,500 from Priya", time: "1 hour ago", icon: IndianRupee, color: "text-emerald-500", bg: "bg-emerald-100" },
  { id: 3, type: "review", message: "5-star review from Sneha", time: "2 hours ago", icon: Star, color: "text-yellow-500", bg: "bg-yellow-100" },
  { id: 4, type: "birthday", message: "It's Ananya's birthday today! Send a wish.", time: "Today", icon: Gift, color: "text-purple-500", bg: "bg-purple-100" },
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue, colorClass }: any) => (
  <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 mt-2">{value}</h3>
      </div>
      <div className={`p-3 rounded-xl ${colorClass.bg} ${colorClass.text}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <TrendingUp className={`w-4 h-4 mr-1 ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`} />
      <span className={trend === 'up' ? 'text-emerald-500 font-medium' : 'text-red-500 font-medium'}>
        {trendValue}
      </span>
      <span className="text-neutral-500 dark:text-neutral-400 ml-2">vs last month</span>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // Prevent hydration mismatch with charts

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Today's Revenue" 
          value="₹12,450" 
          icon={IndianRupee}
          trend="up"
          trendValue="+14.5%"
          colorClass={{ bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400" }}
        />
        <StatCard 
          title="Today's Appointments" 
          value="18" 
          icon={Calendar}
          trend="up"
          trendValue="+5.2%"
          colorClass={{ bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400" }}
        />
        <StatCard 
          title="Total Customers" 
          value="1,248" 
          icon={Users}
          trend="up"
          trendValue="+2.1%"
          colorClass={{ bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-600 dark:text-purple-400" }}
        />
        <StatCard 
          title="Pending Payments" 
          value="₹3,200" 
          icon={Clock}
          trend="down"
          trendValue="-1.5%"
          colorClass={{ bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-400" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Revenue Trends (This Week)</h3>
            <select className="bg-neutral-100 dark:bg-neutral-800 border-none text-sm rounded-lg px-3 py-1.5 outline-none cursor-pointer">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888888', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888888', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`₹${value}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Services Chart */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-6">Most Popular Services</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topServices} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e5e5" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#525252', fontSize: 12}} width={110} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" fill="#ec4899" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity & Birthday Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">Recent Activity</h3>
            <button className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className={`p-2.5 rounded-full ${activity.bg} ${activity.color} shrink-0`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-neutral-800 dark:text-neutral-200 font-medium">{activity.message}</p>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-0.5">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-8 shadow-lg text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <h3 className="text-2xl font-bold font-playfair mb-2 relative z-10">WhatsApp Integration</h3>
          <p className="text-purple-200 mb-6 relative z-10 max-w-sm">Automatically send invoices, appointment reminders, and birthday wishes directly to your customers' WhatsApp.</p>
          <div className="space-y-3 relative z-10">
            <button className="w-full bg-white text-purple-900 hover:bg-neutral-100 font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Configure WhatsApp API
            </button>
            <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 px-4 rounded-xl transition-colors">
              View Message Templates
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
