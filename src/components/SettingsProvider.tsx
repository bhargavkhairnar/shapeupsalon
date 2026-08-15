"use client";

import React, { createContext, useContext } from 'react';

type Settings = {
  salonName: string;
  salonTagline: string;
  salonAddress: string;
  salonPhone: string;
  salonGst: string;
};

const SettingsContext = createContext<Settings | null>(null);

export function SettingsProvider({ children, settings }: { children: React.ReactNode, settings: Settings }) {
  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
}
