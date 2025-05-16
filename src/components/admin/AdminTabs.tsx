import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from "./tabs/OverviewTab";
import StaffTab from "./tabs/StaffTab";
import ProductsTab from "./tabs/ProductsTab";
import SettingsTab from "./tabs/SettingsTab";
import { Product, User } from "@/types/auth-type";

export type AdminTabId = "overview" | "users" | "products" | "settings";

interface DeletedUser extends User {
  deletedAt?: string;
}

interface AdminTabsProps {
  defaultTab?: AdminTabId;
  user: User | null;
  staff?: User[];
  deletedStaff?: DeletedUser[];
  products?: Product[];
  onTabChange?: (tab: AdminTabId) => void;
  onSettingsSave?: () => void;
}

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "users", label: "Staff" },
  { id: "products", label: "Products" },
  { id: "settings", label: "Settings" },
] as const;

export default function AdminTabs({
  defaultTab = "overview",
  user,
  staff,
  deletedStaff = [],
  products,
  onTabChange,
  onSettingsSave,
}: AdminTabsProps) {
  const handleTabChange = (value: string) => {
    if (onTabChange) {
      onTabChange(value as AdminTabId);
    }
  };

  return (
    <Tabs
      defaultValue={defaultTab}
      className="w-full"
      onValueChange={handleTabChange}
    >
      <TabsList className="grid w-full grid-cols-4">
        {TABS.map((tab) => (
          <TabsTrigger
            key={tab.id}
            className="cursor-pointer hover:bg-white/80"
            value={tab.id}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {TABS.map((tab) => {
        let content;
        switch (tab.id) {
          case "overview":
            content = <OverviewTab user={user} staffCount={staff?.length || 0} />;
            break;
          case "users":
            content = <StaffTab staff={staff} deletedStaff={deletedStaff} />;
            break;
          case "products":
            content = <ProductsTab products={products} />;
            break;
          case "settings":
            content = <SettingsTab onSave={onSettingsSave} />;
            break;
        }
        
        return (
          <TabsContent key={tab.id} value={tab.id}>
            {content}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
