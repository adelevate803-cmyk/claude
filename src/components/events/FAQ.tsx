"use client";

import { useState } from "react";
import { FAQS } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-2xl divide-y divide-gold-soft/20">
      {FAQS.map((faq, index) => {
        const isOpen = index === openIndex;
        return (
          <div key={faq.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 py-6 text-left"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="font-display text-xl text-gold-champagne">{faq.question}</span>
              <span
                className={cn(
                  "shrink-0 font-label text-xl text-gold-soft transition-transform duration-300",
                  isOpen && "rotate-45",
                )}
                aria-hidden
              >
                +
              </span>
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-velvet-in-out",
                isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <p className="overflow-hidden text-cream/70">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
