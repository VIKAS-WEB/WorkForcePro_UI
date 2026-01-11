import { useState } from "react";
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const attendanceData = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "SJ",
    department: "Engineering",
    checkIn: "09:00 AM",
    checkOut: "06:00 PM",
    status: "present",
    hoursWorked: 9,
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "MC",
    department: "Marketing",
    checkIn: "08:45 AM",
    checkOut: "05:30 PM",
    status: "present",
    hoursWorked: 8.75,
  },
  {
    id: 3,
    name: "Emily Davis",
    avatar: "ED",
    department: "HR",
    checkIn: "09:30 AM",
    checkOut: "-",
    status: "late",
    hoursWorked: 0,
  },
  {
    id: 4,
    name: "James Wilson",
    avatar: "JW",
    department: "Finance",
    checkIn: "-",
    checkOut: "-",
    status: "absent",
    hoursWorked: 0,
  },
  {
    id: 5,
    name: "Lisa Anderson",
    avatar: "LA",
    department: "Sales",
    checkIn: "-",
    checkOut: "-",
    status: "leave",
    hoursWorked: 0,
  },
  {
    id: 6,
    name: "Robert Taylor",
    avatar: "RT",
    department: "Engineering",
    checkIn: "08:30 AM",
    checkOut: "05:45 PM",
    status: "present",
    hoursWorked: 9.25,
  },
];

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle2 }> = {
  present: { color: "bg-success/10 text-success border-success/20", icon: CheckCircle2 },
  absent: { color: "bg-destructive/10 text-destructive border-destructive/20", icon: XCircle },
  late: { color: "bg-warning/10 text-warning border-warning/20", icon: AlertCircle },
  leave: { color: "bg-primary/10 text-primary border-primary/20", icon: Calendar },
};

export default function Attendance() {
  const presentCount = attendanceData.filter((a) => a.status === "present").length;
  const lateCount = attendanceData.filter((a) => a.status === "late").length;
  const absentCount = attendanceData.filter((a) => a.status === "absent").length;
  const leaveCount = attendanceData.filter((a) => a.status === "leave").length;
  const totalCount = attendanceData.length;
  const attendanceRate = ((presentCount + lateCount) / totalCount) * 100;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground">
            Track daily employee attendance
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Today
          </Button>
          <Button className="gradient-button gap-2">
            <Clock className="h-4 w-4" />
            Clock In
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="glass-card p-4 animate-fade-in stagger-1 opacity-0">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-success/10 p-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{presentCount}</p>
              <p className="text-sm text-muted-foreground">Present</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4 animate-fade-in stagger-2 opacity-0">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-warning/10 p-2">
              <AlertCircle className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{lateCount}</p>
              <p className="text-sm text-muted-foreground">Late</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4 animate-fade-in stagger-3 opacity-0">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-destructive/10 p-2">
              <XCircle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold">{absentCount}</p>
              <p className="text-sm text-muted-foreground">Absent</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4 animate-fade-in stagger-4 opacity-0">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{leaveCount}</p>
              <p className="text-sm text-muted-foreground">On Leave</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4 animate-fade-in stagger-4 opacity-0">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Attendance Rate</span>
              <span className="font-semibold">{attendanceRate.toFixed(1)}%</span>
            </div>
            <Progress value={attendanceRate} className="h-2" />
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="glass-card animate-slide-up stagger-2 opacity-0">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Hours Worked</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceData.map((record) => {
              const StatusIcon = statusConfig[record.status].icon;
              return (
                <TableRow key={record.id} className="table-row-hover">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {record.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{record.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {record.department}
                  </TableCell>
                  <TableCell>
                    <span className={record.checkIn === "-" ? "text-muted-foreground" : ""}>
                      {record.checkIn}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={record.checkOut === "-" ? "text-muted-foreground" : ""}>
                      {record.checkOut}
                    </span>
                  </TableCell>
                  <TableCell>
                    {record.hoursWorked > 0 ? `${record.hoursWorked}h` : "-"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn("gap-1 capitalize", statusConfig[record.status].color)}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {record.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
