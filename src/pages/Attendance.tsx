import { AttendanceWidget } from "@/components/attendance/AttendanceWidget";
import { AttendanceHistory } from "@/components/attendance/AttendanceHistory";
import { LeaveRequestForm } from "@/components/attendance/LeaveRequestForm";
import { Calendar, Clock } from "lucide-react";

export default function Attendance() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance & Leave</h1>
          <p className="text-muted-foreground">
            Manage your daily attendance and leave requests
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        {/* Left Column - Widget & Leave Request */}
        <div className="md:col-span-4 space-y-6">
          <AttendanceWidget />
          <LeaveRequestForm />
        </div>

        {/* Right Column - History */}
        <div className="md:col-span-8">
          <div className="glass-card h-full animate-slide-up stagger-2">
            <AttendanceHistory />
          </div>
        </div>
      </div>
    </div>
  );
}
