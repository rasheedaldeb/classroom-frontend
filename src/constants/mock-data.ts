import { Subject } from "@/types";

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 1,
    code: "CSCI-201",
    name: "Data Structures and Algorithms",
    department: "Computer Science",
    description:
      "An in-depth exploration of foundational data structures—such as trees, graphs, and hash tables—alongside ic analysis, sorting, and searching techniques.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    code: "MATH-302",
    name: "Linear Algebra & Applications",
    department: "Mathematics",
    description:
      "Covers vector spaces, linear transformations, matrices, determinants, and eigenvalues, with a strong emphasis on real-world applications in data science and computer graphics.",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    code: "LIT-105",
    name: "Modern World Literature",
    department: "English & Comparative Literature",
    description:
      "A survey of major literary works from the 20th century to the present, examining how global authors respond to political shifts, technological advances, and cultural identity.",
    createdAt: new Date().toISOString(),
  },
];
