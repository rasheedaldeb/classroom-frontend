import React, { useState } from "react";
import { useLogin, useGo } from "@refinedev/core";
import { Loader2, Eye, EyeOff } from "lucide-react";

export const Login = () => {
  const { mutate: login, isPending: isLoading } = useLogin();
  const go = useGo();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login({
      email,
      password,
    });
  };

  return (
    <div className="sign-in">
      {/* Top Brand Logo */}
      <div className="logo">
        <div className="w-12 h-12 from-primary to-secondary rounded-xl flex items-center justify-center p-0.5">
          <div className="w-full h-full bg-background rounded-[10px] flex items-center justify-center">
            <img
              src="/classroom.svg"
              alt="Classroom Logo"
              className="w-20 h-20"
            />
          </div>
        </div>
      </div>

      {/* Main Container Card */}
      <div className="card bg-card text-card-foreground rounded-lg border border-border shadow-md">
        <div className="header mb-6">
          <h1 className="title">Sign In</h1>
          <p className="description">
            Welcome back! Please enter your details.
          </p>
        </div>

        <div className="content">
          <form onSubmit={handleSubmit} className="form">
            {/* Email Input */}
            <div className="field">
              <label data-slot="label">
                Email <span className="text-primary">*</span>
              </label>
              <input
                data-slot="input"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-input border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              />
            </div>

            {/* Password Input */}
            <div className="field">
              <label data-slot="label">
                Password <span className="text-primary">*</span>
              </label>
              <div className="relative">
                <input
                  data-slot="input"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-input border border-border rounded-md pl-4 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="submit bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-md transition-colors flex items-center justify-center disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        {/* Footer Link to Register */}
        <div className="footer mt-6">
          <span>Don't have an account?</span>
          <button
            type="button"
            onClick={() => go({ to: "/register" })}
            className="text-primary hover:underline cursor-pointer ml-1"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};
