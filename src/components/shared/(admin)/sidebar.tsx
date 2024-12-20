import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { RootState } from "@/stores/store";
import {
    LayoutDashboard,
    Users,
    Gauge,
    FolderCog,
    FileText,
    MapPin,
    Receipt,
} from "lucide-react";
import { SidebarMenuItem } from "@/components/shared/(admin)/menu-item";

export const Sidebar = () => {
    const toggleCollapse = useSelector(
        (state: RootState) => state.sidebar.toggleCollapse
    );

    const menuItemsAdmin = [
        { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
        {
            icon: FolderCog,
            label: "Quản lý",
            children: [
                { icon: Users, label: "Người dùng", href: "users" },
                {
                    icon: Gauge,
                    label: "Đồng hồ",
                    href: "meters",
                },
                {
                    icon: MapPin,
                    label: "Vị trí lắp đặt",
                    href: "locations",
                },
                {
                    icon: FileText,
                    label: "Báo cáo tiêu thụ",
                    href: "measurements",
                },
                {
                    icon: Receipt,
                    label: "Quản lý hóa đơn",
                    href: "invoices",
                },
                // {
                //     icon: Settings,
                //     label: "Cài đặt hệ thống",
                //     href: "/admin/settings",
                // },
            ],
        },
    ];

    return (
        <aside
            className={cn(
                "sidebar overflow-y-auto fixed z-[1001] bg-card border-r h-full shadow-xl transition-all duration-300 ease-in-out",
                toggleCollapse ? "w-64" : "w-16",
                "sm:translate-x-0",
                !toggleCollapse && "!-translate-x-full sm:!translate-x-0"
            )}
        >
            {/* Logo */}
            <div
                className={cn(
                    "flex items-center justify-center shadow-sm py-4  transition-all "
                )}
            >
                <img
                    alt="logo"
                    src="/logo.webp"
                    className={cn(
                        "transition-all duration-300 ease-in-out",
                        toggleCollapse ? "w-16 h-16" : "w-8 h-8"
                    )}
                />
            </div>

            {/* Navigation Admin*/}
            <nav className="mt-6">
                <ul className="space-y-2">
                    {menuItemsAdmin.map((item, index) => (
                        <li key={index} className="group">
                            <SidebarMenuItem
                                {...item}
                                toggleCollapse={toggleCollapse}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};
