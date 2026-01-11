import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import api from "@/lib/api";

interface AuthenticatedAvatarProps {
    url?: string;
    alt: string;
    fallback: string;
    className?: string;
}

export function AuthenticatedAvatar({ url, alt, fallback, className }: AuthenticatedAvatarProps) {
    const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!url) {
            setImageSrc(undefined);
            return;
        }

        let active = true;
        let objectUrl = "";

        const fetchImage = async () => {
            try {
                // Extract filename in case it's a full path or URL
                const filename = url.split(/[/\\]/).pop();
                if (!filename) return;

                // Use the configured api instance to fetch with auth headers
                // Endpoint assumed to be /images/{filename} relative to API base
                const response = await api.get(`/images/${filename}`, {
                    responseType: "blob",
                });

                if (active) {
                    objectUrl = URL.createObjectURL(response.data);
                    setImageSrc(objectUrl);
                }
            } catch (error) {
                console.error("Failed to load authenticated image:", error);
            }
        };

        fetchImage();

        return () => {
            active = false;
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [url]);

    return (
        <Avatar className={className}>
            <AvatarImage src={imageSrc} alt={alt} />
            <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {fallback}
            </AvatarFallback>
        </Avatar>
    );
}
