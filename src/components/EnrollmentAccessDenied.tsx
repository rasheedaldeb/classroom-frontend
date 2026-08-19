import { useNavigate } from "react-router";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const EnrollmentAccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="max-w-md w-full text-center">
        <CardHeader className="flex flex-col items-center space-y-2">
          <div className="p-3 bg-amber-100 rounded-full text-amber-600">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <CardTitle className="text-xl">Access Restricted</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Only students can access enrollment features. Administrators and
            faculty members can manage classes directly through the Class
            Management panel.
          </p>
          <Button className="w-full" onClick={() => navigate("/classes")}>
            Go to Classes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
