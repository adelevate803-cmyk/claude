import type { Package } from "@/lib/content";

export default function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-gold-soft/20 bg-oxblood/40 p-8">
      <h3 className="text-3xl">{pkg.name}</h3>
      <p className="mt-3 text-sm text-cream/70">{pkg.description}</p>
      <ul className="mt-6 flex-1 space-y-2 text-sm text-cream/70">
        {pkg.includes.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-gold-soft" aria-hidden>
              ◆
            </span>
            {item}
          </li>
        ))}
      </ul>
      {pkg.from && <p className="label-text mt-6">{pkg.from}</p>}
    </article>
  );
}
