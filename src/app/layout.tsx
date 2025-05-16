import { ReactNode } from "react";
import { AuthProvider } from "@/provider/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import "@/app/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
