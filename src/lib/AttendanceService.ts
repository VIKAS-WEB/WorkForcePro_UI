import api from "./api";

export type LeaveType = "FULL_DAY" | "HALF_DAY";

export interface AttendanceRecord {
    id: number;
    date: string;
    clockInTime: string;
    clockOutTime?: string;
    status: "PRESENT" | "ABSENT" | "ON_LEAVE" | "HALF_DAY";
}

export interface LeaveRequest {
    id: number;
    leaveType: LeaveType;
    reason: string;
    startDate: string;
    endDate: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
}

export const clockIn = async () => {
    const res = await api.post("/api/attendance/clock-in");
    return res.data;
};

export const clockOut = async () => {
    const res = await api.post("/api/attendance/clock-out");
    return res.data;
};

export const getAttendanceHistory = async () => {
    const res = await api.get<AttendanceRecord[]>("/api/attendance/me");
    return res.data;
};

export const applyLeave = async (leaveData: { leaveType: LeaveType; reason: string; startDate: string; endDate: string }) => {
    const res = await api.post("/api/leave/apply", leaveData);
    return res.data;
};

export const getLeaveHistory = async () => {
    const res = await api.get<LeaveRequest[]>("/api/leave/me");
    return res.data;
};
