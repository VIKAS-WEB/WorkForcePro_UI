import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to login for demo purposes
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-5xl bg-card rounded-3xl shadow-2xl overflow-hidden flex animate-fade-in">
        {/* Left Panel - Decorative */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          {/* Background Image with Amber Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-amber-500/85" />
          
          {/* Organic Wave Shape */}
          <svg 
            className="absolute right-0 top-0 h-full w-1/2 text-card"
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M100 0 L100 100 L0 100 Q30 80, 20 60 Q10 40, 25 30 Q40 20, 35 10 Q30 0, 50 0 Z" />
          </svg>

          {/* Curved Decorative Lines */}
          <svg 
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 400 500" 
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              d="M50 50 Q200 100, 150 250 Q100 400, 200 450"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
            />
            <path
              d="M80 30 Q230 80, 180 230 Q130 380, 230 430"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1.5"
            />
            <path
              d="M20 80 Q170 130, 120 280 Q70 430, 170 480"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />
          </svg>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col h-full p-10 text-white">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-light tracking-wide">Work</span>
              <span className="text-3xl font-bold tracking-wide">FORCE</span>
              <span className="text-3xl font-bold tracking-wide text-white/90">PRO</span>
            </div>
            <p className="mt-2 text-white/80 text-sm">
              Streamline your workforce management
            </p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 flex flex-col justify-between p-8 lg:p-12 bg-card">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <span className="text-2xl font-light">Work</span>
            <span className="text-2xl font-bold text-amber-500">FORCE PRO</span>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
            <div className="space-y-2 mb-6">
              <h1 className="text-2xl font-semibold text-foreground">Create Account</h1>
              <p className="text-muted-foreground text-sm">
                Join WorkForce Pro and start managing your workforce efficiently.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12 pl-4 pr-10 bg-muted/50 border-border/50 focus:border-amber-500 focus:ring-amber-500/20"
                />
                <User className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>

              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 pl-4 pr-10 bg-muted/50 border-border/50 focus:border-amber-500 focus:ring-amber-500/20"
                />
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pl-4 pr-10 bg-muted/50 border-border/50 focus:border-amber-500 focus:ring-amber-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12 pl-4 pr-10 bg-muted/50 border-border/50 focus:border-amber-500 focus:ring-amber-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              <div className="flex items-start space-x-2 pt-1">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  className="mt-0.5 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                />
                <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed">
                  I agree to the{" "}
                  <Link to="#" className="text-amber-500 hover:text-amber-600">Terms of Service</Link>
                  {" "}and{" "}
                  <Link to="#" className="text-amber-500 hover:text-amber-600">Privacy Policy</Link>
                </label>
              </div>

              <div className="flex justify-end pt-2">
                <Button 
                  type="submit" 
                  className="px-8 h-11 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/25"
                  disabled={!agreeTerms}
                >
                  Sign Up
                </Button>
              </div>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-amber-500 hover:text-amber-600 transition-colors">
                Login
              </Link>
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground pt-6">
            <Link to="#" className="hover:text-amber-500 transition-colors">Security Policy</Link>
            <span className="text-border">|</span>
            <Link to="#" className="hover:text-amber-500 transition-colors">Privacy Policy</Link>
            <span className="text-border">|</span>
            <Link to="#" className="hover:text-amber-500 transition-colors">Legal</Link>
            <span className="text-border">|</span>
            <Link to="#" className="hover:text-amber-500 transition-colors">Technical Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
