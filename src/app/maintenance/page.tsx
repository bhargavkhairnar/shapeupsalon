import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AlertTriangle, Clock, ArrowLeft, ShieldAlert } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#faf7f5] dark:bg-neutral-950 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-neutral-800 dark:text-neutral-200">
      <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-neutral-900 p-8 sm:p-10 rounded-3xl shadow-xl border border-pink-100 dark:border-neutral-800">
        
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-52 h-20 relative">
            <Image
              src="/new-logo.jpg"
              alt="Shape Up Beauty Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Warning Icon Badge */}
        <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center border border-amber-200 dark:border-amber-800">
          <ShieldAlert className="w-8 h-8" />
        </div>

        {/* Title & Message */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30">
            503 • Service Temporarily Unavailable
          </span>
          <h1 className="text-2xl font-serif font-bold text-neutral-900 dark:text-white pt-2">
            Billing System Offline
          </h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
            The Shape Up Beauty billing and administrative portal is temporarily taken down for scheduled server maintenance and database upgrades.
          </p>
          <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 pt-1">
            Access is currently restricted for all accounts, including clinic staff and administrators.
          </p>
        </div>

        {/* Status Box */}
        <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 text-left space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            <Clock className="w-4 h-4 text-brand-600" />
            <span>Scheduled Maintenance in Progress</span>
          </div>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal">
            Normal operations and billing access will resume once maintenance is completed. Data and past invoices remain securely stored.
          </p>
        </div>

        {/* Return Button */}
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-neutral-900 hover:bg-brand-600 text-white text-xs font-semibold uppercase tracking-wider transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Shape Up Website</span>
          </Link>
        </div>

      </div>

      <p className="text-[11px] text-neutral-400 dark:text-neutral-600 mt-6">
        Shape Up Beauty Clinic • Takala, Rajarampuri, Kolhapur
      </p>
    </div>
  );
}
