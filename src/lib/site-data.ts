// Content extracted from Gravity Industries / King Roar / Devam price lists (July 2024).
// This file is the single source of truth for company & product info.

export const company = {
  name: "Gravity Industries",
  tagline: "Smart Water Management",
  since: 2010,
  city: "Rajkot",
  state: "Gujarat",
  country: "India",
  address:
    "Sojitra Park, Radhe Krishna Chowk, Near Mavdi By-Pass Road, Rajkot-4, Gujarat, India",
  email: "gravityind18@gmail.com",
  website: "gravityind.in",
  phones: ["+91 63588 20488", "+91 63588 31958"],
  whatsapp: "+916358831958",
  certification: "ISO 9001:2015 Certified Company",
  group: "AA Group",
  segments: [
    "Plumbing Fitting Products",
    "Bathware Products",
    "Plastic Products",
  ],
  about: `The name Gravity Industries is synonymous with quality, commitment and service since 2010. With its base in Rajkot, Gravity Industries is an ISO 9001:2015 certified company with a constant endeavour towards achieving the highest level of customer satisfaction. Gravity Industries intends to be a one-stop shop for all plumbing, sanitary and drainage requirements.`,
  mission: `To manufacture high quality Plastic Products, PVC Products, Bathware and Pipe & Fittings that bring a difference in people's lives — a difference that spells convenience, efficiency, consistency, utility and complete value for money. We strive for customer delight by creating products that address their real needs.`,
} as const;

export type PriceRow = {
  size: string;
  sizeMm?: string;
  price?: string;
  altPrice?: string;
  innerPkt?: string;
  outerPkt?: string;
  extra?: string;
};

export type ProductSpec = {
  slug: string;
  brand: "king-roar" | "devam";
  category: string;
  name: string;
  short: string;
  description: string;
  features: string[];
  columns: { key: keyof PriceRow; label: string }[];
  variants: { title: string; rows: PriceRow[] }[];
};

const stdCols: ProductSpec["columns"] = [
  { key: "size", label: "Size (inch)" },
  { key: "sizeMm", label: "Size (mm)" },
  { key: "price", label: "Price (₹)" },
  { key: "innerPkt", label: "Inner Pkt" },
  { key: "outerPkt", label: "Outer Pkt" },
];

export const products: ProductSpec[] = [
  // ============= KING ROAR =============
  {
    slug: "upvc-ball-valve",
    brand: "king-roar",
    category: "Ball Valves",
    name: "KingRoar uPVC Ball Valve",
    short: "Premium uPVC ball valve — short & long handle variants",
    description:
      "High-strength uPVC ball valve engineered for cold water plumbing lines. Available in short-handle and long-handle configurations, in sizes from 1/2\" to 2\". Ideal for domestic, commercial and light-industrial plumbing.",
    features: [
      "Manufactured from virgin uPVC compound",
      "Full-bore ball for maximum flow",
      "Short & long handle options",
      "Solvent-weld and threaded ends available",
      "Suitable for cold water lines up to 1 MPa",
    ],
    columns: [
      { key: "size", label: "Size (inch)" },
      { key: "sizeMm", label: "Size (mm)" },
      { key: "price", label: "Solvent (₹)" },
      { key: "altPrice", label: "Threaded (₹)" },
      { key: "outerPkt", label: "Outer Pkt" },
    ],
    variants: [
      {
        title: "Short Handle",
        rows: [
          { size: '1/2"', sizeMm: "15 mm", price: "51.60", altPrice: "59.30" },
          { size: '3/4"', sizeMm: "20 mm", price: "66.10", altPrice: "76.32" },
          { size: '1"', sizeMm: "25 mm", price: "85.70", altPrice: "99.00" },
          { size: '1.1/4"', sizeMm: "32 mm", price: "133.10", altPrice: "—" },
          { size: '1.1/2"', sizeMm: "40 mm", price: "175.80", altPrice: "—" },
          { size: '2"', sizeMm: "50 mm", price: "259.45", altPrice: "—" },
        ],
      },
      {
        title: "Long Handle",
        rows: [
          { size: '1/2"', sizeMm: "15 mm", price: "57.60", altPrice: "64.88", outerPkt: "500" },
          { size: '3/4"', sizeMm: "20 mm", price: "72.02", altPrice: "82.24", outerPkt: "300" },
          { size: '1"', sizeMm: "25 mm", price: "93.60", altPrice: "107.60", outerPkt: "184" },
          { size: '1.1/4"', sizeMm: "32 mm", price: "157.80", altPrice: "—", outerPkt: "140" },
          { size: '1.1/2"', sizeMm: "40 mm", price: "199.18", altPrice: "—", outerPkt: "105" },
          { size: '2"', sizeMm: "50 mm", price: "285.00", altPrice: "—", outerPkt: "70" },
        ],
      },
    ],
  },
  {
    slug: "cpvc-ball-valve",
    brand: "king-roar",
    category: "Ball Valves",
    name: "KingRoar cPVC Ball Valve",
    short: "cPVC ball valve for hot & cold water plumbing",
    description:
      "cPVC ball valve rated for hot and cold water lines. Available in short & long handle, sizes 1/2\" to 2\". Suitable for CPVC plumbing systems in residential and commercial buildings.",
    features: [
      "cPVC compound rated for hot water up to 82°C",
      "Compatible with all CPVC piping standards",
      "Full-flow ball design",
      "Available in Regular and Roar Premium series",
    ],
    columns: [
      { key: "size", label: "Size (inch)" },
      { key: "sizeMm", label: "Size (mm)" },
      { key: "price", label: "Regular (₹)" },
      { key: "altPrice", label: "Roar Premium (₹)" },
      { key: "outerPkt", label: "Outer Pkt" },
    ],
    variants: [
      {
        title: "Short & Long Handle",
        rows: [
          { size: '1/2"', sizeMm: "15 mm", price: "108.00" },
          { size: '3/4"', sizeMm: "20 mm", price: "126.90", altPrice: "135.80", outerPkt: "320" },
          { size: '1"', sizeMm: "25 mm", price: "148.50", altPrice: "159.60", outerPkt: "200" },
          { size: '1.1/4"', sizeMm: "32 mm", price: "410.00" },
          { size: '1.1/2"', sizeMm: "40 mm", price: "648.00" },
          { size: '2"', sizeMm: "50 mm", price: "1026.00" },
        ],
      },
    ],
  },
  {
    slug: "king-roar-concealed-valve-a-type",
    brand: "king-roar",
    category: "Concealed Valves",
    name: "uPVC / cPVC Concealed Valve A-Type",
    short: "Wall-mount concealed valve — A-Type",
    description:
      "A-Type concealed valves for wall-mounted bathroom installations. Available in both uPVC and cPVC bodies with sizes suited for standard plumbing.",
    features: [
      "Concealed body design for wall installation",
      "Compatible with uPVC and cPVC lines",
      "Premium finish with long service life",
    ],
    columns: stdCols,
    variants: [
      {
        title: "uPVC Concealed Valve A-Type",
        rows: [
          { size: '1/2"', sizeMm: "15 mm", price: "550.00", innerPkt: "1", outerPkt: "70" },
          { size: '3/4"', sizeMm: "20 mm", price: "600.00", innerPkt: "1", outerPkt: "70" },
          { size: '1"', sizeMm: "25 mm", price: "840.00", innerPkt: "1", outerPkt: "70" },
        ],
      },
      {
        title: "cPVC Concealed Valve A-Type",
        rows: [
          { size: '3/4"', sizeMm: "15 mm", price: "540.00", innerPkt: "1", outerPkt: "70" },
          { size: '1"', sizeMm: "20 mm", price: "590.00", innerPkt: "1", outerPkt: "70" },
        ],
      },
    ],
  },
  {
    slug: "pp-taps-regular-classic",
    brand: "king-roar",
    category: "Bathroom Taps",
    name: "PP & PC Crystal Bib Taps",
    short: "White PP and PC Crystal bib taps — Regular & Classic Collection",
    description:
      "Full range of PP and Polycarbonate Crystal bib taps in Regular and Classic collections. Includes Short Body, Long Body, Swan Neck, Sink Cock, Pillar Cock and Angle Cock.",
    features: [
      "Available in White PP, PC Crystal Black, Sky Blue, Yellow, Orange, Red",
      "Six body styles: Short, Long, Swan Neck, Sink Cock, Pillar Cock, Angle Cock",
      "1/2\" standard connection",
      "Unbreakable, corrosion-free polymer body",
    ],
    columns: [
      { key: "size", label: "Size" },
      { key: "sizeMm", label: "Name" },
      { key: "price", label: "Regular (₹)" },
      { key: "altPrice", label: "Classic PC Crystal (₹)" },
    ],
    variants: [
      {
        title: "White PP / PC Crystal — Bib Tap Range",
        rows: [
          { size: '1/2"', sizeMm: "Short Body", price: "40.00", altPrice: "60.02" },
          { size: '1/2"', sizeMm: "Long Body", price: "43.17", altPrice: "63.21" },
          { size: '1/2"', sizeMm: "Swan Neck", price: "161.10", altPrice: "181.80" },
          { size: '1/2"', sizeMm: "Sink Cock", price: "148.47", altPrice: "169.76" },
          { size: '1/2"', sizeMm: "Pillar Cock", price: "124.25", altPrice: "144.48" },
          { size: '1/2"', sizeMm: "Angle Cock", price: "38.96", altPrice: "58.99" },
        ],
      },
    ],
  },
  {
    slug: "abs-showers",
    brand: "king-roar",
    category: "Bathware",
    name: "KingRoar ABS Shower Heads",
    short: "Classic round and Unique square ABS shower heads",
    description:
      "Premium ABS shower heads with chrome finish. Available in 3\", 4\" and 5\" round Classic series and 3×3, 4×4 Unique square series. Includes 9\" ABS arm.",
    features: [
      "Chrome-plated ABS body",
      "Anti-clog silicone nozzles",
      "1/2\" standard connection",
      "Round and square profiles",
    ],
    columns: [
      { key: "size", label: "Size" },
      { key: "sizeMm", label: "Model" },
      { key: "price", label: "Price (₹)" },
    ],
    variants: [
      {
        title: "Shower Range",
        rows: [
          { size: '1/2"', sizeMm: 'Classic ABS 3" Round', price: "244.80" },
          { size: '1/2"', sizeMm: 'Classic ABS 4" Round', price: "338.40" },
          { size: '1/2"', sizeMm: 'Classic ABS 5" Round', price: "493.20" },
          { size: '1/2"', sizeMm: 'Unique ABS 3"×3" Square', price: "226.80" },
          { size: '1/2"', sizeMm: 'Unique ABS 4"×4" Square', price: "295.20" },
          { size: '1/2"', sizeMm: 'ABS 9" Arm', price: "151.20" },
        ],
      },
    ],
  },
  {
    slug: "cp-extension-nipples",
    brand: "king-roar",
    category: "CP Fittings",
    name: "C.P. Extension Nipples — Special",
    short: "Chrome-plated brass extension nipples, premium collection",
    description:
      "Premium chrome-plated extension nipples in sizes 1\" through 6\". Manufactured with a durable brass core and high-gloss CP finish for bathroom concealed extension work.",
    features: [
      "Chrome-plated finish",
      "Available 1\", 1.5\", 2\", 2.5\", 3\", 4\" and 6\"",
      "Consistent thread gauge",
      "Individually inspected",
    ],
    columns: [
      { key: "size", label: 'Size (inch)' },
      { key: "innerPkt", label: "Inner Pkt" },
      { key: "outerPkt", label: "Outer Pkt" },
      { key: "price", label: "Price (₹)" },
    ],
    variants: [
      {
        title: "CP Extension Nipple Special",
        rows: [
          { size: '1"', innerPkt: "48 pcs", outerPkt: "480 pcs", price: "46.08" },
          { size: '1.5"', innerPkt: "36 pcs", outerPkt: "360 pcs", price: "66.56" },
          { size: '2"', innerPkt: "24 pcs", outerPkt: "240 pcs", price: "87.04" },
          { size: '2.5"', innerPkt: "24 pcs", outerPkt: "240 pcs", price: "99.84" },
          { size: '3"', innerPkt: "24 pcs", outerPkt: "240 pcs", price: "117.76" },
          { size: '4"', innerPkt: "18 pcs", outerPkt: "180 pcs", price: "156.16" },
          { size: '6"', innerPkt: "12 pcs", outerPkt: "120 pcs", price: "248.32" },
        ],
      },
    ],
  },
  {
    slug: "rcc-nail-clamps",
    brand: "king-roar",
    category: "Pipe Clamps",
    name: "uPVC / cPVC RCC Nail Clamps",
    short: "Nail-in RCC clamps for uPVC and cPVC pipes",
    description:
      "Fast-fix RCC nail clamps for anchoring uPVC and cPVC pipes directly to concrete or masonry. Sizes 1/2\" to 2\".",
    features: [
      "Nail-in installation — no pre-drilling",
      "Available for uPVC and cPVC pipes",
      "Sizes 15 mm to 50 mm",
      "Corrosion-resistant nail",
    ],
    columns: stdCols,
    variants: [
      {
        title: "KingRoar uPVC Nail Clamps",
        rows: [
          { size: '1/2"', sizeMm: "15 mm", price: "2.25", innerPkt: "100 pcs", outerPkt: "5000 pcs" },
          { size: '3/4"', sizeMm: "20 mm", price: "3.74", innerPkt: "100 pcs", outerPkt: "3000 pcs" },
          { size: '1"', sizeMm: "25 mm", price: "4.63", innerPkt: "100 pcs", outerPkt: "2500 pcs" },
          { size: '1.1/4"', sizeMm: "32 mm", price: "6.45", innerPkt: "50 pcs", outerPkt: "1500 pcs" },
          { size: '1.1/2"', sizeMm: "40 mm", price: "7.60", innerPkt: "25 pcs", outerPkt: "1250 pcs" },
          { size: '2"', sizeMm: "50 mm", price: "11.90", innerPkt: "25 pcs", outerPkt: "800 pcs" },
        ],
      },
      {
        title: "KingRoar cPVC Nail Clamps",
        rows: [
          { size: '1/2"', sizeMm: "15 mm", price: "2.18", innerPkt: "100 pcs", outerPkt: "9000 pcs" },
          { size: '3/4"', sizeMm: "20 mm", price: "2.25", innerPkt: "100 pcs", outerPkt: "5000 pcs" },
          { size: '1"', sizeMm: "25 mm", price: "3.74", innerPkt: "100 pcs", outerPkt: "3000 pcs" },
          { size: '1.1/4"', sizeMm: "32 mm", price: "5.12", innerPkt: "50 pcs", outerPkt: "2000 pcs" },
          { size: '1.1/2"', sizeMm: "40 mm", price: "6.45", innerPkt: "25 pcs", outerPkt: "1500 pcs" },
          { size: '2"', sizeMm: "50 mm", price: "11.01", innerPkt: "25 pcs", outerPkt: "800 pcs" },
        ],
      },
    ],
  },
  {
    slug: "metal-clamps",
    brand: "king-roar",
    category: "Pipe Clamps",
    name: "Powder-Coated Metal Clamps — 1 mm & 1.5 mm",
    short: "Powder-coated MS clamps for uPVC and cPVC pipes",
    description:
      "Powder-coated mild-steel clamps in 1 mm and 1.5 mm thickness. Suitable for uPVC and cPVC piping, sizes 1/2\" to 4\".",
    features: [
      "1 mm and 1.5 mm MS body",
      "Powder-coated for corrosion resistance",
      "Sizes 15 mm to 110 mm",
      "Matched to standard pipe OD",
    ],
    columns: [
      { key: "size", label: "Size (inch)" },
      { key: "sizeMm", label: "Size (mm)" },
      { key: "price", label: "1 mm (₹)" },
      { key: "altPrice", label: "1.5 mm (₹)" },
    ],
    variants: [
      {
        title: "uPVC Metal Clamps",
        rows: [
          { size: '1/2"', sizeMm: "15 mm", price: "4.15", altPrice: "6.22" },
          { size: '3/4"', sizeMm: "20 mm", price: "4.61", altPrice: "7.07" },
          { size: '1"', sizeMm: "25 mm", price: "5.41", altPrice: "7.93" },
          { size: '1.1/4"', sizeMm: "32 mm", price: "6.22", altPrice: "9.49" },
          { size: '1.1/2"', sizeMm: "40 mm", price: "7.37", altPrice: "10.48" },
          { size: '2"', sizeMm: "50 mm", price: "8.52", altPrice: "12.33" },
          { size: '2.1/2"', sizeMm: "75 mm", price: "11.98", altPrice: "19.81" },
          { size: '3"', sizeMm: "80 mm", price: "14.52", altPrice: "23.04" },
          { size: '4"', sizeMm: "110 mm", price: "17.05", altPrice: "27.65" },
        ],
      },
      {
        title: "cPVC Metal Clamps",
        rows: [
          { size: '1/2"', sizeMm: "15 mm", price: "3.69", altPrice: "5.41" },
          { size: '3/4"', sizeMm: "20 mm", price: "4.26", altPrice: "6.34" },
          { size: '1"', sizeMm: "25 mm", price: "4.71", altPrice: "7.19" },
          { size: '1.1/4"', sizeMm: "32 mm", price: "5.53", altPrice: "8.06" },
          { size: '1.1/2"', sizeMm: "40 mm", price: "6.34", altPrice: "9.56" },
          { size: '2"', sizeMm: "50 mm", price: "8.06", altPrice: "12.33" },
        ],
      },
    ],
  },
  {
    slug: "ss-202-clamps",
    brand: "king-roar",
    category: "Pipe Clamps",
    name: "S.S. 202 Clamps",
    short: "Stainless-steel 202-grade pipe clamps",
    description:
      "Stainless-steel 202-grade clamps in 0.5 mm and 1 mm thickness for uPVC and cPVC pipes. Sizes 1/2\" to 4\".",
    features: [
      "SS 202 grade stainless steel",
      "0.5 mm and 1 mm thickness options",
      "Sizes 1/2\" to 4\"",
      "Ideal for humid & coastal environments",
    ],
    columns: [
      { key: "size", label: "Size (inch)" },
      { key: "price", label: "0.5 mm (₹)" },
      { key: "altPrice", label: "1 mm (₹)" },
    ],
    variants: [
      {
        title: "uPVC SS Clamps",
        rows: [
          { size: '1/2"', price: "4.50", altPrice: "6.69" },
          { size: '3/4"', price: "5.46", altPrice: "8.03" },
          { size: '1"', price: "6.88", altPrice: "9.37" },
          { size: '1.1/4"', price: "8.73", altPrice: "11.34" },
          { size: '1.1/2"', price: "10.32", altPrice: "13.90" },
          { size: '2"', price: "11.38", altPrice: "16.78" },
          { size: '2.1/2"', price: "13.23", altPrice: "20.41" },
          { size: '3"', price: "16.41", altPrice: "24.09" },
          { size: '4"', price: "20.37", altPrice: "26.08" },
        ],
      },
      {
        title: "cPVC SS Clamps",
        rows: [
          { size: '1/2"', price: "5.56", altPrice: "8.03" },
          { size: '3/4"', price: "6.88", altPrice: "9.37" },
          { size: '1"', price: "8.73", altPrice: "11.34" },
          { size: '1.1/4"', price: "10.32", altPrice: "13.90" },
          { size: '1.1/2"', price: "11.38", altPrice: "16.78" },
          { size: '2"', price: "13.23", altPrice: "20.41" },
        ],
      },
    ],
  },
  {
    slug: "gi-clamps",
    brand: "king-roar",
    category: "Pipe Clamps",
    name: "GI Clamps — Golden & Silver",
    short: "Galvanised-iron clamps in Golden & Silver finish",
    description:
      "GI clamps in 1 mm and 1.5 mm thickness with Golden and Silver finish, for uPVC and cPVC pipes. Sizes 1/2\" to 4\".",
    features: [
      "Galvanised iron body",
      "1 mm and 1.5 mm variants",
      "Golden and Silver finish",
      "For uPVC and cPVC piping",
    ],
    columns: [
      { key: "size", label: "Size (inch)" },
      { key: "price", label: "uPVC (₹)" },
      { key: "altPrice", label: "cPVC (₹)" },
    ],
    variants: [
      {
        title: "GI Clamps — 1 mm",
        rows: [
          { size: '1/2"', price: "3.77", altPrice: "3.18" },
          { size: '3/4"', price: "4.00", altPrice: "3.89" },
          { size: '1"', price: "4.47", altPrice: "4.12" },
          { size: '1.1/4"', price: "5.42", altPrice: "4.59" },
          { size: '1.1/2"', price: "6.36", altPrice: "5.53" },
          { size: '2"', price: "7.77", altPrice: "6.48" },
          { size: '2.1/2"', price: "12.48", altPrice: "—" },
          { size: '3"', price: "14.84", altPrice: "—" },
          { size: '4"', price: "17.19", altPrice: "—" },
        ],
      },
      {
        title: "GI Clamps — 1.5 mm",
        rows: [
          { size: '1/2"', price: "5.65", altPrice: "5.06" },
          { size: '3/4"', price: "6.59", altPrice: "5.77" },
          { size: '1"', price: "7.30", altPrice: "6.71" },
          { size: '1.1/4"', price: "8.24", altPrice: "7.54" },
          { size: '1.1/2"', price: "9.42", altPrice: "8.60" },
          { size: '2"', price: "11.78", altPrice: "9.77" },
          { size: '2.1/2"', price: "16.49", altPrice: "—" },
          { size: '3"', price: "19.55", altPrice: "—" },
          { size: '4"', price: "21.20", altPrice: "—" },
        ],
      },
    ],
  },

  // ============= DEVAM =============
  {
    slug: "devam-concealed-valve",
    brand: "devam",
    category: "Concealed Valves",
    name: "Devam uPVC / cPVC Concealed Valve — Regular Model",
    short: "Concealed valve for premium bathroom installations",
    description:
      "Regular model concealed valves for wall-mounted bathroom lines, available in both uPVC and cPVC bodies.",
    features: [
      "Regular model — proven design",
      "uPVC & cPVC options",
      "Sizes 1/2\", 3/4\" and 1\"",
      "Premium finish",
    ],
    columns: stdCols,
    variants: [
      {
        title: "uPVC Concealed Valve",
        rows: [
          { size: '1/2"', sizeMm: "15 mm", price: "565.00", innerPkt: "1", outerPkt: "70" },
          { size: '3/4"', sizeMm: "20 mm", price: "615.00", innerPkt: "1", outerPkt: "70" },
          { size: '1"', sizeMm: "25 mm", price: "860.00", innerPkt: "1", outerPkt: "70" },
        ],
      },
      {
        title: "cPVC Concealed Valve",
        rows: [
          { size: '3/4"', sizeMm: "15 mm", price: "615.00", innerPkt: "1", outerPkt: "70" },
          { size: '1"', sizeMm: "20 mm", price: "640.00", innerPkt: "1", outerPkt: "70" },
        ],
      },
    ],
  },
  {
    slug: "devam-nrv-valve",
    brand: "devam",
    category: "NRV Valves",
    name: "Devam uPVC / cPVC Non-Return Valve (NRV)",
    short: "One-way flow valve for uPVC & cPVC systems",
    description:
      "Non-return valves prevent backflow in plumbing lines. Available in uPVC and cPVC bodies, sizes 1/2\" to 1\".",
    features: [
      "Prevents backflow of water",
      "uPVC & cPVC options",
      "Compact concealed-friendly body",
    ],
    columns: stdCols,
    variants: [
      {
        title: "uPVC NRV Valve",
        rows: [
          { size: '1/2"', sizeMm: "15 mm", price: "250.00", innerPkt: "1", outerPkt: "200" },
          { size: '3/4"', sizeMm: "20 mm", price: "250.00", innerPkt: "1", outerPkt: "200" },
          { size: '1"', sizeMm: "25 mm", price: "250.00", innerPkt: "1", outerPkt: "200" },
        ],
      },
      {
        title: "cPVC NRV Valve",
        rows: [
          { size: '3/4"', sizeMm: "20 mm", price: "320.00", innerPkt: "1", outerPkt: "200" },
          { size: '1"', sizeMm: "25 mm", price: "320.00", innerPkt: "1", outerPkt: "200" },
        ],
      },
    ],
  },
  {
    slug: "cpvc-3in1-wall-mixer-adapter",
    brand: "devam",
    category: "Adapters",
    name: "cPVC 3-in-1 Wall Mixer Adapter",
    short: "3-in-1 wall mixer adapter for cPVC systems",
    description: "Single-piece adapter for connecting a 3/4\" cPVC line to a 1/2\" wall mixer outlet.",
    features: ["3-in-1 body", "3/4\" × 1/2\" size", "cPVC compatible"],
    columns: [
      { key: "size", label: "Size" },
      { key: "price", label: "Price (₹)" },
      { key: "innerPkt", label: "Inner Pkt" },
      { key: "outerPkt", label: "Outer Pkt" },
    ],
    variants: [
      {
        title: "3-in-1 Adapter",
        rows: [
          { size: '3/4" × 1/2"', price: "280.00", innerPkt: "1", outerPkt: "48" },
        ],
      },
    ],
  },
  {
    slug: "ptmt-connection-pipe",
    brand: "devam",
    category: "Connection Pipes",
    name: "Devam PTMT Connection Pipe",
    short: "Flexible PTMT connection pipe — Regular & Dolphin models",
    description:
      "PTMT connection pipes for tap-to-inlet connections. Lengths from 12\" to 36\". Available in Regular and Dolphin models.",
    features: [
      "PTMT construction — light and durable",
      "Regular and Dolphin models",
      "Five length options: 12\", 18\", 24\", 30\", 36\"",
    ],
    columns: [
      { key: "size", label: "Length" },
      { key: "price", label: "Price (₹)" },
      { key: "innerPkt", label: "Inner Pkt" },
      { key: "outerPkt", label: "Outer Pkt" },
    ],
    variants: [
      {
        title: "PTMT Connection Pipe",
        rows: [
          { size: '12"', price: "43.53", innerPkt: "2", outerPkt: "576" },
          { size: '18"', price: "49.52", innerPkt: "2", outerPkt: "336" },
          { size: '24"', price: "55.22", innerPkt: "2", outerPkt: "300" },
          { size: '30"', price: "60.91", innerPkt: "1", outerPkt: "288" },
          { size: '36"', price: "66.31", innerPkt: "1", outerPkt: "216" },
        ],
      },
    ],
  },
  {
    slug: "solvent-cement",
    brand: "devam",
    category: "Solvent Cement",
    name: "PVC / uPVC / cPVC Solvent Cement",
    short: "Medium and heavy-duty solvent cements",
    description:
      "Solvent cements for PVC (medium duty clear), uPVC (heavy duty white/blue) and cPVC (heavy duty yellow) piping. Available in tin sizes 60 ml to 946 ml.",
    features: [
      "PVC medium duty clear",
      "uPVC heavy duty white & blue",
      "cPVC heavy duty yellow",
      "5 tin sizes: 60, 118, 237, 474, 946 ml",
    ],
    columns: [
      { key: "size", label: "Size" },
      { key: "price", label: "PVC (₹)" },
      { key: "altPrice", label: "uPVC (₹)" },
      { key: "sizeMm", label: "cPVC (₹)" },
    ],
    variants: [
      {
        title: "Solvent Cement — All Grades",
        rows: [
          { size: "60 ml", price: "43.52", altPrice: "52.48", sizeMm: "64.00" },
          { size: "118 ml", price: "99.84", altPrice: "87.04", sizeMm: "112.64" },
          { size: "237 ml", price: "125.44", altPrice: "161.28", sizeMm: "186.88" },
          { size: "474 ml", price: "202.24", altPrice: "294.40", sizeMm: "358.40" },
          { size: "946 ml", price: "358.40", altPrice: "537.60", sizeMm: "665.60" },
        ],
      },
    ],
  },
  {
    slug: "sink-waste-pipe",
    brand: "devam",
    category: "Waste Pipes",
    name: "PVC Sink & Wash Basin Waste Pipe",
    short: "Suction and Premium Duct waste pipes — 2.5 & 3 ft",
    description:
      "PVC waste pipes for sink and wash-basin drains. Suction and Premium Duct types in 2.5 ft (30 inch) and 3 ft (36 inch) lengths.",
    features: [
      "Suction waste pipe — 2.5 ft & 3 ft",
      "Premium duct waste pipe — 2.5 ft & 3 ft",
      "Flexible PVC construction",
    ],
    columns: [
      { key: "size", label: "Type" },
      { key: "sizeMm", label: "Length" },
      { key: "price", label: "Price (₹)" },
      { key: "outerPkt", label: "Outer Pkt" },
    ],
    variants: [
      {
        title: "Waste Pipe",
        rows: [
          { size: "Suction", sizeMm: '2.5 ft / 30"', price: "36.45", outerPkt: "360" },
          { size: "Suction", sizeMm: '3 ft / 36"', price: "40.50", outerPkt: "360" },
          { size: "Premium Duct", sizeMm: '2.5 ft / 30"', price: "43.20", outerPkt: "360" },
          { size: "Premium Duct", sizeMm: '3 ft / 36"', price: "51.30", outerPkt: "360" },
        ],
      },
    ],
  },
  {
    slug: "waste-coupling",
    brand: "devam",
    category: "Couplings",
    name: "PVC & SS Waste & Sink Couplings",
    short: "Full range of waste and sink couplings",
    description:
      "Complete range of PVC and stainless-steel waste and sink couplings, including Matka, Royal and Devam SS variants.",
    features: [
      "PP waste coupling (single & dozen)",
      "SS waste coupling",
      "Matka & Royal 4\" PVC sink couplings",
      "Devam 4\" SS sink coupling",
    ],
    columns: [
      { key: "size", label: "Model" },
      { key: "price", label: "Price (₹)" },
      { key: "outerPkt", label: "Outer Pkt" },
    ],
    variants: [
      {
        title: "Waste & Sink Couplings",
        rows: [
          { size: "PP Waste Coupling (1 pc)", price: "30.00 / pc", outerPkt: "400 pcs" },
          { size: "PP Waste Coupling (Dozen)", price: "240.00 / dozen", outerPkt: "72 doz" },
          { size: "SS Waste Coupling", price: "102.00", outerPkt: "300 pcs" },
          { size: '4" Matka PVC Sink Waste', price: "92.00", outerPkt: "250" },
          { size: '4" Royal PVC Sink Waste', price: "102.00", outerPkt: "250" },
          { size: '4" Devam SS Sink Waste', price: "210.00", outerPkt: "250" },
        ],
      },
    ],
  },
  {
    slug: "soap-dishes-holders",
    brand: "devam",
    category: "Bathroom Accessories",
    name: "PP Soap Dishes, Tumbler Holders & Towel Ring",
    short: "Unbreakable PP bathroom accessories",
    description:
      "Complete range of unbreakable polypropylene bathroom accessories: single & double soap dishes, single & double tumbler holders, round towel ring.",
    features: [
      "Unbreakable polypropylene body",
      "Single & Double soap dishes",
      "Single & Double tumbler holders",
      "Natural round towel ring",
    ],
    columns: [
      { key: "size", label: "Item" },
      { key: "price", label: "Price (₹)" },
      { key: "innerPkt", label: "Inner" },
      { key: "outerPkt", label: "Outer" },
    ],
    variants: [
      {
        title: "Bathroom Accessories",
        rows: [
          { size: "Single Soap Dish", price: "30.00", innerPkt: "2", outerPkt: "216" },
          { size: "Double Soap Dish", price: "62.00", innerPkt: "2", outerPkt: "196" },
          { size: "Single Tumbler Holder", price: "54.00", innerPkt: "2", outerPkt: "184" },
          { size: "Double Tumbler Holder", price: "85.00", innerPkt: "2", outerPkt: "140" },
          { size: "Round Towel Ring", price: "58.00", innerPkt: "12", outerPkt: "180" },
        ],
      },
    ],
  },
  {
    slug: "plastic-showers",
    brand: "devam",
    category: "Bathware",
    name: "PP Square, Slim, Fan Showers",
    short: "Plastic shower head range",
    description:
      "PP shower heads in square (3×3, 4×4), round slim (4×4) and fan styles.",
    features: ["Square 3×3 & 4×4", "Round slim 4×4 white", "Fan shower"],
    columns: [
      { key: "size", label: "Model" },
      { key: "price", label: "Price (₹)" },
      { key: "outerPkt", label: "Outer Pkt" },
    ],
    variants: [
      {
        title: "Plastic Shower Range",
        rows: [
          { size: "3×3 Square Head Shower", price: "90.00", outerPkt: "150" },
          { size: "4×4 Square Head Shower", price: "107.00", outerPkt: "96" },
          { size: "4×4 Round Slim Shower (White)", price: "85.00", outerPkt: "150" },
          { size: "Fan Shower", price: "58.00", outerPkt: "150" },
        ],
      },
    ],
  },
  {
    slug: "nahani-trap",
    brand: "devam",
    category: "Drainage",
    name: "PVC Small Trap (Nahani Trap)",
    short: "Floor drain traps in 50, 63, 75 mm",
    description: "PVC Nahani floor drain traps in three sizes for bathroom and utility drainage.",
    features: ["50 mm, 63 mm, 75 mm", "PVC construction", "Standard bathroom fit"],
    columns: [
      { key: "size", label: "Size" },
      { key: "price", label: "Price (₹)" },
      { key: "outerPkt", label: "Outer Pkt" },
    ],
    variants: [
      {
        title: "Nahani Trap",
        rows: [
          { size: "50 mm", price: "29.72", outerPkt: "125" },
          { size: "63 mm", price: "39.63", outerPkt: "90" },
          { size: "75 mm", price: "50.46", outerPkt: "70" },
        ],
      },
    ],
  },
  {
    slug: "garden-jointer-hose",
    brand: "devam",
    category: "Garden Products",
    name: "Garden Pipe Jointer, Hose Connector & Coller",
    short: "Garden pipe accessories — jointers, connectors, collers",
    description:
      "Full range of garden pipe accessories: jointers (15/20/25 mm and reducers), PVC hose connectors (2\" to 4\", long & short) and PVC hose collers (1.25\" to 4\").",
    features: [
      "Jointers 15, 20, 25 mm + reducers",
      "PVC hose connectors 2\"–4\"",
      "PVC hose collers 1.25\"–4\"",
    ],
    columns: [
      { key: "size", label: "Item" },
      { key: "price", label: "Price (₹)" },
      { key: "outerPkt", label: "Outer Pkt" },
    ],
    variants: [
      {
        title: "Garden Pipe Jointer",
        rows: [
          { size: "15 mm Jointer", price: "81.33", outerPkt: "50/dozen" },
          { size: "20 mm Jointer", price: "89.86", outerPkt: "50/dozen" },
          { size: "25 mm Jointer", price: "102.63", outerPkt: "50/dozen" },
          { size: "15 mm × 20 mm Jointer", price: "97.00", outerPkt: "50/dozen" },
          { size: "20 mm × 25 mm Jointer", price: "107.70", outerPkt: "50/dozen" },
        ],
      },
      {
        title: "PVC Hose Connector (Long / Short)",
        rows: [
          { size: '2" (50 mm)', price: "34.00 / 34.00", outerPkt: "105" },
          { size: '2.5" (65 mm)', price: "50.00 / 50.00", outerPkt: "60" },
          { size: '3" (80 mm)', price: "74.00 / 58.00", outerPkt: "50" },
          { size: '3.5" (90 mm)', price: "— / 84.00", outerPkt: "50" },
          { size: '4" (100 mm)', price: "124.00 / 102.00", outerPkt: "28" },
        ],
      },
      {
        title: "PVC Hose Coller",
        rows: [
          { size: '1.25" (32 mm)', price: "18.00", outerPkt: "288" },
          { size: '1.5" (40 mm)', price: "24.00", outerPkt: "192" },
          { size: '2" (50 mm)', price: "34.00", outerPkt: "98" },
          { size: '2.5" (65 mm)', price: "48.00", outerPkt: "60" },
          { size: '3" (80 mm)', price: "70.00", outerPkt: "50" },
          { size: '4" (100 mm)', price: "98.00", outerPkt: "28" },
        ],
      },
    ],
  },
  {
    slug: "pvc-bore-cap",
    brand: "devam",
    category: "Bore Fittings",
    name: "PVC Bore Cap",
    short: "PVC bore caps 3\" to 8\"",
    description:
      "PVC bore caps in sizes 3\" through 8\", compatible with 1\" to 2.5\" pipes. For sealing borewell casings.",
    features: [
      "Sizes 3\" to 8\"",
      "Fits 1\" to 2.5\" pipes",
      "Weather-resistant PVC",
    ],
    columns: [
      { key: "size", label: "Cap Size" },
      { key: "sizeMm", label: "Pipe Size" },
      { key: "price", label: "Price (₹)" },
      { key: "outerPkt", label: "Outer Pkt" },
    ],
    variants: [
      {
        title: "PVC Bore Cap",
        rows: [
          { size: '3"', sizeMm: '1", 1.25"', price: "110.00", outerPkt: "96" },
          { size: '4"', sizeMm: '1", 1.25"', price: "130.00", outerPkt: "60" },
          { size: '5"', sizeMm: '1", 1.25", 1.5"', price: "130.00", outerPkt: "60" },
          { size: '6"', sizeMm: '1", 1.25", 1.5", 2"', price: "150.00", outerPkt: "48" },
          { size: '7"', sizeMm: '1", 1.25", 1.5", 2"', price: "176.00", outerPkt: "48" },
          { size: '8"', sizeMm: '1", 1.25", 1.5", 2", 2.5"', price: "234.00", outerPkt: "48" },
        ],
      },
    ],
  },
];

export const brands = {
  "king-roar": {
    slug: "king-roar",
    name: "King Roar",
    tagline: "Premium Pipe Fittings, Clamps & Bathware",
    description:
      "King Roar is Gravity Industries' flagship brand for uPVC and cPVC pipe fittings, valves, clamps and bathware. Every product carries the ISO 9001:2015 mark.",
    categories: [
      "Ball Valves",
      "Concealed Valves",
      "Bathroom Taps",
      "Bathware",
      "CP Fittings",
      "Pipe Clamps",
    ],
  },
  devam: {
    slug: "devam",
    name: "Devam",
    tagline: "Premium Bathware, Plumbing & Plastic Products",
    description:
      "Devam is Gravity Industries' bathware and plumbing solutions brand — concealed valves, NRVs, connection pipes, solvent cements, waste couplings, bathroom accessories and garden products.",
    categories: [
      "Concealed Valves",
      "NRV Valves",
      "Connection Pipes",
      "Adapters",
      "Solvent Cement",
      "Waste Pipes",
      "Couplings",
      "Bathroom Accessories",
      "Bathware",
      "Drainage",
      "Garden Products",
      "Bore Fittings",
    ],
  },
} as const;

export type BrandSlug = keyof typeof brands;

export const applications = [
  {
    slug: "residential",
    name: "Residential",
    description:
      "Complete plumbing, bathware and drainage solutions for individual homes, apartments and residential townships.",
    products: ["upvc-ball-valve", "cpvc-ball-valve", "devam-concealed-valve", "abs-showers"],
  },
  {
    slug: "commercial",
    name: "Commercial",
    description:
      "Reliable plumbing systems for offices, retail complexes, hotels and hospitals — from concealed valves to CP extension nipples.",
    products: ["king-roar-concealed-valve-a-type", "cp-extension-nipples", "gi-clamps"],
  },
  {
    slug: "industrial",
    name: "Industrial",
    description:
      "Heavy-duty pipe support systems, clamps and solvent cements engineered for industrial facilities and utility rooms.",
    products: ["metal-clamps", "ss-202-clamps", "solvent-cement"],
  },
  {
    slug: "agriculture",
    name: "Agriculture",
    description:
      "Garden pipe jointers, hose connectors and bore caps designed for farms, irrigation networks and horticulture.",
    products: ["garden-jointer-hose", "pvc-bore-cap"],
  },
  {
    slug: "water-supply",
    name: "Water Supply",
    description:
      "uPVC and cPVC ball valves, NRV valves and clamps for municipal and township water supply lines.",
    products: ["upvc-ball-valve", "cpvc-ball-valve", "devam-nrv-valve"],
  },
  {
    slug: "infrastructure",
    name: "Infrastructure",
    description:
      "GI, SS and metal clamps for large-scale infrastructure projects requiring dependable pipe support at scale.",
    products: ["gi-clamps", "ss-202-clamps", "metal-clamps"],
  },
  {
    slug: "construction",
    name: "Construction",
    description:
      "RCC nail clamps, PP taps and solvent cements — the everyday essentials that builders and contractors rely on.",
    products: ["rcc-nail-clamps", "pp-taps-regular-classic", "solvent-cement"],
  },
] as const;

export const timeline = [
  { year: "2010", title: "Gravity Industries founded", body: "Established in Rajkot with a clear mission — quality plumbing products for Indian homes and businesses." },
  { year: "2013", title: "Product range expanded", body: "Full range of uPVC and cPVC pipe fittings, valves and clamps added to the portfolio." },
  { year: "2016", title: "King Roar brand launched", body: "Flagship brand for premium pipe fittings, clamps and bathware introduced under the AA Group umbrella." },
  { year: "2019", title: "ISO 9001:2015 Certification", body: "Certified for quality management systems — a formal commitment to consistent product quality." },
  { year: "2021", title: "Devam bathware launched", body: "Devam brand added for premium bathware, concealed valves and plumbing accessories." },
  { year: "2024", title: "Nationwide distribution", body: "Serving dealers, distributors, builders and export buyers across India and beyond." },
] as const;

export const stats = [
  { value: "15+", label: "Years of manufacturing" },
  { value: "150+", label: "SKUs across two brands" },
  { value: "2", label: "Premium product brands" },
  { value: "ISO", label: "9001:2015 certified" },
] as const;

export function getProduct(slug: string): ProductSpec | undefined {
  return products.find((p) => p.slug === slug);
}
export function productsByBrand(brand: BrandSlug): ProductSpec[] {
  return products.filter((p) => p.brand === brand);
}
