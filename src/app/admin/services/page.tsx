export default function ServicesPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 font-playfair">Service Management</h1>
          <p className="text-neutral-500 mt-1">Manage categories, services, duration, and pricing.</p>
        </div>
        <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all hover:scale-105">
          + Add Service
        </button>
      </div>
      
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-12 text-center text-neutral-500 flex flex-col items-center justify-center min-h-[400px]">
        <svg className="w-16 h-16 mb-4 text-neutral-300 dark:text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
        </svg>
        <p className="text-lg font-medium text-neutral-600 dark:text-neutral-400">Services Module Coming Soon</p>
        <p className="text-sm mt-2 max-w-md">You will be able to perform Add/Edit/Delete operations on all your salon services here, organizing them by categories like Hair, Makeup, Facial, etc.</p>
      </div>
    </div>
  );
}
