import { Authenticated, CanAccess, Refine } from "@refinedev/core";
import { DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import {
  BookOpen,
  Building2,
  ClipboardCheck,
  GraduationCap,
  Home,
  Users,
} from "lucide-react";
import SubjectsList from "./pages/subjects/SubjectsList";
import { Layout } from "./components/refine-ui/layout/layout";
import SubjectsCreate from "./pages/subjects/SubjectsCreate";
import SubjectsEdit from "./pages/subjects/SubjectsEdit";
import SubjectsShow from "./pages/subjects/SubjectShow";
import Dashboard from "./pages/Dashboard";

import { dataProvider } from "./providers/data";
import ClassesList from "./pages/classes/ClassesList";
import ClassesShow from "./pages/classes/ClassesShow";
import EditClass from "./pages/classes/EditClass";
import CreateClass from "./pages/classes/CreateClass";
import { authProvider } from "./providers/auth";
import { Login } from "./pages/login";
import Register from "./pages/register";
import DepartmentsList from "./pages/departments/DepartmentsList";
import DepartmentsCreate from "./pages/departments/DepartmentCreate";
import DepartmentEdit from "./pages/departments/DepartmentEdit";
import DepartmentShow from "./pages/departments/DepartmentShow";
import FacultyList from "./pages/faculty/FacultyList";
import FacultyShow from "./pages/faculty/FacultyShow";
import EnrollmentsCreate from "./pages/enrollments/EnrollmentCreate";
import EnrollmentsJoin from "./pages/enrollments/EnrollmentJoin";
import EnrollmentConfirm from "./pages/enrollments/EnrollmentConfirm";
import { EnrollmentAccessDenied } from "./components/EnrollmentAccessDenied";

const accessControlProvider = {
  can: async ({ action, resource }: { action: string; resource?: string }) => {
    const identityResult = await authProvider.getIdentity?.();
    const user = identityResult as { role?: string } | undefined;
    const role = user?.role?.toLowerCase();

    // 1. Only students can see/access the enrollments resource (sidebar & pages)
    if (resource === "enrollments" && role !== "student") {
      return {
        can: false,
        reason: "Only students can access enrollment features.",
      };
    }

    // 2. Hide/block create actions for non-admin users across all other resources
    if (action === "create" && role !== "admin") {
      return {
        can: false,
        reason: "Only administrators can create records.",
      };
    }

    return { can: true };
  },
};

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              authProvider={authProvider}
              accessControlProvider={accessControlProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "kkWuv7-GgBIfw-P8CGy0",
                title: {
                  text: "Classroom Management",
                  icon: <img src="/classroom.svg" className="w-20 h-20" />,
                },
              }}
              resources={[
                {
                  name: "dashboard",
                  list: "/",
                  meta: {
                    label: "Home",
                    icon: <Home />,
                  },
                },
                {
                  name: "subjects",
                  list: "/subjects",
                  create: "/subjects/create",
                  edit: "/subjects/edit/:id",
                  show: "/subjects/show/:id",
                  meta: {
                    label: "Subjects",
                    icon: <BookOpen />,
                  },
                },
                {
                  name: "departments",
                  list: "/departments",
                  show: "/departments/show/:id",
                  create: "/departments/create",
                  edit: "/departments/edit/:id",
                  meta: {
                    label: "Departments",
                    icon: <Building2 />,
                  },
                },
                {
                  name: "users",
                  list: "/faculty",
                  show: "/faculty/show/:id",
                  meta: {
                    label: "Faculty",
                    icon: <Users />,
                  },
                },
                {
                  name: "enrollments",
                  list: "/enrollments/create",
                  create: "/enrollments/create",
                  meta: {
                    label: "Enrollments",
                    icon: <ClipboardCheck />,
                  },
                },
                {
                  name: "classes",
                  list: "/classes",
                  create: "/classes/create",
                  edit: "/classes/edit/:id",
                  show: "/classes/show/:id",
                  meta: {
                    label: "Classes",
                    icon: <GraduationCap />,
                  },
                },
              ]}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated key="public-routes" fallback={<Outlet />}>
                      <NavigateToResource fallbackTo="/" />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Route>

                <Route
                  element={
                    <Authenticated key="private-routes" fallback={<Login />}>
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route path="/" element={<Dashboard />} />

                  <Route path="subjects">
                    <Route index element={<SubjectsList />} />
                    <Route
                      path="create"
                      element={
                        <CanAccess resource="subjects" action="create">
                          <SubjectsCreate />
                        </CanAccess>
                      }
                    />
                    <Route path="edit/:id" element={<SubjectsEdit />} />
                    <Route path="show/:id" element={<SubjectsShow />} />
                  </Route>

                  <Route path="departments">
                    <Route index element={<DepartmentsList />} />
                    <Route
                      path="create"
                      element={
                        <CanAccess resource="departments" action="create">
                          <DepartmentsCreate />
                        </CanAccess>
                      }
                    />
                    <Route path="edit/:id" element={<DepartmentEdit />} />
                    <Route path="show/:id" element={<DepartmentShow />} />
                  </Route>

                  <Route path="faculty">
                    <Route index element={<FacultyList />} />
                    <Route path="show/:id" element={<FacultyShow />} />
                  </Route>

                  <Route path="enrollments">
                    <Route
                      path="create"
                      element={
                        <CanAccess
                          resource="enrollments"
                          action="list"
                          fallback={<EnrollmentAccessDenied />}
                        >
                          <EnrollmentsCreate />
                        </CanAccess>
                      }
                    />
                    <Route
                      path="join"
                      element={
                        <CanAccess
                          resource="enrollments"
                          action="list"
                          fallback={<EnrollmentAccessDenied />}
                        >
                          <EnrollmentsJoin />
                        </CanAccess>
                      }
                    />
                    <Route
                      path="confirm"
                      element={
                        <CanAccess
                          resource="enrollments"
                          action="list"
                          fallback={<EnrollmentAccessDenied />}
                        >
                          <EnrollmentConfirm />
                        </CanAccess>
                      }
                    />
                  </Route>

                  <Route path="classes">
                    <Route index element={<ClassesList />} />
                    <Route
                      path="create"
                      element={
                        <CanAccess resource="classes" action="create">
                          <CreateClass />
                        </CanAccess>
                      }
                    />
                    <Route path="edit/:id" element={<EditClass />} />
                    <Route path="show/:id" element={<ClassesShow />} />
                  </Route>
                </Route>
              </Routes>

              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler
                handler={({ action, resource }) => {
                  const actionPrefixes: Record<string, string> = {
                    create: "Create new ",
                    edit: "Edit ",
                    show: "Show ",
                    list: "",
                  };
                  const resourceName =
                    resource?.meta?.label || resource?.name || "";
                  const prefix = action ? actionPrefixes[action] ?? "" : "";
                  return `${prefix}${resourceName} | Classroom Management`;
                }}
              />
            </Refine>
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
