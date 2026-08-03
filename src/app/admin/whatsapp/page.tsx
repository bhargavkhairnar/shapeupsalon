export default function WhatsAppPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 font-playfair">WhatsApp Integration</h1>
          <p className="text-neutral-500 mt-1">Automate customer communication directly to their phones.</p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-12 text-center text-neutral-500 flex flex-col items-center justify-center min-h-[400px]">
        <svg className="w-16 h-16 mb-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <p className="text-lg font-medium text-neutral-600 dark:text-neutral-400">WhatsApp Module Coming Soon</p>
        <p className="text-sm mt-2 max-w-md">Send invoice PDFs, appointment confirmations/reminders, birthday wishes, and promotional offers automatically.</p>
      </div>
    </div>
  );
}
