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
      createdAt: data.invoiceDate ? new Date(data.invoiceDate) : undefined,
      items: {
        deleteMany: {},
        create: data.items.map((item: any) => ({
          description: item.name,
          staffName: item.staffName || null,
          unitPrice: item.price,
          quantity: item.qty,
          total: item.price * item.qty
        }))
      },
      advanceAmount: data.advanceAmount || 0,
      dueAmount: data.dueAmount || 0,
      customAmount: data.customAmount || 0
    },
    create: {
      invoiceNumber: data.invoiceId,
      customerId: customerId,
      totalAmount: data.total,
      status: "PAID",
      createdAt: data.invoiceDate ? new Date(data.invoiceDate) : undefined,
      items: {
        create: data.items.map((item: any) => ({
          description: item.name,
          staffName: item.staffName || null,
          unitPrice: item.price,
          quantity: item.qty,
          total: item.price * item.qty
        }))
      },
      advanceAmount: data.advanceAmount || 0,
      dueAmount: data.dueAmount || 0,
      customAmount: data.customAmount || 0
    }
  });

  revalidatePath("/admin");
  revalidatePath("/admin/billing");
  return { success: true, invoice };
}
