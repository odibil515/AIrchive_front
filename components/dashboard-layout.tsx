"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Bot,
  LogOut,
  Menu,
  Newspaper,
  Settings,
  Store,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useState } from "react";
import { useDisconnect } from "wagmi";

interface NavItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavItem({ href, icon, label, active, onClick }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        active
          ? "bg-gray-800 text-white"
          : "text-gray-400 hover:text-white hover:bg-gray-800"
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMobile();
  const [open, setOpen] = useState(false);
  const { disconnect } = useDisconnect();

  const handleLogout = () => {
    disconnect();
    router.push("/");
  };

  const navItems = [
    { href: "/dashboard", icon: <Bot className="h-5 w-5" />, label: "AI Chat" },
    {
      href: "/dashboard/trading",
      icon: <BarChart3 className="h-5 w-5" />,
      label: "Trading",
    },
    {
      href: "/dashboard/news",
      icon: <Newspaper className="h-5 w-5" />,
      label: "News",
    },
    {
      href: "/dashboard/marketplace",
      icon: <Store className="h-5 w-5" />,
      label: "Subscription",
    },
    {
      href: "/dashboard/settings",
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
    },
  ];

  const renderNavItems = (onClick?: () => void) => (
    <>
      {navItems.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          icon={item.icon}
          label={item.label}
          active={pathname === item.href}
          onClick={onClick}
        />
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Mobile Header */}
      {isMobile && (
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Bot className="h-6 w-6 text-emerald-400" />
            <h1 className="text-xl font-bold">Tradgent</h1>
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-64 p-0 bg-gray-900 border-r border-gray-800"
            >
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-800">
                  <Link
                    href="/"
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                    onClick={() => setOpen(false)}
                  >
                    <Bot className="h-6 w-6 text-emerald-400" />
                    <h2 className="text-xl font-bold">Tradgent</h2>
                  </Link>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                  {renderNavItems(() => setOpen(false))}
                </nav>
                <div className="p-4 border-t border-gray-800">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-gray-800"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Logout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </header>
      )}

      <div className="flex h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <aside className="hidden md:flex md:w-64 flex-col border-r border-gray-800 bg-gray-900">
            <div className="p-4 border-b border-gray-800">
              <Link
                href="/"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Bot className="h-6 w-6 text-emerald-400" />
                <h2 className="text-xl font-bold">Tradgent</h2>
              </Link>
            </div>
            <nav className="flex-1 p-4 space-y-1">{renderNavItems()}</nav>
            <div className="p-4 border-t border-gray-800">
              <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-md bg-gray-800">
                <User className="h-5 w-5 text-emerald-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    Demo User
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    demo@example.com
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-gray-800"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Logout
              </Button>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
