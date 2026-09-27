import { SectionHeader } from "@/components/SectionHeader";
import { entryFlow, liveTrip, onboarding, jobs } from "@/lib/content";
import { JobCard } from "@/components/JobCard";

export function EntrySection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeader
        index="1"
        title="Enter once. Stay connected throughout the trip."
        subtitle="The entry experience connects planning directly to a live, persistent trip."
      />

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        {/* Entry flow */}
        <div className="space-y-3">
          {entryFlow.map((step, i) => (
            <div key={step.step} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-xs font-bold text-white">
                  {i + 1}
                </span>
                {i < entryFlow.length - 1 && <span className="mt-1 h-full w-px flex-1 bg-black/10" />}
              </div>
              <div className="pb-5">
                <p className="text-sm font-bold text-[var(--color-ink)]">{step.step}</p>
                {step.quote && (
                  <p className="mt-1 rounded-lg bg-black/[0.03] px-3 py-2 text-sm italic text-[var(--color-slate)]">
                    &ldquo;{step.quote}&rdquo;
                  </p>
                )}
                <p className="mt-1 text-xs text-[var(--color-slate)]">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Live trip card */}
        <div className="rounded-2xl border border-black/5 bg-[var(--color-surface)] p-5 shadow-[var(--shadow-md)]">
          <p className="text-[11px] font-bold uppercase tracking-wide text-[var(--color-accent)]">Your trip is live</p>
          <h3 className="mt-1 text-lg font-black text-[var(--color-ink)]">{liveTrip.title}</h3>
          <ul className="mt-3 space-y-1.5">
            {liveTrip.items.map((item) => (
              <li key={item.label} className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-ink)]">{item.label}</span>
                <span className={item.done ? "font-bold text-[var(--color-stage-3)]" : "text-[var(--color-slate)]"}>
                  {item.done ? "✓" : "—"}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-xl bg-[var(--color-accent)] px-4 py-3 text-center text-sm font-bold text-white">
            Turn on Myra Autopilot for this trip?
          </div>
        </div>
      </div>

      {/* Progressive onboarding */}
      <div className="mt-8 grid gap-4 rounded-2xl border border-black/5 bg-black/[0.02] p-5 sm:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-slate)]">MMT already knows</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {onboarding.known.map((k) => (
              <span key={k} className="rounded-full bg-[var(--color-surface)] px-2.5 py-1 text-xs font-medium shadow-sm">
                {k}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-slate)]">Myra learns what&apos;s missing</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {onboarding.learned.map((k) => (
              <span
                key={k}
                className="rounded-full bg-[var(--color-accent)]/10 px-2.5 py-1 text-xs font-medium text-[var(--color-accent)]"
              >
                {k}
              </span>
            ))}
          </div>
        </div>
        <p className="sm:col-span-2 text-sm font-semibold text-[var(--color-ink)]">{onboarding.line}</p>
      </div>

      {/* Four customer jobs */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}
