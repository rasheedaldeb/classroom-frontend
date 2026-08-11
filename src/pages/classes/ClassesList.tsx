import { CreateButton } from "@/components/refine-ui/buttons/create";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClassListItem, Subject, User } from "@/types";
import { useTable } from "@refinedev/react-table";
import { useList } from "@refinedev/core";
import { ColumnDef } from "@tanstack/react-table";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ShowButton } from "@/components/refine-ui/buttons/show";

const ClassesList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedTeacher, setSelectedTeacher] = useState("all");

  const { query: subjectsQuery } = useList<Subject>({
    resource: "subjects",
    pagination: { pageSize: 100 },
  });
  const { query: teachersQuery } = useList<User>({
    resource: "users",
    filters: [{ field: "role", operator: "eq", value: "teacher" }],
    pagination: { pageSize: 100 },
  });

  const subjects = subjectsQuery?.data?.data ?? [];
  const teachers = teachersQuery?.data?.data ?? [];

  const subjectFilter =
    selectedSubject === "all"
      ? []
      : [
          {
            field: "subject",
            operator: "eq" as const,
            value: selectedSubject,
          },
        ];

  const teacherFilter =
    selectedTeacher === "all"
      ? []
      : [
          {
            field: "teacher",
            operator: "eq" as const,
            value: selectedTeacher,
          },
        ];

  const searchFilter = searchQuery
    ? [{ field: "name", operator: "contains" as const, value: searchQuery }]
    : [];

  const classesTable = useTable<ClassListItem>({
    columns: useMemo<ColumnDef<ClassListItem>[]>(
      () => [
        {
          id: "bannerUrl",
          accessorKey: "bannerUrl",
          size: 100,
          header: () => <p className="column-title ml-2">Banner</p>,
          cell: ({ getValue }) => {
            const bannerUrl = getValue<string>();
            return bannerUrl ? (
              <img
                src={bannerUrl}
                alt="Class Banner"
                className="h-16 w-16 rounded-sm object-cover"
              />
            ) : (
              <div className="h-10 w-20 rounded-md bg-secondary/10" />
            );
          },
        },
        {
          id: "name",
          accessorKey: "name",
          size: 180,
          header: () => <p className="column-title">Class Name</p>,
          cell: ({ getValue }) => (
            <span className="text-foreground">{getValue<string>()}</span>
          ),
        },
        {
          id: "status",
          accessorKey: "status",
          size: 120,
          header: () => <p className="column-title">Status</p>,
          cell: ({ getValue }) => {
            const status = getValue<string>();
            return (
              <Badge variant={status === "active" ? "default" : "secondary"}>
                {status?.charAt(0).toUpperCase() + status?.slice(1)}
              </Badge>
            );
          },
        },
        {
          id: "subject",
          accessorKey: "subject.name",
          size: 150,
          header: () => <p className="column-title">Subject</p>,
          cell: ({ getValue }) => <span>{getValue<string>() || "-"}</span>,
        },
        {
          id: "teacher",
          accessorKey: "teacher.name",
          size: 150,
          header: () => <p className="column-title">Teacher</p>,
          cell: ({ getValue }) => <span>{getValue<string>() || "-"}</span>,
        },
        {
          id: "capacity",
          accessorKey: "capacity",
          size: 100,
          header: () => <p className="column-title">Capacity</p>,
          cell: ({ getValue }) => <span>{getValue<number>()}</span>,
        },
        {
          id: "details",
          size: 140,
          header: () => <p className="column-title">Details</p>,
          cell: ({ row }) => (
            <ShowButton
              resource="classes"
              recordItemId={row.original.id}
              variant="outline"
              size="sm"
            >
              View
            </ShowButton>
          ),
        },
      ],
      [],
    ),
    refineCoreProps: {
      resource: "classes",
      pagination: {
        pageSize: 10,
        mode: "server",
      },
      filters: {
        permanent: [...searchFilter, ...subjectFilter, ...teacherFilter],
      },
      sorters: {
        initial: [{ field: "id", order: "desc" }],
      },
    },
  });

  return (
    <ListView>
      <Breadcrumb />
      <h1 className="page-title">Classes</h1>

      {/* Container: Stack elements on mobile/tablet, align in row on large screens */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-6">
        <p className="text-muted-foreground text-sm">
          Quick access to essential metrics and management tools.
        </p>

        {/* Controls Container */}
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by class name..."
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters & Actions Group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.name}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Filter by teacher" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teachers</SelectItem>
                {teachers.map((teacher) => (
                  <SelectItem key={teacher.id} value={teacher.name}>
                    {teacher.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="w-full sm:w-auto">
              <CreateButton resource="classes" className="w-full sm:w-auto" />
            </div>
          </div>
        </div>
      </div>

      <DataTable table={classesTable} />
    </ListView>
  );
};

export default ClassesList;
