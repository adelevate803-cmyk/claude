"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EVENT_TYPES, BUDGET_RANGES, ROLL_OPTIONS, enquirySchema } from "@/lib/validation";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const initialState = {
  name: "",
  email: "",
  phone: "",
  eventType: "",
  date: "",
  venue: "",
  guestCount: "",
  rollsWanted: [] as string[],
  budgetRange: "",
  notes: "",
  company: "", // honeypot
};

export default function EnquiryForm() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  const setField = <K extends keyof typeof values>(key: K, value: (typeof values)[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const toggleRoll = (roll: string) => {
    setValues((prev) => ({
      ...prev,
      rollsWanted: prev.rollsWanted.includes(roll)
        ? prev.rollsWanted.filter((r) => r !== roll)
        : [...prev.rollsWanted, roll],
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrors({});

    const parsed = enquirySchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const flat: Record<string, string> = {};
      Object.entries(fieldErrors).forEach(([key, messages]) => {
        if (messages?.[0]) flat[key] = messages[0];
      });
      setErrors(flat);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
        className="rounded-2xl border border-gold-champagne/40 bg-oxblood/40 p-10 text-center"
      >
        <p className="label-text mb-4">Enquiry sent</p>
        <h2 className="text-4xl">Thank you.</h2>
        <p className="mt-4 text-cream/75">We&rsquo;ll reply within 24 hours.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Honeypot — hidden from real users, visible to bots */}
      <input
        type="text"
        name="company"
        value={values.company}
        onChange={(e) => setField("company", e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" error={errors.name}>
          <input
            type="text"
            required
            value={values.name}
            onChange={(e) => setField("name", e.target.value)}
            className="input"
            autoComplete="name"
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            required
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            className="input"
            autoComplete="email"
          />
        </Field>
        <Field label="Phone" error={errors.phone}>
          <input
            type="tel"
            required
            value={values.phone}
            onChange={(e) => setField("phone", e.target.value)}
            className="input"
            autoComplete="tel"
          />
        </Field>
        <Field label="Event type" error={errors.eventType}>
          <select
            required
            value={values.eventType}
            onChange={(e) => setField("eventType", e.target.value)}
            className="input"
          >
            <option value="" disabled>
              Choose an event type
            </option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Event date">
          <input
            type="date"
            value={values.date}
            onChange={(e) => setField("date", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Venue / town">
          <input
            type="text"
            value={values.venue}
            onChange={(e) => setField("venue", e.target.value)}
            className="input"
            placeholder="e.g. Enterkine Country House, Ayr"
          />
        </Field>
        <Field label="Guest count">
          <input
            type="text"
            inputMode="numeric"
            value={values.guestCount}
            onChange={(e) => setField("guestCount", e.target.value)}
            className="input"
            placeholder="e.g. 120"
          />
        </Field>
        <Field label="Budget range" error={errors.budgetRange}>
          <select
            value={values.budgetRange}
            onChange={(e) => setField("budgetRange", e.target.value)}
            className="input"
          >
            <option value="">Prefer not to say</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset>
        <legend className="label-text mb-3">Rolls wanted</legend>
        <div className="flex flex-wrap gap-3">
          {ROLL_OPTIONS.map((roll) => {
            const selected = values.rollsWanted.includes(roll);
            return (
              <button
                type="button"
                key={roll}
                onClick={() => toggleRoll(roll)}
                aria-pressed={selected}
                className={cn(
                  "rounded-full border px-5 py-2 font-label text-xs uppercase tracking-label transition-colors duration-300",
                  selected
                    ? "border-gold-champagne bg-gold-champagne text-velvet"
                    : "border-gold-soft/40 text-cream/70 hover:border-gold-champagne hover:text-gold-champagne",
                )}
              >
                {roll}
              </button>
            );
          })}
        </div>
      </fieldset>

      <Field label="Anything else we should know?">
        <textarea
          value={values.notes}
          onChange={(e) => setField("notes", e.target.value)}
          className="input min-h-32 resize-y"
          placeholder="Dietary notes, theme, timings — anything helps."
        />
      </Field>

      {status === "error" && (
        <p className="rounded-lg border border-red-400/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          Something went wrong sending your enquiry. Please try again, or reach us directly via
          WhatsApp or email below.
        </p>
      )}

      {Object.keys(errors).length > 0 && (
        <p className="rounded-lg border border-red-400/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          Please check the highlighted fields above before sending.
        </p>
      )}

      <button type="submit" disabled={status === "submitting"} className="btn-gold w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label-text mb-2 block">{label}</span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1 block text-xs text-red-300"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}
