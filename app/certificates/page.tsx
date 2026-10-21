"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  X,
  LayoutGrid,
  List,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  GalleryHorizontal,
  CalendarDays,
  Award,
  Expand,
} from "lucide-react";
import { FadeInOnScroll } from "@/components/fade-in-on-scroll";
import { ImageWithSkeleton } from "@/components/skeleton";
import { animate, stagger } from "animejs";

function TypewriterText({
  text,
  speed = 50,
}: Readonly<{
  text: string;
  speed?: number;
}>) {
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

type ViewMode = "grid" | "list" | "tiles" | "carousel";

interface Cert {
  title: string;
  issuer: string;
  category: string;
  description: string;
  embed: string;
  gradient: string;
  achieved?: string;
}

const allCerts: Cert[] = [
  {
    title: "Python",
    issuer: "Programming Hub",
    category: "Programming",
    description:
      "Credential validating core Python programming concepts and practical development skills.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1784812968/python_cert_koi3p2.png",
    gradient: "from-blue-800 via-blue-700 to-indigo-900",
  },
  {
    title: "JavaScript Developer",
    issuer: "Programming Hub",
    category: "Programming",
    description:
      "Credential demonstrating modern JavaScript patterns, application architecture and best practices.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1784804810/javascript_cert_cswyzj.png",
    gradient: "from-yellow-700 via-amber-600 to-orange-800",
     achieved: "September 27, 2023",
  },
  {
    title: "Dart",
    issuer: "Programming Hub",
    category: "Programming",
    description:
      "Credential validating Dart programming concepts and practical development skills.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1784813291/dart_cert_d6rilt.png",
    gradient: "from-cyan-700 via-teal-600 to-blue-900",
    achieved: "September 6, 2025",
  },
  {
    title: "Java Certificate",
    issuer: "Programming Hub",
    category: "Programming",
    description:
      "Verified Java programming certificate issued by Programming Hub.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1784804534/java_cert_lhbtzk.png",
    gradient: "from-red-800 via-rose-700 to-orange-900",
    achieved: "June 14, 2024",
  },
  {
    title: "TypeScript",
    issuer: "Programming Hub",
    category: "Programming",
    description:
      "Credential validating TypeScript development skills and typed JavaScript patterns.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1786567138/typescript_x9kn53.jpg",
    gradient: "from-blue-700 via-sky-600 to-indigo-800",
  },
  {
    title: "Spring Boot",
    issuer: "Programming Hub",
    category: "Framework",
    description:
      "Credential demonstrating Spring Boot backend development and REST API design.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1786621461/spring_hjnllb.jpg",
    gradient: "from-green-800 via-emerald-700 to-green-900",
  },
  {
    title: "React",
    issuer: "Programming Hub",
    category: "Framework",
    description:
      "Credential demonstrating React component architecture and modern frontend patterns.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1786567122/reat_vwgdna.jpg",
    gradient: "from-sky-600 via-cyan-500 to-blue-800",
  },
  {
    title: "Next.js",
    issuer: "Programming Hub",
    category: "Framework",
    description:
      "Credential validating Next.js full-stack development and server-side rendering skills.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1786567122/nextjs_xyas9v.jpg",
    gradient: "from-zinc-700 via-zinc-600 to-zinc-900",
  },
  {
    title: "Flutter",
    issuer: "Programming Hub",
    category: "Framework",
    description:
      "Credential demonstrating cross-platform mobile app development with Flutter and Dart.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1786622074/flutter_httcwn.png",
    gradient: "from-blue-600 via-indigo-500 to-violet-800",
  },
  {
    title: "PyTorch",
    issuer: "Programming Hub",
    category: "Machine Learning",
    description:
      "Credential validating machine learning model development skills using PyTorch.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1786567450/machine_learning_km7s6e.png",
    gradient: "from-orange-700 via-red-600 to-rose-900",
  },
  {
    title: "DevOps Certification",
    issuer: "Programming Hub",
    category: "CI/CD",
    description:
      "Credential demonstrating system design principles, architecture patterns, and scalability practices.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1786621461/devops_qzj9xy.jpg",
    gradient: "from-purple-800 via-purple-700 to-indigo-900",
  },
  {
    title: "Web Development",
    issuer: "Programming Hub",
    category: "System Design",
    description:
      "Credential demonstrating advanced web development practices, modern frameworks, and best practices.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1786621461/web_dev_ymn5ue.jpg",
    gradient: "from-emerald-700 via-teal-600 to-cyan-800",
  },
  {
    title: "Agile Project Management",
    issuer: "Programming Hub",
    category: "System Design",
    description:
      "Credential demonstrating agile methodologies, project planning, and team collaboration practices.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1786621461/agile_project_management_c2ohec.jpg",
    gradient: "from-blue-700 via-indigo-600 to-purple-800",
  },
  {
    title: "Cybersecurity",
    issuer: "Programming Hub",
    category: "Security",
    description:
      "Credential demonstrating security best practices, threat assessment, and cybersecurity principles.",
    embed:
      "https://res.cloudinary.com/virfpzu4/image/upload/w_1200,q_auto,f_auto/v1786622806/cybersecurity_gtexg0.png",
    gradient: "from-red-800 via-red-700 to-orange-900",
  },
];

const CATEGORIES = [
  "All",
  "Programming",
  "Framework",
  "Machine Learning",
  "System Design",
  "CI/CD",
  "Security",
];

/* ─── Cert icon ────────────────────────────────────────────────── */
function CertIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="size-8 text-white/20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

/* ─── GRID card ────────────────────────────────────────────────── */
function GridCard({
  cert,
  onView,
}: Readonly<{
  cert: Cert;
  onView: (cert: Cert) => void;
}>) {
  return (
    <div
      data-certificate-surface
      onClick={() => onView(cert)}
      className="group relative flex flex-col rounded-2xl border border-border/80 bg-card/70 backdrop-blur-md overflow-hidden transition-all duration-300 shadow-[0_6px_18px_rgba(124,58,237,0.08)] hover:border-violet-500/60 hover:shadow-[0_18px_40px_rgba(124,58,237,0.22),0_0_28px_rgba(167,139,250,0.16)] hover:-translate-y-1"
    >
      <div className="p-3 pb-0">
        <div
          className={`w-full aspect-[16/9] rounded-xl bg-gradient-to-br ${cert.gradient} flex items-center justify-center`}
        >
          <CertIcon />
        </div>
      </div>
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="text-xs font-medium text-violet-500">
          {cert.issuer} · {cert.category}
        </div>
        <h3 className="text-lg font-bold text-foreground leading-snug">
          {cert.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {cert.description}
        </p>
        <div className="mt-auto pt-3">
          <button
            type="button"
            onClick={() => onView(cert)}
            className="flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-muted px-4 py-1.5 text-xs font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-500 hover:shadow-[0_6px_16px_rgba(124,58,237,0.2)] active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none"
          >
            View certificate
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── LIST row ─────────────────────────────────────────────────── */
function ListRow({
  cert,
  onView,
}: Readonly<{
  cert: Cert;
  onView: (cert: Cert) => void;
}>) {
  return (
    <div
      data-certificate-surface
      onClick={() => onView(cert)}
      className="flex items-center gap-4 rounded-xl border border-border/80 bg-card/70 backdrop-blur-md px-4 py-3 transition-all shadow-[0_4px_14px_rgba(124,58,237,0.06)] hover:border-violet-500/60 hover:bg-violet-500/10 hover:shadow-[0_12px_30px_rgba(124,58,237,0.18),0_0_22px_rgba(167,139,250,0.12)]"
    >
      <div
        className={`shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${cert.gradient} flex items-center justify-center`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-4 text-white/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-bold text-foreground">
            {cert.title}
          </span>
          <span className="text-[11px] text-violet-500 font-medium">
            {cert.issuer} · {cert.category}
          </span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
          {cert.description}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onView(cert)}
        className="shrink-0 flex cursor-pointer items-center gap-1 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.03] hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-500 hover:shadow-[0_6px_16px_rgba(124,58,237,0.2)] active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none"
      >
        View
      </button>
    </div>
  );
}

/* ─── TILE compact card ────────────────────────────────────────── */
function TileCard({
  cert,
  onView,
}: Readonly<{
  cert: Cert;
  onView: (cert: Cert) => void;
}>) {
  return (
    <button
      type="button"
      data-certificate-surface
      onClick={() => onView(cert)}
      className="flex flex-col rounded-xl border border-border/80 bg-card/70 backdrop-blur-md overflow-hidden transition-all shadow-[0_4px_14px_rgba(124,58,237,0.06)] hover:border-violet-500/60 hover:shadow-[0_12px_30px_rgba(124,58,237,0.18),0_0_22px_rgba(167,139,250,0.12)] hover:-translate-y-1"
    >
      <div
        className={`w-full h-16 bg-gradient-to-br ${cert.gradient} flex items-center justify-center`}
      >
        <CertIcon />
      </div>
      <div className="p-3 flex flex-col gap-1">
        <span className="text-[10px] font-semibold text-violet-500">
          {cert.category}
        </span>
        <h3 className="text-sm font-bold text-foreground leading-snug">
          {cert.title}
        </h3>
        <p className="text-[10px] text-muted-foreground">{cert.issuer}</p>
        <span className="mt-1 text-left text-[10px] font-medium text-violet-500 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:underline motion-reduce:transform-none motion-reduce:transition-none">
          View →
        </span>
      </div>
    </button>
  );
}

/* ─── Page ─────────────────────────────────────────────────────── */
export default function CertificatesPage() {
  const [selected, setSelected] = useState<Cert | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [view, setView] = useState<ViewMode>("grid");
  const [activeCategory, setActiveCategory] = useState("All");
  const [listPage, setListPage] = useState(1);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  function openCertificate(cert: Cert) {
    setLightboxOpen(false);
    setSelected(cert);
  }

  function closeCertificate() {
    setLightboxOpen(false);
    setSelected(null);
  }

  useEffect(() => {
    document.body.classList.toggle("modal-open", selected !== null);
    return () => document.body.classList.remove("modal-open");
  }, [selected]);

  useEffect(() => {
    if (!selected) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (lightboxOpen) setLightboxOpen(false);
        else {
          setLightboxOpen(false);
          setSelected(null);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selected, lightboxOpen]);

  useEffect(() => {
    const surfaces = document.querySelectorAll<HTMLElement>(
      "[data-certificate-surface]",
    );
    if (!surfaces.length) return;

    const animation = animate(surfaces, {
      opacity: [0, 1],
      translateY: [20, 0],
      scale: [0.98, 1],
      delay: stagger(55),
      duration: 650,
      ease: "outCubic",
    });

    return () => {
      animation.cancel();
    };
  }, [view, activeCategory]);

  function scrollPrev() {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({
      left: -Math.round(el.clientWidth * 0.8),
      behavior: "smooth",
    });
  }
  function scrollNext() {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: Math.round(el.clientWidth * 0.8), behavior: "smooth" });
  }

  const filtered =
    activeCategory === "All"
      ? allCerts
      : allCerts.filter((c) => c.category === activeCategory);
  const listPageSize = 6;
  const listPageCount = Math.max(1, Math.ceil(filtered.length / listPageSize));
  const visibleListCertificates = filtered.slice(
    (listPage - 1) * listPageSize,
    listPage * listPageSize,
  );

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
        <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 pt-6 pb-14">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
          >
            <ArrowLeft className="size-4" /> Back to Home
          </Link>

          <div className="mt-5 text-left">
            <p className="text-sm font-semibold tracking-wide text-violet-500">
              Professional development · {allCerts.length} credentials
            </p>
            <h1 className="mt-2 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
              <TypewriterText text="Certificates and credentials." />
            </h1>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              A growing record of focused learning across software engineering,
              cloud platforms and modern development practices.
            </p>
          </div>

          <FadeInOnScroll>
            <div className="mt-6 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-border bg-muted/60 p-1 scrollbar-none">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat);
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
                        onClick={() => setView(v)}
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

          {/* Certs */}
          <FadeInOnScroll>
            {view === "grid" && (
              <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {filtered.map((cert) => (
                  <GridCard key={cert.embed} cert={cert} onView={openCertificate} />
                ))}
              </div>
            )}
            {view === "list" && (
              <div className="mt-6">
                <div className="flex flex-col gap-2">
                  {visibleListCertificates.map((cert) => (
                    <ListRow
                      key={cert.embed}
                      cert={cert}
                      onView={openCertificate}
                    />
                  ))}
                </div>
                {listPageCount > 1 && (
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setListPage((page) => page - 1)}
                      disabled={listPage === 1}
                      aria-label="Previous certificates page"
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
                      aria-label="Next certificates page"
                      className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-violet-500 hover:bg-violet-600 hover:text-white disabled:pointer-events-none disabled:opacity-40"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
            {view === "tiles" && (
              <div className="mt-6 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                {filtered.map((cert) => (
                  <TileCard key={cert.embed} cert={cert} onView={openCertificate} />
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
                    {filtered.map((cert) => (
                      <div
                        data-certificate-surface
                        key={cert.embed}
                        className="shrink-0 snap-center w-[78%] sm:w-[48%] lg:w-[30%]"
                      >
                        {/* Tall portrait carousel card */}
                        <button
                          type="button"
                          className="relative flex w-full flex-col rounded-3xl overflow-hidden text-left cursor-pointer group transition-transform duration-300 hover:scale-[1.02]"
                          style={{ height: "480px" }}
                          onClick={() => openCertificate(cert)}
                        >
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${cert.gradient}`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                          <div className="relative z-10 mt-auto p-6 flex flex-col gap-1.5">
                            <span className="text-xs font-semibold text-white/60 tracking-wide">
                              {cert.category}
                            </span>
                            <h3 className="text-2xl font-extrabold text-white leading-tight">
                              {cert.title}
                            </h3>
                            <p className="text-sm text-white/70 mt-0.5">
                              {cert.issuer}
                            </p>
                            <span className="mt-3 self-start flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 px-3 py-1 text-xs font-medium text-white transition-all duration-200 group-hover:-translate-y-0.5 group-hover:scale-105 group-hover:border-violet-300/60 group-hover:bg-violet-500/30 group-hover:shadow-[0_6px_16px_rgba(124,58,237,0.3)] motion-reduce:transform-none motion-reduce:transition-none">
                              View certificate
                            </span>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-1 pointer-events-none">
                    <button
                      type="button"
                      onClick={scrollPrev}
                      aria-label="Previous"
                      className="pointer-events-auto flex items-center justify-center size-10 rounded-full bg-card/90 border border-border shadow-md text-foreground backdrop-blur hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all"
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <button
                      type="button"
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

      {/* Certificate details drawer */}
      {selected && (
        <dialog
          open
          className="fixed inset-0 z-50 m-0 flex h-full w-full max-w-none items-stretch justify-end overflow-hidden bg-transparent p-0 [&::backdrop]:bg-transparent"
        >
          <button
            type="button"
            aria-label="Close certificate details"
            className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
            onClick={closeCertificate}
          />
          <div className="relative z-10 flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-violet-500/40 bg-background/95 p-5 text-foreground shadow-[-24px_0_80px_rgba(124,58,237,0.2)] backdrop-blur-2xl animate-in slide-in-from-right duration-300 sm:p-7">
            <button
              type="button"
              onClick={closeCertificate}
              className="sticky top-0 z-10 -mr-1 ml-auto flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-background/90 text-muted-foreground backdrop-blur transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Close certificate details"
            >
              <X className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label={`Enlarge ${selected.title} certificate`}
              className="group relative mt-4 block w-full overflow-hidden rounded-2xl border border-border bg-card/50 p-2 text-left shadow-lg"
            >
              <ImageWithSkeleton
                src={selected.embed}
                alt={`${selected.title} certificate`}
                className="w-full rounded-xl object-contain"
                style={{ maxHeight: "34vh" }}
                wrapperClassName="block"
              />
              <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-violet-300/40 bg-violet-700/90 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-violet-950/30 backdrop-blur-md transition-transform group-hover:scale-105">
                <Expand className="size-3.5" />
                Click to enlarge
              </span>
            </button>
            <div className="mt-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-violet-500">
                Certificate details
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
                {selected.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Issued by {selected.issuer}
              </p>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border bg-card/60 p-4">
                <Award className="size-5 text-violet-500" />
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Type
                </p>
                <p className="mt-1 text-sm font-bold">{selected.category}</p>
              </div>
              <div className="rounded-xl border border-border bg-card/60 p-4">
                <CalendarDays className="size-5 text-violet-500" />
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Achieved
                </p>
                <p className="mt-1 text-sm font-bold">
                  {selected.achieved ?? "Date not specified"}
                </p>
              </div>
            </div>
            <div className="mt-7 border-t border-border pt-6">
              <p className="text-sm font-semibold">About this credential</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {selected.description}
              </p>
            </div>
          </div>
        </dialog>
      )}
      {selected && lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.title} certificate image`}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
        >
          <button
            type="button"
            aria-label="Close enlarged certificate"
            onClick={() => setLightboxOpen(false)}
            className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          />
          <div className="relative z-10 flex max-h-full w-full max-w-6xl flex-col items-center gap-3 animate-in zoom-in-95 fade-in duration-200">
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close enlarged certificate"
              className="absolute -right-2 -top-2 z-20 flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-lg transition-colors hover:bg-white/15 sm:-right-4 sm:-top-4"
            >
              <X className="size-5" />
            </button>
            <ImageWithSkeleton
              src={selected.embed}
              alt={`${selected.title} certificate enlarged`}
              className="max-h-[calc(100vh-6rem)] max-w-full rounded-lg object-contain shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
              wrapperClassName="flex max-h-full w-full items-center justify-center"
            />
            <p className="text-sm font-medium text-white/80">{selected.title}</p>
          </div>
        </div>
      )}
    </>
  );
}
