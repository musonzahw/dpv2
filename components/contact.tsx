"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Send,
  XCircle,
} from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate w-full overflow-hidden bg-background px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_oklch,#8b5cf6_10%,transparent),transparent_60%)]"
      />

      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center gap-4 text-center sm:mb-14">
          <h1
            id="contact-heading"
            className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Let&apos;s build something meaningful.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Have an idea, a project, or a question? Tell me a little about it
            and I&apos;ll get back to you.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl items-stretch gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
          <div className="flex min-h-[30rem] flex-col overflow-hidden rounded-3xl border border-border/70 bg-card/70 p-6 shadow-sm sm:p-8">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Get in touch
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                I&apos;m open to thoughtful collaborations and interesting
                problems. The easiest way to reach me is by email.
              </p>
            </div>

            <div className="mt-6 flex flex-col items-start gap-3">
              <a
                href="mailto:musonzahw@gmail.com"
                className="group flex w-fit items-center gap-3 rounded-2xl border border-border/70 bg-background/70 p-3.5 transition-colors hover:border-violet-500/40 hover:bg-accent/60"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                  <Mail className="size-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-medium text-muted-foreground">
                    Email me
                  </span>
                  <span className="mt-0.5 flex items-center gap-2 text-sm font-semibold text-foreground">
                    musonzahw@gmail.com
                    <ArrowUpRight
                      className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </a>
              <a
                href="tel:+263785800241"
                className="group flex w-fit items-center gap-3 rounded-2xl border border-border/70 bg-background/70 p-3.5 transition-colors hover:border-violet-500/40 hover:bg-accent/60"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500">
                  <Phone className="size-4" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-medium text-muted-foreground">
                    Call me
                  </span>
                  <span className="mt-0.5 flex items-center gap-2 text-sm font-semibold text-foreground">
                    +263 78 580 0241
                    <ArrowUpRight
                      className="size-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </a>
            </div>

            <div className="relative mt-auto flex min-h-64 flex-1 items-center justify-center overflow-hidden pt-8">
              <div
                aria-hidden="true"
                className="absolute size-64 rounded-full border border-violet-500/10"
              />
              <div
                aria-hidden="true"
                className="absolute size-52 rounded-full border border-dashed border-violet-500/15"
              />
              <div
                aria-hidden="true"
                className="relative size-48 overflow-hidden rounded-full border border-violet-500/25 bg-[radial-gradient(circle_at_35%_30%,color-mix(in_oklch,#8b5cf6_16%,var(--background)),var(--background)_68%)] shadow-[0_0_70px_-24px_color-mix(in_oklch,#8b5cf6_45%,transparent)]"
              >
                <div className="contact-globe-rotation absolute inset-0">
                  <span className="absolute inset-y-0 left-1/2 w-1/2 -translate-x-1/2 rounded-[50%] border-x border-violet-500/20" />
                  <span className="absolute inset-y-0 left-1/2 w-3/4 -translate-x-1/2 rounded-[50%] border-x border-violet-500/15" />
                  <span className="absolute inset-y-0 left-1/2 w-full -translate-x-1/2 rounded-[50%] border-x border-violet-500/10" />
                  <span className="absolute inset-x-0 top-1/4 h-1/2 rounded-[50%] border-y border-violet-500/20" />
                  <span className="absolute inset-x-0 top-[38%] h-1/4 rounded-[50%] border-t border-violet-500/15" />
                  <span className="absolute left-[24%] top-[34%] size-2 rounded-full bg-violet-500 shadow-[0_0_14px_#8b5cf6]" />
                  <span className="absolute right-[18%] top-[62%] size-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_#8b5cf6]" />
                </div>
                <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_70%_65%,transparent_40%,color-mix(in_oklch,var(--background)_88%,transparent)_100%)]" />
              </div>
              <span
                aria-hidden="true"
                className="absolute bottom-[27%] left-[17%] size-1.5 rounded-full bg-violet-500/50"
              />
              <div className="absolute bottom-1 flex items-center gap-2 rounded-full border border-border/70 bg-background/85 px-3.5 py-2 text-xs font-medium text-muted-foreground backdrop-blur">
                <MapPin
                  className="size-3.5 text-violet-500"
                  aria-hidden="true"
                />
                Open to remote collaboration
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm sm:p-8">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Send a message
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Share a few details and I&apos;ll be in touch.
              </p>
            </div>

            <div
              aria-hidden="true"
              className="my-6 h-3 w-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--muted-foreground)_45%,transparent)_1px,transparent_1px)] bg-[length:7px_7px] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
            />

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                  >
                    Full name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={120}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-500/20"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                  >
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-500/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="text-xs font-semibold uppercase tracking-widest text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  maxLength={5000}
                  rows={6}
                  placeholder="Tell me about your project, idea, or question..."
                  className="w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-violet-500 focus-visible:ring-2 focus-visible:ring-violet-500/20"
                />
              </div>

              {status === "sent" && (
                <p
                  role="status"
                  className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400"
                >
                  <CheckCircle2
                    className="size-4 shrink-0"
                    aria-hidden="true"
                  />
                  Message sent. Thanks for reaching out!
                </p>
              )}
              {status === "error" && (
                <p
                  role="alert"
                  className="flex items-center gap-2 text-sm font-medium text-destructive"
                >
                  <XCircle className="size-4 shrink-0" aria-hidden="true" />
                  Message could not be sent. Please try again or email me
                  directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <Send className="size-4" aria-hidden="true" />
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
