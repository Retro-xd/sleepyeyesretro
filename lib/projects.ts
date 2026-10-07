export type ProjectHighlight = {
  label: string;
  value: string;
};

export type Project = {
  title: string;
  slug: string;
  category: string;
  year: string;
  description: string;
  summary: string;
  url: string;
  image: string;
  imageAlt: string;
  accent: string;
  highlights: ProjectHighlight[];
};

export const projects: Project[] = [
  {
    title: "Milab Signatures",
    slug: "milab-signatures",
    category: "Digital agency",
    year: "Live",
    description:
      "An agency site presenting branding, UI/UX, software development, selected client work, and technology training.",
    summary:
      "A digital agency homepage built around a clear service offer, featured client work, and a practical training program.",
    url: "https://milabsignatures.com/",
    image: "/projects/milab-signatures-1440.jpg",
    imageAlt: "Milab Signatures homepage with its agency introduction and featured Wakapadi project.",
    accent: "#1685f8",
    highlights: [
      { label: "Services", value: "Brand identity, UI/UX, SEO, and software development." },
      { label: "Selected work", value: "Client projects include Wakapadi, CoRide, PayHere, and CPHI Health." },
      { label: "Training", value: "A three-month program covering design, web and mobile development, and 3D animation." },
    ],
  },
  {
    title: "Excellence Academy",
    slug: "excellence-academy",
    category: "Education website",
    year: "Live",
    description:
      "A school website that introduces academic programs and helps families explore enrollment and campus visits.",
    summary:
      "A family-focused school experience bringing the academy’s programs, school life, and admissions journeys together.",
    url: "https://excellenceacademyweb.vercel.app/",
    image: "/projects/excellence-academy-1440.jpg",
    imageAlt: "Excellence Academy homepage with its school identity, classroom photography, and enrollment actions.",
    accent: "#2864ed",
    highlights: [
      { label: "Programs", value: "Early years, primary, and secondary education, each with age-specific information." },
      { label: "Family journeys", value: "Admissions information, application forms, and school-visit scheduling." },
      { label: "School life", value: "Facilities, gallery, parent testimonials, academic process, and contact details." },
    ],
  },
  {
    title: "CoRide",
    slug: "coride",
    category: "Mobility platform",
    year: "Live",
    description:
      "A ride-sharing platform for affordable commutes and intercity trips, connecting people heading the same way.",
    summary:
      "A mobility website explaining shared ride options for riders and drivers, with a focus on convenience, safety, and lower travel costs.",
    url: "https://coride-web.vercel.app/",
    image: "/projects/coride-1440.jpg",
    imageAlt: "CoRide homepage introducing shared rides, app downloads, and the ride-sharing experience.",
    accent: "#5945ed",
    highlights: [
      { label: "Ride options", value: "Carpool, city, intercity, and private rides." },
      { label: "For drivers", value: "Share available seats, earn toward fuel costs, and choose a flexible schedule." },
      { label: "For riders", value: "Plan trips ahead and find shared rides through the mobile app." },
    ],
  },
];