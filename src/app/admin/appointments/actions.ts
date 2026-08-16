"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getAppointments() {
  const appointments = await prisma.appointment.findMany({
    include: {
      customer: true,
      service: true,
    },
    orderBy: {
      date: 'desc'
    }
  });

  return appointments.map(app => {
    // Convert to the format expected by the frontend
    const dateObj = new Date(app.date);
    return {
      id: app.id,
      customerName: app.customer.name,
      phone: app.customer.phone || "",
      service: app.service.name,
      date: dateObj.toISOString().split('T')[0],
      time: dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: app.status === "SCHEDULED" ? "Upcoming" : (app.status === "COMPLETED" ? "Completed" : "Cancelled"),
      staffName: app.staffName || "",
      advanceAmount: app.advanceAmount || 0
    };
  });
}

export async function createAppointment(data: {
  customerName: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  staffName: string;
  advanceAmount?: number;
}) {
  // 1. Find or create customer
  let customerId = "";
  const existingCustomer = await prisma.customer.findFirst({
    where: { name: data.customerName, phone: data.phone || undefined }
  });

  if (existingCustomer) {
    customerId = existingCustomer.id;
  } else {
    const newCustomer = await prisma.customer.create({
      data: { name: data.customerName, phone: data.phone || null }
    });
    customerId = newCustomer.id;
  }

  // 2. Find or create service (or just find)
  let serviceId = "";
  const existingService = await prisma.service.findFirst({
    where: { name: data.service }
  });
  
  if (existingService) {
    serviceId = existingService.id;
  } else {
    const newService = await prisma.service.create({
      data: { name: data.service, price: 0 } // Assuming price 0 if custom
    });
    serviceId = newService.id;
  }

  // Parse date and time
  const [timeStr, modifier] = data.time.split(' ');
  let [hours, minutes] = timeStr.split(':');
  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'PM') {
    hours = (parseInt(hours, 10) + 12).toString();
  }
  
  const appointmentDate = new Date(`${data.date}T${hours.padStart(2, '0')}:${minutes}:00`);

  const appointment = await prisma.appointment.create({
    data: {
      customerId,
      serviceId,
      date: appointmentDate,
      status: "SCHEDULED",
      staffName: data.staffName || null,
      advanceAmount: data.advanceAmount || 0
    }
  });

  revalidatePath("/admin");
  revalidatePath("/admin/appointments");
  return appointment;
}

export async function updateAppointmentStatus(id: string, status: "Upcoming" | "Completed" | "Cancelled") {
  let dbStatus = "SCHEDULED";
  if (status === "Completed") dbStatus = "COMPLETED";
  if (status === "Cancelled") dbStatus = "CANCELLED";

  await prisma.appointment.update({
    where: { id },
    data: { status: dbStatus }
  });

  revalidatePath("/admin");
  revalidatePath("/admin/appointments");
}

export async function deleteAppointment(id: string) {
  await prisma.appointment.delete({
    where: { id }
  });
  revalidatePath("/admin");
  revalidatePath("/admin/appointments");
}
