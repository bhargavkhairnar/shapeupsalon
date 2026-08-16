"use client";

import { useState } from "react";
import { createService, updateService, deleteService, toggleServiceStatus } from "./actions";
import { Trash2, Edit2, CheckCircle2, XCircle } from "lucide-react";

export default function ServicesClient({ initialServices }: { initialServices: any[] }) {
  const [editingService, setEditingService] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    if (editingService) {
      await updateService(editingService.id, formData);
      setEditingService(null);
    } else {
      await createService(formData);
    }
    
    // Reset form after submission if needed, but since it's controlled by uncontrolled inputs with defaultValues, 
    // it will be naturally handled by the key prop on the form when editingService changes, or we can just reset it
    e.currentTarget.reset();
  };

  const handleCancelEdit = () => {
    setEditingService(null);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 font-playfair">Service Management</h1>
          <p className="text-neutral-500 mt-1">Manage categories, services, duration, and pricing.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Add/Edit Service Form */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-neutral-800 dark:text-white">
              {editingService ? "Edit Service" : "Add New Service"}
            </h2>
            <form onSubmit={handleSubmit} key={editingService ? editingService.id : "new"} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Service Name</label>
                <input type="text" name="name" required defaultValue={editingService?.name || ""} className="w-full px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent" placeholder="e.g. Bridal Makeup" />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Category</label>
                <select name="category" defaultValue={editingService?.category || "Hair"} className="w-full px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent text-black dark:text-white">
                  <option value="Hair">Hair</option>
                  <option value="Makeup">Makeup</option>
                  <option value="Facial">Facial</option>
                  <option value="Laser">Laser</option>
                  <option value="Nails">Nails</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Price (₹)</label>
                  <input type="number" name="price" required min="0" step="1" defaultValue={editingService?.price || ""} className="w-full px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent" placeholder="e.g. 500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Duration (mins)</label>
                  <input type="number" name="duration" required min="5" step="5" defaultValue={editingService?.duration || "30"} className="w-full px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Description</label>
                <textarea name="description" rows={3} defaultValue={editingService?.description || ""} className="w-full px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-transparent" placeholder="Brief description..."></textarea>
              </div>
              <div className="flex items-center">
                <input type="checkbox" name="isActive" id="isActive" defaultChecked={editingService ? editingService.isActive : true} className="h-4 w-4 text-purple-600 rounded" />
                <label htmlFor="isActive" className="ml-2 text-sm text-neutral-600 dark:text-neutral-400">Show on Frontend Website</label>
              </div>
              
              <div className="pt-2 flex gap-3">
                <button type="submit" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all">
                  {editingService ? "Update" : "Save"} Service
                </button>
                {editingService && (
                  <button type="button" onClick={handleCancelEdit} className="px-6 py-2.5 rounded-xl font-medium border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all text-neutral-700 dark:text-neutral-300">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Services List */}
        <div className="lg:col-span-2 space-y-4">
          {initialServices.length === 0 ? (
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-12 text-center text-neutral-500">
              <p>No services found. Add one to get started!</p>
            </div>
          ) : (
            initialServices.map(service => (
              <div key={service.id} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">{service.name}</h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      {service.category}
                    </span>
                    {service.isActive ? (
                      <span className="flex items-center text-xs text-green-600 dark:text-green-400"><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Active</span>
                    ) : (
                      <span className="flex items-center text-xs text-red-500"><XCircle className="w-3.5 h-3.5 mr-1" /> Hidden</span>
                    )}
                  </div>
                  <p className="text-sm text-neutral-500 line-clamp-1">{service.description || "No description provided."}</p>
                  <div className="flex items-center mt-3 text-sm text-neutral-700 dark:text-neutral-300 space-x-4">
                    <span className="font-semibold text-pink-600 dark:text-pink-400">₹{service.price}</span>
                    <span className="flex items-center text-neutral-500">
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {service.duration} mins
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <form action={toggleServiceStatus.bind(null, service.id, service.isActive)}>
                    <button className="p-2 text-neutral-400 hover:text-purple-600 transition-colors" title={service.isActive ? "Hide from frontend" : "Show on frontend"}>
                      {service.isActive ? <XCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                    </button>
                  </form>
                  <button onClick={() => setEditingService(service)} className="p-2 text-neutral-400 hover:text-blue-600 transition-colors" title="Edit">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <form action={deleteService.bind(null, service.id)}>
                    <button className="p-2 text-neutral-400 hover:text-red-600 transition-colors" title="Delete">
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
