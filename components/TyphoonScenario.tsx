"use client";

import { useState } from "react";
import { typhoonScenario } from "@/lib/content";

export function TyphoonScenario() {
  const [chosen, setChosen] = useState<0 | 1 | null>(null);

  return (
    <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-5 shadow-[var(--shadow-md)] sm:p-6">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-[var(--color-status-critical)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
          Live scenario
        </span>
        <h3 className="text-sm font-black text-[var(--color-ink)]">See the loop run on a real disruption</h3>
      </div>

      <div className="mt-4 grid gap-5 lg:grid-cols-[0.9fr_1.4fr]">
        <div>
          <div className="rounded-xl border border-[var(--color-status-critical)]/25 bg-[var(--color-status-critical-bg)] p-3">
            <p className="text-sm font-bold text-[var(--color-status-critical)]">⚠ {typhoonScenario.trigger}</p>
          </div>
          <p className="mt-3 text-xs font-bold uppercase tracking-wide text-[var(--color-slate)]">Impact graph</p>
          <ul className="mt-1.5 space-y-1 text-sm text-[var(--color-ink)]">
            {typhoonScenario.impact.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="text-[var(--color-status-critical)]">•</span>
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-slate)]">
            Autopilot creates two options — pick one
          </p>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {typhoonScenario.options.map((opt, i) => {
              const selected = chosen === i;
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setChosen(i as 0 | 1)}
                  className="rounded-xl border-2 p-3.5 text-left transition"
                  style={{
                    borderColor: selected ? "var(--color-accent)" : "rgba(0,0,0,0.08)",
                    background: selected ? "color-mix(in srgb, var(--color-accent) 6%, var(--color-surface))" : "var(--color-surface)",
                  }}
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-accent)]">{opt.label}</p>
                  <p className="mt-1 text-sm font-bold text-[var(--color-ink)]">{opt.title}</p>
                  <p className="mt-1 text-xs font-semibold text-[var(--color-slate)]">{opt.cost}</p>
                  <p className="mt-0.5 text-xs text-[var(--color-slate)]">{opt.note}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-4 space-y-1.5">
            {typhoonScenario.resolution.map((step, i) => {
              const active = chosen !== null;
              const isSecond = i === 1;
              return (
                <div
                  key={step}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active ? "bg-[color-mix(in_srgb,var(--color-stage-3)_10%,var(--color-surface))] text-[var(--color-ink)]" : "bg-black/[0.03] text-[var(--color-slate)]"
                  }`}
                >
                  <span>{active ? "✅" : "○"}</span>
                  {step}
                  {isSecond && active && (
                    <span className="ml-auto text-xs font-bold text-[var(--color-stage-3)]">
                      Applied {typhoonScenario.options[chosen].label}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
