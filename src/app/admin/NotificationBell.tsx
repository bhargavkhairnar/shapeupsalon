"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Gift } from "lucide-react";

export default function NotificationBell({ birthdayCustomers }: { birthdayCustomers: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasRead, setHasRead] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const notificationsCount = birthdayCustomers.length;
  const showDot = notificationsCount > 0 && !hasRead;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasRead(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={toggleDropdown}
        className="relative p-2 text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors cursor-pointer"
      >
        <Bell className="w-6 h-6" />
        {showDot && (
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-pink-500 rounded-full border-2 border-white dark:border-neutral-900"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center bg-neutral-50 dark:bg-neutral-900">
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-100">Notifications</h3>
            {notificationsCount > 0 && (
              <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded-full">
                {notificationsCount} New
              </span>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto p-2">
            {notificationsCount === 0 ? (
              <div className="p-4 text-center text-neutral-500 text-sm">
                No new notifications right now.
              </div>
            ) : (
              birthdayCustomers.map(c => (
                <div key={c.id} className="p-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl transition-colors flex items-start gap-3 cursor-pointer">
                  <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-full text-pink-600 dark:text-pink-400 shrink-0">
                    <Gift className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200">Birthday Reminder</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                      It's <span className="font-semibold text-neutral-700 dark:text-neutral-300">{c.name}'s</span> birthday today!
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          {notificationsCount > 0 && (
            <div className="p-3 border-t border-neutral-100 dark:border-neutral-800 text-center">
              <button 
                onClick={() => setIsOpen(false)}
                className="text-xs font-medium text-purple-600 hover:text-purple-700 hover:underline cursor-pointer"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
