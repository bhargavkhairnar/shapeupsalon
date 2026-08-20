"use server";

import prisma from "@/lib/prisma";

export async function getDashboardStats(timeframe: string, customStart?: string, customEnd?: string) {
  const now = new Date();
  let startDate = new Date();
  let endDate = new Date();

  switch (timeframe) {
    case "Today":
      startDate.setHours(0, 0, 0, 0);
      break;
    case "This Week":
      startDate.setDate(now.getDate() - now.getDay()); // Start of week
      startDate.setHours(0, 0, 0, 0);
      break;
    case "This Month":
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      break;
    case "6 Months":
      startDate.setMonth(now.getMonth() - 6);
      break;
    case "1 Year":
      startDate.setFullYear(now.getFullYear() - 1);
      break;
    case "Custom":
      if (customStart) {
        startDate = new Date(customStart);
        startDate.setHours(0, 0, 0, 0);
      }
      if (customEnd) {
        endDate = new Date(customEnd);
        endDate.setHours(23, 59, 59, 999);
      }
      break;
    default:
      startDate.setDate(1); // Default to this month
  }

  // 1. Revenue in timeframe
  const invoices = await prisma.invoice.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      }
    },
    include: {
      items: true
    }
  });

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
  
  // 2. Today's Appointments
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);
  
  const todayAppointments = await prisma.appointment.count({
    where: {
      date: {
        gte: todayStart,
        lte: todayEnd,
      }
    }
  });

  // 3. Total Customers
  const totalCustomers = await prisma.customer.count();

  // 4. Generate Chart Data
  // We will group the invoices based on the timeframe
  let chartData: any[] = [];
  
  if (timeframe === "Today") {
    // Group by hour
    for (let i = 8; i <= 20; i++) {
      const hourInvoices = invoices.filter(inv => inv.createdAt.getHours() === i);
      const rev = hourInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
      chartData.push({ name: `${i}:00`, revenue: rev });
    }
  } else if (timeframe === "This Week") {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 0; i < 7; i++) {
      const dayInvoices = invoices.filter(inv => inv.createdAt.getDay() === i);
      const rev = dayInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
      chartData.push({ name: days[i], revenue: rev });
    }
  } else if (timeframe === "This Month") {
    // Group by week or every 5 days for simplicity, or just daily if we want
    // Let's do 4 weeks
    chartData = [
      { name: "Week 1", revenue: invoices.filter(i => i.createdAt.getDate() <= 7).reduce((s, i) => s + i.totalAmount, 0) },
      { name: "Week 2", revenue: invoices.filter(i => i.createdAt.getDate() > 7 && i.createdAt.getDate() <= 14).reduce((s, i) => s + i.totalAmount, 0) },
      { name: "Week 3", revenue: invoices.filter(i => i.createdAt.getDate() > 14 && i.createdAt.getDate() <= 21).reduce((s, i) => s + i.totalAmount, 0) },
      { name: "Week 4", revenue: invoices.filter(i => i.createdAt.getDate() > 21).reduce((s, i) => s + i.totalAmount, 0) },
    ];
  } else if (timeframe === "6 Months" || timeframe === "1 Year") {
    // Group by month
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const startMonth = startDate.getMonth();
    const count = timeframe === "6 Months" ? 6 : 12;
    for (let i = 0; i < count; i++) {
      const m = (startMonth + i) % 12;
      const monthInvoices = invoices.filter(inv => inv.createdAt.getMonth() === m);
      const rev = monthInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
      chartData.push({ name: months[m], revenue: rev });
    }
  } else if (timeframe === "Custom") {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 31) {
      for (let i = 0; i <= diffDays; i++) {
        const d = new Date(startDate);
        d.setDate(d.getDate() + i);
        const dayInvoices = invoices.filter(inv => inv.createdAt.getDate() === d.getDate() && inv.createdAt.getMonth() === d.getMonth() && inv.createdAt.getFullYear() === d.getFullYear());
        const rev = dayInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
        chartData.push({ name: `${d.getDate()}/${d.getMonth()+1}`, revenue: rev });
      }
    } else {
      const diffMonths = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      for (let i = 0; i <= diffMonths; i++) {
        const d = new Date(startDate);
        d.setMonth(d.getMonth() + i);
        const m = d.getMonth();
        const monthInvoices = invoices.filter(inv => inv.createdAt.getMonth() === m && inv.createdAt.getFullYear() === d.getFullYear());
        const rev = monthInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
        chartData.push({ name: `${months[m]} ${d.getFullYear().toString().substring(2)}`, revenue: rev });
      }
    }
  }

  // 5. Top Services
  const allItems = invoices.flatMap(inv => inv.items);
  const serviceCounts: Record<string, number> = {};
  allItems.forEach(item => {
    serviceCounts[item.description] = (serviceCounts[item.description] || 0) + item.quantity;
  });
  
  const topServices = Object.entries(serviceCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, value]) => ({ name, value }));

  // If no services yet, provide empty state
  if (topServices.length === 0) {
    topServices.push({ name: "No services yet", value: 0 });
  }

  // 6. Recent Activity
  const recentInvoices = await prisma.invoice.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { customer: true }
  });

  const recentActivity = recentInvoices.map(inv => ({
    id: inv.id,
    type: "payment",
    message: `Payment received: ₹${inv.totalAmount.toFixed(2)} from ${inv.customer.name}`,
    time: inv.createdAt.toLocaleDateString(),
    icon: "IndianRupee",
    color: "text-emerald-500",
    bg: "bg-emerald-100"
  }));

  return {
    totalRevenue,
    todayAppointments,
    totalCustomers,
    chartData,
    topServices,
    recentActivity
  };
}
