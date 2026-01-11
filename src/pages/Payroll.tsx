import { Download, DollarSign, TrendingUp, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

const payrollData = [
  { month: "Jul", amount: 420000 },
  { month: "Aug", amount: 435000 },
  { month: "Sep", amount: 448000 },
  { month: "Oct", amount: 465000 },
  { month: "Nov", amount: 472000 },
  { month: "Dec", amount: 485000 },
];

const employeePayroll = [
  {
    id: 1,
    name: "Sarah Johnson",
    department: "Engineering",
    baseSalary: 8500,
    bonus: 1200,
    deductions: 950,
    netPay: 8750,
    status: "processed",
  },
  {
    id: 2,
    name: "Michael Chen",
    department: "Marketing",
    baseSalary: 7200,
    bonus: 800,
    deductions: 720,
    netPay: 7280,
    status: "processed",
  },
  {
    id: 3,
    name: "Emily Davis",
    department: "HR",
    baseSalary: 6500,
    bonus: 500,
    deductions: 650,
    netPay: 6350,
    status: "pending",
  },
  {
    id: 4,
    name: "James Wilson",
    department: "Finance",
    baseSalary: 7800,
    bonus: 900,
    deductions: 780,
    netPay: 7920,
    status: "processed",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    department: "Sales",
    baseSalary: 7000,
    bonus: 1500,
    deductions: 700,
    netPay: 7800,
    status: "pending",
  },
];

const statusColors: Record<string, string> = {
  processed: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  failed: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function Payroll() {
  const totalPayroll = employeePayroll.reduce((sum, emp) => sum + emp.netPay, 0);
  const processedCount = employeePayroll.filter((e) => e.status === "processed").length;
  const pendingCount = employeePayroll.filter((e) => e.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payroll</h1>
          <p className="text-muted-foreground">
            Manage employee compensation and payments
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="dec-2024">
            <SelectTrigger className="w-40">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dec-2024">December 2024</SelectItem>
              <SelectItem value="nov-2024">November 2024</SelectItem>
              <SelectItem value="oct-2024">October 2024</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button className="gradient-button gap-2">
            <DollarSign className="h-4 w-4" />
            Run Payroll
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="glass-card p-5 animate-fade-in stagger-1 opacity-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Payroll</p>
              <p className="text-2xl font-bold">${totalPayroll.toLocaleString()}</p>
            </div>
            <div className="rounded-xl bg-primary/10 p-3">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        <div className="glass-card p-5 animate-fade-in stagger-2 opacity-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Employees</p>
              <p className="text-2xl font-bold">{employeePayroll.length}</p>
            </div>
            <div className="rounded-xl bg-accent/10 p-3">
              <Users className="h-6 w-6 text-accent" />
            </div>
          </div>
        </div>
        <div className="glass-card p-5 animate-fade-in stagger-3 opacity-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Processed</p>
              <p className="text-2xl font-bold">{processedCount}</p>
            </div>
            <div className="rounded-xl bg-success/10 p-3">
              <TrendingUp className="h-6 w-6 text-success" />
            </div>
          </div>
        </div>
        <div className="glass-card p-5 animate-fade-in stagger-4 opacity-0">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold">
                {((processedCount / employeePayroll.length) * 100).toFixed(0)}%
              </span>
            </div>
            <Progress
              value={(processedCount / employeePayroll.length) * 100}
              className="h-2"
            />
            <p className="text-xs text-muted-foreground">
              {pendingCount} pending payments
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="glass-card p-6 animate-slide-up stagger-2 opacity-0">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Payroll Trend</h3>
          <p className="text-sm text-muted-foreground">
            Monthly payroll expenses over the last 6 months
          </p>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={payrollData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="month"
                tick={{ fill: "hsl(var(--muted-foreground))" }}
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.75rem",
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Payroll"]}
              />
              <Bar
                dataKey="amount"
                fill="hsl(217 91% 60%)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="glass-card animate-slide-up stagger-3 opacity-0">
        <div className="p-6 pb-0">
          <h3 className="text-lg font-semibold">Employee Payroll Details</h3>
          <p className="text-sm text-muted-foreground">
            Breakdown of individual employee compensation
          </p>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead>Employee</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="text-right">Base Salary</TableHead>
              <TableHead className="text-right">Bonus</TableHead>
              <TableHead className="text-right">Deductions</TableHead>
              <TableHead className="text-right">Net Pay</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employeePayroll.map((employee) => (
              <TableRow key={employee.id} className="table-row-hover">
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {employee.department}
                </TableCell>
                <TableCell className="text-right">
                  ${employee.baseSalary.toLocaleString()}
                </TableCell>
                <TableCell className="text-right text-success">
                  +${employee.bonus.toLocaleString()}
                </TableCell>
                <TableCell className="text-right text-destructive">
                  -${employee.deductions.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-semibold">
                  ${employee.netPay.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn("capitalize", statusColors[employee.status])}
                  >
                    {employee.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
