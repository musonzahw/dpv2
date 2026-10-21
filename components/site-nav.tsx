"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Award, Menu, X, ArrowUpRight, Mail } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { openContactDrawer } from "@/components/contact-drawer";
import { cn } from "@/lib/utils";
import { NavbarMenu } from "@/components/ui/navbar-menu";

const links = [
  { label: "Home", href: "/" },
  { label: "About Me", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "CV", href: "/cv" },
  { label: "Achievements", href: "/achievements" },
  { label: "Certificates", href: "/certificates" },
  { label: "Contact", href: "/contact" },
];

function isLinkActive(href: string, pathname: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  if (href === "/about") {
    return pathname === "/about";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const desktopLinks = links.filter(
    (link) => link.href !== "/achievements" && link.href !== "/contact",
  );
  const moreLinks = links.filter(
    (link) => link.href === "/achievements" || link.href === "/contact",
  );
  const moreMenuItems = moreLinks.map((link) => ({
    ...link,
    description:
      link.href === "/achievements"
        ? "Milestones, recognition, and professional highlights."
        : "Get in touch to discuss a project or opportunity.",
    icon:
      link.href === "/achievements" ? (
        <Award className="size-5" aria-hidden="true" />
      ) : (
        <Mail className="size-5" aria-hidden="true" />
      ),
    isActive: isLinkActive(link.href, pathname),
  }));

  return (
    <>
      <div
        aria-hidden="true"
        className="h-[calc(4rem+env(safe-area-inset-top,0px))] w-full shrink-0"
      />
      <header
        data-site-nav
        className="fixed inset-x-0 top-0 z-40 w-full border-b border-border/40 bg-background/80 pt-[env(safe-area-inset-top,0px)] backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src="/sage-logo.png"
              alt="Sage"
              width={64}
              height={64}
              className="h-12 w-auto object-contain sm:h-14"
              priority
            />
          </Link>

          <nav
            className="hidden md:flex items-center gap-7"
            aria-label="Primary"
          >
            {desktopLinks.map((link) => {
              const active = isLinkActive(link.href, pathname);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative text-sm font-medium transition-colors hover:text-foreground pb-0.5",
                    active
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground",
                  )}
                >
                  {link.label}
                  {active && (
                    <span
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}
            <NavbarMenu
              label="More"
              ariaLabel="More pages"
              items={moreMenuItems}
            />
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <button
              onClick={() => openContactDrawer()}
              className="hidden cursor-pointer sm:inline-flex items-center gap-1.5 rounded-full bg-violet-600 px-4 py-1.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all hover:bg-violet-500 hover:shadow-[0_0_28px_rgba(124,58,237,0.6)]"
            >
              Let&apos;s Talk
              <ArrowUpRight className="size-3.5" />
            </button>

            <button
              className="flex size-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav
            className="border-t border-border bg-background/95 backdrop-blur-md md:hidden"
            aria-label="Mobile"
          >
            <div className="flex w-full flex-col px-5 py-2">
              {links.map((link) => {
                const active = isLinkActive(link.href, pathname);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "py-3 text-sm font-medium transition-colors hover:text-foreground border-b border-border/40 last:border-0",
                      active
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  setOpen(false);
                  openContactDrawer();
                }}
                className="mt-3 mb-2 inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500 transition-colors"
              >
                Let&apos;s Talk
                <ArrowUpRight className="size-3.5" />
              </button>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
