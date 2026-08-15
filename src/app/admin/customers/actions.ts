"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCustomer(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const birthdateStr = formData.get("birthdate") as string;
  
  let birthdate = null;
  if (birthdateStr) {
    birthdate = new Date(birthdateStr);
  }

  await prisma.customer.create({
    data: { name, email, phone, birthdate }
  });

  revalidatePath("/admin/customers");
}

export async function deleteCustomer(id: string) {
  await prisma.customer.delete({ where: { id } });
  revalidatePath("/admin/customers");
}
