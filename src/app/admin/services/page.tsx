import prisma from "@/lib/prisma";
import prisma from "@/lib/prisma";
import ServicesClient from "./ServicesClient";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <ServicesClient initialServices={services} />;
}
