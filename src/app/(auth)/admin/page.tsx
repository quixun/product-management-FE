"use client";

import { useAuth } from "@/provider/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAllDeletedStaff, useAllStaff } from "@/lib/auth/fetch-all-staff";
import AdminProfile from "@/components/admin/AdminProfile";
import AdminTabs, { AdminTabId } from "@/components/admin/AdminTabs";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

export default function AdminPage() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const { data: staff } = useAllStaff();
  const [activeTab, setActiveTab] = useState<AdminTabId>("overview");
  const { data: deletedStaff } = useAllDeletedStaff();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/");
    }
  }, [user, router]);

  const handleTabChange = (tab: AdminTabId) => {
    setActiveTab(tab);
  };

  const handleSettingsSave = () => {
    console.log("Settings saved");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authRefreshToken");
    queryClient.clear();
    setUser(null);
    router.push("/");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mt-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <Button
          className="px-4 py-4 bg-red-500 cursor-pointer text-white"
          variant="link"
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
      </div>

      <AdminProfile user={user} />

      <AdminTabs
        defaultTab={activeTab}
        user={user}
        staff={staff}
        deletedStaff={deletedStaff}
        products={user?.products}
        onTabChange={handleTabChange}
        onSettingsSave={handleSettingsSave}
      />
    </div>
  );
}
