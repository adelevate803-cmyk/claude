import { SITE } from "./content";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    image: `${SITE.url}/images/og-image.svg`,
    email: SITE.email,
    servesCuisine: "Dessert",
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Scotland",
    },
    address: {
      "@type": "PostalAddress",
      addressRegion: "Scotland",
      addressCountry: "GB",
    },
    sameAs: [SITE.instagram],
  };
}
