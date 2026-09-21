import { TESTIMONIALS } from "@/lib/content";
import SectionLabel from "@/components/ui/SectionLabel";
import GoldDivider from "@/components/ui/GoldDivider";

export default function TestimonialStrip() {
  return (
    <section className="section-pad bg-oxblood/30">
      <div className="mx-auto max-w-content">
        <SectionLabel>What people say</SectionLabel>
        <h2 className="text-center text-4xl sm:text-5xl">Loved at weddings across Scotland</h2>
        <GoldDivider className="my-12" />

        <div className="grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.author}
              className="flex h-full flex-col justify-between rounded-2xl border border-gold-soft/20 bg-velvet/60 p-8"
            >
              <blockquote className="font-display text-xl italic leading-relaxed text-cream/90">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6">
                <p className="font-label text-xs uppercase tracking-label text-gold-champagne">
                  {testimonial.author}
                </p>
                <p className="text-sm text-cream/60">{testimonial.event}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
