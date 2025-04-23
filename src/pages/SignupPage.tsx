
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, Mail, Eye, EyeOff } from "lucide-react";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#f6fdf7] to-[#e6f6ee]">
      <header className="py-6 border-b border-primary/15 bg-white/50 shadow animate-popup">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">DermaVision</span>
          </Link>
          <Link to="/login">
            <Button variant="outline" className="border-primary px-6 hover:bg-primary/10 text-primary font-medium">
              Sign in
            </Button>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex justify-center items-center animate-fade-in">
        <div className="max-w-md w-full rounded-2xl glass-morphism shadow-lg bg-white/80 border border-primary/10 p-8 mx-2">
          <h2 className="text-2xl font-bold text-center text-primary mb-4">Create your account</h2>
          <form className="space-y-5" onSubmit={handleSignup}>
            <div>
              <label htmlFor="signup-email" className="block mb-1 text-md font-medium text-primary">Email</label>
              <div className="relative">
                <input type="email" id="signup-email" required autoFocus autoComplete="email"
                  className="w-full px-4 py-2 rounded-md border border-primary/20 bg-white placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
                  placeholder="you@email.com"
                />
                <Mail className="absolute right-3 top-3 text-primary/40 w-5 h-5" />
              </div>
            </div>
            <div>
              <label htmlFor="signup-password" className="block mb-1 text-md font-medium text-primary">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} id="signup-password" required autoComplete="new-password"
                  className="w-full px-4 py-2 rounded-md border border-primary/20 bg-white placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/40"
                  placeholder="Create a password"
                  minLength={6}
                />
                <button 
                  type="button" 
                  tabIndex={-1}
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-3 text-primary/40 hover:text-primary/70"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-md animate-button-bounce"
              type="submit"
              disabled={loading}
            >
              <UserPlus className="w-5 h-5 mr-2" />
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
