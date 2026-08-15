import { getSettings, saveSettings } from "./actions";
import { Store, MapPin, Phone, FileText, Save } from "lucide-react";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 font-playfair">Global Settings</h1>
          <p className="text-neutral-500 mt-1">Configure salon details for billing invoices and the frontend website.</p>
        </div>
      </div>
      
      <form action={saveSettings} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 shadow-sm">
        <h2 className="text-xl font-bold font-playfair text-neutral-800 dark:text-neutral-100 mb-6 border-b border-neutral-100 dark:border-neutral-800 pb-4">Salon Identity</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Salon Name</label>
            <div className="relative">
              <Store className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
              <input 
                type="text" 
                name="salonName" 
                defaultValue={settings.salonName}
                className="w-full pl-10 pr-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Tagline</label>
            <input 
              type="text" 
              name="salonTagline" 
              defaultValue={settings.salonTagline}
              className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" 
            />
          </div>
        </div>

        <h2 className="text-xl font-bold font-playfair text-neutral-800 dark:text-neutral-100 mb-6 border-b border-neutral-100 dark:border-neutral-800 pb-4">Contact & Billing</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
              <input 
                type="text" 
                name="salonPhone" 
                defaultValue={settings.salonPhone}
                className="w-full pl-10 pr-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" 
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">GSTIN Number (Optional)</label>
            <div className="relative">
              <FileText className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
              <input 
                type="text" 
                name="salonGst" 
                defaultValue={settings.salonGst}
                className="w-full pl-10 pr-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" 
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Full Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-neutral-400" />
              <textarea 
                name="salonAddress" 
                defaultValue={settings.salonAddress}
                rows={3}
                className="w-full pl-10 pr-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500" 
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <button 
            type="submit" 
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
          >
            <Save className="w-5 h-5" />
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
