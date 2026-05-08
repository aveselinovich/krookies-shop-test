import { AdminAccountShell } from "@/components/admin/AdminAccountShell";
import { AdminUsersManager } from "@/components/admin/AdminUsersManager";
import { getAdminUsers } from "@/lib/admin-users";
import { requireAdmin } from "@/lib/permissions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Администраторы — KROOKIES Admin" };

export default async function AdminAdminsPage() {
  const user = await requireAdmin();
  const admins = await getAdminUsers();

  return (
    <AdminAccountShell user={user} active="admins">
        <AdminUsersManager admins={admins} />
    </AdminAccountShell>
  );
}
