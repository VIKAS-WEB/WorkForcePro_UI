import { useState } from "react";
import { Shield, Plus, Edit, Trash2, Check, X, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const roles = [
  {
    id: 1,
    name: "Super Admin",
    description: "Full system access with all permissions",
    users: 2,
    color: "bg-destructive/10 text-destructive border-destructive/20",
    permissions: {
      employees: { view: true, create: true, edit: true, delete: true },
      attendance: { view: true, create: true, edit: true, delete: true },
      leave: { view: true, create: true, edit: true, delete: true },
      payroll: { view: true, create: true, edit: true, delete: true },
      roles: { view: true, create: true, edit: true, delete: true },
    },
  },
  {
    id: 2,
    name: "HR Manager",
    description: "Manage employees, attendance, and leave requests",
    users: 5,
    color: "bg-primary/10 text-primary border-primary/20",
    permissions: {
      employees: { view: true, create: true, edit: true, delete: false },
      attendance: { view: true, create: true, edit: true, delete: false },
      leave: { view: true, create: true, edit: true, delete: true },
      payroll: { view: true, create: false, edit: false, delete: false },
      roles: { view: false, create: false, edit: false, delete: false },
    },
  },
  {
    id: 3,
    name: "Department Head",
    description: "View and manage team members within department",
    users: 12,
    color: "bg-warning/10 text-warning border-warning/20",
    permissions: {
      employees: { view: true, create: false, edit: false, delete: false },
      attendance: { view: true, create: true, edit: false, delete: false },
      leave: { view: true, create: true, edit: true, delete: false },
      payroll: { view: false, create: false, edit: false, delete: false },
      roles: { view: false, create: false, edit: false, delete: false },
    },
  },
  {
    id: 4,
    name: "Employee",
    description: "Basic access to personal information and requests",
    users: 131,
    color: "bg-success/10 text-success border-success/20",
    permissions: {
      employees: { view: false, create: false, edit: false, delete: false },
      attendance: { view: true, create: true, edit: false, delete: false },
      leave: { view: true, create: true, edit: false, delete: false },
      payroll: { view: true, create: false, edit: false, delete: false },
      roles: { view: false, create: false, edit: false, delete: false },
    },
  },
];

const modules = ["employees", "attendance", "leave", "payroll", "roles"];
const actions = ["view", "create", "edit", "delete"];

export default function Roles() {
  const [selectedRole, setSelectedRole] = useState(roles[0]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Access Control</h1>
          <p className="text-muted-foreground">
            Manage roles and permissions for your organization
          </p>
        </div>
        <Button className="gradient-button gap-2">
          <Plus className="h-4 w-4" />
          Create Role
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Roles List */}
        <div className="space-y-4 animate-fade-in stagger-1 opacity-0">
          <h2 className="text-lg font-semibold">Roles</h2>
          <div className="space-y-2">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role)}
                className={cn(
                  "glass-card w-full p-4 text-left transition-all hover:scale-[1.02]",
                  selectedRole.id === role.id && "ring-2 ring-primary"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("rounded-lg p-2", role.color)}>
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{role.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {role.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {role.users} user{role.users !== 1 ? "s" : ""}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Permissions Matrix */}
        <div className="lg:col-span-2 animate-fade-in stagger-2 opacity-0">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">{selectedRole.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {selectedRole.description}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                      Module
                    </th>
                    {actions.map((action) => (
                      <th
                        key={action}
                        className="pb-3 text-center text-sm font-medium text-muted-foreground capitalize"
                      >
                        {action}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {modules.map((module) => (
                    <tr key={module} className="border-b last:border-0">
                      <td className="py-4 font-medium capitalize">{module}</td>
                      {actions.map((action) => {
                        const hasPermission =
                          selectedRole.permissions[module as keyof typeof selectedRole.permissions]?.[
                            action as keyof typeof selectedRole.permissions.employees
                          ];
                        return (
                          <td key={action} className="py-4 text-center">
                            <div className="flex justify-center">
                              <Switch
                                checked={hasPermission}
                                className="data-[state=checked]:bg-primary"
                              />
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={selectedRole.color}>
                  <Shield className="mr-1 h-3 w-3" />
                  {selectedRole.name}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {selectedRole.users} users with this role
                </span>
              </div>
              <Button variant="outline" size="sm">
                View Users
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
