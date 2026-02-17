import { useState, useEffect } from "react";
import { getCurrentUser } from "@/lib/AuthService";
import { getValidImageUrl } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Building2, User, Calendar, Shield } from "lucide-react";
import { FullPageLoader } from "@/components/ui/loading-spinner";

interface UserProfile {
    id: number;
    name: string;
    email: string;
    role: string;
    department?: string;
    designation?: string;
    phoneNumber?: string;
    profileImage?: string;
    createdAt?: string;
}

export default function Profile() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getCurrentUser();
                // If data is wrapped in a 'user' object or similar, adjust here. 
                // Assuming data is the user object directly for now based on typical patterns.
                setUser(data);
            } catch (err: any) {
                console.error("Failed to fetch profile:", err);
                setError("Failed to load profile data.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <FullPageLoader />;

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
                <p className="text-muted-foreground">{error}</p>
                <Button className="mt-4" onClick={() => window.location.reload()}>
                    Retry
                </Button>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="container mx-auto max-w-4xl py-8 space-y-8 animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center bg-card p-6 rounded-xl shadow-sm border border-border/50">
                <Avatar className="h-24 w-24 border-4 border-background shadow-md">
                    <AvatarImage src={getValidImageUrl(user.profileImage)} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                        {user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1">
                    <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="capitalize">
                            {user.role}
                        </Badge>
                        {user.designation && (
                            <Badge variant="outline">{user.designation}</Badge>
                        )}
                    </div>
                </div>
                <Button variant="outline">Edit Profile</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Personal Details */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" />
                            Personal Information
                        </CardTitle>
                        <CardDescription>Your personal contact details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                            <span className="text-sm font-medium text-muted-foreground">Full Name:</span>
                            <span className="text-sm">{user.name}</span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                            <span className="text-sm font-medium text-muted-foreground">Email:</span>
                            <span className="text-sm">{user.email}</span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                            <span className="text-sm font-medium text-muted-foreground">Phone:</span>
                            <span className="text-sm">{user.phoneNumber || "N/A"}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Work Details */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5 text-primary" />
                            Employment Details
                        </CardTitle>
                        <CardDescription>Information about your role</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                            <span className="text-sm font-medium text-muted-foreground">Department:</span>
                            <span className="text-sm">{user.department || "N/A"}</span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                            <span className="text-sm font-medium text-muted-foreground">Designation:</span>
                            <span className="text-sm">{user.designation || "N/A"}</span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                            <span className="text-sm font-medium text-muted-foreground">Employee ID:</span>
                            <span className="text-sm font-mono bg-muted px-2 py-0.5 rounded text-xs">
                                #{user.id}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* Account Info */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-primary" />
                            Account Security
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                            <span className="text-sm font-medium text-muted-foreground">Role:</span>
                            <span className="text-sm capitalize">{user.role}</span>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                            <span className="text-sm font-medium text-muted-foreground">Joined:</span>
                            <span className="text-sm">
                                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
