"use client";

import { ReactNode } from "react";

type PanelSectionProps = {
  title: string;
  children: ReactNode;
};

export default function PanelSection({
  title,
  children,
}: PanelSectionProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900 p-4 shadow-lg">
      <h2 className="mb-4 text-lg font-semibold text-white">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}