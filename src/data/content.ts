import { IMG } from "../lib/img";

export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: string; // lucide name
  image: string;
  hero: string;
  intro: string;
  bullets: string[];
  idealFor: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "office-commercial-cleaning",
    title: "Office & Corporate Cleaning",
    short: "Spotless workspaces that keep your team healthy and your brand sharp.",
    icon: "Building2",
    image: IMG.office2,
    hero: IMG.modernOffice,
    intro:
      "Daily, nightly, or weekly janitorial programs for offices and corporate spaces across Orlando. We keep desks, restrooms, breakrooms, and common areas immaculate so your people show up to a workspace that reflects your standards.",
    bullets: [
      "Desk, surface & high-touch point disinfection",
      "Restroom sanitation & restocking",
      "Breakroom & kitchen detailing",
      "Trash, recycling & liner service",
      "Interior glass, lobbies & elevators",
      "Carpet vacuuming & hard-floor care",
    ],
    idealFor: ["Corporate offices", "Coworking spaces", "Law & finance firms", "Tech companies"],
  },
  {
    slug: "restaurant-kitchen-dishwashing",
    title: "Restaurant, Kitchen & Dishwashing",
    short: "Health-code-ready kitchens and dining rooms, cleaned by specialists.",
    icon: "UtensilsCrossed",
    image: IMG.kitchen,
    hero: IMG.restaurant,
    intro:
      "Our signature service. From back-of-house dishwashing and hood-adjacent degreasing to spotless dining rooms, we help Orlando restaurants stay inspection-ready and guest-perfect — every single shift.",
    bullets: [
      "Commercial dishwashing & ware handling",
      "Kitchen degreasing & floor scrubbing",
      "Dining room & front-of-house detailing",
      "Restroom sanitation",
      "Trash & grease-area upkeep",
      "Opening / closing cleaning shifts",
    ],
    idealFor: ["Restaurants", "Cafés & bakeries", "Ghost kitchens", "Catering & events"],
  },
  {
    slug: "medical-healthcare-cleaning",
    title: "Medical & Healthcare Cleaning",
    short: "Clinical-grade disinfection that meets healthcare expectations.",
    icon: "Stethoscope",
    image: IMG.medical,
    hero: IMG.hospital,
    intro:
      "Exam rooms, waiting areas, and labs demand a higher standard. Our trained crews follow disinfection protocols and use hospital-grade products to protect patients, staff, and your accreditation.",
    bullets: [
      "Hospital-grade disinfection",
      "Exam & treatment room turnover",
      "Waiting room & reception sanitation",
      "Restroom & high-touch protocols",
      "Biohazard-aware waste handling",
      "Flexible after-hours scheduling",
    ],
    idealFor: ["Medical & dental clinics", "Urgent care", "Labs", "Wellness & therapy centers"],
  },
  {
    slug: "retail-commercial-spaces",
    title: "Retail & Commercial Spaces",
    short: "Show-floor-ready cleanliness that protects your customer experience.",
    icon: "Store",
    image: IMG.lobby,
    hero: IMG.reception,
    intro:
      "First impressions sell. We keep retail floors, fitting rooms, lobbies, and entrances gleaming so every customer walks into a space that feels cared for.",
    bullets: [
      "Sales floor & entrance detailing",
      "Fitting room & restroom sanitation",
      "Glass, mirrors & display cases",
      "Hard-floor & carpet maintenance",
      "Trash & backroom upkeep",
      "Peak-season deep cleans",
    ],
    idealFor: ["Retail stores", "Showrooms", "Salons & spas", "Fitness studios"],
  },
  {
    slug: "floor-care-deep-cleaning",
    title: "Floor Care & Deep Cleaning",
    short: "Strip, wax, scrub, and restore — floors that look brand new.",
    icon: "Sparkles",
    image: IMG.floorShine,
    hero: IMG.mopping,
    intro:
      "Periodic deep cleaning that resets your space. We strip and wax VCT, scrub and polish hard floors, and extract carpets to pull out what daily cleaning can't.",
    bullets: [
      "Strip & wax VCT / vinyl",
      "Tile & grout deep scrub",
      "Carpet hot-water extraction",
      "Hardwood & concrete polishing",
      "Post-event & quarterly resets",
      "Machine buffing & burnishing",
    ],
    idealFor: ["Offices", "Retail", "Warehouses", "Schools & churches"],
  },
  {
    slug: "post-construction-cleaning",
    title: "Post-Construction Cleaning",
    short: "From dusty build-out to move-in ready, on schedule.",
    icon: "HardHat",
    image: IMG.detail,
    hero: IMG.glassOffice,
    intro:
      "New build or renovation? We handle the fine dust, debris, and finish cleaning that turns a construction site into a space that's ready for its first day of business.",
    bullets: [
      "Construction dust & debris removal",
      "Fine-detail surface cleaning",
      "Window, frame & fixture cleaning",
      "Floor prep, finish & polish",
      "Restroom & kitchen commissioning",
      "Punch-list-driven final walkthrough",
    ],
    idealFor: ["General contractors", "Property managers", "New tenants", "Build-outs"],
  },
];

export const STATS = [
  { value: "500+", label: "Commercial cleans completed" },
  { value: "4.9★", label: "Average client rating" },
  { value: "24/7", label: "Scheduling flexibility" },
  { value: "100%", label: "Satisfaction guarantee" },
];

export const DIFFERENTIATORS = [
  {
    icon: "ShieldCheck",
    title: "Bonded, insured & vetted",
    body: "Every crew member is background-checked, trained, and covered — so you carry zero risk.",
  },
  {
    icon: "Clock",
    title: "After-hours & flexible",
    body: "Day porters, nightly cleans, or weekend resets. We work around your business, not the other way around.",
  },
  {
    icon: "Leaf",
    title: "Green-certified products",
    body: "EPA-approved, low-VOC solutions that are safe for your staff, clients, and the planet.",
  },
  {
    icon: "MessageSquare",
    title: "One dedicated contact",
    body: "No call centers. A single account manager who knows your space and answers fast.",
  },
  {
    icon: "ClipboardCheck",
    title: "Quality-checked visits",
    body: "Photo-verified checklists after every visit so nothing slips through the cracks.",
  },
  {
    icon: "BadgeDollarSign",
    title: "Transparent flat pricing",
    body: "Clear monthly rates with no surprise fees. You always know exactly what you pay for.",
  },
];

export const PROCESS = [
  {
    step: "01",
    title: "Free walkthrough",
    body: "We visit your space, understand your needs, and map every area that matters to you.",
  },
  {
    step: "02",
    title: "Custom cleaning plan",
    body: "You get a tailored scope and a transparent flat quote — usually within 24 hours.",
  },
  {
    step: "03",
    title: "Trained crew deployed",
    body: "A dedicated, vetted team starts on your schedule with a documented checklist.",
  },
  {
    step: "04",
    title: "Verified & refined",
    body: "Photo-verified quality checks and a direct line to adjust anything, anytime.",
  },
];

export type Testimonial = { quote: string; name: string; role: string; rating: number };

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "BJUFILA transformed our restaurant's back-of-house. Our last health inspection was the smoothest we've ever had. Reliable, thorough, and genuinely kind people.",
    name: "Marcus D.",
    role: "Owner, Downtown Orlando Bistro",
    rating: 5,
  },
  {
    quote:
      "We manage six office buildings and BJUFILA is the only vendor that never needs chasing. Photo checklists after every visit — total peace of mind.",
    name: "Priya S.",
    role: "Facilities Director, Lake Nona",
    rating: 5,
  },
  {
    quote:
      "Our clinic needs clinical-grade disinfection and after-hours scheduling. They nailed both from day one. Patients constantly comment on how clean we are.",
    name: "Dr. Alan R.",
    role: "Practice Manager, Winter Park",
    rating: 5,
  },
  {
    quote:
      "Switched from a national franchise and the difference is night and day. Real accountability, fair pricing, and a person who actually answers the phone.",
    name: "Jessica M.",
    role: "Office Manager, Maitland",
    rating: 5,
  },
];

export const FAQS = [
  {
    q: "What areas around Orlando do you serve?",
    a: "We serve the greater Orlando metro, including Winter Park, Kissimmee, Lake Nona, Altamonte Springs, Maitland, Sanford, and Downtown Orlando. If you're nearby, ask us — we likely cover you.",
  },
  {
    q: "Are you insured and bonded?",
    a: "Yes. BJUFILA is fully insured and bonded, and every crew member is background-checked and trained before entering your facility. You carry zero liability risk.",
  },
  {
    q: "Can you clean after business hours?",
    a: "Absolutely. Most of our commercial clients prefer nightly or early-morning service so cleaning never disrupts their operations. We build the schedule around you.",
  },
  {
    q: "How is pricing determined?",
    a: "Pricing is based on your square footage, facility type, and cleaning frequency. After a quick free walkthrough we send a transparent flat monthly quote — no hidden fees.",
  },
  {
    q: "Do you bring your own supplies and equipment?",
    a: "Yes. We arrive fully equipped with EPA-approved, green-certified products and commercial-grade equipment. If you prefer specific products, we're happy to accommodate.",
  },
  {
    q: "How quickly can you start?",
    a: "In most cases we can complete a walkthrough within 48 hours and begin service the same week. Need something urgent? Call us at (407) 286-0078.",
  },
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
  cover: string;
  body: { h?: string; p?: string; list?: string[] }[];
};

const POSTS_EN: Post[] = [
  {
    slug: "commercial-cleaning-cost-orlando",
    title: "How Much Does Commercial Cleaning Cost in Orlando? (2026 Guide)",
    excerpt:
      "A transparent breakdown of what offices, restaurants, and medical facilities in Orlando can expect to pay for professional commercial cleaning in 2026.",
    date: "2026-06-18",
    readingTime: "6 min read",
    category: "Pricing",
    cover: IMG.supplies,
    body: [
      {
        p: "If you're budgeting for commercial cleaning in Orlando, you've probably noticed quotes vary wildly. Here's how pricing actually works — and how to make sure you're comparing apples to apples.",
      },
      { h: "What drives commercial cleaning pricing" },
      {
        p: "Three factors determine almost every commercial cleaning quote in the Orlando market: the size of your space, the type of facility, and how often you need service.",
      },
      {
        list: [
          "Square footage — larger spaces cost more, but usually less per square foot.",
          "Facility type — medical and restaurant spaces require specialized protocols and cost more than standard offices.",
          "Frequency — daily service has a lower per-visit rate than a one-time deep clean.",
          "Scope — floor care, windows, and disinfection add-ons affect the total.",
        ],
      },
      { h: "Typical Orlando price ranges" },
      {
        p: "For a standard office in the Orlando metro, most businesses pay between $0.08 and $0.20 per square foot per visit. Restaurants and medical facilities trend higher due to specialized requirements. A flat monthly retainer almost always beats hourly billing for predictability.",
      },
      { h: "Why the cheapest quote often costs more" },
      {
        p: "A lowball quote frequently means undertrained crews, high turnover, and skipped tasks — which leads to failed inspections and re-cleans. Look for a bonded, insured provider that documents every visit. Reliability is the real value.",
      },
      { h: "Get a transparent quote" },
      {
        p: "At BJUFILA we send a flat monthly quote after a free walkthrough — no hidden fees, no surprises. Call (407) 286-0078 or request a quote online to see exactly what your space would cost.",
      },
    ],
  },
  {
    slug: "restaurant-cleaning-checklist",
    title: "The Restaurant Cleaning Checklist That Keeps You Inspection-Ready",
    excerpt:
      "A shift-by-shift commercial kitchen and dining room cleaning checklist Orlando restaurants use to pass health inspections with confidence.",
    date: "2026-06-05",
    readingTime: "7 min read",
    category: "Restaurants",
    cover: IMG.kitchen,
    body: [
      {
        p: "In Florida, a single failed health inspection can damage a restaurant's reputation overnight. The good news: staying inspection-ready is mostly about consistency. Here's the checklist our crews run.",
      },
      { h: "Opening shift" },
      {
        list: [
          "Sanitize all prep surfaces and cutting stations",
          "Check and wipe down handwashing stations, restock soap and towels",
          "Inspect floors for overnight spills or pests",
          "Sanitize door handles and high-touch points",
        ],
      },
      { h: "During service" },
      {
        list: [
          "Keep dish pit moving — no backlog of soiled ware",
          "Spot-clean spills immediately to prevent slips",
          "Wipe dining tables and menus between guests",
          "Empty trash before it overflows",
        ],
      },
      { h: "Closing shift" },
      {
        list: [
          "Full kitchen degrease — floors, equipment exteriors, and mats",
          "Run and sanitize all dishware and smallwares",
          "Deep-clean restrooms and restock",
          "Detail the dining room and reset for tomorrow",
        ],
      },
      { h: "Where a cleaning partner helps" },
      {
        p: "Most owners can't ask an exhausted closing crew to also deep-clean. That's where a specialized cleaning partner comes in — handling dishwashing, degreasing, and detailing so your staff focus on guests. That's exactly what BJUFILA was built to do.",
      },
    ],
  },
  {
    slug: "office-cleaning-employee-health",
    title: "How a Clean Office Reduces Sick Days and Boosts Productivity",
    excerpt:
      "The data-backed link between professional office cleaning, employee health, and productivity — and what to prioritize in a Florida workplace.",
    date: "2026-05-22",
    readingTime: "5 min read",
    category: "Offices",
    cover: IMG.modernOffice,
    body: [
      {
        p: "A clean office isn't just about appearances. High-touch surfaces in a typical workplace harbor more bacteria than most people realize — and that translates directly into sick days.",
      },
      { h: "The high-touch hotspots" },
      {
        list: [
          "Door handles and shared light switches",
          "Breakroom counters, fridge handles, and coffee machines",
          "Keyboards, phones, and shared desks",
          "Restroom fixtures",
        ],
      },
      { h: "What consistent cleaning delivers" },
      {
        p: "Regular professional disinfection of these hotspots measurably reduces the spread of common illnesses. Fewer sick days means more consistent output — and employees who feel their employer cares about their environment report higher satisfaction.",
      },
      { h: "Build it into your routine" },
      {
        p: "The key word is consistent. A one-time deep clean fades fast. A recurring janitorial program keeps hotspots under control year-round. BJUFILA builds nightly and weekly programs tailored to Orlando offices — request a walkthrough to get started.",
      },
    ],
  },
  {
    slug: "green-cleaning-benefits",
    title: "Green Cleaning: Why EPA-Approved Products Matter for Your Business",
    excerpt:
      "What green commercial cleaning actually means, and why low-VOC, EPA-approved products are better for your staff, clients, and bottom line.",
    date: "2026-05-08",
    readingTime: "4 min read",
    category: "Sustainability",
    cover: IMG.disinfect,
    body: [
      {
        p: "\"Green cleaning\" gets thrown around a lot. Here's what it genuinely means and why it's worth prioritizing for your commercial space.",
      },
      { h: "What makes cleaning 'green'" },
      {
        list: [
          "EPA-approved, low-VOC (volatile organic compound) products",
          "Reduced harsh chemical residue on surfaces",
          "Microfiber systems that trap more with less water",
          "Concentrated products that cut packaging waste",
        ],
      },
      { h: "The business case" },
      {
        p: "Low-VOC products improve indoor air quality, which reduces headaches and respiratory irritation for staff and visitors. For medical and childcare-adjacent spaces, it's practically essential. And it signals to clients that your business takes health seriously.",
      },
      { h: "Our approach" },
      {
        p: "BJUFILA uses green-certified products by default, with the option to tailor to your facility's specific requirements. Cleaner space, healthier people, zero compromise on results.",
      },
    ],
  },
];

const POSTS_ES: Post[] = [
  {
    slug: "commercial-cleaning-cost-orlando",
    title: "¿Cuánto Cuesta la Limpieza Comercial en Orlando? (Guía 2026)",
    excerpt:
      "Un desglose transparente de lo que las oficinas, restaurantes e instalaciones médicas en Orlando pueden esperar pagar por limpieza comercial profesional en 2026.",
    date: "2026-06-18",
    readingTime: "6 min lectura",
    category: "Precios",
    cover: IMG.supplies,
    body: [
      {
        p: "Si estás presupuestando para limpieza comercial en Orlando, probablemente hayas notado que los presupuestos varían mucho. Aquí está cómo funcionan realmente los precios — y cómo asegurarse de que estés comparando manzanas con manzanas.",
      },
      { h: "Qué impulsa los precios de la limpieza comercial" },
      {
        p: "Tres factores determinan casi todos los presupuestos de limpieza comercial en el mercado de Orlando: el tamaño de tu espacio, el tipo de instalación y con qué frecuencia necesitas servicio.",
      },
      {
        list: [
          "Metraje cuadrado — espacios más grandes cuestan más, pero generalmente menos por pie cuadrado.",
          "Tipo de instalación — las instalaciones médicas y de restaurantes requieren protocolos especializados y cuestan más que las oficinas estándar.",
          "Frecuencia — el servicio diario tiene una tarifa más baja por visita que una limpieza profunda única.",
          "Alcance — cuidado de pisos, ventanas y complementos de desinfección afectan el total.",
        ],
      },
      { h: "Rangos de precios típicos de Orlando" },
      {
        p: "Para una oficina estándar en el área metropolitana de Orlando, la mayoría de los negocios pagan entre $0.08 y $0.20 por pie cuadrado por visita. Los restaurantes e instalaciones médicas tienden a ser más altos debido a los requisitos especializados. Un retainer mensual plano casi siempre vence el cobro por hora en cuanto a previsibilidad.",
      },
      { h: "Por qué el presupuesto más barato a menudo cuesta más" },
      {
        p: "Un presupuesto bajo frecuentemente significa equipos sin entrenamiento, alta rotación de personal y tareas omitidas — lo que lleva a inspecciones fallidas y re-limpiezas. Busca un proveedor asegurado y garantizado que documenta cada visita. La confiabilidad es el valor real.",
      },
      { h: "Obtén un presupuesto transparente" },
      {
        p: "En BJUFILA enviamos un presupuesto mensual plano después de una caminata libre — sin cargos ocultos, sin sorpresas. Llama al (407) 286-0078 o solicita un presupuesto en línea para ver exactamente cuánto costaría tu espacio.",
      },
    ],
  },
  {
    slug: "restaurant-cleaning-checklist",
    title: "La Lista de Verificación de Limpieza de Restaurante que Te Mantiene Listo para la Inspección",
    excerpt:
      "Una lista de verificación de limpieza de cocina comercial y comedor turno por turno que usan los restaurantes de Orlando para pasar inspecciones de salud con confianza.",
    date: "2026-06-05",
    readingTime: "7 min lectura",
    category: "Restaurantes",
    cover: IMG.kitchen,
    body: [
      {
        p: "En Florida, una única inspección de salud fallida puede dañar la reputación de un restaurante de la noche a la mañana. La buena noticia: mantenerse listo para la inspección es en su mayoría cuestión de consistencia. Aquí está la lista que nuestros equipos ejecutan.",
      },
      { h: "Turno de apertura" },
      {
        list: [
          "Desinfectar todas las superficies de preparación y estaciones de corte",
          "Revisar y limpiar las estaciones de lavado de manos, reabastecer jabón y toallas",
          "Inspeccionar pisos para derrames nocturnos o plagas",
          "Desinfectar manijas de puertas y puntos de alto contacto",
        ],
      },
      { h: "Durante el servicio" },
      {
        list: [
          "Mantener el pit de platos en movimiento — sin acumulación de vajilla sucia",
          "Limpiar derrames inmediatamente para prevenir caídas",
          "Limpiar mesas de comedor y menús entre clientes",
          "Vaciar basura antes de que se desborde",
        ],
      },
      { h: "Turno de cierre" },
      {
        list: [
          "Desengrasante completo de cocina — pisos, exteriores de equipo y esteras",
          "Ejecutar y desinfectar toda la vajilla y pequeños utensilios",
          "Limpiar baños profundamente y reabastecer",
          "Detallar el comedor y prepararse para mañana",
        ],
      },
      { h: "Dónde ayuda un socio de limpieza" },
      {
        p: "La mayoría de los dueños no pueden pedir a un equipo de cierre agotado que también limpie profundamente. Aquí es donde entra un socio de limpieza especializado — manejando lavaplatos, desengrasante y detallado para que tu personal se enfoque en los clientes. Eso es exactamente para lo que fue construido BJUFILA.",
      },
    ],
  },
  {
    slug: "office-cleaning-employee-health",
    title: "Cómo una Oficina Limpia Reduce Días de Enfermedad y Aumenta la Productividad",
    excerpt:
      "El vínculo respaldado por datos entre la limpieza profesional de oficinas, la salud de los empleados y la productividad — y qué priorizar en un lugar de trabajo de Florida.",
    date: "2026-05-22",
    readingTime: "5 min lectura",
    category: "Oficinas",
    cover: IMG.modernOffice,
    body: [
      {
        p: "Una oficina limpia no es solo cuestión de apariencias. Las superficies de alto contacto en un lugar de trabajo típico albergan más bacterias de lo que la mayoría de las personas se dan cuenta — y eso se traduce directamente en días de enfermedad.",
      },
      { h: "Los puntos calientes de alto contacto" },
      {
        list: [
          "Manijas de puertas y interruptores de luz compartidos",
          "Encimeras de comedor, manijas de refrigerador y máquinas de café",
          "Teclados, teléfonos y escritorios compartidos",
          "Accesorios de baño",
        ],
      },
      { h: "Lo que la limpieza consistente entrega" },
      {
        p: "La desinfección profesional regular de estos puntos reduce mediblemente la propagación de enfermedades comunes. Menos días de enfermedad significa más producción consistente — y los empleados que sienten que su empleador se preocupa por su ambiente reportan mayor satisfacción.",
      },
      { h: "Constrúyelo en tu rutina" },
      {
        p: "La palabra clave es consistente. Una limpieza profunda única se desvanece rápidamente. Un programa de conserjería recurrente mantiene los puntos calientes bajo control todo el año. BJUFILA construye programas nocturnos y semanales adaptados a las oficinas de Orlando — solicita una caminata para comenzar.",
      },
    ],
  },
  {
    slug: "green-cleaning-benefits",
    title: "Limpieza Ecológica: Por Qué los Productos Aprobados por la EPA Importan para tu Negocio",
    excerpt:
      "Qué significa realmente la limpieza comercial ecológica, y por qué los productos bajos en COV aprobados por la EPA son mejores para tu personal, clientes y resultado final.",
    date: "2026-05-08",
    readingTime: "4 min lectura",
    category: "Sostenibilidad",
    cover: IMG.disinfect,
    body: [
      {
        p: "\"Limpieza ecológica\" se usa mucho. Aquí está lo que genuinamente significa y por qué vale la pena priorizarlo para tu espacio comercial.",
      },
      { h: "Qué hace que la limpieza sea 'ecológica'" },
      {
        list: [
          "Productos aprobados por la EPA bajos en COV (compuestos orgánicos volátiles)",
          "Residuo de químicos ásperos reducidos en las superficies",
          "Sistemas de microfibra que atrapan más con menos agua",
          "Productos concentrados que reducen el desperdicio de empaque",
        ],
      },
      { h: "El caso empresarial" },
      {
        p: "Los productos bajos en COV mejoran la calidad del aire interior, lo que reduce dolores de cabeza e irritación respiratoria para el personal y visitantes. Para espacios adyacentes a médicos y guarderías, es prácticamente esencial. Y señala a los clientes que tu negocio se toma la salud en serio.",
      },
      { h: "Nuestro enfoque" },
      {
        p: "BJUFILA usa productos certificados como ecológicos por defecto, con la opción de adaptarse a los requisitos específicos de tu instalación. Espacio más limpio, personas más saludables, cero compromiso en los resultados.",
      },
    ],
  },
];

export { POSTS_EN, POSTS_ES };
export const POSTS = POSTS_EN;

export const GALLERY = [
  { id: IMG.modernOffice, label: "Corporate Office", cat: "Office" },
  { id: IMG.kitchen, label: "Commercial Kitchen", cat: "Restaurant" },
  { id: IMG.hospital, label: "Medical Facility", cat: "Medical" },
  { id: IMG.reception, label: "Reception & Lobby", cat: "Office" },
  { id: IMG.restaurant, label: "Dining Room", cat: "Restaurant" },
  { id: IMG.floorShine, label: "Floor Restoration", cat: "Floor Care" },
  { id: IMG.glassOffice, label: "Glass & Windows", cat: "Office" },
  { id: IMG.meeting, label: "Conference Rooms", cat: "Office" },
  { id: IMG.window, label: "Window Detailing", cat: "Floor Care" },
  { id: IMG.medical, label: "Exam Rooms", cat: "Medical" },
  { id: IMG.coworking, label: "Coworking Space", cat: "Office" },
  { id: IMG.desks, label: "Workstations", cat: "Office" },
];
