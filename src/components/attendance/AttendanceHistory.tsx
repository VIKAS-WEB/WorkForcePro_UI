import { useState, useEffect } from "react";
import { getAttendanceHistory, getLeaveHistory, AttendanceRecord, LeaveRequest } from "@/lib/AttendanceService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const AttendanceHistory = () => {
    const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
    const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [attendanceData, leaveData] = await Promise.all([
                    getAttendanceHistory(),
                    getLeaveHistory()
                ]);
                setAttendance(attendanceData || []);
                setLeaves(leaveData || []);
            } catch (err) {
                console.error("Failed to fetch history", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "PRESENT": return "bg-green-100 text-green-800";
            case "ABSENT": return "bg-red-100 text-red-800";
            case "ON_LEAVE": return "bg-yellow-100 text-yellow-800";
            case "HALF_DAY": return "bg-blue-100 text-blue-800";
            case "APPROVED": return "bg-green-100 text-green-800";
            case "REJECTED": return "bg-red-100 text-red-800";
            case "PENDING": return "bg-orange-100 text-orange-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>History</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="attendance" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="attendance">Attendance</TabsTrigger>
                        <TabsTrigger value="leaves">Leaves</TabsTrigger>
                    </TabsList>

                    <TabsContent value="attendance">
                        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                            {loading ? <p className="text-center text-sm text-muted-foreground">Loading...</p> : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>In</TableHead>
                                            <TableHead>Out</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {attendance.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center text-muted-foreground">No records found</TableCell>
                                            </TableRow>
                                        ) : (
                                            attendance.map((record) => (
                                                <TableRow key={record.id}>
                                                    <TableCell>{record.date}</TableCell>
                                                    <TableCell>{record.clockInTime ? new Date(record.clockInTime).toLocaleTimeString() : '-'}</TableCell>
                                                    <TableCell>{record.clockOutTime ? new Date(record.clockOutTime).toLocaleTimeString() : '-'}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className={getStatusColor(record.status)}>
                                                            {record.status}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            )}
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent value="leaves">
                        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                            {loading ? <p className="text-center text-sm text-muted-foreground">Loading...</p> : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Type</TableHead>
                                            <TableHead>From</TableHead>
                                            <TableHead>To</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {leaves.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center text-muted-foreground">No records found</TableCell>
                                            </TableRow>
                                        ) : (
                                            leaves.map((leave) => (
                                                <TableRow key={leave.id}>
                                                    <TableCell>{leave.leaveType}</TableCell>
                                                    <TableCell>{leave.startDate}</TableCell>
                                                    <TableCell>{leave.endDate}</TableCell>
                                                    <TableCell>
                                                        <Badge variant="outline" className={getStatusColor(leave.status)}>
                                                            {leave.status}
                                                        </Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            )}
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};
