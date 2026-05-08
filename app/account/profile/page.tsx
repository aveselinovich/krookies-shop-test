import { AccountShell } from "@/components/account/AccountShell";
import { ProfileForm } from "@/components/account/ProfileForm";
import { requireAuth } from "@/lib/permissions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Профиль — KROOKIES" };

export default async function AccountProfilePage() {
  const user = await requireAuth();

  return (
    <AccountShell user={user} active="profile">
      <ProfileForm user={user} />
    </AccountShell>
  );
}
