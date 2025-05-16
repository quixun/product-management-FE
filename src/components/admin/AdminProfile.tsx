import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User as UserIcon,
  Mail,
  Calendar,
  Shield,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User } from "@/types/auth-type";

interface AdminProfileProps {
  user: User | null;
}

export default function AdminProfile({ user }: AdminProfileProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Admin Profile</CardTitle>
        <CardDescription>Your account information and status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user?.avatar || ""} alt="Admin" />
            <AvatarFallback className="text-lg">
              {user?.userName?.charAt(0) || "A"}
            </AvatarFallback>
          </Avatar>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            <div className="flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Username</p>
                <p className="font-medium">{user?.userName || "Admin User"}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">
                  {user?.email || "admin@example.com"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium">{user?.role || "Administrator"}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{user?.phoneNumber || "Not provided"}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm">
            Edit Profile
          </Button>
          <Button variant="outline" size="sm">
            Change Password
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 