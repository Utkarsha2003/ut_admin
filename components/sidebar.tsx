"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Car, CreditCard, LayoutDashboard, Percent, Settings, Users, Bell, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Bookings",
    href: "/bookings",
    icon: Calendar,
  },
  {
    title: "Drivers",
    href: "/drivers",
    icon: Users,
  },
  {
    title: "Vehicles",
    href: "/vehicles",
    icon: Car,
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
  },
  {
    title: "Coupons",
    href: "/coupons",
    icon: Percent,
  },
  {
    title: "Transactions",
    href: "/transactions",
    icon: CreditCard,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-[80] bg-background border-r">
      <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
        <div className="flex items-center h-16 px-6 border-b shrink-0">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Car className="h-6 w-6" />
            <span className="text-lg">TransportAdmin</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
              className={cn(
                "w-full jnpmustify-start",
                pathname.startsWith(item.href) ? "bg-muted font-medium" : "font-normal",
              )}
              asChild
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-5 w-5" />
                {item.title}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  )
}
