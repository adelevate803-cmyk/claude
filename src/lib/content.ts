// All site copy and structured content lives here, sourced from the
// Velvet Roll Co. Website PRD. Replace the `PLACEHOLDER` image paths and
// TODO items once the owner supplies real photography and copy.

export const SITE = {
  name: "Velvet Roll Co.",
  tagline: "Sushi, but make it dessert.",
  description:
    "Luxury sweet sushi for weddings, events & private parties across Scotland. 100% halal dessert sushi cart — crepe-wrapped sweet rolls, sliced like maki.",
  instagram: "https://www.instagram.com/velvet_roll_co",
  instagramHandle: "@velvet_roll_co",
  email: "hello@velvetrollco.com",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "447000000000",
  serviceArea: "Serving all of Scotland",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://velvetrollco.com",
};

export type Roll = {
  slug: string;
  name: string;
  description: string;
  fillings: string;
  allergens: string[];
  dips: string[];
  accent: string; // tailwind color token for the roll's 3D + card accent
  image: string;
};

export const ROLLS: Roll[] = [
  {
    slug: "dubai-roll",
    name: "Dubai Roll",
    description:
      "Our take on the viral Dubai chocolate bar, rolled. Pistachio cream and crisp kataifi wrapped in a soft crepe, finished with a chocolate drizzle and crushed pistachios.",
    fillings: "Pistachio cream, kataifi, chocolate drizzle, crushed pistachios",
    allergens: ["Gluten", "Dairy", "Nuts"],
    dips: ["Pistachio cream", "Dark chocolate ganache"],
    accent: "pistachio",
    image: "/images/menu/dubai-roll.svg",
  },
  {
    slug: "tiramisu-roll",
    name: "Tiramisu Roll",
    description:
      "A classic tiramisu, reimagined as maki. Mascarpone cream and coffee-soaked sponge, dusted with cocoa for that first-bite espresso hit.",
    fillings: "Mascarpone cream, coffee-soaked sponge, cocoa dust",
    allergens: ["Gluten", "Dairy", "Egg"],
    dips: ["Espresso cream", "Chocolate sauce"],
    accent: "cocoa",
    image: "/images/menu/tiramisu-roll.svg",
  },
  {
    slug: "chocoberry-roll",
    name: "Chocoberry Roll",
    description:
      "Strawberries and chocolate, done properly. Fresh strawberry and chocolate cream, finished with white chocolate drizzle and a biscuit crumb.",
    fillings: "Strawberry & chocolate cream, white chocolate drizzle, biscuit crumb",
    allergens: ["Gluten", "Dairy"],
    dips: ["Strawberry coulis", "White chocolate sauce"],
    accent: "champagne",
    image: "/images/menu/chocoberry-roll.svg",
  },
];

export const SEASONAL_SPECIALS_NOTE =
  "Seasonal specials rotate throughout the year — ask us about Eid, Ramadan and festive editions when you enquire.";

export type Package = {
  name: string;
  description: string;
  from?: string;
  includes: string[];
};

export const PACKAGES: Package[] = [
  {
    name: "Cart Hire",
    description:
      "The full Velvet Roll Co. experience: our dessert sushi cart, hand-rolled live for your guests.",
    from: "Prices on request",
    includes: [
      "Cart with purple under-glow, set up and styled on-site",
      "Live hand-rolling by our team",
      "Choice of 2–4 rolls from our menu",
      "Chopsticks, kraft trays and dipping pots",
    ],
  },
  {
    name: "Grazing Boxes",
    description:
      "Pre-plated dessert sushi boxes for guests to take home or enjoy at their table.",
    from: "Prices on request",
    includes: [
      "Individually boxed roll selections",
      "Branded packaging",
      "Delivery or collection",
    ],
  },
  {
    name: "Favour Boxes",
    description: "Small take-home boxes for wedding and party favours.",
    from: "Prices on request",
    includes: [
      "Mini roll portions",
      "Personalised tags available",
      "Bulk ordering for large guest lists",
    ],
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Tell us about your day",
    description:
      "Send an enquiry with your date, venue and guest count, and we'll check availability.",
  },
  {
    step: "02",
    title: "We build your package",
    description:
      "We'll recommend rolls, quantities and a package to suit your event and budget.",
  },
  {
    step: "03",
    title: "We roll up and roll out",
    description:
      "Our cart arrives, sets up and serves — you enjoy the day, we handle the rest.",
  },
];

export const VENUES_SERVED = [
  "Enterkine Country House",
  "Private homes & gardens across Scotland",
  "Hotels, marquees & function suites",
  "Bazaars, festivals & markets",
];

export type FAQ = { question: string; answer: string };

export const FAQS: FAQ[] = [
  {
    question: "Do you travel across Scotland?",
    answer:
      "Yes — we serve all of Scotland. Travel fees may apply depending on distance from our base; let us know your venue when you enquire and we'll confirm.",
  },
  {
    question: "Is everything on the menu halal?",
    answer:
      "Yes, 100% halal, always. See our Halal Statement below for details on ingredients and sourcing.",
  },
  {
    question: "How far in advance should we book?",
    answer:
      "We recommend enquiring as early as possible for weddings and peak-season dates, ideally 2–3 months ahead. We'll always try to accommodate shorter notice where we can.",
  },
  {
    question: "Is there a minimum booking size?",
    answer:
      "Minimums vary by package and date — tell us your guest count in the enquiry form and we'll let you know what works.",
  },
  {
    question: "Can you cater for allergies?",
    answer:
      "Each roll's allergens are listed on our Menu page. Let us know about any allergies in your enquiry and we'll talk through the options with you.",
  },
];

export type UpcomingEvent = {
  name: string;
  date: string;
  location: string;
};

export const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    name: "Diwali Roshni Bazaar",
    date: "Sunday 1 November 2026",
    location: "Scotland",
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  event: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Our guests could not stop talking about the dessert sushi cart — it was the highlight of the whole reception.",
    author: "Amara & Hassan",
    event: "Wedding, Glasgow",
  },
  {
    quote:
      "Velvet Roll Co. brought something genuinely different to our client's walima. Elegant, halal, and beautifully presented.",
    author: "Ivory Events HQ",
    event: "Event Planner",
  },
  {
    quote: "Booked them for a birthday and it felt like a five-star dessert bar. Already rebooking for Eid.",
    author: "Sana R.",
    event: "Private Party, Edinburgh",
  },
];

export const HALAL_STATEMENT = {
  short: "100% halal. Always.",
  long: "Every ingredient we use is 100% halal, sourced from certified suppliers. We hold ourselves to the same standard whether we're serving a wedding of 300 or a birthday of 20 — no exceptions, no substitutions.",
};

export type GalleryCategory = "Weddings" | "Walimas" | "Parties" | "Bazaars";

export type GalleryImage = {
  id: string;
  category: GalleryCategory;
  image: string;
  caption: string;
  tall?: boolean;
};

export const GALLERY_CATEGORIES: GalleryCategory[] = ["Weddings", "Walimas", "Parties", "Bazaars"];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: "g1", category: "Weddings", image: "/images/gallery/wedding-1.svg", caption: "Reception dessert table, Glasgow", tall: true },
  { id: "g2", category: "Weddings", image: "/images/gallery/wedding-2.svg", caption: "Wedding favours, Edinburgh" },
  { id: "g3", category: "Walimas", image: "/images/gallery/walima-1.svg", caption: "Walima dessert cart" , tall: true},
  { id: "g4", category: "Parties", image: "/images/gallery/party-1.svg", caption: "Birthday celebration" },
  { id: "g5", category: "Bazaars", image: "/images/gallery/bazaar-1.svg", caption: "Community bazaar stall", tall: true },
  { id: "g6", category: "Weddings", image: "/images/gallery/wedding-3.svg", caption: "Bridal party rolls" },
  { id: "g7", category: "Parties", image: "/images/gallery/party-2.svg", caption: "Eid celebration" , tall: true},
  { id: "g8", category: "Walimas", image: "/images/gallery/walima-2.svg", caption: "Nikah reception" },
  { id: "g9", category: "Bazaars", image: "/images/gallery/bazaar-2.svg", caption: "Diwali Roshni Bazaar" },
];

export const SCROLL_SCENES = [
  {
    id: "curtain",
    eyebrow: "Velvet Roll Co.",
    heading: "The Art of Dessert Sushi",
    body: "Luxury sweet sushi for weddings, events & private parties across Scotland.",
  },
  {
    id: "wrap",
    eyebrow: "01",
    heading: "Hand-rolled. Made to order.",
    body: "Every roll starts with a crepe sheet, filled fresh for your event.",
  },
  {
    id: "roll",
    eyebrow: "02",
    heading: "Sushi, but make it dessert.",
    body: "The crepe rolls into a log, just like maki — but sweet.",
  },
  {
    id: "slice",
    eyebrow: "03",
    heading: "Six pieces. Zero regrets.",
    body: "Sliced clean, plated beautifully, ready to share.",
  },
  {
    id: "menu",
    eyebrow: "04",
    heading: "Dubai. Tiramisu. Chocoberry.",
    body: "Three signature rolls, each with its own character.",
  },
  {
    id: "dip",
    eyebrow: "05",
    heading: "Dip, bite, repeat.",
    body: "Served with chopsticks and a dipping pot, always.",
  },
  {
    id: "cart",
    eyebrow: "06",
    heading: "We bring the cart to you.",
    body: "A white panelled cart with a purple under-glow, rolled live at your event.",
  },
  {
    id: "halal",
    eyebrow: "07",
    heading: "100% halal. Always.",
    body: "Certified ingredients, every time, without exception.",
  },
  {
    id: "book",
    eyebrow: "08",
    heading: "Tell us about your day.",
    body: "Dates, venues and guest counts — we'll take it from here.",
  },
] as const;
