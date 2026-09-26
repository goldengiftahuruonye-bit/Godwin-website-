export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Residential' | 'Cultural' | 'Pavilion' | 'Theoretical' | 'Commercial';
  year: string;
  location: string;
  area: string;
  client: string;
  materials: string[];
  description: string;
  fullNarrative: string;
  image: string;
  elevationDiagram?: string;
  photographerCredit: string;
}

export interface DigitalProduct {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  format: string[];
  image: string;
  fileSize: string;
  modulesOrPages: string;
  whatsIncluded: string[];
}

export interface CartItem {
  product: DigitalProduct;
  quantity: number;
}

export interface PeerReview {
  id: string;
  author: string;
  role: string;
  firm: string;
  projectOrCohort: string;
  rating: number;
  quote: string;
  date: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Products' | 'Advisory' | 'Licensing' | 'Payment';
}
