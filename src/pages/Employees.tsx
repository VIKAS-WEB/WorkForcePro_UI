import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees, Employee } from "@/lib/EmployeeService";
import {
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import AddEmployeeDialog from "./AddEmployeeDialog";
import { AuthenticatedAvatar } from "@/components/AuthenticatedAvatar";
import Lottie from "lottie-react";


const statusColors: Record<string, string> = {
  active: "bg-success/10 text-success border-success/20",
  "on-leave": "bg-warning/10 text-warning border-warning/20",
  onboarding: "bg-primary/10 text-primary border-primary/20",
  inactive: "bg-muted text-muted-foreground border-muted",
};

export default function Employees() {
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch("https://assets5.lottiefiles.com/packages/lf20_t9gkkhz4.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading Lottie animation:", error));
  }, []);



  const { data = [], isLoading, error } = useQuery<Employee[]>({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const filteredEmployees = data.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      departmentFilter === "all" || emp.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  if (isLoading) return <p>Loading employees...</p>;
  if (error) return <p className="text-red-500">Failed to load employees</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
          <p className="text-muted-foreground">
            Manage your organization's workforce
          </p>
        </div>
        <Button className="gradient-button gap-2" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Employee
        </Button>
      </div>




      {/* Filters */}
      <div className="glass-card p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="Engineering">Engineering</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="HR">HR</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEmployees.map((employee, index) => (
          <div
            key={employee.id}
            className={cn("glass-card p-6 transition hover:scale-[1.02]")}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <AuthenticatedAvatar
                  url={employee.profileImage}
                  alt={employee.name}
                  fallback={employee.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                  className="h-12 w-12"
                />
                <div>
                  <h3 className="font-semibold">{employee.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {employee.designation}
                  </p>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                  <DropdownMenuItem>Edit Details</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">
                    Deactivate
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="space-y-2 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> {employee.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> {employee.phoneNumber || "N/A"}
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" /> {employee.department}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Badge variant="outline">{employee.department}</Badge>
              <Badge
                variant="outline"
                className={cn("capitalize", statusColors[employee.status])}
              >
                {employee.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!isLoading && filteredEmployees.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-48 h-48 mb-4">
            {animationData && (
              <Lottie
                animationData={animationData}
                loop={true}
                autoplay={true}
              />
            )}
          </div>
          <h3 className="text-xl font-semibold mb-2">No employees found</h3>
          <p className="text-muted-foreground max-w-sm">
            We couldn't find any employees matching your search criteria. Try adjusting your filters or search terms.
          </p>
        </div>
      )}
      <AddEmployeeDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  );
}
