import { StaffLoginForm } from "@/components/auth/StaffLoginForm";

export const metadata = { title: "Вход для сотрудников — KROOKIES" };

export default function StaffLoginPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  return (
    <main className="min-h-screen bg-[#FFF9FB]">
      <section className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-5 py-12 md:px-8">
        <div className="w-full max-w-xl">
          <StaffLoginForm nextUrl={searchParams.next} />
        </div>
      </section>
    </main>
  );
}
