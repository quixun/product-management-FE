import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Save, RefreshCw } from "lucide-react";

interface SettingsTabProps {
  onSave?: () => void;
}

export default function SettingsTab({ onSave }: SettingsTabProps) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Admin Settings</CardTitle>
        <CardDescription>
          Configure system settings and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">General Settings</h3>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="site-name">Site Name</Label>
                <p className="text-sm text-muted-foreground">
                  The name displayed on your site
                </p>
              </div>
              <Input id="site-name" defaultValue="Product Management System" className="w-[250px]" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="admin-email">Admin Email</Label>
                <p className="text-sm text-muted-foreground">
                  Primary contact email for system notifications
                </p>
              </div>
              <Input id="admin-email" defaultValue="admin@example.com" className="w-[250px]" />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Notification Settings</h3>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Product Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when products are updated
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Staff Activity</Label>
                <p className="text-sm text-muted-foreground">
                  Receive staff activity reports
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Maintenance</h3>
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>System Backup</Label>
                <p className="text-sm text-muted-foreground">
                  Configure automatic system backups
                </p>
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Configure
              </Button>
            </div>
            
            <div>
              <Label htmlFor="maintenance-message">Maintenance Message</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Message displayed during system maintenance
              </p>
              <Textarea 
                id="maintenance-message" 
                placeholder="We're currently performing maintenance. Please check back later."
                className="h-20"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center text-sm text-amber-500">
          <AlertCircle className="mr-1 h-4 w-4" />
          Changes are saved automatically
        </div>
        <Button onClick={onSave}>
          <Save className="mr-2 h-4 w-4" />
          Save All Settings
        </Button>
      </CardFooter>
    </Card>
  );
} 