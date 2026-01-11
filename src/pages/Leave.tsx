import { useState } from "react";
import { Plus, Calendar, Clock, CheckCircle, XCircle, HourglassIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const leaveRequests = [
  {
    id: 1,
    employee: "Sarah Johnson",
    avatar: "SJ",
    type: "Annual Leave",
    startDate: "2025-01-15",
    endDate: "2025-01-20",
    days: 5,
    reason: "Family vacation",
    status: "pending",
    appliedOn: "2025-01-08",
  },
  {
    id: 2,
    employee: "Michael Chen",
    avatar: "MC",
    type: "Sick Leave",
    startDate: "2025-01-10",
    endDate: "2025-01-11",
    days: 2,
    reason: "Medical appointment",
    status: "approved",
    appliedOn: "2025-01-09",
  },
  {
    id: 3,
    employee: "Emily Davis",
    avatar: "ED",
    type: "Personal Leave",
    startDate: "2025-01-22",
    endDate: "2025-01-22",
    days: 1,
    reason: "Personal errands",
    status: "pending",
    appliedOn: "2025-01-07",
  },
  {
    id: 4,
    employee: "James Wilson",
    avatar: "JW",
    type: "Annual Leave",
    startDate: "2025-01-05",
    endDate: "2025-01-07",
    days: 3,
    reason: "Family event",
    status: "rejected",
    appliedOn: "2025-01-02",
  },
  {
    id: 5,
    employee: "Lisa Anderson",
    avatar: "LA",
    type: "Maternity Leave",
    startDate: "2025-02-01",
    endDate: "2025-05-01",
    days: 90,
    reason: "Maternity",
    status: "approved",
    appliedOn: "2024-12-15",
  },
];

const leaveTypes = [
  { type: "Annual Leave", balance: 15, used: 5, color: "bg-primary" },
  { type: "Sick Leave", balance: 10, used: 2, color: "bg-warning" },
  { type: "Personal Leave", balance: 5, used: 1, color: "bg-accent" },
];

const statusConfig: Record<string, { color: string; icon: typeof CheckCircle }> = {
  pending: { color: "bg-warning/10 text-warning border-warning/20", icon: HourglassIcon },
  approved: { color: "bg-success/10 text-success border-success/20", icon: CheckCircle },
  rejected: { color: "bg-destructive/10 text-destructive border-destructive/20", icon: XCircle },
};

export default function Leave() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredRequests =
    activeTab === "all"
      ? leaveRequests
      : leaveRequests.filter((r) => r.status === activeTab);

  const pendingCount = leaveRequests.filter((r) => r.status === "pending").length;
  const approvedCount = leaveRequests.filter((r) => r.status === "approved").length;
  const rejectedCount = leaveRequests.filter((r) => r.status === "rejected").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
          <p className="text-muted-foreground">
            Review and manage employee leave requests
          </p>
        </div>
        <Button className="gradient-button gap-2">
          <Plus className="h-4 w-4" />
          New Request
        </Button>
      </div>

      {/* Leave Balance Cards */}
      <div className="grid gap-4 sm:grid-cols-3 animate-fade-in stagger-1 opacity-0">
        {leaveTypes.map((leave) => (
          <div key={leave.type} className="glass-card p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">{leave.type}</h3>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">{leave.balance - leave.used}</p>
                <p className="text-sm text-muted-foreground">days remaining</p>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <p>{leave.used} used</p>
                <p>{leave.balance} total</p>
              </div>
            </div>
            <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all", leave.color)}
                style={{ width: `${((leave.balance - leave.used) / leave.balance) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Tabs & Requests */}
      <div className="glass-card animate-slide-up stagger-2 opacity-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b px-6 pt-4">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="all">
                All <Badge variant="secondary" className="ml-2">{leaveRequests.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending <Badge variant="secondary" className="ml-2">{pendingCount}</Badge>
              </TabsTrigger>
              <TabsTrigger value="approved">
                Approved <Badge variant="secondary" className="ml-2">{approvedCount}</Badge>
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected <Badge variant="secondary" className="ml-2">{rejectedCount}</Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="p-6 pt-4">
            <div className="space-y-4">
              {filteredRequests.map((request) => {
                const StatusIcon = statusConfig[request.status].icon;
                return (
                  <div
                    key={request.id}
                    className="flex flex-col gap-4 rounded-xl border bg-card/50 p-4 transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {request.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{request.employee}</h4>
                        <p className="text-sm text-muted-foreground">
                          {request.type} • {request.days} day{request.days > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(request.startDate).toLocaleDateString()} -{" "}
                          {new Date(request.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className={cn("gap-1 capitalize", statusConfig[request.status].color)}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {request.status}
                      </Badge>
                    </div>

                    {request.status === "pending" && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive/10">
                          Reject
                        </Button>
                        <Button size="sm" className="bg-success hover:bg-success/90">
                          Approve
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
