import { useState } from "react";
import { UserPlus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addEmployee, uploadEmployeeImage, NewEmployee } from "@/lib/EmployeeService";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface AddEmployeeDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function AddEmployeeDialog({
    open,
    onOpenChange,
}: AddEmployeeDialogProps) {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        idNumber: "",
        phoneNumber: "",
        designation: "",
        department: "",
        shift: "",
        smsNotification: false,
        emailNotification: false,
        profileImage: null as File | null,
    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (data: { employee: NewEmployee; image: File | null }) => {
            const newEmployee = await addEmployee(data.employee);
            if (data.image && newEmployee.id) {
                await uploadEmployeeImage(newEmployee.id, data.image);
            }
            return newEmployee;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employees"] });
            toast.success("Employee added successfully");
            onOpenChange(false);
            setFormData({
                fullName: "",
                email: "",
                idNumber: "",
                phoneNumber: "",
                designation: "",
                department: "",
                shift: "",
                smsNotification: false,
                emailNotification: false,
                profileImage: null,
            });
        },
        onError: (error) => {
            console.error("Failed to add employee:", error);
            toast.error("Failed to add employee. Please try again.");
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newEmployee: NewEmployee = {
            name: formData.fullName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            employeeIdNumber: formData.idNumber,
            department: formData.department,
            designation: formData.designation,
            shift: formData.shift,
            salary: null, // Add field if needed in form
        };

        mutation.mutate({ employee: newEmployee, image: formData.profileImage });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader className="flex flex-col items-center text-center pb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 ring-4 ring-primary/5">
                        <UserPlus className="w-8 h-8 text-primary" />
                    </div>
                    <DialogTitle className="text-xl font-semibold">
                        Add Employee
                    </DialogTitle>
                    <DialogDescription>
                        Complete the form below to add a new employee to the sage group.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Profile Image */}
                    <div className="space-y-2">
                        <Label htmlFor="profileImage">Profile Image</Label>
                        <Input
                            id="profileImage"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setFormData({ ...formData, profileImage: e.target.files[0] });
                                }
                            }}
                        />
                    </div>

                    {/* Full Name */}
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full name</Label>
                        <Input
                            id="fullName"
                            placeholder="Enter full name"
                            value={formData.fullName}
                            onChange={(e) =>
                                setFormData({ ...formData, fullName: e.target.value })
                            }
                        />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter email address"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />
                    </div>

                    {/* ID Number & Phone Number - Side by Side */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* <div className="space-y-2">
                            <Label htmlFor="idNumber">ID Number</Label>
                            <Input
                                id="idNumber"
                                placeholder="Enter ID number"
                                value={formData.idNumber}
                                onChange={(e) =>
                                    setFormData({ ...formData, idNumber: e.target.value })
                                }
                            />
                        </div> */}
                        <div className="space-y-2">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                type="tel"
                                placeholder="+1 (555) 000-0000"
                                value={formData.phoneNumber}
                                onChange={(e) =>
                                    setFormData({ ...formData, phoneNumber: e.target.value })
                                }
                            />
                        </div>
                    </div>

                    {/* Designation & Department - Side by Side */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Designation</Label>
                            <Select
                                value={formData.designation}
                                onValueChange={(value) =>
                                    setFormData({ ...formData, designation: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="product-designer">
                                        Product Designer
                                    </SelectItem>
                                    <SelectItem value="software-engineer">
                                        Software Engineer
                                    </SelectItem>
                                    <SelectItem value="project-manager">
                                        Project Manager
                                    </SelectItem>
                                    <SelectItem value="marketing-manager">
                                        Marketing Manager
                                    </SelectItem>
                                    <SelectItem value="hr-specialist">HR Specialist</SelectItem>
                                    <SelectItem value="financial-analyst">
                                        Financial Analyst
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Department</Label>
                            <Select
                                value={formData.department}
                                onValueChange={(value) =>
                                    setFormData({ ...formData, department: value })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="design">Design Team</SelectItem>
                                    <SelectItem value="development">Development Team</SelectItem>
                                    <SelectItem value="marketing">Marketing Team</SelectItem>
                                    <SelectItem value="hr">HR Team</SelectItem>
                                    <SelectItem value="finance">Finance Team</SelectItem>
                                    <SelectItem value="sales">Sales Team</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Shift */}
                    <div className="space-y-2">
                        <Label>Shift</Label>
                        <Select
                            value={formData.shift}
                            onValueChange={(value) =>
                                setFormData({ ...formData, shift: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select shift" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="morning">9:00 AM - 5:00 PM</SelectItem>
                                <SelectItem value="day">11:00 AM - 7:00 PM</SelectItem>
                                <SelectItem value="evening">2:00 PM - 10:00 PM</SelectItem>
                                <SelectItem value="night">10:00 PM - 6:00 AM</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Notifications */}
                    <div className="space-y-4 pt-2">
                        <div className="flex items-start space-x-3">
                            <Checkbox
                                id="smsNotification"
                                checked={formData.smsNotification}
                                onCheckedChange={(checked) =>
                                    setFormData({
                                        ...formData,
                                        smsNotification: checked as boolean,
                                    })
                                }
                            />
                            <div className="grid gap-1.5 leading-none">
                                <Label
                                    htmlFor="smsNotification"
                                    className="text-sm font-medium leading-none cursor-pointer"
                                >
                                    SMS notification
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    Can we send SMS Notification
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3">
                            <Checkbox
                                id="emailNotification"
                                checked={formData.emailNotification}
                                onCheckedChange={(checked) =>
                                    setFormData({
                                        ...formData,
                                        emailNotification: checked as boolean,
                                    })
                                }
                            />
                            <div className="grid gap-1.5 leading-none">
                                <Label
                                    htmlFor="emailNotification"
                                    className="text-sm font-medium leading-none cursor-pointer"
                                >
                                    Email notification
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    Can we send email Notification
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                        <Button
                            type="submit"
                            className="gradient-button"
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? "Adding..." : "Add Employee"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog >
    );
}
