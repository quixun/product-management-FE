import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@/types/auth-type";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Edit, Trash, RefreshCw, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface DeletedUser extends User {
  deletedAt?: string;
}

interface StaffTabProps {
  staff: User[] | undefined;
  deletedStaff: DeletedUser[] | undefined;
}

export default function StaffTab({ staff, deletedStaff }: StaffTabProps) {
  const router = useRouter();

  const activeStaffCount = staff?.length || 0;
  const deletedStaffCount = deletedStaff?.length || 0;

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Staff Management</CardTitle>
          <CardDescription>
            Manage staff accounts and permissions
          </CardDescription>
        </div>
        <Button
          onClick={() => router.push("/admin/add-staff")}
          className="cursor-pointer"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Staff
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="active" className="relative cursor-pointer">
              Active Staff
              {activeStaffCount > 0 && (
                <Badge className="ml-2 bg-green-500">{activeStaffCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="deleted" className="relative cursor-pointer">
              Deleted Staff
              {deletedStaffCount > 0 && (
                <Badge className="ml-2 bg-red-500">{deletedStaffCount}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {!staff || staff.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No active staff members found
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Avatar</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {staff.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">
                        {member.userName}
                      </TableCell>
                      <TableCell>
                        <Avatar>
                          <AvatarImage src={member.avatar || ""} />
                        </Avatar>
                      </TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.phoneNumber || "N/A"}</TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Edit Staff"
                            className="cursor-pointer"
                            onClick={() =>
                              router.push(`/admin/staff/${member.id}`)
                            }
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 cursor-pointer "
                            title="Delete Staff"
                            onClick={() =>
                              router.push(`/admin/staff/${member.id}`)
                            }
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>

          <TabsContent value="deleted">
            {!deletedStaff || deletedStaff.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  No deleted staff members found
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-4 p-2 bg-amber-50 border border-amber-200 rounded-md">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <p className="text-sm text-amber-700">
                    Deleted staff accounts can be restored within 30 days of
                    deletion.
                  </p>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Avatar</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Deleted Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deletedStaff.map((member) => (
                      <TableRow key={member.id} className="opacity-75">
                        <TableCell className="font-medium">
                          {member.userName}
                        </TableCell>
                        <TableCell>
                          <Avatar>
                            <AvatarImage src={member.avatar || ""} />
                          </Avatar>
                        </TableCell>
                        <TableCell>{member.email}</TableCell>
                        <TableCell>
                          {member.deletedAt
                            ? new Date(member.deletedAt).toLocaleDateString()
                            : "Unknown"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600 cursor-pointer"
                              title="Restore Staff"
                              onClick={() =>
                                router.push(
                                  `/admin/staff/restore-staff/${member.id}`
                                )
                              }
                            >
                              <RefreshCw className="h-4 w-4 mr-1" />
                              Restore
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
