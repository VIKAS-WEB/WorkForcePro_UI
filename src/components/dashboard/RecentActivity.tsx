import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const activities = [
  {
    id: 1,
    user: "Sarah Johnson",
    avatar: "SJ",
    action: "requested leave",
    details: "Annual leave - 5 days",
    time: "2 minutes ago",
    type: "leave",
  },
  {
    id: 2,
    user: "Michael Chen",
    avatar: "MC",
    action: "clocked in",
    details: "9:00 AM",
    time: "15 minutes ago",
    type: "attendance",
  },
  {
    id: 3,
    user: "Emily Davis",
    avatar: "ED",
    action: "completed onboarding",
    details: "New employee",
    time: "1 hour ago",
    type: "employee",
  },
  {
    id: 4,
    user: "James Wilson",
    avatar: "JW",
    action: "payroll processed",
    details: "December 2024",
    time: "2 hours ago",
    type: "payroll",
  },
  {
    id: 5,
    user: "Lisa Anderson",
    avatar: "LA",
    action: "role updated",
    details: "Promoted to Manager",
    time: "3 hours ago",
    type: "role",
  },
];

const typeColors: Record<string, string> = {
  leave: "bg-warning/10 text-warning",
  attendance: "bg-success/10 text-success",
  employee: "bg-primary/10 text-primary",
  payroll: "bg-accent/10 text-accent",
  role: "bg-destructive/10 text-destructive",
};

export function RecentActivity() {
  return (
    <div className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Recent Activity</h3>
        <p className="text-sm text-muted-foreground">
          Latest updates across the organization
        </p>
      </div>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-muted/50"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                {activity.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                <span className="font-semibold">{activity.user}</span>{" "}
                {activity.action}
              </p>
              <p className="text-xs text-muted-foreground">{activity.details}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge
                variant="outline"
                className={cn("text-xs capitalize", typeColors[activity.type])}
              >
                {activity.type}
              </Badge>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
