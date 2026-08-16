import prisma from "@/lib/prisma";
import { createCustomer, deleteCustomer } from "./actions";
import { Phone, Mail, User, Gift } from "lucide-react";
import CustomersClient from "./CustomersClient";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      appointments: {
        include: { service: true },
        orderBy: { date: 'desc' }
      },
      invoices: {
        include: { items: true },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 font-playfair">Customers</h1>
          <p className="text-neutral-500 mt-1">Manage your clients, contact information, and history.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        
        {/* Add New Customer Form */}
        <div className="xl:col-span-1 sticky top-6">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-white font-playfair">Add New Customer</h2>
            <form action={createCustomer} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                  <input type="text" name="name" required className="w-full pl-9 pr-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-purple-500 outline-none" placeholder="Jane Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                  <input type="tel" name="phone" className="w-full pl-9 pr-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-purple-500 outline-none" placeholder="91567912336" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                  <input type="email" name="email" className="w-full pl-9 pr-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-purple-500 outline-none" placeholder="jane@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Birthdate</label>
                <input type="date" name="birthdate" className="w-full px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm focus:ring-2 focus:ring-purple-500 outline-none text-neutral-900 dark:text-white" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all mt-4 text-sm">
                Add Customer
              </button>
            </form>
          </div>
        </div>

        {/* Customers List & Search */}
        <div className="xl:col-span-2">
          <CustomersClient initialCustomers={customers} deleteCustomerAction={deleteCustomer} />
        </div>

      </div>
    </div>
  );
}
