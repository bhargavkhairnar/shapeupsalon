import prisma from "@/lib/prisma";
export const dynamic = "force-dynamic";
import BillingClient from "./BillingClient";
import { getSettings } from "../settings/actions";

export default async function BillingPage() {
  const allCustomers = await prisma.customer.findMany({
    select: {
      id: true,
      name: true,
      phone: true,
    }
  });

  const allServices = await prisma.service.findMany({
    select: {
      id: true,
      name: true,
      price: true,
    }
  });

  const allInvoices = await prisma.invoice.findMany({
    include: {
      customer: {
        select: { name: true, phone: true }
      },
      items: true
    },
    orderBy: { createdAt: 'desc' }
  });

  const settings = await getSettings();

  return <BillingClient allCustomers={allCustomers} allServices={allServices} allInvoices={allInvoices} settings={settings} />;
}
