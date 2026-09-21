import Link from "next/link";
import { SITE, HALAL_STATEMENT } from "@/lib/content";
import GoldDivider from "@/components/ui/GoldDivider";

export default function Footer() {
  return (
    <footer className="border-t border-gold-soft/20 bg-oxblood/40">
      <div className="mx-auto max-w-content px-6 py-16 sm:px-10 lg:px-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl text-gold-champagne">Velvet Roll Co.</p>
            <p className="label-text mt-2">Dessert Sushi</p>
            <p className="mt-4 max-w-xs text-sm text-cream/70">{SITE.serviceArea}.</p>
          </div>

          <div>
            <p className="label-text mb-4">Halal</p>
            <p className="text-sm text-cream/70">{HALAL_STATEMENT.short}</p>
            <p className="mt-2 text-sm text-cream/60">{HALAL_STATEMENT.long}</p>
          </div>

          <div>
            <p className="label-text mb-4">Explore</p>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>
                <Link href="/menu" className="hover:text-gold-champagne">
                  Menu
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-gold-champagne">
                  Events &amp; Weddings
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold-champagne">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-gold-champagne">
                  Book / Enquire
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="label-text mb-4">Get in touch</p>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>
                <a href={`mailto:${SITE.email}`} className="hover:text-gold-champagne">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-gold-champagne"
                >
                  {SITE.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <GoldDivider className="my-12" />

        <p className="text-center text-xs text-cream/40">
          © {new Date().getFullYear()} Velvet Roll Co. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
