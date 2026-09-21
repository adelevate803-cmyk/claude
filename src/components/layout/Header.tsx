"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/events", label: "Events & Weddings" },
  { href: "/gallery", label: "Gallery" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-velvet-in-out",
        scrolled || menuOpen ? "bg-velvet/90 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <Link href="/" className="flex items-center gap-3" aria-label="Velvet Roll Co. home">
          <span className="relative h-11 w-11 overflow-hidden rounded-full border border-gold-soft/60">
            <Image
              src="/images/logo.jpg"
              alt="Velvet Roll Co. monogram"
              fill
              sizes="44px"
              className="scale-[1.35] object-cover"
              priority
            />
          </span>
          <span className="hidden font-label text-xs uppercase tracking-label text-gold-champagne sm:block">
            Velvet Roll Co.
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-label text-xs uppercase tracking-label text-cream/90 transition-colors hover:text-gold-champagne",
                pathname === link.href && "text-gold-champagne",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/book" className="btn-gold">
            Book
          </Link>
        </nav>

        <button
          type="button"
          className="flex items-center gap-2 font-label text-xs uppercase tracking-label text-gold-champagne md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.83, 0, 0.17, 1] }}
            className="overflow-hidden border-t border-gold-soft/20 md:hidden"
          >
            <div className="flex flex-col gap-6 px-6 py-8 sm:px-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-label text-sm uppercase tracking-label text-cream/90 hover:text-gold-champagne"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/book" className="btn-gold w-fit">
                Book
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
