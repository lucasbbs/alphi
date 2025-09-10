import { Suspense } from "react";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata = {
  title: "Alphi - Administration",
  description: "Interface d'administration pour l'application éducative Alphi",
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<div className="flex items-center justify-center h-screen text-gray-800">Chargement...</div>}>
        <AdminDashboard />
      </Suspense>
    </div>
  );
}