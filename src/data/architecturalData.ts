import { Project, DigitalProduct, PeerReview, FaqItem } from '../types/architecture';

import architectPortrait from '../assets/images/architect_portrait_1790154927894.jpg';
import brutalistPavilion from '../assets/images/brutalist_concrete_pavilion_1790154942499.jpg';
import monolithicStone from '../assets/images/monolithic_stone_residence_1790154954321.jpg';
import timberPavilion from '../assets/images/sculptural_timber_pavilion_1790154966153.jpg';
import axonometricDrawing from '../assets/images/axonometric_blueprint_drawing_1790154990027.jpg';
import basaltInterior from '../assets/images/basalt_residence_interior_1790155040700.jpg';
import parametricFacade from '../assets/images/parametric_facade_tower_1790155051340.jpg';
import studioCritiqueVideo from '../assets/images/architect_studio_critique_1790155002878.jpg';

import archDetailsCover from '../assets/images/arch_details_cover_1790155067351.jpg';
import parametricFacadeCover from '../assets/images/parametric_facade_cover_1790155077625.jpg';
import studioOsCover from '../assets/images/studio_os_cover_1790155091232.jpg';
import tectonicBookCover from '../assets/images/tectonic_book_cover_1790155101452.jpg';

export const ARCHITECT_INFO = {
  name: 'Richard Godwin',
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
    id: 'nordic-pavilion',
    title: 'Nordic Forest Pavilion',
    subtitle: 'Board-formed concrete & cantilevered glass reflecting pool',
    category: 'Residential',
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
    id: 'travertine-villa',
    title: 'Travertine Courtyard House',
    subtitle: 'Monolithic limestone planes with diagonal light well shaft',
    category: 'Residential',
    year: '2024',
    location: 'Majorca, Spain',
    area: '620 m²',
    client: 'Heritage Arts Foundation',
    materials: ['Roman Travertine', 'Cast Bronze Hardware', 'Lime Plaster'],
    description: 'A subterranean courtyard residence organized around three sequential light courtyards that temper Mediterranean heat through convective passive ventilation.',
    fullNarrative: 'Every limestone block was dry-jointed with seismic pins to achieve continuous razor-sharp reveals. Sunlight traverses the textured internal walls across the day, converting the living atrium into a monumental sundial.',
    image: monolithicStone,
    photographerCredit: 'Lucia Soriano'
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
    id: 'basalt-residence',
    title: 'Vals Alpine Sanctuary Interior',
    subtitle: 'Thermal stone living pavilion with fluted oak joinery',
    category: 'Residential',
    year: '2023',
    location: 'Vals, Switzerland',
    area: '390 m²',
    client: 'Private Commission',
    materials: ['Vals Quartzite', 'Dark Basalt', 'Smoked European Oak'],
    description: 'Subdued alpine sanctuary sculpted entirely from dark quarry stone and acoustic timber slats, creating a quiet sanctuary against harsh winter snowfields.',
    fullNarrative: 'The fireplace is carved directly from a single 9-ton boulder of raw quartzite quarried within 2 kilometers of the foundation slab. Integrated brass reveal joints conceal radiant heating plenums.',
    image: basaltInterior,
    photographerCredit: 'Marc Schweizer'
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
    shortDesc: '180+ production-grade Revit families & parametric CAD assemblies.',
    fullDesc: 'The definitive architectural detailing system trusted by over 1,400+ studios globally. Includes waterproofing membranes, curtain wall interfaces, thermal break parapets, flush floor-to-ceiling transitions, and AIA-compliant layer standards.',
    price: 149.00,
    originalPrice: 199.00,
    badge: 'Bestseller',
    format: ['RVT (Revit 2023-2026)', 'DWG', 'DXF', 'Vector PDF'],
    image: archDetailsCover,
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
    title: 'Parametric Facade & Canopy Toolkit',
    shortDesc: '400+ computational Rhino & Grasshopper scripts for kinetic louvers.',
    fullDesc: 'Engineered for computational architects and facade engineers. Generates undulating solar louvers, diagrid timber space frames, perforated panels, and panelization schedules with clean, annotated node workflows.',
    price: 89.00,
    originalPrice: 120.00,
    badge: 'New Release',
    format: ['Grasshopper (.GH)', 'Rhino 7/8 (.3DM)', 'IFC Export Script'],
    image: parametricFacadeCover,
    fileSize: '840 MB .ZIP',
    modulesOrPages: '400+ Algorithmic Nodes',
    whatsIncluded: [
      '24 Parametric Facade Definitions (.GH) with labeled sliders',
      'Panel Unrolling and CNC Fabrication Prep toolscripts',
      'Solar Radiation Analysis Integration (Ladybug-ready nodes)',
      'Step-by-step 4K video walkthrough on knot curvature optimization'
    ]
  },
  {
    id: 'studio-practice-os',
    title: 'Architectural Studio Practice OS',
    shortDesc: 'Contracts, AIA-aligned fee calculators, and project pipeline.',
    fullDesc: 'The complete operational operating system designed specifically for solo architects, partners, and emerging boutique design studios. Stop leaving fee margins on the table.',
    price: 49.00,
    originalPrice: 75.00,
    badge: 'Essential',
    format: ['Notion Workspace', 'Google Sheets', 'Word / PDF Templates'],
    image: studioOsCover,
    fileSize: '120 MB Package',
    modulesOrPages: '18 Ready-to-Use Templates',
    whatsIncluded: [
      'Client Onboarding & Architectural Brief Questionnaire',
      'Phase-based Fee Estimator (Schematic, DD, CD, CA breakdown)',
      'AIA / RIBA Aligned Subconsultant & Client Agreement Drafts',
      'Site Visit Inspection Report & Punch List Mobile Tracker'
    ]
  },
  {
    id: 'tectonic-handbook',
    title: 'Tectonic & Material Specification Book',
    shortDesc: '140-page interactive PDF & handbook on concrete, stone & timber.',
    fullDesc: 'An uncompromising technical compendium detailing the physics, tactile tolerances, and chemical sealing of architectural board-formed concrete, natural stone facades, and timber joints.',
    price: 29.00,
    originalPrice: 45.00,
    badge: 'Print & Digital',
    format: ['Interactive PDF', 'ePub', 'Specification Word Docs'],
    image: tectonicBookCover,
    fileSize: '310 MB High-Res PDF',
    modulesOrPages: '140 Pages (180mm x 240mm)',
    whatsIncluded: [
      'Concrete Mix & Board-Form Surface Release Specifications',
      'Stone Quarry Jointing & Sub-Frame Anchor Details',
      'Acoustic Ceiling & Wall Perforation Calculations',
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
    id: 'faq-5',
    question: 'Are the blueprint details compliant with international building codes?',
    answer: 'All assemblies adhere to high-performance European (Eurocode/SIA) and North American (IBC/AIA) thermal performance, waterproofing, and structural standards. Each detail includes notes on thermal bridge mitigation and vapor barriers.',
    category: 'Products'
  }
];
