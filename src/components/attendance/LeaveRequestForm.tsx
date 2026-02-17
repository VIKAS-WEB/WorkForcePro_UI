import { useState } from "react";
import { applyLeave, LeaveType } from "@/lib/AttendanceService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export const LeaveRequestForm = () => {
    const [leaveType, setLeaveType] = useState<LeaveType>("FULL_DAY");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        // Basic validation
        if (!startDate || !endDate || !reason) {
            setMessage({ type: 'error', text: "Please fill in all fields" });
            setLoading(false);
            return;
        }

        try {
            await applyLeave({
                leaveType,
                startDate,
                endDate,
                reason,
            });
            setMessage({ type: 'success', text: "Leave request submitted successfully!" });
            // Reset form
            setStartDate("");
            setEndDate("");
            setReason("");
        } catch (err: any) {
            setMessage({ type: 'error', text: err.response?.data?.message || "Failed to submit leave request" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Request Leave</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="leave-type">Leave Type</Label>
                        <Select value={leaveType} onValueChange={(val) => setLeaveType(val as LeaveType)}>
                            <SelectTrigger id="leave-type">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="FULL_DAY">Full Day</SelectItem>
                                <SelectItem value="HALF_DAY">Half Day</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="start-date">Start Date</Label>
                            <div className="relative">
                                <Input
                                    id="start-date"
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="end-date">End Date</Label>
                            <div className="relative">
                                <Input
                                    id="end-date"
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="reason">Reason</Label>
                        <Textarea
                            id="reason"
                            placeholder="Why do you need leave?"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                    </div>

                    {message && (
                        <Alert variant={message.type === 'error' ? "destructive" : "default"} className={message.type === 'success' ? "bg-green-50 text-green-700 border-green-200" : ""}>
                            <AlertDescription>{message.text}</AlertDescription>
                        </Alert>
                    )}

                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? "Submitting..." : "Apply for Leave"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};
