"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { Plus, Trash2, Printer, X, Search, Loader2 } from "lucide-react";
import { saveInvoice } from "./actions";

interface Customer {
  id: string;
  name: string;
  phone: string | null;
}

interface InvoiceItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  staffName?: string;
}

interface Service {
  id: string;
  name: string;
  price: number;
}

export default function BillingClient({ allCustomers, allServices, allInvoices, settings }: { allCustomers: Customer[], allServices: Service[], allInvoices?: any[], settings: any }) {
  const [isCreating, setIsCreating] = useState(false);
  const [isPending, startTransition] = useTransition();
  
  // Form State
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  
  // Autocomplete State
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", name: "", price: 0, qty: 1, staffName: "" }
  ]);
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [includeGst, setIncludeGst] = useState(false);
  const [invoiceId] = useState(`INV-${Math.floor(1000 + Math.random() * 9000)}`);
  const [date] = useState(new Date().toLocaleDateString('en-GB'));
  const [advanceAmount, setAdvanceAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<number>(0);

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const totalBase = subtotal + (Number(customAmount) || 0);
  const gst = includeGst ? totalBase * 0.18 : 0; // 18% GST if enabled
  const total = totalBase + gst;
  const dueAmount = Math.max(0, total - (Number(advanceAmount) || 0));

  // History Filter State
  const [filterMonth, setFilterMonth] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const filteredInvoices = (allInvoices || []).filter(inv => {
    const invDate = new Date(inv.createdAt);
    if (filterMonth) {
      const [y, m] = filterMonth.split('-');
      if (invDate.getFullYear().toString() !== y || (invDate.getMonth() + 1).toString().padStart(2, '0') !== m) {
        return false;
      }
    }
    if (filterDate) {
      if (invDate.toISOString().split('T')[0] !== filterDate) {
        return false;
      }
    }
    return true;
  });

  // Handle Autocomplete Search
  const handleSearch = (value: string) => {
    setCustomerName(value);
    setCustomerId(null); // Reset id if typing custom
    if (value.length > 0) {
      const filtered = allCustomers.filter(c => 
        c.name.toLowerCase().includes(value.toLowerCase()) || 
        (c.phone && c.phone.includes(value))
      );
      setFilteredCustomers(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectCustomer = (customer: Customer) => {
    setCustomerId(customer.id);
    setCustomerName(customer.name);
    if (customer.phone) setCustomerPhone(customer.phone);
    setShowSuggestions(false);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddItem = () => {
    setItems([...items, { id: Math.random().toString(), name: "", price: 0, qty: 1, staffName: "" }]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'name') {
          const matchedService = allServices.find(s => s.name === value);
          if (matchedService) {
            updatedItem.price = matchedService.price;
          }
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const handleSaveAndPrint = () => {
    if (!customerName || items.some(i => !i.name || i.price <= 0)) {
      alert("Please fill customer name and ensure all items have a valid service name and price.");
      return;
    }

    startTransition(async () => {
      try {
        await saveInvoice({
          customerId,
          customerName,
          customerPhone,
          items,
          paymentMode,
          invoiceId,
          subtotal,
          gst,
          total,
          advanceAmount: Number(advanceAmount) || 0,
          dueAmount: dueAmount,
          customAmount: Number(customAmount) || 0
        });
        
        setTimeout(() => {
          window.print();
        }, 300);
      } catch (error: any) {
        alert(error.message || "Failed to save invoice");
      }
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex justify-between items-center mb-8 print:hidden">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 font-playfair">Billing & Invoices</h1>
          <p className="text-neutral-500 mt-1">Generate PDF invoices and track payments.</p>
        </div>
        {!isCreating && (
          <button 
            onClick={() => setIsCreating(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
          >
            Create Invoice
          </button>
        )}
      </div>

      {!isCreating ? (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 font-playfair">Invoice History</h2>
            <div className="flex gap-3">
              <input 
                type="month" 
                value={filterMonth} 
                onChange={(e) => { setFilterMonth(e.target.value); setFilterDate(""); }} 
                className="px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" 
                title="Filter by month"
              />
              <input 
                type="date" 
                value={filterDate} 
                onChange={(e) => { setFilterDate(e.target.value); setFilterMonth(""); }} 
                className="px-3 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500" 
                title="Filter by exact date"
              />
              {(filterMonth || filterDate) && (
                <button onClick={() => { setFilterMonth(""); setFilterDate(""); }} className="p-2 text-neutral-500 hover:text-red-500 rounded-lg transition-colors">
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
          
          {filteredInvoices.length === 0 ? (
            <div className="text-center text-neutral-500 flex flex-col items-center justify-center min-h-[300px]">
              <svg className="w-16 h-16 mb-4 text-neutral-300 dark:text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-400">No invoices found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400 text-sm border-b border-neutral-200 dark:border-neutral-800">
                    <th className="py-4 px-4 font-medium">Invoice No</th>
                    <th className="py-4 px-4 font-medium">Customer</th>
                    <th className="py-4 px-4 font-medium">Date</th>
                    <th className="py-4 px-4 font-medium text-right">Amount</th>
                    <th className="py-4 px-4 font-medium text-right">Advance</th>
                    <th className="py-4 px-4 font-medium text-right">Due</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {filteredInvoices.map((inv) => (
                    <tr key={inv.id} className="border-b border-neutral-100 dark:border-neutral-800 last:border-0 hover:bg-neutral-50 dark:hover:bg-neutral-800/30">
                      <td className="py-4 px-4 font-medium text-purple-600 dark:text-purple-400">{inv.invoiceNumber}</td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-neutral-800 dark:text-neutral-200">{inv.customer?.name}</div>
                        {inv.customer?.phone && <div className="text-xs text-neutral-500">{inv.customer.phone}</div>}
                      </td>
                      <td className="py-4 px-4 text-neutral-600 dark:text-neutral-400">
                        {new Date(inv.createdAt).toLocaleDateString('en-GB')}
                      </td>
                      <td className="py-4 px-4 font-medium text-right text-neutral-800 dark:text-neutral-200">₹{inv.totalAmount.toFixed(2)}</td>
                      <td className="py-4 px-4 text-right text-emerald-600">₹{(inv.advanceAmount || 0).toFixed(2)}</td>
                      <td className="py-4 px-4 text-right">
                        <span className={(inv.dueAmount || 0) > 0 ? "text-red-500 font-medium" : "text-emerald-500"}>
                          ₹{(inv.dueAmount || 0).toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          
          {/* Editor Form (Hidden on Print) */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm print:hidden">
            <div className="flex justify-between items-center mb-6 border-b border-neutral-100 dark:border-neutral-800 pb-4">
              <h2 className="text-xl font-bold font-playfair text-neutral-800 dark:text-neutral-100">Invoice Details</h2>
              <button onClick={() => setIsCreating(false)} className="text-neutral-400 hover:text-red-500 transition-colors cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative" ref={searchRef}>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Search Customer Name</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                    <input 
                      type="text" 
                      value={customerName}
                      onChange={(e) => handleSearch(e.target.value)}
                      onFocus={() => {
                        if (customerName.length > 0) setShowSuggestions(true);
                      }}
                      placeholder="Type name or phone..."
                      className="w-full pl-9 pr-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-neutral-800 dark:text-neutral-100"
                    />
                  </div>
                  
                  {/* Autocomplete Dropdown */}
                  {showSuggestions && filteredCustomers.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {filteredCustomers.map(customer => (
                        <div 
                          key={customer.id} 
                          onClick={() => selectCustomer(customer)}
                          className="px-4 py-3 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer border-b border-neutral-100 dark:border-neutral-700 last:border-0"
                        >
                          <p className="font-medium text-neutral-800 dark:text-neutral-100">{customer.name}</p>
                          {customer.phone && <p className="text-xs text-neutral-500">{customer.phone}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                  {showSuggestions && filteredCustomers.length === 0 && customerName && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg px-4 py-3 text-sm text-neutral-500">
                      No matching customers found. Will save as new.
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Phone Number</label>
                  <input 
                    type="text" 
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Enter phone"
                    className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-neutral-800 dark:text-neutral-100"
                  />
                </div>
              </div>

              {/* Items */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Services</label>
                </div>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-3 items-start bg-neutral-100/50 dark:bg-neutral-800/30 p-3 sm:p-0 rounded-xl sm:bg-transparent sm:dark:bg-transparent">
                      <div className="w-full sm:flex-1">
                        <label className="sm:hidden block text-xs text-neutral-500 mb-1">Service</label>
                        <input 
                          type="text" 
                          placeholder="Service name"
                          value={item.name}
                          onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                          className="w-full px-4 py-2 bg-white sm:bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-neutral-800 dark:text-neutral-100"
                        />
                      </div>
                      <div className="w-full sm:w-32">
                        <label className="sm:hidden block text-xs text-neutral-500 mb-1">Staff</label>
                        <input 
                          type="text" 
                          placeholder="Staff Name"
                          value={item.staffName || ''}
                          onChange={(e) => handleItemChange(item.id, 'staffName', e.target.value)}
                          className="w-full px-4 py-2 bg-white sm:bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-neutral-800 dark:text-neutral-100"
                        />
                      </div>
                      <div className="flex gap-3 w-full sm:w-auto">
                        <div className="flex-1 sm:w-28">
                          <label className="sm:hidden block text-xs text-neutral-500 mb-1">Price (₹)</label>
                          <input 
                            type="number" 
                            placeholder="Price"
                            value={item.price || ''}
                            onChange={(e) => handleItemChange(item.id, 'price', Number(e.target.value))}
                            className="w-full px-4 py-2 bg-white sm:bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-neutral-800 dark:text-neutral-100"
                          />
                        </div>
                        <div className="w-20">
                          <label className="sm:hidden block text-xs text-neutral-500 mb-1">Qty</label>
                          <input 
                            type="number" 
                            placeholder="Qty"
                            min="1"
                            value={item.qty || ''}
                            onChange={(e) => handleItemChange(item.id, 'qty', Number(e.target.value))}
                            className="w-full px-4 py-2 bg-white sm:bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-neutral-800 dark:text-neutral-100"
                          />
                        </div>
                        <div className="flex items-end pb-0.5">
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-2.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer"
                            disabled={items.length === 1}
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={handleAddItem}
                  className="mt-3 flex items-center text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 font-medium transition-colors cursor-pointer"
                >
                  <Plus size={16} className="mr-1" /> Add Service
                </button>
              </div>

              {/* Payment Mode */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Payment Mode</label>
                <div className="flex gap-4">
                  {['Cash', 'Card', 'UPI'].map(mode => (
                    <label key={mode} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="paymentMode" 
                        value={mode}
                        checked={paymentMode === mode}
                        onChange={(e) => setPaymentMode(e.target.value)}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amounts section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Custom Amount (+)</label>
                  <input 
                    type="number" 
                    value={customAmount || ''}
                    onChange={(e) => setCustomAmount(Number(e.target.value))}
                    placeholder="Enter custom amount"
                    className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-neutral-800 dark:text-neutral-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Advance Amount Paid</label>
                  <input 
                    type="number" 
                    value={advanceAmount || ''}
                    onChange={(e) => setAdvanceAmount(Number(e.target.value))}
                    placeholder="Enter advance amount"
                    className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-neutral-800 dark:text-neutral-100"
                  />
                </div>
              </div>

              {/* GST Toggle */}
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="includeGst" 
                  checked={includeGst}
                  onChange={(e) => setIncludeGst(e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-neutral-300 rounded focus:ring-purple-500 cursor-pointer"
                />
                <label htmlFor="includeGst" className="ml-2 block text-sm font-medium text-neutral-700 dark:text-neutral-300 cursor-pointer">
                  Apply 18% GST to this invoice
                </label>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <button 
                  onClick={handleSaveAndPrint}
                  disabled={isPending}
                  className="w-full flex items-center justify-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-70"
                >
                  {isPending ? <Loader2 className="animate-spin w-5 h-5" /> : <Printer size={18} />}
                  {isPending ? 'Saving Invoice...' : 'Save & Print Invoice'}
                </button>
              </div>
            </div>
          </div>

          {/* Invoice Preview (Also used for printing) */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-lg invoice-print-container">
            {/* Header */}
            <div className="flex justify-between items-start mb-8 border-b border-neutral-100 pb-6">
              <div className="flex flex-col gap-3">
                <div className="relative w-40 h-16 shrink-0 overflow-hidden">
                  <img src="/new-logo.jpg" alt="Shape Up Beauty Logo" className="w-full h-full object-contain object-left" />
                </div>
                <div className="text-sm text-neutral-500">
                  <p className="max-w-[200px] leading-relaxed">{settings.salonAddress}</p>
                  <p className="mt-1">Phone: {settings.salonPhone}</p>
                </div>
              </div>
              <div className="text-right">
                <h3 className="text-2xl font-bold text-neutral-800 mb-2">INVOICE</h3>
                <p className="text-sm text-neutral-500"><span className="font-medium">Invoice No:</span> {invoiceId}</p>
                <p className="text-sm text-neutral-500"><span className="font-medium">Date:</span> {date}</p>
              </div>
            </div>

            {/* Bill To */}
            <div className="mb-8">
              <p className="text-sm font-semibold text-neutral-800 mb-2 border-b border-neutral-100 pb-2 inline-block">BILL TO</p>
              {customerName ? (
                <>
                  <p className="font-medium text-neutral-800 text-lg">{customerName}</p>
                  {customerPhone && <p className="text-sm text-neutral-500 mt-1">Phone: {customerPhone}</p>}
                </>
              ) : (
                <p className="text-sm text-neutral-400 italic">Customer details will appear here</p>
              )}
            </div>

            {/* Items Table */}
            <div className="mb-8 overflow-x-auto rounded-xl border border-neutral-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50 text-neutral-600 text-sm">
                    <th className="py-3 px-4 font-medium border-b border-neutral-200">Description</th>
                    <th className="py-3 px-4 font-medium border-b border-neutral-200">Staff</th>
                    <th className="py-3 px-4 font-medium border-b border-neutral-200 text-right w-24">Rate</th>
                    <th className="py-3 px-4 font-medium border-b border-neutral-200 text-center w-20">Qty</th>
                    <th className="py-3 px-4 font-medium border-b border-neutral-200 text-right w-28">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {items.map((item, index) => (
                    <tr key={index} className="border-b border-neutral-100 last:border-0">
                      <td className="py-3 px-4 text-neutral-800">{item.name || <span className="text-neutral-400 italic">Item name</span>}</td>
                      <td className="py-3 px-4 text-neutral-600">{item.staffName || "-"}</td>
                      <td className="py-3 px-4 text-neutral-600 text-right">₹{item.price.toFixed(2)}</td>
                      <td className="py-3 px-4 text-neutral-600 text-center">{item.qty}</td>
                      <td className="py-3 px-4 text-neutral-800 font-medium text-right">₹{(item.price * item.qty).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="flex justify-end mb-8">
              <div className="w-64 space-y-3">
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {customAmount > 0 && (
                  <div className="flex justify-between text-sm text-neutral-600">
                    <span>Custom Amount</span>
                    <span>₹{Number(customAmount).toFixed(2)}</span>
                  </div>
                )}
                {includeGst && (
                  <div className="flex justify-between text-sm text-neutral-600">
                    <span>GST (18%)</span>
                    <span>₹{gst.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold text-neutral-800 pt-3 border-t border-neutral-200">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
                {advanceAmount > 0 && (
                  <div className="flex justify-between text-sm text-neutral-600">
                    <span>Advance Paid</span>
                    <span className="text-emerald-600">- ₹{Number(advanceAmount).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-md font-bold text-neutral-800 pt-3 border-t border-neutral-200">
                  <span>Due Amount</span>
                  <span className={dueAmount > 0 ? "text-red-600" : "text-emerald-600"}>₹{dueAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-neutral-100 pt-6 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-neutral-800">Payment Mode</p>
                <p className="text-sm text-neutral-500 mt-1">{paymentMode}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-500 italic">Thank you for choosing Shape Up!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
