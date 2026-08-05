"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import {
  LayoutDashboard,
  Inbox,
  FolderOpen,
  MessageSquareQuote,
  FileText,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { signOut } from "next-auth/react";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/portfolio", label: "Portfolio", icon: FolderOpen },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
];

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [status, router, pathname]);

  // Show login page without sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not authenticated
  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-glass-border bg-background-secondary flex flex-col shrink-0">
        <div className="p-6 border-b border-glass-border">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-cyan flex items-center justify-center font-heading font-bold text-white text-xs">
              NG
            </div>
            <span className="font-heading font-bold text-sm">
              Admin Panel
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-foreground-dim hover:text-foreground transition-colors"
          >
            <ArrowLeft size={12} />
            Back to site
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                  isActive
                    ? "bg-accent/10 text-accent border border-accent/20"
                    : "text-foreground-muted hover:text-foreground hover:bg-glass-hover"
                }`}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-glass-border">
          <div className="text-xs text-foreground-dim mb-3 px-4">
            {session.user?.email}
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-foreground-muted hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </SessionProvider>
  );
}
