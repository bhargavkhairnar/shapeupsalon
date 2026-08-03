"use client";

import { useState } from "react";
import { Plus, Trash2, Printer, X } from "lucide-react";

interface InvoiceItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

const predefinedServices = [
  "Hair Styling", "Hair Coloring", "Hair Smoothening", 
  "Keratin Treatment", "Facial", "Cleanup", 
  "Waxing", "Bleach", "Manicure", 
  "Nail Care", "Nail Art", "Spa", "Makeup",
  "Beard Styling", "Hair Spa", "Hair Treatments"
];

export default function BillingPage() {
  const [isCreating, setIsCreating] = useState(false);
  
  // Form State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", name: "", price: 0, qty: 1 }
  ]);
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [invoiceId] = useState(`INV-${Math.floor(1000 + Math.random() * 9000)}`);
  const [date] = useState(new Date().toLocaleDateString());

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const gst = subtotal * 0.18; // 18% GST
  const total = subtotal + gst;

  const handleAddItem = () => {
    setItems([...items, { id: Math.random().toString(), name: "", price: 0, qty: 1 }]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handlePrint = () => {
    window.print();
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
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-12 text-center text-neutral-500 flex flex-col items-center justify-center min-h-[400px]">
          <svg className="w-16 h-16 mb-4 text-neutral-300 dark:text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-lg font-medium text-neutral-600 dark:text-neutral-400">No recent invoices.</p>
          <p className="text-sm mt-2 max-w-md">Click 'Create Invoice' to generate a new bill for your customer.</p>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Customer Name</label>
                  <input 
                    type="text" 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter name"
                    className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-neutral-800 dark:text-neutral-100"
                  />
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
                <datalist id="predefined-services">
                  {predefinedServices.map((service, idx) => (
                    <option key={idx} value={service} />
                  ))}
                </datalist>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-3 items-start bg-neutral-100/50 dark:bg-neutral-800/30 p-3 sm:p-0 rounded-xl sm:bg-transparent sm:dark:bg-transparent">
                      <div className="w-full sm:flex-1">
                        <label className="sm:hidden block text-xs text-neutral-500 mb-1">Service</label>
                        <input 
                          type="text" 
                          list="predefined-services"
                          placeholder="Service name"
                          value={item.name}
                          onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
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

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <button 
                  onClick={handlePrint}
                  className="w-full flex items-center justify-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Printer size={18} />
                  Print / Save as PDF
                </button>
              </div>
            </div>
          </div>

          {/* Invoice Preview (Also used for printing) */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-lg invoice-print-container">
            {/* Header */}
            <div className="flex justify-between items-start mb-8 border-b border-neutral-100 pb-6">
              <div>
                <h2 className="text-3xl font-bold font-playfair bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Shape Up</h2>
                <p className="text-neutral-500 text-sm mt-1">Luxury Beauty Salon</p>
                <div className="mt-4 text-sm text-neutral-500">
                  <p>123 Beauty Lane, Style City</p>
                  <p>Phone: +1 234 567 8900</p>
                  <p>GSTIN: 27ABCDE1234F1Z5</p>
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
                    <th className="py-3 px-4 font-medium border-b border-neutral-200 text-right w-24">Rate</th>
                    <th className="py-3 px-4 font-medium border-b border-neutral-200 text-center w-20">Qty</th>
                    <th className="py-3 px-4 font-medium border-b border-neutral-200 text-right w-28">Amount</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {items.map((item, index) => (
                    <tr key={index} className="border-b border-neutral-100 last:border-0">
                      <td className="py-3 px-4 text-neutral-800">{item.name || <span className="text-neutral-400 italic">Item name</span>}</td>
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
                <div className="flex justify-between text-sm text-neutral-600">
                  <span>GST (18%)</span>
                  <span>₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-neutral-800 pt-3 border-t border-neutral-200">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
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
