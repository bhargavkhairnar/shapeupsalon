export const dynamic = 'force-dynamic';

import React from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Scissors, 
  Users, 
  Receipt, 
  MessageCircle, 
  BarChart3, 
  Settings,
  LogOut,
  Bell,
  Gift,
  Globe
} from "lucide-react";
import { logout } from "@/app/login/actions";
import prisma from "@/lib/prisma";

import NotificationBell from "./NotificationBell";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const today = new Date();
  const currentMonth = today.getMonth() + 1; // getMonth is 0-indexed
  const currentDate = today.getDate();

  // In SQLite, we can't easily extract month/day in Prisma directly, so we fetch all with birthdays and filter
  const customersWithBirthdays = await prisma.customer.findMany({
    where: { birthdate: { not: null } }
  });

  const birthdayCustomers = customersWithBirthdays.filter(c => {
    if (!c.birthdate) return false;
    return c.birthdate.getMonth() + 1 === currentMonth && c.birthdate.getDate() === currentDate;
  });

  const navItems = [
    { name: "Billing", href: "/admin/billing", icon: Receipt },
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Appointments", href: "/admin/appointments", icon: CalendarCheck },
    { name: "Services", href: "/admin/services", icon: Scissors },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
    { name: "Visit Website", href: "/", icon: Globe },
  ];

  return (
    <div className="flex h-screen bg-[#FDFBF7] dark:bg-neutral-950 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 font-playfair">
              Shape Up Admin
            </h1>
          </div>
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 text-neutral-600 dark:text-neutral-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all duration-200 group"
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
          <form action={logout}>
            <button type="submit" className="flex items-center space-x-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between px-8 shrink-0 relative z-40">
          <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
            Overview
          </h2>
          <div className="flex items-center space-x-4">

            <NotificationBell birthdayCustomers={birthdayCustomers} />
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md cursor-pointer hover:shadow-lg transition-shadow">
              A
            </div>
          </div>
        </header>

        {birthdayCustomers.length > 0 && (
          <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-b border-pink-100 dark:border-pink-900/30 px-8 py-3 flex items-center shrink-0">
            <Gift className="w-5 h-5 text-pink-500 mr-3 animate-bounce" />
            <p className="text-sm font-medium text-pink-700 dark:text-pink-300">
              🎉 It's a special day! Today is the birthday of: {birthdayCustomers.map(c => c.name).join(", ")}. Don't forget to wish them!
            </p>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
