import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import EnquiryForm from "@/components/book/EnquiryForm";
import SectionLabel from "@/components/ui/SectionLabel";
import GoldDivider from "@/components/ui/GoldDivider";

export const metadata: Metadata = {
  title: "Book / Enquire",
  description:
    "Tell us about your wedding, walima or event and we'll reply within 24 hours. Halal dessert sushi cart hire across Scotland.",
};

const whatsappHref = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
  "Hi Velvet Roll Co., I'd love to find out more about booking the cart for my event.",
)}`;

export default function BookPage() {
  return (
    <div className="pt-32">
      <section className="section-pad pt-12 sm:pt-12">
        <div className="mx-auto max-w-content text-center">
          <SectionLabel>Book / Enquire</SectionLabel>
          <h1 className="text-5xl sm:text-6xl">Tell us about your day</h1>
          <p className="mx-auto mt-6 max-w-xl text-cream/70">
            Share your date, venue and guest count and we&rsquo;ll come back to you within 24
            hours with availability and a tailored quote.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-outline"
            >
              Message on WhatsApp
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-outline"
            >
              DM on Instagram
            </a>
          </div>
          <GoldDivider className="mt-12" />
        </div>
      </section>

      <section className="px-6 pb-32 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-2xl">
          <EnquiryForm />
        </div>
      </section>
    </div>
  );
}
