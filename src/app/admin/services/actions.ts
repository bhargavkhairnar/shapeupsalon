"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createService(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const duration = parseInt(formData.get("duration") as string);
  const category = formData.get("category") as string;
  const isActive = formData.get("isActive") === "on";

  await prisma.service.create({
    data: { name, description, price, duration, category, isActive }
  });

  revalidatePath("/admin/services");
  revalidatePath("/"); // Revalidate frontend landing page as well
}

export async function deleteService(id: string) {
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
  revalidatePath("/");
}

export async function toggleServiceStatus(id: string, isActive: boolean) {
  await prisma.service.update({
    where: { id },
    data: { isActive: !isActive }
  });
  revalidatePath("/admin/services");
  revalidatePath("/");
}

export async function getServices() {
  return await prisma.service.findMany({
    orderBy: { name: 'asc' }
  });
}
