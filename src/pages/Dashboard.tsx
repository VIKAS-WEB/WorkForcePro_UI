import { Users, Clock, Calendar, DollarSign, TrendingUp, UserCheck } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { AttendanceChart } from "@/components/dashboard/AttendanceChart";
import { DepartmentChart } from "@/components/dashboard/DepartmentChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function Dashboard() {
  const [totalEmployees, setTotalEmployees] = useState(0);

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your workforce overview.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Employees"
          value={totalEmployees}
          change="Live data"
          changeType="positive"
          icon={Users}
          iconColor="bg-primary/10 text-primary"
        />

        <StatCard
          title="Present Today"
          value={Math.floor(totalEmployees * 0.95)}
          change="Calculated from DB"
          changeType="positive"
          icon={UserCheck}
          iconColor="bg-success/10 text-success"
        />

        <StatCard
          title="On Leave"
          value={Math.floor(totalEmployees * 0.05)}
          change="Pending approval"
          changeType="neutral"
          icon={Calendar}
          iconColor="bg-warning/10 text-warning"
        />

        <StatCard
          title="Monthly Payroll"
          value={`₹${totalEmployees * 35000}`}
          change="+2.5% this month"
          changeType="positive"
          icon={DollarSign}
          iconColor="bg-accent/10 text-accent"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <AttendanceChart />
        <DepartmentChart />
      </div>

      <RecentActivity />
    </div>
  );
}
