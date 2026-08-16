import prisma from "@/lib/prisma";
import { createCustomer, deleteCustomer } from "./actions";
import { Trash2, Phone, Mail, User, Gift } from "lucide-react";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 font-playfair">Customers</h1>
          <p className="text-neutral-500 mt-1">Manage your clients and their contact information.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Add New Customer Form */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-white">Add New Customer</h2>
            <form action={createCustomer} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
                  <input type="text" name="name" required className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent" placeholder="Jane Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
                  <input type="tel" name="phone" className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent" placeholder="91567912336" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
                  <input type="email" name="email" className="w-full pl-10 pr-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent" placeholder="jane@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Birthdate</label>
                <input type="date" name="birthdate" className="w-full px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-black dark:text-white" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all mt-4">
                Add Customer
              </button>
            </form>
          </div>
        </div>

        {/* Customers List */}
        <div className="lg:col-span-2 space-y-4">
          {customers.length === 0 ? (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-12 text-center text-neutral-500">
              <p>No customers found. Add your first client to get started!</p>
            </div>
          ) : (
            customers.map(customer => (
              <div key={customer.id} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-100 to-pink-100 text-purple-700 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center font-bold text-lg">
                    {customer.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{customer.name}</h3>
                    <div className="flex items-center mt-1 space-x-4 text-sm text-neutral-500">
                      {customer.phone && (
                        <span className="flex items-center"><Phone className="w-3.5 h-3.5 mr-1" /> {customer.phone}</span>
                      )}
                      {customer.email && (
                        <span className="flex items-center"><Mail className="w-3.5 h-3.5 mr-1" /> {customer.email}</span>
                      )}
                      {customer.birthdate && (
                        <span className="flex items-center text-pink-600 dark:text-pink-400">
                          <Gift className="w-3.5 h-3.5 mr-1" /> 
                          {customer.birthdate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <form action={deleteCustomer.bind(null, customer.id)}>
                    <button className="p-2 text-neutral-400 hover:text-red-600 transition-colors" title="Delete Customer">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </form>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
