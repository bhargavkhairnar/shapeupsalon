"use client";

import { useState } from "react";
import { Trash2, Phone, Mail, User, Gift, Search, History, Calendar, FileText, X } from "lucide-react";

export default function CustomersClient({ initialCustomers, deleteCustomerAction }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const filteredCustomers = initialCustomers.filter((c: any) => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (c.phone && c.phone.includes(searchTerm)) ||
    (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
          <input 
            type="text" 
            placeholder="Search customers by name, phone, or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm text-neutral-800 dark:text-neutral-100"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredCustomers.length === 0 ? (
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-12 text-center text-neutral-500">
            <p>No customers found matching "{searchTerm}".</p>
          </div>
        ) : (
          filteredCustomers.map((customer: any) => (
            <div key={customer.id} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-sm gap-4 transition-all hover:border-purple-300 dark:hover:border-purple-800">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-100 to-pink-100 text-purple-700 dark:from-purple-900/30 dark:to-pink-900/30 flex items-center justify-center font-bold text-lg shrink-0">
                  {customer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{customer.name}</h3>
                  <div className="flex flex-wrap items-center mt-1 gap-x-4 gap-y-1 text-sm text-neutral-500">
                    {customer.phone && (
                      <span className="flex items-center"><Phone className="w-3.5 h-3.5 mr-1" /> {customer.phone}</span>
                    )}
                    {customer.email && (
                      <span className="flex items-center"><Mail className="w-3.5 h-3.5 mr-1" /> {customer.email}</span>
                    )}
                    {customer.birthdate && (
                      <span className="flex items-center text-pink-600 dark:text-pink-400">
                        <Gift className="w-3.5 h-3.5 mr-1" /> 
                        {new Date(customer.birthdate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t border-neutral-100 dark:border-neutral-800 sm:border-0 pt-3 sm:pt-0">
                <button 
                  onClick={() => setSelectedCustomer(customer)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg text-sm font-medium hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors"
                >
                  <History className="w-4 h-4" /> View History
                </button>
                <form action={deleteCustomerAction.bind(null, customer.id)}>
                  <button className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Delete Customer">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>

      {/* History Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-neutral-100 dark:border-neutral-800">
              <div>
                <h2 className="text-xl font-bold font-playfair text-neutral-800 dark:text-neutral-100">Customer History</h2>
                <p className="text-sm text-neutral-500 mt-1">{selectedCustomer.name}</p>
              </div>
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="text-neutral-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-8 flex-1">
              
              {/* Appointments Section */}
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                  <Calendar className="w-5 h-5 text-purple-600" /> Appointments
                </h3>
                {selectedCustomer.appointments.length === 0 ? (
                  <p className="text-sm text-neutral-500 italic">No appointments found.</p>
                ) : (
                  <div className="space-y-3">
                    {selectedCustomer.appointments.map((app: any) => (
                      <div key={app.id} className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-4 flex flex-wrap justify-between items-center gap-4">
                        <div>
                          <p className="font-medium text-neutral-800 dark:text-neutral-200">{app.service?.name || 'Unknown Service'}</p>
                          <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(app.date).toLocaleDateString('en-GB')} at {new Date(app.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          {app.advanceAmount > 0 && (
                            <span className="text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded font-medium">Adv: ₹{app.advanceAmount}</span>
                          )}
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            app.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : 
                            app.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Invoices Section */}
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4 pb-2 border-b border-neutral-100 dark:border-neutral-800">
                  <FileText className="w-5 h-5 text-pink-600" /> Invoices
                </h3>
                {selectedCustomer.invoices.length === 0 ? (
                  <p className="text-sm text-neutral-500 italic">No invoices found.</p>
                ) : (
                  <div className="space-y-3">
                    {selectedCustomer.invoices.map((inv: any) => (
                      <div key={inv.id} className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-4 flex flex-col sm:flex-row justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-neutral-800 dark:text-neutral-200">{inv.invoiceNumber}</span>
                            <span className="text-xs text-neutral-500 border border-neutral-200 dark:border-neutral-700 px-2 py-0.5 rounded">
                              {new Date(inv.createdAt).toLocaleDateString('en-GB')}
                            </span>
                          </div>
                          <div className="mt-2 space-y-1">
                            {inv.items.map((item: any) => (
                              <p key={item.id} className="text-sm text-neutral-600 dark:text-neutral-400 flex justify-between gap-4">
                                <span>{item.description} (x{item.quantity})</span>
                                <span>₹{item.total}</span>
                              </p>
                            ))}
                          </div>
                        </div>
                        <div className="flex sm:flex-col justify-between sm:justify-center items-end border-t sm:border-t-0 sm:border-l border-neutral-200 dark:border-neutral-700 pt-3 sm:pt-0 sm:pl-4 min-w-[120px]">
                          <div className="text-xs text-neutral-500 mb-1">Total Amount</div>
                          <div className="font-bold text-lg text-neutral-800 dark:text-neutral-200">₹{inv.totalAmount}</div>
                          {inv.dueAmount > 0 ? (
                            <div className="text-xs text-red-500 font-medium mt-1">Due: ₹{inv.dueAmount}</div>
                          ) : (
                            <div className="text-xs text-emerald-500 font-medium mt-1">Paid in full</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
