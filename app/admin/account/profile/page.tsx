import { AdminAccountShell } from "@/components/admin/AdminAccountShell";
import { AdminPasswordForm } from "@/components/admin/AdminPasswordForm";
import { ProfileForm } from "@/components/account/ProfileForm";
import { requireAdmin } from "@/lib/permissions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Мои данные — KROOKIES Admin" };

export default async function AdminAccountProfilePage() {
  const user = await requireAdmin();

  return (
    <AdminAccountShell user={user} active="profile">
      <div className="max-w-5xl space-y-6">
        <ProfileForm user={user} />
        <AdminPasswordForm />
      </div>
    </AdminAccountShell>
  );
}
