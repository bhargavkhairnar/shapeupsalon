export default function ReportsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 font-playfair">Business Reports</h1>
          <p className="text-neutral-500 mt-1">Analyze your sales, staff performance, and revenue trends.</p>
        </div>
        <button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all hover:scale-105">
          Export Report
        </button>
      </div>
      
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-12 text-center text-neutral-500 flex flex-col items-center justify-center min-h-[400px]">
        <svg className="w-16 h-16 mb-4 text-neutral-300 dark:text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className="text-lg font-medium text-neutral-600 dark:text-neutral-400">Reports Module Coming Soon</p>
        <p className="text-sm mt-2 max-w-md">Generate daily/weekly/monthly/yearly reports, analyze service-wise & staff-wise revenue, and view customer spending habits.</p>
      </div>
    </div>
  );
}
