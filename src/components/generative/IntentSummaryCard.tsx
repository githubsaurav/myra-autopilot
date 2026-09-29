import { useState } from "react";
import { Check, Pencil, X } from "lucide-react";
import { Card, SectionLabel } from "@/components/Card";

interface IntentLabels {
  title?: string;
  looksRight?: string;
  edit?: string;
  confirmed?: string;
  save?: string;
  cancel?: string;
}

export function IntentSummaryCard({
  facts,
  onLooksRight,
  confirmed,
  labels,
}: {
  facts: { label: string; value: string }[];
  onLooksRight: () => void;
  confirmed: boolean;
  labels?: IntentLabels;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(facts);

  function updateValue(index: number, value: string) {
    setDraft((d) => d.map((f, i) => (i === index ? { ...f, value } : f)));
  }

  function handleCancel() {
    setDraft(facts);
    setEditing(false);
  }

  return (
    <Card>
      <SectionLabel>{labels?.title ?? "Interpreted intent"}</SectionLabel>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
        {draft.map((f, i) => (
          <div key={f.label}>
            <dt className="text-[11px] font-medium text-[var(--color-slate)]">{f.label}</dt>
            {editing ? (
              <input
                value={f.value}
                onChange={(e) => updateValue(i, e.target.value)}
                className="mt-0.5 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-1.5 py-1 text-sm font-semibold text-[var(--color-ink)] outline-none focus:border-[var(--color-navy)]"
              />
            ) : (
              <dd className="text-sm font-semibold text-[var(--color-ink)]">{f.value}</dd>
            )}
          </div>
        ))}
      </dl>

      {confirmed ? (
        <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[var(--color-success)]">
          <Check size={14} /> {labels?.confirmed ?? "Confirmed"}
        </div>
      ) : editing ? (
        <div className="mt-3.5 flex gap-2">
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="flex-1 rounded-lg bg-[var(--color-navy)] py-2 text-xs font-bold text-white"
          >
            {labels?.save ?? "Save changes"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center gap-1 rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs font-semibold text-[var(--color-ink)]"
          >
            <X size={12} /> {labels?.cancel ?? "Cancel"}
          </button>
        </div>
      ) : (
        <div className="mt-3.5 flex gap-2">
          <button
            type="button"
            onClick={onLooksRight}
            className="flex-1 rounded-lg bg-[var(--color-navy)] py-2 text-xs font-bold text-white"
          >
            {labels?.looksRight ?? "Looks right"}
          </button>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="flex items-center gap-1 rounded-lg border border-[var(--color-border)] px-3 py-2 text-xs font-semibold text-[var(--color-ink)]"
          >
            <Pencil size={12} /> {labels?.edit ?? "Edit"}
          </button>
        </div>
      )}
    </Card>
  );
}
