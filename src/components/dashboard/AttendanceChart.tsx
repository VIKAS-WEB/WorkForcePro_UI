import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", present: 145, absent: 5 },
  { name: "Tue", present: 142, absent: 8 },
  { name: "Wed", present: 148, absent: 2 },
  { name: "Thu", present: 140, absent: 10 },
  { name: "Fri", present: 135, absent: 15 },
  { name: "Sat", present: 50, absent: 0 },
  { name: "Sun", present: 0, absent: 0 },
];

export function AttendanceChart() {
  return (
    <div className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Weekly Attendance</h3>
        <p className="text-sm text-muted-foreground">
          Employee attendance overview for this week
        </p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="presentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(217 91% 60%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(217 91% 60%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="absentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0 84% 60%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(0 84% 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="name"
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "0.75rem",
              }}
            />
            <Area
              type="monotone"
              dataKey="present"
              stroke="hsl(217 91% 60%)"
              fillOpacity={1}
              fill="url(#presentGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="absent"
              stroke="hsl(0 84% 60%)"
              fillOpacity={1}
              fill="url(#absentGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
