import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/auth/login", { email, password });

      console.log("Full response:", res.data);          // ←←← Ye daal do pehle

      const token = res.data.token;                    // ya res.data.accessToken ?
      if (!token) {
        alert("Token not received from server!");
        return;
      }

      localStorage.setItem("token", token);
      console.log("Token saved:", token.substring(0, 20) + "..."); // safety
      // ★★★ Yeh line add karo ★★★
      console.log("LOGIN SUCCESS - Token:", token);
      console.log("Token length:", token.length);
      console.log("Token first 20 chars:", token.substring(0, 20) + "...");

      navigate("/", { replace: true });   // ← window.location.replace ki jagah better
      // ya   navigate("/dashboard", { replace: true });

    } catch (err: any) {
      console.error("Login error:", err?.response?.data);
      alert(err?.response?.data?.message || "Incorrect email or password");
    }
  };


  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 relative"
      style={{ backgroundImage: "url('/bg-login.png')" }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-blue-950/20 backdrop-blur-[2px]" />

      <div className="w-full max-w-5xl bg-card rounded-3xl shadow-2xl overflow-hidden flex animate-fade-in relative z-10">
        {/* Left Panel - Decorative */}
        <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          {/* Background Image with Amber Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-blue-500/85" />

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
            <div className="flex items-center gap-3 font-medium">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-transparent text-primary-foreground">
                <img src="/Logo.png" alt="Logo" className="h-full w-full object-contain" />
              </div>
              <span className="text-2xl font-bold">WorkForce Pro</span>
            </div>
            <p className="mt-2 text-white/80 text-sm">
              Streamline your workforce management
            </p>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 flex flex-col justify-between p-8 lg:p-12 bg-card">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
            <img src="/Logo.png" alt="WorkForce Pro" className="h-12 w-12 object-contain" />
            <span className="text-2xl font-bold text-primary">WorkForce Pro</span>
          </div>

          <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
            <div className="space-y-2 mb-8">
              <h1 className="text-2xl font-semibold text-foreground">Account Login</h1>
              <p className="text-muted-foreground text-sm">
                Welcome to your portal workflow, where making a change begins at the click of a button.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 pl-4 pr-10 bg-muted/50 border-border/50 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                <Link
                  to="#"
                  className="text-xs text-muted-foreground hover:text-blue-500 transition-colors"
                >
                  Forgot Email?
                </Link>
              </div>

              <div className="space-y-1">
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pl-4 pr-10 bg-muted/50 border-border/50 focus:border-blue-500 focus:ring-blue-500/20"
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
                <Link
                  to="#"
                  className="text-xs text-muted-foreground hover:text-blue-500 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  className="px-8 h-11 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  Login
                </Button>
              </div>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-8">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-blue-500 hover:text-blue-600 transition-colors">
                Sign up
              </Link>
            </p>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground pt-8">
            <Link to="#" className="hover:text-blue-500 transition-colors">Security Policy</Link>
            <span className="text-border">|</span>
            <Link to="#" className="hover:text-blue-500 transition-colors">Privacy Policy</Link>
            <span className="text-border">|</span>
            <Link to="#" className="hover:text-blue-500 transition-colors">Legal</Link>
            <span className="text-border">|</span>
            <Link to="#" className="hover:text-blue-500 transition-colors">Technical Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
