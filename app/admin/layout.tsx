import type { Metadata } from "next";
import { AuthProvider } from "@/app/lib/auth-context";

export const metadata: Metadata = {
  title: "YouthTV Admin Dashboard",
  description: "Admin panel for managing YouthTV platform",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        {children}
      </div>
    </AuthProvider>
  );
}
