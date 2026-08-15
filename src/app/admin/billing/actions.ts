"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function saveInvoice(data: any) {
  let customerId = data.customerId;

  // If no customerId is provided, we must find or create one
  if (!customerId) {
    if (!data.customerName) {
      throw new Error("Customer name is required");
    }
    
    const existing = await prisma.customer.findFirst({
      where: {
        name: data.customerName,
        phone: data.customerPhone || undefined
      }
    });

    if (existing) {
      customerId = existing.id;
    } else {
      const newCustomer = await prisma.customer.create({
        data: {
          name: data.customerName,
          phone: data.customerPhone || null,
        }
      });
      customerId = newCustomer.id;
    }
  }

  // Create or Update Invoice
  const invoice = await prisma.invoice.upsert({
    where: { invoiceNumber: data.invoiceId },
    update: {
      customerId: customerId,
      totalAmount: data.total,
      items: {
        deleteMany: {},
        create: data.items.map((item: any) => ({
          description: item.name,
          unitPrice: item.price,
          quantity: item.qty,
          total: item.price * item.qty
        }))
      }
    },
    create: {
      invoiceNumber: data.invoiceId,
      customerId: customerId,
      totalAmount: data.total,
      status: "PAID",
      items: {
        create: data.items.map((item: any) => ({
          description: item.name,
          unitPrice: item.price,
          quantity: item.qty,
          total: item.price * item.qty
        }))
      }
    }
  });

  revalidatePath("/admin");
  revalidatePath("/admin/billing");
  return { success: true, invoice };
}
