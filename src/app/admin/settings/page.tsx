export default function SettingsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 font-playfair">Settings & Backup</h1>
          <p className="text-neutral-500 mt-1">Manage database backups, restores, and app configuration.</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-12 text-center text-neutral-500 flex flex-col items-center justify-center min-h-[400px]">
        <svg className="w-16 h-16 mb-4 text-neutral-300 dark:text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <p className="text-lg font-medium text-neutral-600 dark:text-neutral-400">Settings Module Coming Soon</p>
        <p className="text-sm mt-2 max-w-md">Configure salon details, perform manual database backups, restore from backups, and manage automated backup scheduling.</p>
      </div>
    </div>
  );
}
