/**
 * Brand & content configuration — single source of truth for every visible
 * string. Edit this file to rebrand. See ../AGENTS.md.
 */

import type { SeedName } from "@cimplify/sdk/testing/suite";

export interface BrandSocial {
  label: string;
  href: string;
  icon?: "instagram" | "x" | "tiktok" | "facebook" | "youtube" | "linkedin" | "whatsapp";
}

export interface BrandFaqEntry { q: string; a: string }
export interface BrandFaqSection { title: string; items: BrandFaqEntry[] }
export interface BrandPolicySection {
  heading: string;
  body: string | { intro: string; bullets: string[] };
}
export interface BrandSitemapSection { title: string; links: { label: string; href: string }[] }

export interface Brand {
  name: string; shortName: string; microTag: string; description: string;
  schemaType:
    | "Store" | "Bakery" | "Restaurant" | "BeautySalon"
    | "GroceryStore" | "LocalBusiness" | "Organization";
  currency: string; locale: string;
  contact: {
    address: string; streetAddress: string; city: string; countryCode: string;
    phone: string; phoneTel: string; email: string; privacyEmail: string;
    supportEmail?: string; businessEmail?: string; hours: string;
    /* Optional second line ("Text ...") + exact map links; pages fall back
       to the primary phone and a name+city Google Maps search. */
    textPhone?: string; textPhoneTel?: string;
    mapsUrl?: string; mapsEmbed?: string;
  };
  socials: BrandSocial[];
  header: {
    nav: { label: string; href: string }[];
    /* Hover mega-menus: which nav links get a dropdown of catalogue items. */
    menus: {
      href: string;
      type: "service" | "product";
      eyebrow: string;
      viewAllLabel: string;
    }[];
  };
  hero: {
    badge: string; title: string; subtitle: string;
    primaryCtaLabel: string;
    primaryCtaHref?: string;
    secondaryCtaLabel?: string; secondaryCtaHref?: string;
    videoUrl?: string;
    videoUrls?: string[];
  };
  editorial: {
    headline: string;
    notes: { body: string; className: string }[];
    images: { src: string; alt: string; className: string; sizes: string }[];
    basisTitle: string;
    pillars: {
      title: string;
      body: string;
      bullets?: string[];
      className: string;
    }[];
  };
  servicesIntro: { title: string };
  search: { placeholderPrefix: string; suggestions: string[] };
  serviceBands: {
    title: string;
    ctaLabel: string;
    href: string;
    image: string;
    imageAlt: string;
    imagePosition?: string;
  }[];
  qualityProducts: {
    title: string;
    items: {
      name: string;
      subtitle: string;
      price: string;
      compareAt?: string;
      secondaryPrice?: string;
      secondaryCompareAt?: string;
      note: string;
      secondaryNote?: string;
      ctaLabel: string;
      href: string;
      catalogueMatches: string[];
      image: string;
      imageAlt: string;
      tone: "light" | "olive";
    }[];
  };
  media: {
    title: string;
    ctaLabel: string;
    ctaHref: string;
    images: { src: string; alt: string; position?: string }[];
  };
  trustItems?: { label: string; value: string; description: string; iconKey: string }[];
  brandStrip?: { headline: string; brands: string[] };
  promo?: { badge: string; title: string; body: string; ctaLabel: string; ctaHref: string };
  tradeIn?: {
    eyebrow: string; title: string; body: string;
    primaryCtaLabel: string; primaryCtaHref: string;
    secondaryCtaLabel: string; secondaryCtaHref: string;
    steps: { step: string; title: string; body: string }[];
  };
  newsletter: {
    eyebrow: string; title: string; body: string; placeholder: string;
    submitLabel: string; successLabel: string;
  };
  about: {
    eyebrow: string; title: string; paragraphs: string[];
    sections: { heading: string; body: string }[];
  };
  faq: {
    eyebrow: string; title: string; sections: BrandFaqSection[];
    contactPrompt: string; contactEmail: string;
  };
  terms: { eyebrow: string; title: string; lastUpdated: string; sections: BrandPolicySection[] };
  privacy: { eyebrow: string; title: string; lastUpdated: string; sections: BrandPolicySection[] };
  shipping: { eyebrow: string; title: string; lastUpdated: string; sections: BrandPolicySection[] };
  returns: { eyebrow: string; title: string; lastUpdated: string; sections: BrandPolicySection[] };
  accessibility: { eyebrow: string; title: string; lastUpdated: string; sections: BrandPolicySection[] };
  account: {
    loginEyebrow: string; loginTitle: string; loginSubtitle: string;
    signupEyebrow: string; signupTitle: string; signupSubtitle: string;
    accountEyebrow: string; accountTitle: string;
  };
  contactPage: {
    eyebrow: string; title: string; body: string;
    reasons: string[];
    directLines: { label: string; value: string; href: string }[];
  };
  trackOrder: { eyebrow: string; title: string; body: string };
  footer: {
    blurb: string; sitemap: BrandSitemapSection[];
    poweredBy?: { label: string; href: string };
    /* Real business logo for the footer (set when the avatar is a clean
       logo); undefined -> the wordmark component renders instead. */
    logoUrl?: string;
  };
  llms: { summary: string };
  mock: { seed: SeedName; businessId: string };
}

export const brand: Brand = {
  name: "Lashes by Sika",
  shortName: "Sika",
  microTag: "CLUSTER LASH SETS, PRICED RIGHT",
  description:
    "Lashes by Sika in Accra shapes lashes and brows that look like yours, only better — precise, comfortable and made to hold.",
  schemaType: "BeautySalon",

  currency: "GHS",
  locale: "en_GH",

  contact: {
    address: "Accra, Ghana",
    streetAddress: "Accra",
    city: "Accra",
    countryCode: "GH",
    phone: "0538900500",
    phoneTel: "+233538900500",
    textPhone: "0538900500",
    textPhoneTel: "+233538900500",
    email: "hello@sika.test",
    privacyEmail: "privacy@sika.test",
    hours: "Call or text to book",
  },

  socials: [
    { label: "TikTok", href: "https://www.tiktok.com/@..ms_sika", icon: "tiktok" },
  ],

  header: {
    nav: [
      { label: "About", href: "/about" },
      { label: "Products", href: "/products" },
      { label: "Services", href: "/services" },
      { label: "Location", href: "/location" },
    ],
    menus: [
      {
        href: "/products",
        type: "product",
        eyebrow: "Shop favourites",
        viewAllLabel: "View all products",
      },
      {
        href: "/services",
        type: "service",
        eyebrow: "Popular treatments",
        viewAllLabel: "View all services",
      },
    ],
  },

  hero: {
    badge: "Now booking",
    title: "sika means gold —\nso are these lashes.\nCluster lash sets, priced right.",
    subtitle:
      "Lash extensions, brows and beauty in Accra — book your appointment today",
    primaryCtaLabel: "Make an appointment",
    primaryCtaHref: "/book",
    secondaryCtaLabel: "View services",
    secondaryCtaHref: "/services",
    // Generic spa hero clip — deliberately business-neutral so every
    // reskinned demo can ship with it as-is.
    videoUrl:
      "https://res.cloudinary.com/dcc5ggnkc/video/upload/v1783439648/nvddib3nh4vkymjdhpwh.mp4",
    videoUrls: [
      "https://res.cloudinary.com/dcc5ggnkc/video/upload/v1783439648/nvddib3nh4vkymjdhpwh.mp4",
    ],
  },

  editorial: {
    headline:
      "beauty is not a characteristic.\nit is a state — a healthy, calm and\nwell-groomed body.",
    notes: [
      {
        body: "Life in Accra rarely leaves room to breathe. The hustle rewards pushing through — and quietly collects the bill from your skin, your back and your sleep.",
        className: "left-[5%] top-[25%] max-w-[330px]",
      },
      {
        body: "That is the gap Lashes by Sika was built for: honest treatments, fair prices, and a space that treats your time with respect.",
        className: "right-[4%] top-[50%] max-w-[360px]",
      },
      {
        body: "Every session starts gently and ends with you lighter than you came. That is the whole point.",
        className: "left-[43%] top-[73%] max-w-[430px]",
      },
    ],
    images: [
      {
        src: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780682215/yqkj1i8lrp7m9zmlze4z.jpg",
        alt: "Lashes by Sika beauty treatment detail",
        className: "left-1/2 top-[17%] h-[510px] w-[300px] -translate-x-1/2 rounded-[999px]",
        sizes: "300px",
      },
      {
        src: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780682214/omya4mvpeyeqs88mawio.jpg",
        alt: "Lashes by Sika self-care treatment",
        className: "right-[5%] top-[15%] h-[255px] w-[155px] rounded-[999px]",
        sizes: "155px",
      },
      {
        src: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780682215/yqkj1i8lrp7m9zmlze4z.jpg",
        alt: "Lashes by Sika beauty ritual",
        className: "left-[7%] top-[45%] h-[250px] w-[170px] rounded-[999px]",
        sizes: "170px",
      },
      {
        src: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780682215/bgkgjrchbkhtckgh9f7t.jpg",
        alt: "Lashes by Sika calm care moment",
        className: "right-[6%] top-[68%] h-[145px] w-[100px] rounded-[999px]",
        sizes: "100px",
      },
      {
        src: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780682215/yqkj1i8lrp7m9zmlze4z.jpg",
        alt: "Lashes by Sika relaxation detail",
        className: "left-[25%] top-[75%] h-[150px] w-[102px] rounded-[999px]",
        sizes: "102px",
      },
      {
        src: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780682215/bgkgjrchbkhtckgh9f7t.jpg",
        alt: "Lashes by Sika beauty and peace detail",
        className: "left-[58%] top-[87%] h-[96px] w-[70px] rounded-[999px]",
        sizes: "74px",
      },
    ],
    basisTitle: "Our\nbasis",
    pillars: [
      {
        title: "safe\nplace",
        body: "A safe haven in the center of a vibrant city, where the state of our guests is the main value. Where you feel relaxed, accepted and cared for. And you can trust our guides and specialists.",
        className: "left-[5%] top-[42%] max-w-[360px]",
      },
      {
        title: "body & soul\nconcept",
        body: "We are convinced that beauty is generated by the inner state, and satisfaction with the aesthetics of the body gives confidence and balance. This relationship is the core of our concept.",
        className: "right-[6%] top-[10%] max-w-[410px]",
      },
      {
        title: "healthy\nbeauty",
        body: "The space combines the best features of the three beauty/care trends:",
        bullets: [
          "ritualistic and relaxing spa centers",
          "effectiveness of body shaping salons",
          "technologies for mental resource through meditations and practices",
        ],
        className: "left-[42%] top-[54%] max-w-[430px]",
      },
    ],
  },

  servicesIntro: {
    title: "services",
  },

  search: {
    placeholderPrefix: "Search ",
    suggestions: [
      "classic lash set",
      "volume lashes",
      "lash refill",
      "brow lamination",
      "ombre brows",
      "lash lift",
    ],
  },

  serviceBands: [
    {
      title: "body",
      ctaLabel: "Show services",
      href: "/categories/massage",
      image: "https://static-tmp.cimplify.io/seed/services/hot-stone-90.jpg",
      imageAlt: "Body spa treatment with warm oil and skin care",
      imagePosition: "center 48%",
    },
    {
      title: "face",
      ctaLabel: "Show services",
      href: "/categories/facial",
      image: "https://static-tmp.cimplify.io/seed/services/facial-classic.jpg",
      imageAlt: "Relaxed facial care close-up",
      imagePosition: "center 42%",
    },
    {
      title: "soul",
      ctaLabel: "Show services",
      href: "/categories/wellness",
      image: "https://static-tmp.cimplify.io/seed/services/yoga-session.jpg",
      imageAlt: "Calm meditation and body practice",
      imagePosition: "center 55%",
    },
  ],

  qualityProducts: {
    title: "quality products",
    items: [
      {
        name: "glossy\nlip gloss",
        subtitle: "high-shine finish",
        price: "GH₵ 95",
        compareAt: "GH₵ 120",
        secondaryPrice: "GH₵ 170",
        secondaryCompareAt: "GH₵ 210",
        note: "Single gloss",
        secondaryNote: "Two-shade gloss set",
        ctaLabel: "Buy",
        href: "/products",
        catalogueMatches: ["lip gloss", "lipgloss", "gloss"],
        image: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780684208/yce8my8rr0sa8qhtdo8w.jpg",
        imageAlt: "Lashes by Sika lip gloss product",
        tone: "light",
      },
      {
        name: "mint\nbeauty oil",
        subtitle: "cooling care",
        price: "GH₵ 140",
        compareAt: "GH₵ 175",
        secondaryPrice: "GH₵ 250",
        secondaryCompareAt: "GH₵ 310",
        note: "Mint oil bottle",
        secondaryNote: "Oil + gloss set",
        ctaLabel: "Buy",
        href: "/products",
        catalogueMatches: ["mint oil", "beauty oil", "mint"],
        image: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780684207/a4dggpe8escdshffq9z4.jpg",
        imageAlt: "Lashes by Sika mint oil product",
        tone: "olive",
      },
      {
        name: "brush\nessentials",
        subtitle: "makeup tools",
        price: "GH₵ 220",
        compareAt: "GH₵ 280",
        secondaryPrice: "GH₵ 390",
        secondaryCompareAt: "GH₵ 480",
        note: "Core brush set",
        secondaryNote: "Full brush set",
        ctaLabel: "Buy",
        href: "/products",
        catalogueMatches: ["brush", "brushes", "brush essentials"],
        image: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780684208/h9irccy3f3qmnevjttlx.jpg",
        imageAlt: "Lashes by Sika makeup brush set",
        tone: "light",
      },
      {
        name: "smooth\nfoundation",
        subtitle: "soft base",
        price: "GH₵ 185",
        compareAt: "GH₵ 230",
        secondaryPrice: "GH₵ 330",
        secondaryCompareAt: "GH₵ 410",
        note: "Single foundation",
        secondaryNote: "Base + brush set",
        ctaLabel: "Buy",
        href: "/products",
        catalogueMatches: ["foundation", "smooth foundation", "base"],
        image: "https://res.cloudinary.com/dcc5ggnkc/image/upload/v1780684208/thekm5rhhjz0wiyxmdr8.jpg",
        imageAlt: "Lashes by Sika foundation product",
        tone: "olive",
      },
    ],
  },

  media: {
    title: "media",
    ctaLabel: "Follow",
    ctaHref: "https://www.tiktok.com/@..ms_sika",
    images: [
      {
        src: "https://res.cloudinary.com/dzykdnbvb/video/upload/v1783470806/stage4/spa_mssika/tiktok_0.mp4",
        alt: "Lashes by Sika treatment video",
        position: "center",
      },
      {
        src: "https://res.cloudinary.com/dzykdnbvb/video/upload/v1783470808/stage4/spa_mssika/tiktok_1.mp4",
        alt: "Lashes by Sika treatment video",
        position: "center",
      },
      {
        src: "https://res.cloudinary.com/dzykdnbvb/video/upload/v1783470809/stage4/spa_mssika/tiktok_2.mp4",
        alt: "Lashes by Sika treatment video",
        position: "center",
      },
      {
        src: "https://res.cloudinary.com/dcc5ggnkc/video/upload/v1780581430/gse4jxivlcejlrtq3fjk.mp4",
        alt: "Lashes by Sika self-care media video",
        position: "center",
      },
      {
        src: "https://res.cloudinary.com/dcc5ggnkc/video/upload/v1780581409/pq6ritvfxvxkhsjqkct4.mp4",
        alt: "Lashes by Sika studio media video",
        position: "center",
      },
    ],
  },

  trustItems: [
    {
      label: "Studio",
      value: "Six private rooms",
      description: "Two couples rooms, four singles. All en-suite.",
      iconKey: "verified",
    },
    {
      label: "Therapists",
      value: "8 certified practitioners",
      description: "Average 12 years' practice, all ITEC-trained.",
      iconKey: "support",
    },
    {
      label: "Members",
      value: "20% off · always",
      description: "Monthly membership with two treatments included.",
      iconKey: "warranty",
    },
    {
      label: "Booking",
      value: "Same-week availability",
      description: "Free cancellation up to 24 hours.",
      iconKey: "delivery",
    },
  ],

  promo: {
    badge: "April only",
    title: "The Reset Package — 90 minutes for two.",
    body: "Couples massage, infrared sauna, fresh juice, and a debrief. GH₵850 for two when booked together. Through April.",
    ctaLabel: "Reserve the Reset",
    ctaHref: "/shop",
  },

  newsletter: {
    eyebrow: "Quiet list",
    title: "A short note, once a month.",
    body: "Seasonal treatments, new therapists, and the discount codes worth knowing about. We don't email more than monthly. Unsubscribe in one click.",
    placeholder: "you@email.com",
    submitLabel: "Stay in touch",
    successLabel: "On the list ✓",
  },

  about: {
    eyebrow: "About Lashes by Sika",
    title: "Your sanctuary\nof beauty and peace.",
    paragraphs: [
      "Lashes by Sika is a curated beauty and self-care space in Accra, created for the moments when you want to feel polished, calm, and cared for without rushing through the process.",
      "We bring together beauty services, thoughtful treatments, and carefully selected products so every visit feels personal, clean, and quietly luxurious.",
      "Whether you are booking lashes, brows, manicure, pedicure, facials, waxing, piercing, massage, or a product pick-up, our focus is the same: detail, comfort, and a finish you feel good carrying with you.",
    ],
    sections: [
      {
        heading: "Our approach",
        body: "We keep appointments intentional, products beautiful, and service clear from booking to checkout. You choose what you need; we make the experience feel easy.",
      },
      {
        heading: "Beauty services",
        body: "Book lashes, brows, nails, pedicure, waxing, piercing, facials, and body care. Every service is handled with attention to hygiene, comfort, and detail.",
      },
      {
        heading: "Visit",
        body: "Find us in Accra. Use the Location page for the exact Google Maps pin, or call 0538900500 and text 0538900500 for booking help.",
      },
    ],
  },

  faq: {
    eyebrow: "Q&A",
    title: "What to expect.",
    sections: [
      {
        title: "Booking & arrival",
        items: [
          { q: "How do I book?", a: "Use the Book page, call 0538900500, text 0538900500, or message @..ms_sika on Instagram." },
          { q: "What's your cancellation policy?", a: "If you need to move your appointment, contact us as early as possible. Short-notice changes may require a new deposit depending on the service." },
          { q: "When should I arrive?", a: "Please arrive a few minutes before your appointment so we can settle you in and start on time." },
          { q: "Where are you located?", a: "Lashes by Sika is in Accra. The Location page has the exact Google Maps pin." },
        ],
      },
      {
        title: "Treatments",
        items: [
          { q: "Can I book multiple services?", a: "Yes. Add the services you want to your booking or contact us directly and we will help arrange the timing." },
          { q: "Should I mention allergies or sensitivity?", a: "Yes. Tell us before your service so we can adjust products, timing, or technique where needed." },
          { q: "Do you sell beauty products?", a: "Yes. The shop includes beauty products such as lip gloss, mint oil, brushes, and foundation." },
        ],
      },
      {
        title: "Products & payments",
        items: [
          { q: "Can I buy products online?", a: "Yes. Browse the shop, add products to cart, and continue through checkout." },
          { q: "Are prices shown in Ghana cedis?", a: "Yes. Prices are shown in GHS." },
          { q: "Can I ask for product advice?", a: "Yes. Call, text, or message us on Instagram and we will help you choose." },
        ],
      },
    ],
    contactPrompt: "Other questions? Message us:",
    contactEmail: "hello@sika.test",
  },

  terms: {
    eyebrow: "Terms of service",
    title: "Terms of Service",
    lastUpdated: "1 May 2026",
    sections: [
      { heading: "1. Who we are", body: "Lashes by Sika (\"we\", \"us\") is a beauty and self-care business in Accra, Ghana. By booking a service or buying a product, you agree to these terms." },
      { heading: "2. Bookings", body: "A booking is confirmed when the required payment or deposit is received. Confirmation may be sent by checkout, call, text, or social message." },
      { heading: "3. Cancellations", body: "If you need to reschedule or cancel, contact us as early as possible. Short-notice changes may affect deposits or appointment availability." },
      { heading: "4. Late arrival", body: "Treatments end at the scheduled time. Late arrival shortens the treatment, not the cost." },
      { heading: "5. Health & contraindications", body: "You're responsible for declaring relevant medical conditions, allergies, and medications. We may decline or adjust treatment in the interest of your safety." },
      { heading: "6. Products", body: "Product availability can change. If an item is unavailable after purchase, we will contact you about replacement, refund, or pickup options." },
      { heading: "7. Liability", body: "Maximum liability for any service or order is the price paid for that service or order. We are not liable for items left at the studio." },
      { heading: "8. Governing law", body: "These terms are governed by the laws of Ghana." },
    ],
  },

  privacy: {
    eyebrow: "Privacy",
    title: "Privacy Policy",
    lastUpdated: "1 May 2026",
    sections: [
      { heading: "What we collect", body: "Booking details (name, phone, email, treatment, time slot), the intake form for health-relevant context, and payment data via our processors. We do not store payment cards." },
      { heading: "How we use it", body: { intro: "We use your data to:", bullets: [
        "Confirm and run your appointments.",
        "Adapt treatments to your stated conditions and preferences.",
        "Send appointment reminders by SMS.",
        "Send our monthly note (only if you opted in).",
      ] } },
      { heading: "Health data", body: "Intake-form information is treated as sensitive. Only the therapist scheduled to see you accesses it; we never share with third parties." },
      { heading: "Who we share it with", body: "Payment processors (Paystack, Stripe), our SMS provider for reminders. No one else." },
      { heading: "Your rights", body: "Under the Ghana Data Protection Act, 2012 (Act 843), you can access, correct, or delete your data. Email privacy@sika.test." },
      { heading: "Retention", body: "Booking records: 7 years (tax). Intake forms: 3 years from your last visit." },
    ],
  },

  shipping: {
    eyebrow: "At the studio",
    title: "What to expect",
    lastUpdated: "1 May 2026",
    sections: [
      { heading: "Arriving", body: "Please arrive a few minutes early so your appointment can begin calmly and on time." },
      { heading: "Location", body: "Lashes by Sika is in Accra. Visit the Location page for the exact Google Maps pin." },
      { heading: "Before your service", body: "Tell us about allergies, sensitivity, pregnancy, recent procedures, or any concern that could affect your treatment." },
      { heading: "Products", body: "Beauty products purchased online can be collected or arranged with the team depending on availability." },
    ],
  },

  returns: {
    eyebrow: "Cancellations",
    title: "Cancellations & Refunds",
    lastUpdated: "1 May 2026",
    sections: [
      { heading: "Cancellation window", body: "Please contact us as early as possible if your plans change. Short-notice changes may affect deposits or availability." },
      { heading: "Late arrival", body: "Treatments end at the scheduled time. Late arrival shortens the treatment, not the cost." },
      { heading: "Product refunds", body: "Unused products may be reviewed for refund or exchange depending on condition and timing." },
      { heading: "Deposits", body: "Deposits may be applied toward a rescheduled appointment when enough notice is given." },
    ],
  },

  accessibility: {
    eyebrow: "Accessibility",
    title: "Accessibility Statement",
    lastUpdated: "1 May 2026",
    sections: [
      { heading: "At the studio", body: "Contact us before your visit if you need mobility support, extra time, or accommodation during service." },
      { heading: "Online", body: "We aim for WCAG 2.1 AA on this site." },
      { heading: "Reporting issues", body: "Email accessibility@sika.test, call, or text the studio. We respond within a business day." },
    ],
  },

  account: {
    loginEyebrow: "Welcome back",
    loginTitle: "Sign in to Lashes by Sika",
    loginSubtitle: "Manage your bookings, orders, and preferences.",
    signupEyebrow: "Welcome",
    signupTitle: "Create your account",
    signupSubtitle: "Save your bookings, product orders, and contact details.",
    accountEyebrow: "Your account",
    accountTitle: "Welcome back",
  },

  contactPage: {
    eyebrow: "Contact",
    title: "How can we help?",
    body: "Booking question, product enquiry, location help, or just want to say hello — call, text, or message us.",
    reasons: ["Booking question", "Product enquiry", "Location", "Private booking", "Press / partnerships", "Something else"],
    directLines: [
      { label: "Call", value: "0538900500", href: "tel:+233538900500" },
      { label: "Text", value: "0538900500", href: "sms:+233538900500" },
      { label: "Instagram", value: "@..ms_sika", href: "https://www.tiktok.com/@..ms_sika" },
    ],
  },

  trackOrder: {
    eyebrow: "Find a booking",
    title: "Look up your booking.",
    body: "Enter your booking reference and the email used at booking. We'll show the time, the therapist, and any preparation notes.",
  },

  footer: {
    blurb:
      "Lashes by Sika in Accra — cluster lash sets, priced right.",
    sitemap: [
      {
        title: "Visit",
        links: [
          { label: "Products", href: "/products" },
          { label: "Services", href: "/services" },
          { label: "Book a service", href: "/book" },
          { label: "Location", href: "/location" },
          { label: "Instagram", href: "https://www.tiktok.com/@..ms_sika" },
        ],
      },
      {
        title: "Studio",
        links: [
          { label: "About", href: "/about" },
          { label: "What to expect", href: "/shipping" },
          { label: "FAQ", href: "/faq" },
        ],
      },
      {
        title: "Help",
        links: [
          { label: "Find a booking", href: "/track-order" },
          { label: "Cancellations", href: "/returns" },
          { label: "Call 0538900500", href: "tel:+233538900500" },
          { label: "Text 0538900500", href: "sms:+233538900500" },
        ],
      },
      {
        title: "Account",
        links: [
          { label: "Sign in", href: "/login" },
          { label: "Create account", href: "/signup" },
          { label: "Your bookings", href: "/account/orders" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Terms of Service", href: "/terms" },
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Accessibility", href: "/accessibility" },
          { label: "Sitemap", href: "/sitemap-page" },
        ],
      },
    ],
    poweredBy: { label: "Cimplify", href: "https://app.cimplify.io" },
  },

  llms: {
    summary:
      "Lashes by Sika — beauty and self-care in Accra. Lashes, brows, nails, pedicure, waxing, piercing, facials, massage, and beauty products. Booking via website, call, text, or Instagram.",
  },

  mock: {
    seed: "services",
    businessId: "bus_serene_spa",
  },
};
