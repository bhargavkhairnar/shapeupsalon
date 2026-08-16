"use client";

import { useState, useEffect } from "react";
import { Plus, X, Calendar, Clock, User, Phone, CheckCircle2, Trash2, Loader2 } from "lucide-react";
import { getServices } from "../services/actions";
import { getAppointments, createAppointment, updateAppointmentStatus, deleteAppointment } from "./actions";

interface Appointment {
  id: string;
  customerName: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: "Upcoming" | "Completed" | "Cancelled";
  staffName: string;
}

export default function AppointmentsPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [dbServices, setDbServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadAppointments = async () => {
    try {
      const apps = await getAppointments();
      setAppointments(apps as Appointment[]);
    } catch (err) {
      console.error("Failed to load appointments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
    
    let mounted = true;
    getServices().then(services => {
      if (mounted) setDbServices(services);
    }).catch(console.error);
    
    const interval = setInterval(loadAppointments, 5000); // Polling every 5 seconds for updates
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  // Form State
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [staffName, setStaffName] = useState("");

  const handleCreateAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !service || !date || !time) return;

    setSubmitting(true);
    try {
      await createAppointment({
        customerName,
        phone,
        service,
        date,
        time,
        staffName
      });

      await loadAppointments();
      setIsCreating(false);
      
      // Reset form
      setCustomerName("");
      setPhone("");
      setService("");
      setDate("");
      setTime("");
      setStaffName("");
    } catch (error) {
      console.error("Failed to create appointment", error);
      alert("There was an error scheduling the appointment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: Appointment["status"]) => {
    // Optimistic UI update
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
    try {
      await updateAppointmentStatus(id, newStatus);
    } catch (err) {
      console.error("Failed to update status", err);
      loadAppointments(); // Revert on failure
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;
    
    // Optimistic UI update
    setAppointments(appointments.filter(app => app.id !== id));
    try {
      await deleteAppointment(id);
    } catch (err) {
      console.error("Failed to delete appointment", err);
      loadAppointments(); // Revert on failure
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100 font-playfair">Appointments</h1>
          <p className="text-neutral-500 mt-1">Manage all your salon bookings and schedule.</p>
        </div>
        {!isCreating && (
          <button 
            onClick={() => setIsCreating(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
          >
            <Plus size={18} /> New Appointment
          </button>
        )}
      </div>

      {isCreating ? (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 shadow-sm max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6 border-b border-neutral-100 dark:border-neutral-800 pb-4">
            <h2 className="text-xl font-bold font-playfair text-neutral-800 dark:text-neutral-100">Schedule New Appointment</h2>
            <button onClick={() => setIsCreating(false)} className="text-neutral-400 hover:text-red-500 transition-colors cursor-pointer" disabled={submitting}>
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleCreateAppointment} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Customer Name *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={16} className="text-neutral-400" />
                  </div>
                  <input 
                    type="text" 
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full pl-10 pr-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-neutral-800 dark:text-neutral-100"
                    disabled={submitting}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone size={16} className="text-neutral-400" />
                  </div>
                  <input 
                    type="text" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full pl-10 pr-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-neutral-800 dark:text-neutral-100"
                    disabled={submitting}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Service Requested *</label>
              <input 
                type="text" 
                required
                value={service}
                onChange={(e) => setService(e.target.value)}
                placeholder="Select or type a service"
                className="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-neutral-800 dark:text-neutral-100"
                disabled={submitting}
                list="services-list"
              />
              <datalist id="services-list">
                {dbServices.map((s: any) => (
                  <option key={s.id} value={s.name} />
                ))}
              </datalist>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Staff Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={16} className="text-neutral-400" />
                </div>
                <input 
                  type="text" 
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  placeholder="Which staff will do this service?"
                  className="w-full pl-10 pr-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-neutral-800 dark:text-neutral-100"
                  disabled={submitting}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Date *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={16} className="text-neutral-400" />
                  </div>
                  <input 
                    type="date" 
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-neutral-800 dark:text-neutral-100"
                    disabled={submitting}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Time *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock size={16} className="text-neutral-400" />
                  </div>
                  <select 
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-neutral-800 dark:text-neutral-100 appearance-none"
                    disabled={submitting}
                  >
                    <option value="">Select a time</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="12:30 PM">12:30 PM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="01:30 PM">01:30 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="03:30 PM">03:30 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="04:30 PM">04:30 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="05:30 PM">05:30 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="06:30 PM">06:30 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                    <option value="07:30 PM">07:30 PM</option>
                    <option value="08:00 PM">08:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button 
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-6 py-2.5 rounded-xl font-medium border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                disabled={submitting}
              >
                Cancel
              </button>
              <button 
                type="submit"
                disabled={submitting}
                className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-6 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {submitting && <Loader2 size={16} className="animate-spin" />}
                {submitting ? 'Saving...' : 'Save Appointment'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 flex justify-center items-center">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
          ) : appointments.length === 0 ? (
            <div className="p-12 text-center text-neutral-500 flex flex-col items-center justify-center min-h-[300px]">
              <Calendar className="w-16 h-16 mb-4 text-neutral-300 dark:text-neutral-700" />
              <p className="text-lg font-medium text-neutral-600 dark:text-neutral-400">No appointments scheduled.</p>
              <p className="text-sm mt-2 max-w-md">Click 'New Appointment' to add your first booking.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400 text-sm border-b border-neutral-200 dark:border-neutral-800">
                    <th className="py-4 px-6 font-medium">Customer</th>
                    <th className="py-4 px-6 font-medium">Service</th>
                    <th className="py-4 px-6 font-medium">Staff</th>
                    <th className="py-4 px-6 font-medium">Date & Time</th>
                    <th className="py-4 px-6 font-medium">Status</th>
                    <th className="py-4 px-6 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {appointments.map((app) => (
                    <tr key={app.id} className="border-b border-neutral-100 dark:border-neutral-800 last:border-0 hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-medium text-neutral-800 dark:text-neutral-200">{app.customerName}</div>
                        {app.phone && <div className="text-neutral-500 dark:text-neutral-400 text-xs mt-0.5">{app.phone}</div>}
                      </td>
                      <td className="py-4 px-6 text-neutral-700 dark:text-neutral-300">{app.service}</td>
                      <td className="py-4 px-6 text-neutral-700 dark:text-neutral-300">{app.staffName || "-"}</td>
                      <td className="py-4 px-6">
                        <div className="text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5 mb-0.5">
                          <Calendar size={14} className="text-neutral-400" />
                          {new Date(app.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                        </div>
                        <div className="text-neutral-500 dark:text-neutral-400 text-xs flex items-center gap-1.5">
                          <Clock size={14} className="text-neutral-400" />
                          {app.time}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value as Appointment["status"])}
                          className={`text-xs font-medium px-2.5 py-1 rounded-full outline-none cursor-pointer border ${
                            app.status === 'Upcoming' ? 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800' :
                            app.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-900/30 dark:border-emerald-800' :
                            'bg-red-50 text-red-600 border-red-200 dark:bg-red-900/30 dark:border-red-800'
                          }`}
                        >
                          <option value="Upcoming">Upcoming</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleStatusChange(app.id, 'Completed')}
                            title="Mark Completed"
                            className="p-2 text-neutral-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors cursor-pointer"
                          >
                            <CheckCircle2 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(app.id)}
                            title="Delete"
                            className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
