import React, { useState } from "react";
import { useRegister, useGo } from "@refinedev/core";
import {
  GraduationCap,
  School,
  Loader2,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";
import UploadWidget from "@/components/UploadWidget";
import { UploadWidgetValue } from "@/types";

const Register = () => {
  const { mutate: register, isPending: isLoading } = useRegister();
  const go = useGo();

  // Form states matching Better Auth configuration
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [image, setImage] = useState<string>("");
  const [imageCldPubId, setImageCldPubId] = useState<string>("");
  const [uploadValue, setUploadValue] = useState<UploadWidgetValue | null>(
    null,
  );
  const [department] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Handler for Cloudinary UploadWidget output
  const handleImageChange = (value: UploadWidgetValue | null) => {
    setUploadValue(value);
    setImageCldPubId(value?.publicId || "");
    setImage(value?.url || "");
  };

  const handleRemoveImage = () => {
    setUploadValue(null);
    setImageCldPubId("");
    setImage("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    register({
      email,
      password,
      name,
      role,
      image,
      imageCldPubId,
      department,
    });
  };

  return (
    <div className="sign-up">
      {/* Top Logo */}
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

      {/* Main Form Card */}
      <div className="card bg-card text-card-foreground rounded-lg border border-border shadow-md">
        <div className="header mb-6">
          <h1 className="title">Register</h1>
          <p className="description">Create an account to get started.</p>
        </div>

        <div className="content">
          <form onSubmit={handleSubmit} className="form">
            {/* Role Selection */}
            <div className="field">
              <label data-slot="label">
                Role <span className="text-primary">*</span>
              </label>
              <div className="roles">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`role-button ${
                    role === "student" ? "is-active" : ""
                  }`}
                >
                  <GraduationCap />
                  <span>Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("teacher")}
                  className={`role-button ${
                    role === "teacher" ? "is-active" : ""
                  }`}
                >
                  <School />
                  <span>Teacher</span>
                </button>
              </div>
            </div>

            {/* Profile Photo Upload */}
            <div className="field">
              <div className="flex items-center justify-between mb-1.5">
                <label data-slot="label" className="m-0">
                  Profile Photo
                </label>
                {uploadValue?.url && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="inline-flex items-center gap-1 text-xs text-destructive hover:underline cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Photo</span>
                  </button>
                )}
              </div>
              <UploadWidget value={uploadValue} onChange={handleImageChange} />
            </div>

            {/* Full Name Input */}
            <div className="field">
              <label data-slot="label">
                Full Name <span className="text-primary">*</span>
              </label>
              <input
                data-slot="input"
                type="text"
                required
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-input border border-border rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              />
            </div>

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
                "Sign Up"
              )}
            </button>
          </form>
        </div>

        {/* Footer Navigation Link */}
        <div className="footer mt-6">
          <span>Already have an account?</span>
          <button
            type="button"
            onClick={() => go({ to: "/login" })}
            className="text-primary hover:underline cursor-pointer ml-1"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
