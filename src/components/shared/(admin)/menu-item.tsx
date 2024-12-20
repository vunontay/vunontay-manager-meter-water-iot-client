import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItemProps {
    icon: React.ElementType;
    label: string;
    href?: string;
    children?: { icon: React.ElementType; label: string; href: string }[];
    toggleCollapse: boolean;
}

export const SidebarMenuItem: React.FC<MenuItemProps> = ({
    icon: Icon,
    label,
    href,
    children,
    toggleCollapse,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    if (children) {
        return (
            <div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "flex items-center w-full py-2 px-4 rounded-lg transition-colors duration-200",
                        "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]",
                        toggleCollapse ? "justify-between" : "justify-center"
                    )}
                >
                    <div className="flex items-center">
                        <Icon className="w-6 h-6 text-[hsl(var(--primary))]" />
                        {toggleCollapse && (
                            <span className="ml-3 text-sm font-medium">
                                {label}
                            </span>
                        )}
                    </div>
                    {toggleCollapse && (
                        <ChevronDown
                            className={cn(
                                "size-4 text-[hsl(var(--muted-foreground))] transition-transform duration-200",
                                isOpen && "rotate-180"
                            )}
                        />
                    )}
                </button>
                {isOpen && toggleCollapse && (
                    <ul className="mt-2 ml-4 space-y-1">
                        {children.map((child, index) => (
                            <li key={index}>
                                <Link
                                    to={child.href}
                                    className="flex items-center py-2 px-4 rounded-lg text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] transition-colors duration-200"
                                >
                                    <child.icon className="size-6 text-[hsl(var(--primary))]" />
                                    <span className="ml-3 text-sm font-medium">
                                        {child.label}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }

    return (
        <Link
            to={href!}
            className={cn(
                "flex items-center py-2 px-4 rounded-lg transition-colors duration-200",
                "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]",
                toggleCollapse ? "justify-start" : "justify-center"
            )}
        >
            <Icon className="w-6 h-6 text-[hsl(var(--primary))]" />
            {toggleCollapse && (
                <span className="ml-3 text-sm font-medium">{label}</span>
            )}
        </Link>
    );
};
