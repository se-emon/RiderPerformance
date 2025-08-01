import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AppSidebar } from "./_components/sidebar";
import { UserNav } from "./_components/user-nav";
import type { UserRole } from "@/lib/types";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = cookies().get('user-role')?.value as UserRole | undefined;

  if (!role) {
    redirect('/login');
  }

  const roleName = role.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppSidebar role={role} />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-card px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <h1 className="text-xl font-semibold">{roleName} Portal</h1>
            <div className="ml-auto flex items-center gap-2">
                <UserNav role={role} />
            </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
        </main>
      </div>
    </div>
  );
}
