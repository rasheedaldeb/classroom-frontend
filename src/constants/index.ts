import { GraduationCap, School } from "lucide-react";

export const USER_ROLES = {
  STUDENT: "student",
  TEACHER: "teacher",
  ADMIN: "admin",
};

export const ROLE_OPTIONS = [
  {
    value: USER_ROLES.STUDENT,
    label: "Student",
    icon: GraduationCap,
  },
  {
    value: USER_ROLES.TEACHER,
    label: "Teacher",
    icon: School,
  },
];

export const DEPARTMENTS = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Geography",
  "Economics",
  "Business Administration",
  "Engineering",
  "Psychology",
  "Sociology",
  "Political Science",
  "Philosophy",
  "Education",
  "Fine Arts",
  "Music",
  "Physical Education",
  "Law",
] as const;

export const DEPARTMENT_OPTIONS = DEPARTMENTS.map((dept) => ({
  value: dept,
  label: dept,
}));

export const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes
export const ALLOWED_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

// Helper function to enforce required environment variables at boot
const getEnvVar = (key: string, required = true): string => {
  const value = import.meta.env[key];
  if (required && !value) {
    throw new Error(`[Config Error] Missing environment variable: ${key}`);
  }
  return value || "";
};

// --- Cloudinary Config ---
export const CLOUDINARY_CLOUD_NAME = getEnvVar("VITE_CLOUDINARY_CLOUD_NAME");
export const CLOUDINARY_UPLOAD_PRESET = getEnvVar(
  "VITE_CLOUDINARY_UPLOAD_PRESET",
);
// Optional: Construct URL dynamically if not provided directly
export const CLOUDINARY_UPLOAD_URL =
  import.meta.env.VITE_CLOUDINARY_UPLOAD_URL ||
  `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

// --- API Config ---
export const BACKEND_BASE_URL = getEnvVar("VITE_BACKEND_BASE_URL");
// export const BASE_URL = getEnvVar("VITE_API_URL");
// export const REFRESH_TOKEN_URL = `${BASE_URL}/refresh-token`;

// --- Storage Keys (Client-Side Only) ---
export const ACCESS_TOKEN_STORAGE_KEY =
  import.meta.env.VITE_ACCESS_TOKEN_KEY || "access_token";
export const REFRESH_TOKEN_STORAGE_KEY =
  import.meta.env.VITE_REFRESH_TOKEN_KEY || "refresh_token";
