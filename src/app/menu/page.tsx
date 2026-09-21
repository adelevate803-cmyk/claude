import type { Metadata } from "next";
import Link from "next/link";
import { ROLLS, SEASONAL_SPECIALS_NOTE } from "@/lib/content";
import RollCard from "@/components/menu/RollCard";
import SectionLabel from "@/components/ui/SectionLabel";
import GoldDivider from "@/components/ui/GoldDivider";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Dubai Roll, Tiramisu Roll and Chocoberry Roll — our signature halal dessert sushi, hand-rolled for weddings, walimas and events across Scotland.",
};

export default function MenuPage() {
  return (
    <div className="pt-32">
      <section className="section-pad pt-12 sm:pt-12">
        <div className="mx-auto max-w-content text-center">
          <SectionLabel>Our Menu</SectionLabel>
          <h1 className="text-5xl sm:text-6xl">Three signature rolls</h1>
          <p className="mx-auto mt-6 max-w-xl text-cream/70">
            Every roll is hand-rolled to order, crepe-wrapped and sliced like maki, served with
            chopsticks and a dipping pot on the side.
          </p>
          <GoldDivider className="mt-12" />
        </div>
      </section>

      <section className="px-6 pb-24 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-content gap-8 md:grid-cols-3">
          {ROLLS.map((roll) => (
            <RollCard key={roll.slug} roll={roll} />
          ))}
        </div>
      </section>

      <section className="section-pad bg-oxblood/30 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="text-3xl">Seasonal specials</h2>
          <p className="mt-4 text-cream/70">{SEASONAL_SPECIALS_NOTE}</p>
          <Link href="/book" className="btn-gold mt-8 inline-flex">
            Ask about specials
          </Link>
        </div>
      </section>
    </div>
  );
}
