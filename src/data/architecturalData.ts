import { Project, DigitalProduct, PeerReview, FaqItem } from '../types/architecture';

import architectPortrait from '../assets/images/architect_portrait_1790154927894.jpg';
import brutalistPavilion from '../assets/images/brutalist_concrete_pavilion_1790154942499.jpg';
import timberPavilion from '../assets/images/sculptural_timber_pavilion_1790154966153.jpg';
import axonometricDrawing from '../assets/images/axonometric_blueprint_drawing_1790154990027.jpg';
import parametricFacade from '../assets/images/parametric_facade_tower_1790155051340.jpg';
import studioCritiqueVideo from '../assets/images/architect_studio_critique_1790155002878.jpg';

import obsidianGrandSalon from '../assets/images/obsidian_salon_acoustic_slats_1790529197403.jpg';
import obsidianDiningSalon from '../assets/images/obsidian_dining_fluted_salon_1790529208299.jpg';
import obsidianSanctuarySuite from '../assets/images/obsidian_sanctuary_bedroom_1790529218498.jpg';
import obsidianPenthouseAtrium from '../assets/images/obsidian_penthouse_atrium_1790529229025.jpg';

import rgLogoImg from '../assets/images/rg_gold_crest_dark_bg_1790532962503.jpg';

export const ARCHITECT_INFO = {
  name: 'Richard Godwin',
  logo: rgLogoImg,
  email: 'goldengiftahuruonye@gmail.com',
  inquiryEmail: 'goldengiftahuruonye@gmail.com',
  titles: 'Principal Architect & Spatial Theorist',
  credentials: 'AIA, RIBA, SIA',
  studio: 'Atelier Godwin',
  location: 'Zurich & New York',
  experience: '15+ Years of Practice',
  portrait: architectPortrait,
  videoThumbnail: studioCritiqueVideo,
  bioSummary: `Over the past 15+ years, Richard Godwin has directed spatial masterplans, monolithic private residences, and cultural pavilions across North America, the Swiss Alps, and Scandinavia. His practice operates at the intersection of geological permanence, daylight choreography, and tectonic precision.`,
  bioExtended: `Through rigorous drawing analysis, physical scale casting, and direct spatial masterclasses, he has advised over 300+ practicing architects and computational design leads worldwide, teaching the art of quiet proportion, detailing discipline, and resilient architectural assemblies.`,
  mentorship: {
    cohort: 'Cohort 04',
    title: '1:1 Architectural Advisory & Design Critique',
    subtitle: 'Advance your tectonic design leadership, construction detailing, and boutique studio practice.',
    duration: '6-Month Intensive Cohort',
    cadence: 'Bi-weekly 90-min deep-dive drawing & technical reviews',
    method: 'Async redline drawing markups + private BIM critique room',
    spotsTotal: 12,
    spotsRemaining: 3,
    videoDuration: '04:12 / 18:30'
  }
};

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'obsidian-grand-salon',
    title: 'Obsidian Slat Residence — Grand Salon',
    subtitle: 'Vertical acoustic timber louvers & recessed linear light choreography',
    category: 'Residential',
    year: '2025',
    location: 'Zurich Berg, Switzerland',
    area: '540 m²',
    client: 'Private Commission',
    materials: ['Acoustic Dark Oak Slats', 'Blackened Steel Reveals', 'Honed Basalt'],
    description: 'A sanctuary of shadow and warmth, featuring rhythmic acoustic dark timber louvers, linear recessed ceiling light channels, and low-slung modular seating.',
    fullNarrative: 'Engineered with sound-diffusing micro-perforated timber blades and integrated 2700K indirect LED profiles. The space balances deep charcoal tones with warm ambient reflections across polished dark flooring.',
    image: obsidianGrandSalon,
    photographerCredit: 'Godwin Studio Archive'
  },
  {
    id: 'obsidian-dining-salon',
    title: 'Basalt & Fluted Timber Dining Pavilion',
    subtitle: 'Concealed ambient cove illumination & monolithic stone dining plane',
    category: 'Residential',
    year: '2025',
    location: 'Engadin Valley, Switzerland',
    area: '380 m²',
    client: 'Alpine Arts Patron',
    materials: ['Honed Black Granite', 'Fluted Charcoal Walnut', 'Architectural Bronze'],
    description: 'An intimate dining and reception salon clad in precision-milled fluted acoustic timber, anchored by a monolithic honed granite table with soft under-counter illumination.',
    fullNarrative: 'Custom millwork panels integrate concealed climate diffusers and acoustic insulation backing. Dimmable warm cove lighting creates a contemplative, elevated atmosphere for evening discourse.',
    image: obsidianDiningSalon,
    photographerCredit: 'Lucia Soriano'
  },
  {
    id: 'obsidian-sanctuary-suite',
    title: 'Acoustic Slatted Sanctuary Suite',
    subtitle: 'Minimalist master suite with integrated halo timber headboard',
    category: 'Residential',
    year: '2024',
    location: 'Oslo, Norway',
    area: '290 m²',
    client: 'Private Collector',
    materials: ['Dark Smoked Oak Louvers', 'Textured Charcoal Lime Plaster', 'Cast Bronze'],
    description: 'A private bedroom haven characterized by vertical timber slat textures, concealed halo perimeter illumination, and a low platform bed resting on dark flooring.',
    fullNarrative: 'Designed around diurnal circadian rhythms, where recessed ceiling channels and indirect vertical headboard backlights deliver a restful, sensory retreat free of visual clutter.',
    image: obsidianSanctuarySuite,
    photographerCredit: 'Einar Lindqvist'
  },
  {
    id: 'obsidian-penthouse-atrium',
    title: 'Monolithic Double-Height Penthouse Atrium',
    subtitle: 'Monumental acoustic timber feature wall & cantilevered tread lighting',
    category: 'Residential',
    year: '2025',
    location: 'Manhattan, New York',
    area: '760 m²',
    client: 'Godwin Private Client',
    materials: ['Two-Storey Timber Slat Wall', 'Smoked Glass', 'Basalt Floor Slabs'],
    description: 'An expansive double-height living atrium framed by monumental dark acoustic timber blades, sculptural geometry, and illuminated floating stairs.',
    fullNarrative: 'A masterclass in volumetric drama, featuring custom linear ceiling lighting grids, low-profile designer lounge elements, and seamless materiality running through both levels.',
    image: obsidianPenthouseAtrium,
    photographerCredit: 'Marc Schweizer'
  },
  {
    id: 'nordic-pavilion',
    title: 'Nordic Forest Pavilion',
    subtitle: 'Board-formed concrete & cantilevered glass reflecting pool',
    category: 'Pavilion',
    year: '2025',
    location: 'Vestfold, Norway',
    area: '480 m²',
    client: 'Private Collector',
    materials: ['Board-Formed Concrete', 'Low-Iron Structural Glass', 'Charred Larch'],
    description: 'A monolithic concrete volume nestled into glacial granite bedrock, cantilevered over a mirrored reflecting basin to dissolve the boundary between forest and shelter.',
    fullNarrative: 'The residence is formed from in-situ basalt aggregate concrete with custom horizontal timber formwork. Floor-to-ceiling triple glazing frames 180-degree fjord panoramas while integrated geothermal mass warms the stone floor slabs year-round.',
    image: brutalistPavilion,
    photographerCredit: 'Einar Lindqvist'
  },
  {
    id: 'timber-canopy',
    title: 'Kyoto Timber Lattice Pavilion',
    subtitle: 'Acoustic spatial canopy formed from cedar joinery',
    category: 'Cultural',
    year: '2024',
    location: 'Kyoto, Japan',
    area: '340 m²',
    client: 'Zenith Arts Commission',
    materials: ['Japanese Hinoki Cedar', 'Blackened Steel Dowels', 'Granite Paving'],
    description: 'A multi-axis reciprocal timber lattice engineered without glue, paying homage to traditional Japanese joinery while deploying modern parametric curvature.',
    fullNarrative: 'Commissioned for meditative tea ceremonies and acoustic string performances. The hyperbolic timber structure filters direct mountain wind into gentle ambient airflow.',
    image: timberPavilion,
    photographerCredit: 'Kenji Takahashi'
  },
  {
    id: 'axonometric-museum',
    title: 'Berlin Museum Axonometric',
    subtitle: 'Structural section drawing & subterranean gallery circulation',
    category: 'Theoretical',
    year: '2025',
    location: 'Berlin, Germany',
    area: '4,200 m²',
    client: 'Prussian Cultural Heritage',
    materials: ['Post-Tensioned Concrete', 'Titanium Zinc Roof', 'Terrazzo'],
    description: 'Technical isometric drafting exploring public ramp circulation, daylight filtration, and HVAC tectonic integration in a multi-level civic gallery.',
    fullNarrative: 'Detailed section analysis published in the Architectural Association Journal, demonstrating how concealed mechanical shafts can double as natural acoustic baffle resonators.',
    image: axonometricDrawing,
    photographerCredit: 'Atelier Godwin Archive'
  },
  {
    id: 'parametric-facade',
    title: 'Zurich Financial Spire Facade',
    subtitle: 'Solar-tracking bronze louvers & double-skin climate envelope',
    category: 'Commercial',
    year: '2024',
    location: 'Zurich, Switzerland',
    area: '14,800 m²',
    client: 'Helvetia Real Estate Group',
    materials: ['Anodized Architectural Bronze', 'Triple Cavity Glass', 'Stainless Steel Knuckles'],
    description: 'An adaptive kinetic facade comprising 1,200 motorized bronze aerofoil fins that optimize daylight harvest while mitigating peak solar thermal gain by 64%.',
    fullNarrative: 'Developed using bespoke Grasshopper computational scripts and wind tunnel aerodynamic simulations to eliminate aerodynamic wind whistling at high altitudes.',
    image: parametricFacade,
    photographerCredit: 'Stefan Huber'
  }
];

export const DIGITAL_PRODUCTS: DigitalProduct[] = [
  {
    id: 'revit-detail-library',
    title: 'Architectural Detail Standard Library 2026',
    shortDesc: '180+ production BIM assemblies, recessed linear lighting & wall profiles.',
    fullDesc: 'The definitive architectural detailing system trusted by over 1,400+ studios globally. Includes waterproofing membranes, recessed geometric linear lighting channels, acoustic slatted wall interfaces, flush floor-to-ceiling transitions, and AIA-compliant layer standards.',
    price: 149.00,
    originalPrice: 199.00,
    badge: 'Bestseller',
    format: ['RVT (Revit 2023-2026)', 'DWG', 'DXF', 'Vector PDF'],
    image: '/Art Collection 1.png',
    webpImage: '/Art Collection 1.webp',
    srcsetWebp: '/Art Collection 1-400.webp 400w, /Art Collection 1-800.webp 800w, /Art Collection 1.webp 1800w',
    fileSize: '1.42 GB .ZIP',
    modulesOrPages: '180+ Parametric Assemblies',
    whatsIncluded: [
      'Full Revit Container File (.RVT) with preloaded wall/roof types',
      'Individual 2D/3D Detail Drafting Views with dynamic annotations',
      'DWG and DXF master sheets formatted with strict Lineweight CTB',
      'Comprehensive 64-page PDF Detail Compendium & Specification Guide',
      'Lifetime updates for upcoming building code revisions'
    ]
  },
  {
    id: 'parametric-facade-toolkit',
    title: 'Parametric Interior & Curved Joinery Toolkit',
    shortDesc: '400+ computational Grasshopper scripts, organic curved seating & media niches.',
    fullDesc: 'Engineered for computational architects and interior designers. Generates organic pebble-curved modular seating, integrated millwork media walls, illuminated display niches, and CNC unroll fabrication schedules with clean, annotated node workflows.',
    price: 89.00,
    originalPrice: 120.00,
    badge: 'New Release',
    format: ['Grasshopper (.GH)', 'Rhino 7/8 (.3DM)', 'IFC Export Script'],
    image: '/Art Collection 2.png',
    webpImage: '/Art Collection 2.webp',
    srcsetWebp: '/Art Collection 2-400.webp 400w, /Art Collection 2-800.webp 800w, /Art Collection 2.webp 1800w',
    fileSize: '840 MB .ZIP',
    modulesOrPages: '400+ Algorithmic Nodes',
    whatsIncluded: [
      '24 Parametric Definition Files (.GH) with labeled sliders',
      'Pebble Seating & Curved Millwork CNC Fabrication Prep toolscripts',
      'Architectural Lighting & Display Niche Integration nodes',
      'Step-by-step 4K video walkthrough on joinery curvature optimization'
    ]
  },
  {
    id: 'studio-practice-os',
    title: 'Double-Height Timber Pavilion Blueprint Set',
    shortDesc: 'Structural heavy timber joinery, curtain walls & monumental fireplace details.',
    fullDesc: 'Complete architectural construction package for monumental double-height spaces. Features exposed ceiling beam tie-ins with indirect cove lighting, structural steel open-stair framing, 2-storey glass curtain wall interfaces, and monolithic fireplace chimney detailing.',
    price: 49.00,
    originalPrice: 75.00,
    badge: 'Essential',
    format: ['Revit / BIM', 'DWG Blueprints', 'Vector PDF Set'],
    image: '/Art Collection 3.png',
    webpImage: '/Art Collection 3.webp',
    srcsetWebp: '/Art Collection 3-400.webp 400w, /Art Collection 3-800.webp 800w, /Art Collection 3.webp 1800w',
    fileSize: '620 MB Package',
    modulesOrPages: '36 High-Res Sheets',
    whatsIncluded: [
      'Exposed Heavy Timber Beam & Uplight Tectonic Joint Drawings',
      'Double-Height Glass Curtain Wall Thermal & Structural Sections',
      'Floating Open-Tread Stair Fabrication & Handrail Details',
      'Monolithic Fireplace Hearth Construction Specifications'
    ]
  },
  {
    id: 'tectonic-handbook',
    title: 'Tectonic Fluted Timber & Mezzanine Specification',
    shortDesc: '140-page architectural handbook for fluted slats, cove LEDs & glass rails.',
    fullDesc: 'An uncompromising technical compendium detailing the physics, tactile tolerances, and millwork integration of vertical acoustic wood slats, concealed LED backlighting channels, marble media surfaces, and cantilevered mezzanine balustrades.',
    price: 29.00,
    originalPrice: 45.00,
    badge: 'Print & Digital',
    format: ['Interactive PDF', 'ePub', 'Specification Word Docs'],
    image: '/Art Collection 4.png',
    webpImage: '/Art Collection 4.webp',
    srcsetWebp: '/Art Collection 4-400.webp 400w, /Art Collection 4-800.webp 800w, /Art Collection 4.webp 1800w',
    fileSize: '310 MB High-Res PDF',
    modulesOrPages: '140 Pages (180mm x 240mm)',
    whatsIncluded: [
      'Vertical Wood Slat Millwork & Acoustic Backer Specifications',
      'Concealed Amber LED Channel Heat-Sink & Luminaire Details',
      'Structural Glass Balustrade Mezzanine Shoe Anchoring Guide',
      'Direct contact directory for vetted European craft fabricators'
    ]
  }
];

export const PEER_REVIEWS: PeerReview[] = [
  {
    id: 'review-1',
    author: 'Sarah Chen',
    role: 'VP of Spatial Design',
    firm: 'Monolith Architecture',
    projectOrCohort: 'Cohort 02 Alumni',
    rating: 5,
    quote: 'Richard’s critique transformed our design system and construction detailing in less than 3 weeks. His eye for tectonic honesty is unmatched.',
    date: 'August 2026'
  },
  {
    id: 'review-2',
    author: 'Henrik Vanger',
    role: 'Lead Project Architect',
    firm: 'Snøhetta Nordics',
    projectOrCohort: 'Advisory Client',
    rating: 5,
    quote: 'The Revit Detail Library alone has saved our studio roughly 140 drafting hours on our latest cultural competition. Truly precision craftsmanship.',
    date: 'July 2026'
  },
  {
    id: 'review-3',
    author: 'Dr. Matteo Rossi',
    role: 'Professor of Tectonics',
    firm: 'ETH Zurich Faculty of Architecture',
    projectOrCohort: 'Masterclass Guest',
    rating: 5,
    quote: 'Rarely do you find an architect who bridges deep theoretical spatial philosophy with pragmatic, constructible Swiss detailing so effortlessly.',
    date: 'June 2026'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How do I access digital blueprints and CAD kits after purchase?',
    answer: 'Immediately upon checkout, you receive instant secure download links on your screen and via automated confirmation email. Files are provided in clean .ZIP archives with organized folders. You receive lifetime free access to all future version updates.',
    category: 'Products'
  },
  {
    id: 'faq-2',
    question: 'What is the format and scheduling for the 1:1 Architectural Advisory?',
    answer: 'Advisory sessions occur bi-weekly over private 90-minute video reviews. We review live 3D models (Rhino/Revit) and PDF construction drawings. In between meetings, you have priority asynchronous voice and screen markups via private studio communication.',
    category: 'Advisory'
  },
  {
    id: 'faq-3',
    question: 'Can I request team studio licenses or corporate tax invoices for reimbursement?',
    answer: 'Yes! Automated VAT-compliant European and US tax invoices are issued instantly upon purchase. For studio multi-seat licenses (5+ workstations), click the WhatsApp inquiry button or email the studio for a tailored firm license.',
    category: 'Licensing'
  },
  {
    id: 'faq-4',
    question: 'What CAD/BIM software versions are supported?',
    answer: 'Our detail libraries are provided in Autodesk Revit (versions 2023 through 2026), native AutoCAD DWG (2018 format for universal backward compatibility), DXF, and vector PDF. The Parametric Facade kit runs on McNeel Rhinoceros 7 & 8 with native Grasshopper.',
    category: 'Products'
  },
  {
    id: 'faq-payment-plans',
    question: 'What payment plans are offered, and how do I receive direct email proposals?',
    answer: 'We offer flexible payment structures for both architectural commissions and the 1:1 Advisory Cohort: 2-part milestone plans (50% upfront, 50% on completion), 3-part tranche plans, and 6-month equal installment arrangements. When you submit an inquiry form or payment plan request, a structured proposal is generated and dispatched immediately to goldengiftahuruonye@gmail.com, with a 24-hour turnaround for formal fee agreements and electronic invoicing.',
    category: 'Advisory'
  },
  {
    id: 'faq-5',
    question: 'Are the blueprint details compliant with international building codes?',
    answer: 'All assemblies adhere to high-performance European (Eurocode/SIA) and North American (IBC/AIA) thermal performance, waterproofing, and structural standards. Each detail includes notes on thermal bridge mitigation and vapor barriers.',
    category: 'Products'
  }
];
