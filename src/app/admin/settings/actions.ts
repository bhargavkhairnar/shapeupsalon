"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSettings() {
  const settings = await prisma.setting.findMany();
  const settingsMap = settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {} as Record<string, string>);

  return {
    salonName: settingsMap["salonName"] || "Shape Up",
    salonTagline: settingsMap["salonTagline"] || "Luxury Beauty Salon",
    salonAddress: settingsMap["salonAddress"] || "Takala, to, Rajarampuri Main Rd, near old Siddhivinayak hospital, Kolhapur, Maharashtra 416013",
    salonPhone: settingsMap["salonPhone"] || "+91 9876543210",
    salonGst: settingsMap["salonGst"] || "27ABCDE1234F1Z5",
  };
}

export async function saveSettings(formData: FormData) {
  const keys = ["salonName", "salonTagline", "salonAddress", "salonPhone", "salonGst"];
  
  for (const key of keys) {
    const value = formData.get(key) as string;
    if (value !== null) {
      await prisma.setting.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      });
    }
  }

  // Revalidate everything since settings reflect globally
  revalidatePath("/", "layout");
}
