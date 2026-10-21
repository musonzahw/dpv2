"use client";

import React, { useState, useEffect, memo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { animate, stagger } from "animejs";
import {
  ArrowLeft,
  ArrowRight,
  Play,
  Image as ImageIcon,
  GitBranch,
  LayoutGrid,
  List,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  GalleryHorizontal,
  X,
  Boxes,
  Bot,
  Layers,
  Package,
  Send,
  Sparkles,
  Users,
} from "lucide-react";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";
import { ProjectStructuredData } from "@/components/project-structured-data";

function TypewriterText({
  text,
  speed = 50,
}: {
  text: string;
  speed?: number;
}) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let cancelled = false;
    let idx = 0;
    const type = () => {
      if (cancelled) return;
      if (idx <= text.length) {
        setDisplayed(text.slice(0, idx));
        idx++;
        setTimeout(type, speed);
      }
    };
    type();
    return () => {
      cancelled = true;
    };
  }, [text, speed]);
  return <span>{displayed}</span>;
}

type Category = "All work" | "Web platforms" | "Mobile" | "Systems programming";
type ViewMode = "grid" | "list" | "tiles" | "carousel";

interface Project {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  category: Category;
  gradient: string;
  coverImage?: string;
  mobileCover?: boolean;
  chatbotIllustration?: boolean;
  inventoryIllustration?: boolean;
  projectHref?: string;
  demo?: string;
  artifacts?: string;
  github?: string;
}

const PROJECTS: Project[] = [
  {
    title: "Green Space",
    tagline: "Mobile · AgriTech",
    description:
      "A React Native app powered by Sage, a Python-trained soil fertility prediction and classification model. Built with Supabase, PyTorch, scikit-learn, NumPy and pandas.",
    tech: [
      "React Native",
      "TypeScript",
      "Python",
      "Machine Learning",
      "Supabase",
      "Image Recognition",
    ],
    category: "Mobile",
    gradient: "from-green-800 via-emerald-700 to-green-900",
    coverImage:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1785959050/dashboard_screen_ncgdqw.jpg",
    mobileCover: true,
    projectHref: "/projects/greenspace",
    demo: "/projects/greenspace/demo",
    artifacts: "/projects/greenspace/artifacts",
    github: "#",
  },
  {
    title: "WelfareTracker",
    tagline: "Mobile · Welfare Management",
    description:
      "A cross-platform welfare management system for field staff safety, with real-time tracking, geofence alerts, and emergency panic response.",
    tech: ["Flutter", "Dart", "Firebase", "Geofencing", "Real-time"],
    category: "Mobile",
    gradient: "from-sky-500 via-blue-400 to-yellow-400",
    coverImage:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_600,q_auto,f_auto/v1784627935/splash_screen_nqcwym.jpg",
    mobileCover: true,
    projectHref: "/projects/welfaretracker",
    demo: "/projects/welfaretracker/demo",
    artifacts: "/projects/welfaretracker/artifacts",
    github: "#",
  },
  {
    title: "HighSpecHR",
    tagline: "Web platforms · HR",
    description:
      "A HR web platform that streamlines hiring, recruitment and candidate assessment with automated workflows and real-time analytics.",
    tech: ["React Native", "TypeScript", "SQLite", "Redux"],
    category: "Web platforms",
    gradient: "from-zinc-800 via-zinc-700 to-zinc-900",
    coverImage:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1785842008/smarthr_xwyta5.png",
    projectHref: "/projects/highspechr",
    demo: "#",
    artifacts: "/projects/highspechr/artifacts",
    github: "#",
  },
  {
    title: "SageOS",
    tagline: "Systems programming · Operating System",
    description:
      "A custom operating system made from scratch, exploring low-level systems programming, memory management, process scheduling, and kernel development.",
    tech: ["C", "Assembly", "Systems Programming", "Kernel Development"],
    category: "Systems programming",
    gradient: "from-violet-800 via-purple-700 to-indigo-900",
    coverImage:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1787475347/Screenshot_2026-08-17_113653_x1ot2e.png",
    projectHref: "/projects/sageOS",
    demo: "/projects/sageOS/demo",
    artifacts: "/projects/sageOS/artifacts",
  },
  {
    title: "AI Chat Assistant",
    tagline: "Web platforms · AI",
    description:
      "A conversational AI interface powered by OpenAI, with persistent chat history, markdown rendering and streaming.",
    tech: ["Next.js", "OpenAI", "TypeScript", "Tailwind CSS"],
    category: "Web platforms",
    gradient: "from-rose-800 via-pink-700 to-purple-900",
    chatbotIllustration: true,
    demo: "/projects/ai-chat-assistant",
    github: "#",
  },
  {
    title: "Sage Inventory Management System",
    tagline: "Desktop · Inventory Management",
    description:
      "A C# inventory management system backed by MySQL Server, with full CRUD functions for creating, viewing, updating, and deleting product records.",
    tech: ["C#", "MySQL Server", "CRUD", "Desktop Application"],
    category: "Web platforms",
    gradient: "from-amber-700 via-orange-600 to-rose-900",
    inventoryIllustration: true,
    projectHref: "/projects/inventory-management",
    demo: "/projects/inventory-management/demo",
    github: "#",
  },
];

const CATEGORIES: Category[] = [
  "All work",
  "Web platforms",
  "Mobile",
  "Systems programming",
];

/* ─── Shared action buttons ───────────────────────────────────── */
function ActionButtons({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {project.projectHref ? (
        <Link
          href={project.projectHref}
          onClick={(event) => event.stopPropagation()}
          className="flex cursor-pointer items-center gap-1 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-500 hover:shadow-[0_6px_16px_rgba(124,58,237,0.2)] active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none"
        >
          Open project <ArrowRight className="size-3" />
        </Link>
      ) : project.demo && project.demo !== "#" ? (
        <Link
          href={project.demo}
          onClick={(event) => event.stopPropagation()}
          className="flex cursor-pointer items-center gap-1 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-500 hover:shadow-[0_6px_16px_rgba(124,58,237,0.2)] active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none"
        >
          <Play className="size-3" /> Video demo
        </Link>
      ) : null}
      {!project.projectHref && project.artifacts && (
        <Link
          href={project.artifacts}
          onClick={(event) => event.stopPropagation()}
          className="flex cursor-pointer items-center gap-1 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-500 hover:shadow-[0_6px_16px_rgba(124,58,237,0.2)] active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none"
        >
          <ImageIcon className="size-3" /> Artifacts
        </Link>
      )}
      {project.github &&
        project.github !== "#" &&
        (project.github.startsWith("/") ? (
          <Link
            href={project.github}
            onClick={(event) => event.stopPropagation()}
            className="flex cursor-pointer items-center gap-1 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-500 hover:shadow-[0_6px_16px_rgba(124,58,237,0.2)] active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none"
          >
            <GitBranch className="size-3" /> GitHub
          </Link>
        ) : (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="flex cursor-pointer items-center gap-1 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-500 hover:shadow-[0_6px_16px_rgba(124,58,237,0.2)] active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none"
          >
            <GitBranch className="size-3" /> GitHub
          </a>
        ))}
    </div>
  );
}

/* ─── GRID card ───────────────────────────────────────────────── */
function ProjectArtwork({ project }: { project: Project }) {
  return (
    <div
      className={`relative aspect-[16/9] overflow-hidden rounded-xl bg-gradient-to-br ${project.gradient}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-black/10" />
      {project.chatbotIllustration ? (
        <>
          <div className="absolute -right-8 -top-10 size-36 rounded-full bg-fuchsia-500/30 blur-3xl" />
          <div className="absolute -bottom-12 -left-8 size-40 rounded-full bg-violet-500/30 blur-3xl" />
          <div className="absolute inset-3 overflow-hidden rounded-xl border border-white/20 bg-[#11101c]/95 shadow-[0_12px_30px_rgba(0,0,0,0.45)] sm:inset-4">
            <div className="flex h-7 items-center justify-between border-b border-white/10 bg-white/[0.04] px-2.5">
              <div className="flex items-center gap-1.5">
                <span className="flex size-4 items-center justify-center rounded-md bg-gradient-to-br from-fuchsia-500 to-violet-500 text-white">
                  <Sparkles className="size-2.5" />
                </span>
                <span className="text-[8px] font-semibold tracking-wide text-white/90">
                  Sage AI
                </span>
              </div>
              <div className="flex items-center gap-1 text-[7px] text-emerald-300/90">
                <span className="size-1 rounded-full bg-emerald-400" />
                Ready to help
              </div>
            </div>
            <div className="grid h-[calc(100%-1.75rem)] grid-cols-[24%_1fr]">
              <div className="space-y-2 border-r border-white/10 bg-black/10 p-2">
                <div className="mb-3 h-1.5 w-4/5 rounded-full bg-white/20" />
                <div className="h-4 rounded-md border border-violet-400/25 bg-violet-400/10" />
                <div className="h-1 w-4/5 rounded-full bg-white/15" />
                <div className="h-1 w-3/5 rounded-full bg-white/10" />
              </div>
              <div className="relative flex min-w-0 flex-col items-center justify-center gap-2 p-2 sm:gap-2.5 sm:p-3">
                <div className="absolute right-3 top-3 text-fuchsia-200/80">
                  <Sparkles className="size-3" />
                </div>
                <div className="flex size-8 items-center justify-center rounded-xl bg-gradient-to-br from-fuchsia-500/30 to-violet-500/30 text-fuchsia-100 ring-1 ring-white/15 shadow-[0_0_20px_rgba(217,70,239,0.25)] sm:size-10">
                  <Bot className="size-4 sm:size-5" />
                </div>
                <div className="space-y-1 text-center">
                  <div className="text-[9px] font-semibold text-white/90 sm:text-[10px]">
                    Your AI assistant
                  </div>
                  <div className="text-[7px] text-white/40">
                    Ask anything. Let&apos;s figure it out.
                  </div>
                </div>
                <div className="w-full max-w-[190px] space-y-1.5">
                  <div className="ml-auto w-[66%] rounded-lg rounded-br-sm bg-violet-500/35 px-2 py-1.5 text-[7px] text-violet-50/90">
                    Help me plan my next project
                  </div>
                  <div className="flex items-start gap-1.5 rounded-lg rounded-bl-sm border border-white/10 bg-white/[0.06] px-2 py-1.5">
                    <Sparkles className="mt-0.5 size-2 shrink-0 text-fuchsia-300" />
                    <div className="space-y-1">
                      <div className="h-1 w-28 max-w-full rounded-full bg-white/50" />
                      <div className="h-1 w-20 max-w-full rounded-full bg-white/25" />
                    </div>
                  </div>
                </div>
                <div className="flex w-full max-w-[190px] items-center justify-between rounded-full border border-white/15 bg-black/20 px-2 py-1.5 text-[7px] text-white/35">
                  <span>Message Sage AI...</span>
                  <span className="flex size-4 items-center justify-center rounded-full bg-violet-500 text-white">
                    <Send className="size-2" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : project.inventoryIllustration ? (
        <>
          <div className="absolute -right-8 -top-8 size-40 rounded-full bg-orange-400/25 blur-3xl" />
          <div className="absolute -bottom-12 -left-8 size-40 rounded-full bg-amber-300/20 blur-3xl" />
          <div className="absolute inset-x-3 top-2 bottom-1">
            <div className="absolute inset-x-0 top-0 bottom-7 rounded-[1.1rem] border border-zinc-500/80 bg-gradient-to-br from-zinc-500 via-zinc-800 to-zinc-600 p-[5px] shadow-[0_12px_24px_rgba(0,0,0,0.55)]">
              <div className="relative h-full w-full overflow-hidden rounded-[0.8rem] border border-black/80 bg-[#f5f6f8]">
                <div className="flex h-5 items-center justify-between bg-[#202936] px-2">
                  <div className="flex items-center gap-1">
                    <span className="flex size-3 items-center justify-center rounded-sm bg-orange-500 text-white">
                      <Package className="size-2" />
                    </span>
                    <span className="text-[6px] font-semibold text-white/90">
                      SAGE INVENTORY
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="size-1 rounded-full bg-emerald-400" />
                    <span className="text-[5px] text-white/60">Connected</span>
                    <span className="ml-1 size-2.5 rounded-full bg-white/15" />
                  </div>
                </div>
                <div className="grid h-[calc(100%-1.25rem)] grid-cols-[19%_1fr]">
                  <div className="space-y-2 bg-[#263241] p-1.5">
                    <div className="mb-2 h-1 w-3/5 rounded-full bg-white/20" />
                    <div className="flex items-center gap-1 rounded bg-orange-500/20 px-1 py-1 text-[5px] font-medium text-orange-200">
                      <Boxes className="size-2" /> Dashboard
                    </div>
                    <div className="flex items-center gap-1 px-1 text-[5px] text-white/55">
                      <Package className="size-2" /> Products
                    </div>
                    <div className="flex items-center gap-1 px-1 text-[5px] text-white/55">
                      <Layers className="size-2" /> Categories
                    </div>
                    <div className="flex items-center gap-1 px-1 text-[5px] text-white/55">
                      <Users className="size-2" /> Customers
                    </div>
                  </div>
                  <div className="min-w-0 overflow-hidden p-1.5 sm:p-2">
                    <div className="mb-1.5 flex items-center justify-between">
                      <div>
                        <div className="text-[7px] font-bold text-slate-800 sm:text-[8px]">
                          Inventory overview
                        </div>
                        <div className="text-[5px] text-slate-400">
                          Monitor your products and stock
                        </div>
                      </div>
                      <span className="rounded bg-orange-500 px-1.5 py-1 text-[5px] font-semibold text-white">
                        + Add product
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        ["Total products", "1,248", "text-orange-500"],
                        ["In stock", "1,106", "text-emerald-600"],
                        ["Low stock", "24", "text-amber-600"],
                      ].map(([label, value, color]) => (
                        <div
                          key={label}
                          className="rounded border border-slate-200 bg-white px-1 py-1"
                        >
                          <div className="text-[4px] text-slate-400 sm:text-[5px]">
                            {label}
                          </div>
                          <div
                            className={`mt-0.5 text-[7px] font-bold sm:text-[8px] ${color}`}
                          >
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-1.5 overflow-hidden rounded border border-slate-200 bg-white">
                      <div className="flex items-center justify-between border-b border-slate-100 px-1.5 py-1">
                        <span className="text-[5px] font-semibold text-slate-700">
                          Recent products
                        </span>
                        <span className="text-[4px] text-orange-600">
                          View all
                        </span>
                      </div>
                      <div className="grid grid-cols-[1fr_0.7fr_0.45fr] gap-1 border-b border-slate-100 bg-slate-50 px-1.5 py-1 text-[4px] font-medium text-slate-400">
                        <span>PRODUCT</span>
                        <span>CATEGORY</span>
                        <span>STOCK</span>
                      </div>
                      {[
                        ["Wireless keyboard", "Electronics", "In stock"],
                        ["Office chair", "Furniture", "In stock"],
                        ["USB-C adapter", "Accessories", "Low stock"],
                      ].map(([name, category, stock], index) => (
                        <div
                          key={name}
                          className="grid grid-cols-[1fr_0.7fr_0.45fr] items-center gap-1 border-b border-slate-100 px-1.5 py-1 last:border-0"
                        >
                          <span className="flex min-w-0 items-center gap-1 truncate text-[4px] text-slate-700 sm:text-[5px]">
                            <span
                              className={`flex size-3 shrink-0 items-center justify-center rounded-sm ${index === 0 ? "bg-orange-100 text-orange-600" : index === 1 ? "bg-blue-100 text-blue-600" : "bg-violet-100 text-violet-600"}`}
                            >
                              <Package className="size-2" />
                            </span>
                            {name}
                          </span>
                          <span className="truncate text-[4px] text-slate-400 sm:text-[5px]">
                            {category}
                          </span>
                          <span
                            className={`text-[4px] font-medium sm:text-[5px] ${stock === "In stock" ? "text-emerald-600" : "text-amber-600"}`}
                          >
                            {stock}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <span className="absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-zinc-400/70" />
            </div>
            <div className="absolute bottom-1 left-1/2 h-7 w-[18%] -translate-x-1/2 bg-gradient-to-b from-zinc-500 via-zinc-600 to-zinc-700 [clip-path:polygon(35%_0,65%_0,82%_100%,18%_100%)]" />
            <div className="absolute bottom-0 left-1/2 h-1.5 w-[34%] -translate-x-1/2 rounded-full border border-zinc-500/80 bg-gradient-to-b from-zinc-500 to-zinc-700 shadow-[0_3px_6px_rgba(0,0,0,0.4)]" />
          </div>
        </>
      ) : project.coverImage ? (
        project.mobileCover ? (
          <div className="absolute inset-y-2 left-1/2 aspect-[9/19.5] -translate-x-1/2 rounded-[1.6rem] border-[5px] border-zinc-700 bg-gradient-to-br from-zinc-500 via-zinc-900 to-black p-[3px] shadow-[0_12px_28px_rgba(0,0,0,0.55)]">
            <span className="absolute -left-[7px] top-[24%] h-7 w-[3px] rounded-l-sm bg-zinc-600" />
            <span className="absolute -left-[7px] top-[38%] h-10 w-[3px] rounded-l-sm bg-zinc-600" />
            <span className="absolute -right-[7px] top-[31%] h-12 w-[3px] rounded-r-sm bg-zinc-500" />
            <div className="relative h-full w-full overflow-hidden rounded-[1.25rem] bg-zinc-950">
              <Image
                src={project.coverImage}
                alt=""
                fill
                sizes="(max-width: 640px) 100px, 130px"
                className="object-cover"
              />
              <div className="absolute left-1/2 top-1.5 z-10 flex h-[13px] w-[42%] -translate-x-1/2 items-center justify-end gap-1 rounded-full bg-black px-1.5 shadow-sm">
                <span className="h-1 w-3 rounded-full bg-zinc-800" />
                <span className="size-1.5 rounded-full bg-slate-900 ring-1 ring-slate-700/80" />
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-x-3 top-2 bottom-1">
            <div className="absolute inset-x-0 top-0 bottom-7 rounded-[1.1rem] border border-zinc-500/80 bg-gradient-to-br from-zinc-500 via-zinc-800 to-zinc-600 p-[5px] shadow-[0_12px_24px_rgba(0,0,0,0.55)]">
              <div className="relative h-full w-full overflow-hidden rounded-[0.8rem] border border-black/80 bg-zinc-950">
                <Image
                  src={project.coverImage}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover object-top"
                />
              </div>
              <span className="absolute bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-zinc-400/70" />
            </div>
            <div className="absolute bottom-1 left-1/2 h-7 w-[18%] -translate-x-1/2 bg-gradient-to-b from-zinc-500 via-zinc-600 to-zinc-700 [clip-path:polygon(35%_0,65%_0,82%_100%,18%_100%)]" />
            <div className="absolute bottom-0 left-1/2 h-1.5 w-[34%] -translate-x-1/2 rounded-full border border-zinc-500/80 bg-gradient-to-b from-zinc-500 to-zinc-700 shadow-[0_3px_6px_rgba(0,0,0,0.4)]" />
          </div>
        )
      ) : (
        <div className="absolute inset-3 overflow-hidden rounded-lg border border-white/20 bg-zinc-950/90 p-2.5 shadow-xl">
          <div className="flex h-full flex-col overflow-hidden rounded-md border border-white/10 bg-zinc-900/90">
            <div className="flex h-4 shrink-0 items-center gap-1 border-b border-white/10 px-2">
              <span className="size-1 rounded-full bg-rose-400/80" />
              <span className="size-1 rounded-full bg-amber-300/80" />
              <span className="size-1 rounded-full bg-emerald-400/80" />
              <span className="ml-2 h-1 w-1/3 rounded-full bg-white/10" />
            </div>
            <div className="grid min-h-0 flex-1 grid-cols-[22%_1fr] gap-2 p-2">
              <div className="space-y-1.5 border-r border-white/10 pr-1.5">
                <div className="h-1.5 w-full rounded-full bg-violet-400/70" />
                <div className="h-1 w-4/5 rounded-full bg-white/20" />
                <div className="h-1 w-3/4 rounded-full bg-white/15" />
                <div className="h-1 w-5/6 rounded-full bg-white/15" />
              </div>
              <div className="flex min-w-0 flex-col gap-2">
                <div className="h-2 w-2/5 rounded-full bg-white/40" />
                <div className="grid flex-1 grid-cols-3 gap-1">
                  <div className="rounded bg-violet-400/20" />
                  <div className="rounded bg-sky-400/20" />
                  <div className="rounded bg-emerald-400/20" />
                </div>
                <div className="space-y-1">
                  <div className="h-1 rounded-full bg-white/15" />
                  <div className="h-1 w-4/5 rounded-full bg-white/15" />
                  <div className="h-1 w-3/5 rounded-full bg-white/15" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  );
}

const GridCard = memo(function GridCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (project: Project) => void;
}) {
  const [showAllTech, setShowAllTech] = useState(false);
  const tagParts = project.tagline.split(" · ");
  return (
    <article
      data-project-card
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[0_6px_18px_rgba(124,58,237,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/60 hover:shadow-[0_18px_40px_rgba(124,58,237,0.22),0_0_28px_rgba(167,139,250,0.16)]"
    >
      <button
        type="button"
        onClick={() => onSelect(project)}
        aria-label={`View ${project.title} project details`}
        className="absolute inset-0 z-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500"
      />
      <div className="pointer-events-none relative z-10 flex flex-1 flex-col p-2.5">
        <div className="relative">
          <ProjectArtwork project={project} />
          <span className="absolute left-2 top-2 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm backdrop-blur-md">
            {tagParts.join(" · ")}
          </span>
        </div>
        <div className="flex flex-1 flex-col px-1.5 pb-1 pt-3">
          <h3 className="text-base font-bold leading-snug text-foreground">
            {project.title}
          </h3>
          <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
            {project.tech
              .slice(0, showAllTech ? undefined : 4)
              .map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-violet-500/15 bg-violet-500/[0.08] px-2 py-1 text-[10px] font-medium text-violet-600 dark:text-violet-300"
              >
                {technology}
              </span>
              ))}
            {project.tech.length > 4 && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setShowAllTech((showAll) => !showAll);
                }}
                aria-expanded={showAllTech}
                aria-label={
                  showAllTech
                    ? "Show fewer technologies"
                    : `Show ${project.tech.length - 4} more technologies`
                }
                className="pointer-events-auto rounded-full border border-border bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground transition-colors hover:border-violet-500/40 hover:text-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              >
                {showAllTech ? "Show less" : `+${project.tech.length - 4}`}
              </button>
            )}
          </div>
          <div className="pointer-events-auto mt-3 border-t border-border/70 pt-3">
            <ActionButtons project={project} />
          </div>
        </div>
      </div>
    </article>
  );
});

/* ─── LIST row ────────────────────────────────────────────────── */
const ListRow = memo(function ListRow({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (project: Project) => void;
}) {
  return (
    <button
      type="button"
      data-project-card
      onClick={() => onSelect(project)}
      className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left transition-all hover:border-violet-500/60 hover:bg-violet-500/10 hover:shadow-[0_12px_30px_rgba(124,58,237,0.18),0_0_22px_rgba(167,139,250,0.12)]"
    >
      {/* Left: swatch + info */}
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div
          className={`shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br ${project.gradient} mt-0.5`}
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-sm font-bold text-foreground truncate">
              {project.title}
            </span>
            <span className="text-[11px] text-violet-500 font-medium whitespace-nowrap">
              {project.tagline}
            </span>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5 hidden sm:block">
            {project.description}
          </p>
          {/* Tech tags — only on lg */}
          <div className="hidden lg:flex gap-1 flex-wrap mt-1">
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[10px] font-medium text-violet-500 bg-violet-500/10 rounded-full px-2 py-0.5"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Right: action buttons */}
      <div className="flex flex-wrap gap-1.5 shrink-0 ml-12 sm:ml-0">
        <ActionButtons project={project} />
      </div>
    </button>
  );
});

/* ─── CAROUSEL card — tall portrait, text overlay ─────────── */
const CarouselCard = memo(function CarouselCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (project: Project) => void;
}) {
  const tagParts = project.tagline.split(" · ");
  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      className="relative flex flex-col rounded-3xl overflow-hidden cursor-pointer group transition-transform duration-300 hover:scale-[1.02]"
      style={{ height: "480px" }}
    >
      {/* Full-bleed gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
      />
      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      {/* Text content at bottom */}
      <div className="relative z-10 mt-auto p-6 flex flex-col gap-1.5">
        <span className="text-xs font-semibold text-white/60 tracking-wide">
          {tagParts[tagParts.length - 1]}
        </span>
        <h3 className="text-2xl font-extrabold text-white leading-tight">
          {project.title}
        </h3>
        <p className="text-sm text-white/70 line-clamp-2 mt-0.5">
          {project.description}
        </p>
        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 mt-3">
          {project.projectHref ? (
            <Link
              href={project.projectHref}
              onClick={(event) => event.stopPropagation()}
              className="flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-medium text-white hover:bg-white/30 transition-colors"
            >
              Open project <ArrowRight className="size-3" />
            </Link>
          ) : project.demo && project.demo !== "#" ? (
            <Link
              href={project.demo}
              onClick={(event) => event.stopPropagation()}
              className="flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-medium text-white hover:bg-white/30 transition-colors"
            >
              <Play className="size-3" /> Video demo
            </Link>
          ) : null}
          {!project.projectHref && project.artifacts && (
            <Link
              href={project.artifacts}
              onClick={(event) => event.stopPropagation()}
              className="flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-medium text-white hover:bg-white/30 transition-colors"
            >
              <ImageIcon className="size-3" /> Artifacts
            </Link>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => event.stopPropagation()}
              className="flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-medium text-white hover:bg-white/30 transition-colors"
            >
              <GitBranch className="size-3" /> GitHub
            </a>
          )}
        </div>
      </div>
    </button>
  );
});
const TileCard = memo(function TileCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (project: Project) => void;
}) {
  return (
    <button
      type="button"
      data-project-card
      onClick={() => onSelect(project)}
      className="flex flex-col rounded-xl border border-border bg-card overflow-hidden text-left transition-all hover:border-violet-500/60 hover:shadow-[0_12px_30px_rgba(124,58,237,0.18),0_0_22px_rgba(167,139,250,0.12)] hover:-translate-y-0.5"
    >
      <div className={`w-full h-20 bg-gradient-to-br ${project.gradient}`} />
      <div className="p-3 flex flex-col gap-1.5">
        <span className="text-[10px] font-semibold text-violet-500">
          {project.tagline}
        </span>
        <h3 className="text-sm font-bold text-foreground leading-snug">
          {project.title}
        </h3>
        <p className="text-[11px] text-muted-foreground line-clamp-2">
          {project.description}
        </p>
        <div className="pt-1">
          <ActionButtons project={project} />
        </div>
      </div>
    </button>
  );
});

/* ─── Page ────────────────────────────────────────────────────── */
export default function ProjectsPage() {
  const [active, setActive] = useState<Category>("All work");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [listPage, setListPage] = useState(1);
  const [view, setView] = useState<ViewMode>(() => {
    if (typeof window !== "undefined") {
      return (sessionStorage.getItem("projects-view") as ViewMode) || "grid";
    }
    return "grid";
  });
  const carouselRef = useRef<HTMLDivElement | null>(null);

  function changeView(v: ViewMode) {
    setView(v);
    sessionStorage.setItem("projects-view", v);
  }

  function scrollPrev() {
    const el = carouselRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.8);
    el.scrollBy({ left: -amount, behavior: "smooth" });
  }

  function scrollNext() {
    const el = carouselRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.8);
    el.scrollBy({ left: amount, behavior: "smooth" });
  }

  const filtered =
    active === "All work"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === active);
  const listPageSize = 4;
  const listPageCount = Math.max(1, Math.ceil(filtered.length / listPageSize));
  const visibleListProjects = filtered.slice(
    (listPage - 1) * listPageSize,
    listPage * listPageSize,
  );

  useEffect(() => {
    if (!selectedProject) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProject]);

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>("[data-project-card]");
    if (!cards.length) return;

    const animation = animate(cards, {
      opacity: [0, 1],
      translateY: [18, 0],
      delay: stagger(70),
      duration: 520,
      ease: "outCubic",
    });

    return () => {
      animation.cancel();
    };
  }, [active, view]);

  return (
    <>
      <ProjectStructuredData
        projects={PROJECTS.map((project) => ({
          name: project.title,
          description: project.description,
          url:
            project.projectHref ||
            (project.demo && project.demo !== "#"
              ? project.demo
              : project.artifacts || "/projects"),
          category: project.category,
          tech: project.tech,
        }))}
      />
      <div className="min-h-screen bg-background text-foreground">
        <div className="w-full px-5 sm:px-8 lg:px-12 pt-6 pb-16">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
          >
            <ArrowLeft className="size-4" /> Back to Home
          </Link>

          <div className="mt-5">
            <p className="text-sm font-medium text-violet-500 tracking-wide">
              Selected work · 2023—2026
            </p>
            <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              <TypewriterText text="Projects built for clarity, scale and impact." />
            </h1>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              A focused collection of web platforms, mobile tools and backend
              systems designed to solve real-world problems.
            </p>
          </div>

          {/* Filter tabs + view toggle */}
          <FadeInOnScroll delay={100}>
            <div className="mt-6 flex items-center justify-between gap-3 flex-wrap">
              {/* Project category filters */}
              <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-border bg-muted/60 p-1 scrollbar-none">
                {CATEGORIES.map((cat) => {
                  const isActive = active === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setActive(cat);
                        setListPage(1);
                      }}
                      aria-pressed={isActive}
                      className={`whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                        isActive
                          ? "bg-violet-600 text-white shadow-sm"
                          : "text-muted-foreground hover:bg-background hover:text-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* View toggle */}
              <div className="flex shrink-0 items-center gap-1 overflow-x-auto rounded-full border border-border bg-muted/60 p-1 scrollbar-none">
                {(["grid", "tiles", "carousel", "list"] as const).map((v) => {
                    const labels: Record<string, string> = {
                      grid: "Grid",
                      tiles: "Tiles",
                      carousel: "Carousel",
                      list: "List",
                    };
                    const icons: Record<string, React.ReactNode> = {
                      grid: <LayoutGrid className="size-3" />,
                      tiles: <LayoutDashboard className="size-3" />,
                      carousel: <GalleryHorizontal className="size-3" />,
                      list: <List className="size-3" />,
                    };
                    const isActive = view === v;
                    return (
                      <button
                        key={v}
                        type="button"
                        onClick={() => changeView(v)}
                        aria-pressed={isActive}
                        className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                          isActive
                            ? "bg-violet-600 text-white shadow-sm"
                            : "text-muted-foreground hover:bg-background hover:text-foreground"
                        }`}
                      >
                        {icons[v]}
                        {labels[v]}
                      </button>
                    );
                  })}
              </div>
            </div>
          </FadeInOnScroll>

          {/* Projects */}
          <FadeInOnScroll delay={200}>
            {view === "grid" && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => (
                  <GridCard
                    key={p.title}
                    project={p}
                    onSelect={setSelectedProject}
                  />
                ))}
              </div>
            )}
            {view === "list" && (
              <div className="mt-6">
                <div className="flex flex-col gap-2">
                  {visibleListProjects.map((p) => (
                    <ListRow
                      key={p.title}
                      project={p}
                      onSelect={setSelectedProject}
                    />
                  ))}
                </div>
                {listPageCount > 1 && (
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setListPage((page) => page - 1)}
                      disabled={listPage === 1}
                      aria-label="Previous projects page"
                      className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-violet-500 hover:bg-violet-600 hover:text-white disabled:pointer-events-none disabled:opacity-40"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <span className="text-xs font-medium text-muted-foreground">
                      Page {listPage} of {listPageCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setListPage((page) => page + 1)}
                      disabled={listPage === listPageCount}
                      aria-label="Next projects page"
                      className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-violet-500 hover:bg-violet-600 hover:text-white disabled:pointer-events-none disabled:opacity-40"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
            {view === "tiles" && (
              <div className="mt-6 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {filtered.map((p) => (
                  <TileCard
                    key={p.title}
                    project={p}
                    onSelect={setSelectedProject}
                  />
                ))}
              </div>
            )}
            {view === "carousel" && (
              <div className="mt-6">
                <div className="relative">
                  <div
                    ref={carouselRef}
                    className="-mx-4 px-4 overflow-x-auto scrollbar-none flex gap-4 snap-x snap-mandatory pb-16"
                  >
                    {filtered.map((p) => (
                      <div
                        data-project-card
                        key={p.title}
                        className="shrink-0 snap-center w-[78%] sm:w-[48%] lg:w-[30%]"
                      >
                        <CarouselCard
                          project={p}
                          onSelect={setSelectedProject}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-1 pointer-events-none">
                    <button
                      onClick={scrollPrev}
                      aria-label="Previous"
                      className="pointer-events-auto flex items-center justify-center size-10 rounded-full bg-card/90 border border-border shadow-md text-foreground backdrop-blur hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all"
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <button
                      onClick={scrollNext}
                      aria-label="Next"
                      className="pointer-events-auto flex items-center justify-center size-10 rounded-full bg-card/90 border border-border shadow-md text-foreground backdrop-blur hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all"
                    >
                      <ChevronRight className="size-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </FadeInOnScroll>
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 p-4 backdrop-blur-md sm:p-8">
          <button
            type="button"
            onClick={() => setSelectedProject(null)}
            className="absolute inset-0 cursor-default"
            aria-label="Close project details"
          />
          <div className="relative z-10 max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-violet-500/50 bg-card shadow-[0_0_80px_rgba(124,58,237,0.3)]">
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full border border-border bg-background/80 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Close project details"
            >
              <X className="size-4" />
            </button>

            <div
              className={`h-36 bg-gradient-to-br sm:h-52 ${selectedProject.gradient}`}
            />
            <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.3fr_0.7fr]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-500">
                  {selectedProject.category}
                </p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-5xl">
                  {selectedProject.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {selectedProject.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedProject.tech.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-500"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
                <div className="mt-7">
                  <ActionButtons project={selectedProject} />
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-background/60 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  Project focus
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  Explore the project demo, artifacts, and implementation
                  details.
                </p>
                <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-4/5 rounded-full bg-violet-500" />
                </div>
                <p className="mt-2 text-right text-[10px] font-semibold text-muted-foreground">
                  Selected project
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
