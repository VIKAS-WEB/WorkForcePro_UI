import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  variant?: "default" | "dots" | "pulse";
}

export function LoadingSpinner({ 
  size = "md", 
  className,
  variant = "default" 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  if (variant === "dots") {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              "rounded-full bg-primary",
              size === "sm" && "w-1.5 h-1.5",
              size === "md" && "w-2 h-2",
              size === "lg" && "w-3 h-3",
              size === "xl" && "w-4 h-4"
            )}
            style={{
              animation: "bounce 1.4s infinite ease-in-out both",
              animationDelay: `${i * 0.16}s`,
            }}
          />
        ))}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={cn("relative", sizeClasses[size], className)}>
        <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
        <div className="absolute inset-2 rounded-full bg-primary/50 animate-pulse" />
        <div className="absolute inset-4 rounded-full bg-primary" />
      </div>
    );
  }

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
      {/* Spinning gradient arc */}
      <svg
        className="animate-spin"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="url(#spinnerGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          strokeDasharray="80 45"
        />
      </svg>
      {/* Center dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className={cn(
            "rounded-full bg-primary animate-pulse",
            size === "sm" && "w-1 h-1",
            size === "md" && "w-1.5 h-1.5",
            size === "lg" && "w-2 h-2",
            size === "xl" && "w-3 h-3"
          )} 
        />
      </div>
    </div>
  );
}

interface FullPageLoaderProps {
  message?: string;
}

export function FullPageLoader({ message = "Loading..." }: FullPageLoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        {/* Animated logo/spinner container */}
        <div className="relative">
          {/* Outer rotating ring */}
          <div className="w-20 h-20 rounded-full border-4 border-primary/20 animate-[spin_3s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
          </div>
          
          {/* Inner counter-rotating ring */}
          <div className="absolute inset-2 rounded-full border-4 border-amber/20 animate-[spin_2s_linear_infinite_reverse]">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-amber shadow-lg shadow-amber/50" />
          </div>
          
          {/* Center pulsing core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-amber animate-pulse shadow-lg" />
          </div>
        </div>

        {/* Loading text with shimmer effect */}
        <div className="relative overflow-hidden">
          <p className="text-lg font-medium text-foreground/80">{message}</p>
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary/60"
              style={{
                animation: "pulse 1.5s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Inline loader for sections/cards
interface InlineLoaderProps {
  className?: string;
}

export function InlineLoader({ className }: InlineLoaderProps) {
  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <LoadingSpinner size="lg" />
    </div>
  );
}

// Button loader
interface ButtonLoaderProps {
  className?: string;
}

export function ButtonLoader({ className }: ButtonLoaderProps) {
  return (
    <LoadingSpinner size="sm" className={className} />
  );
}
