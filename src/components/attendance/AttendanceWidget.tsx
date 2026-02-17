import { useState, useEffect } from "react";
import { clockIn, clockOut, getAttendanceHistory, AttendanceRecord } from "@/lib/AttendanceService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Clock, LogIn, LogOut } from "lucide-react";

export const AttendanceWidget = () => {
    const [todayRecord, setTodayRecord] = useState<AttendanceRecord | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchTodayStatus();
    }, []);

    const fetchTodayStatus = async () => {
        try {
            const history = await getAttendanceHistory();
            const today = new Date().toISOString().split("T")[0];
            const found = history.find((r) => r.date === today);
            if (found) {
                setTodayRecord(found);
            }
        } catch (err) {
            console.error("Failed to fetch attendance status", err);
        }
    };

    const handleClockIn = async () => {
        setLoading(true);
        setError(null);
        setStatusMessage(null);
        try {
            await clockIn();
            setStatusMessage("Successfully clocked in!");
            await fetchTodayStatus();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to clock in");
        } finally {
            setLoading(false);
        }
    };

    const handleClockOut = async () => {
        setLoading(true);
        setError(null);
        setStatusMessage(null);
        try {
            await clockOut();
            setStatusMessage("Successfully clocked out!");
            await fetchTodayStatus();
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to clock out");
        } finally {
            setLoading(false);
        }
    };

    const isClockedIn = !!todayRecord?.clockInTime && !todayRecord?.clockOutTime;
    const isClockedOut = !!todayRecord?.clockInTime && !!todayRecord?.clockOutTime;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Daily Attendance</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div className="text-2xl font-bold">
                        {todayRecord ? (
                            isClockedOut ? "Checked Out" : "Checked In"
                        ) : "Not Checked In"}
                    </div>

                    {todayRecord && (
                        <div className="text-xs text-muted-foreground">
                            In: {new Date(todayRecord.clockInTime).toLocaleTimeString()}
                            {todayRecord.clockOutTime && ` | Out: ${new Date(todayRecord.clockOutTime).toLocaleTimeString()}`}
                        </div>
                    )}

                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {statusMessage && (
                        <Alert className="bg-green-50 text-green-700 border-green-200">
                            <AlertDescription>{statusMessage}</AlertDescription>
                        </Alert>
                    )}

                    <div className="flex gap-2">
                        {!isClockedIn && !isClockedOut && (
                            <Button onClick={handleClockIn} disabled={loading} className="w-full">
                                <LogIn className="mr-2 h-4 w-4" />
                                Clock In
                            </Button>
                        )}
                        {isClockedIn && (
                            <Button onClick={handleClockOut} disabled={loading} variant="outline" className="w-full">
                                <LogOut className="mr-2 h-4 w-4" />
                                Clock Out
                            </Button>
                        )}
                        {isClockedOut && (
                            <Button disabled className="w-full" variant="secondary">
                                Attendance Complete
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
