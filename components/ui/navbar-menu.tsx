"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useId, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface NavbarMenuItem {
  label: string;
  href: string;
  description: string;
  icon: ReactNode;
  isActive?: boolean;
}

interface NavbarMenuProps {
  label: string;
  ariaLabel: string;
  items: NavbarMenuItem[];
  panelTop?: string;
  className?: string;
}

export function NavbarMenu({
  label,
  ariaLabel,
  items,
  panelTop = "4rem",
  className,
}: NavbarMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isActive = items.some((item) => item.isActive);

  function cancelScheduledClose() {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = null;
    }
  }

  function scheduleClose() {
    cancelScheduledClose();
    closeTimeout.current = setTimeout(() => setIsOpen(false), 350);
  }

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => {
        cancelScheduledClose();
        setIsOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsOpen(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") setIsOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onFocus={() => setIsOpen(true)}
        onClick={() => setIsOpen(true)}
        className={cn(
          "flex cursor-pointer items-center gap-1 text-sm font-medium transition-colors hover:text-foreground",
          isActive || isOpen
            ? "text-foreground font-semibold"
            : "text-muted-foreground",
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform",
            isOpen && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <div
          onMouseEnter={cancelScheduledClose}
          onMouseLeave={scheduleClose}
          className="fixed left-1/2 z-50 w-[min(42rem,calc(100vw-2rem))] -translate-x-1/2 pt-3"
          style={{
            top: `calc(${panelTop} + env(safe-area-inset-top, 0px))`,
          }}
        >
          <nav
            id={menuId}
            aria-label={ariaLabel}
            className="grid gap-2 rounded-2xl border border-border/70 bg-background/95 p-3 shadow-2xl shadow-black/10 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200 sm:grid-cols-2 sm:gap-3 sm:p-4"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.isActive ? "page" : undefined}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "group flex cursor-pointer items-start gap-4 rounded-xl border border-violet-500/15 bg-violet-500/[0.03] p-4 shadow-[0_0_18px_-12px_rgba(139,92,246,0.55)] transition-all hover:border-violet-500/40 hover:bg-violet-500/[0.07] hover:shadow-[0_0_24px_-10px_rgba(139,92,246,0.7)]",
                  item.isActive &&
                    "border-violet-500/40 bg-violet-500/[0.07] shadow-[0_0_22px_-10px_rgba(139,92,246,0.65)]",
                )}
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                  {item.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-3 font-semibold text-foreground">
                    {item.label}
                    <ArrowUpRight
                      className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </span>
                </span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
