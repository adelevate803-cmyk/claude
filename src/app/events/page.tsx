import type { Metadata } from "next";
import Link from "next/link";
import { PACKAGES, HOW_IT_WORKS, VENUES_SERVED, UPCOMING_EVENTS } from "@/lib/content";
import PackageCard from "@/components/events/PackageCard";
import FAQ from "@/components/events/FAQ";
import SectionLabel from "@/components/ui/SectionLabel";
import GoldDivider from "@/components/ui/GoldDivider";

export const metadata: Metadata = {
  title: "Events & Weddings",
  description:
    "Halal dessert sushi cart hire for weddings, walimas, nikahs, mehndis and private events across Scotland. Packages, how it works, and upcoming public dates.",
};

export default function EventsPage() {
  return (
    <div className="pt-32">
      <section className="section-pad pt-12 sm:pt-12">
        <div className="mx-auto max-w-content text-center">
          <SectionLabel>Events &amp; Weddings</SectionLabel>
          <h1 className="text-5xl sm:text-6xl">Made for your biggest days</h1>
          <p className="mx-auto mt-6 max-w-xl text-cream/70">
            Weddings, walimas, nikahs, mehndis, birthdays, Eid and corporate events — we bring
            the cart, you bring the guests.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-content gap-8 md:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <PackageCard key={pkg.name} pkg={pkg} />
          ))}
        </div>
      </section>

      <section className="section-pad bg-oxblood/30">
        <div className="mx-auto max-w-content">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="text-center text-4xl sm:text-5xl">Three steps to booked</h2>
          <GoldDivider className="my-12" />
          <div className="grid gap-10 sm:grid-cols-3">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="text-center">
                <p className="font-display text-5xl text-gold-soft/60">{step.step}</p>
                <h3 className="mt-4 text-2xl">{step.title}</h3>
                <p className="mt-2 text-sm text-cream/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid max-w-content gap-16 lg:grid-cols-2">
          <div>
            <SectionLabel>Venues served</SectionLabel>
            <h2 className="text-3xl sm:text-4xl">Across Scotland</h2>
            <ul className="mt-6 space-y-3 text-cream/70">
              {VENUES_SERVED.map((venue) => (
                <li key={venue} className="flex gap-2">
                  <span className="text-gold-soft" aria-hidden>
                    ◆
                  </span>
                  {venue}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionLabel>Upcoming public events</SectionLabel>
            <h2 className="text-3xl sm:text-4xl">Find us in the wild</h2>
            <ul className="mt-6 space-y-4">
              {UPCOMING_EVENTS.map((event) => (
                <li
                  key={event.name}
                  className="rounded-xl border border-gold-soft/20 bg-oxblood/40 p-5"
                >
                  <p className="font-display text-xl text-gold-champagne">{event.name}</p>
                  <p className="mt-1 text-sm text-cream/70">
                    {event.date} · {event.location}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-pad bg-oxblood/30">
        <SectionLabel>FAQ</SectionLabel>
        <h2 className="mb-8 text-center text-4xl sm:text-5xl">Good to know</h2>
        <FAQ />
      </section>

      <section className="section-pad text-center">
        <h2 className="text-4xl sm:text-5xl">Ready to book the cart?</h2>
        <Link href="/book" className="btn-gold mt-8 inline-flex">
          Tell us about your day
        </Link>
      </section>
    </div>
  );
}
