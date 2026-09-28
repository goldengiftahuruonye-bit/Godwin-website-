/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  FEATURED_PROJECTS, 
  DIGITAL_PRODUCTS, 
  PEER_REVIEWS 
} from './data/architecturalData';
import { Project, DigitalProduct, CartItem, PeerReview } from './types/architecture';

import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutStudioSection } from './components/AboutStudioSection';
import { FeaturedWorkGrid } from './components/FeaturedWorkGrid';
import { MentorshipCard } from './components/MentorshipCard';
import { ReviewsSection } from './components/ReviewsSection';
import { DigitalProductsStore } from './components/DigitalProductsStore';
import { FaqSection } from './components/FaqSection';
import { FixedBottomBar } from './components/FixedBottomBar';

import { LightboxModal } from './components/modals/LightboxModal';
import { CartDrawer } from './components/modals/CartDrawer';
import { VideoModal } from './components/modals/VideoModal';
import { ReviewModal } from './components/modals/ReviewModal';
import { ContactModal } from './components/modals/ContactModal';
import { MenuDrawer } from './components/modals/MenuDrawer';
import { ProductDetailModal } from './components/modals/ProductDetailModal';
import { RgLogo } from './components/RgLogo';

export default function App() {
  // Theme state: 'dark' (obsidian) or 'light' (limestone gallery)
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('atelier_theme');
      if (saved === 'light' || saved === 'dark') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    try {
      localStorage.setItem('atelier_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Pre-seed 2 items to match the "2" cart badge in user's screenshot
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: DIGITAL_PRODUCTS[0], quantity: 1 },
    { product: DIGITAL_PRODUCTS[1], quantity: 1 },
  ]);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<DigitalProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactDefaultType, setContactDefaultType] = useState('commission');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [reviews, setReviews] = useState<PeerReview[]>(PEER_REVIEWS);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2500);
  };

  // Cart operations
  const handleAddToCart = (product: DigitalProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added "${product.title}" to digital bag`);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Project navigation in Lightbox
  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentIndex = FEATURED_PROJECTS.findIndex((p) => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + FEATURED_PROJECTS.length) % FEATURED_PROJECTS.length;
    setSelectedProject(FEATURED_PROJECTS[prevIndex]);
  };

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = FEATURED_PROJECTS.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % FEATURED_PROJECTS.length;
    setSelectedProject(FEATURED_PROJECTS[nextIndex]);
  };

  // Smooth scrolling helpers respecting user motion preferences
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

  // Handle new review submission
  const handleAddReview = (newRev: Omit<PeerReview, 'id' | 'date'>) => {
    const item: PeerReview = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: 'Just now',
    };
    setReviews((prev) => [item, ...prev]);
    showToast('Your architectural critique has been published');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen w-full bg-[#121314] text-[#eae7e1] flex flex-col relative antialiased selection:bg-[#c8a265] selection:text-[#121314]">
      {/* Top Header - Fluid responsive width with desktop navigation links & actions */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenu={() => setIsMenuOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        onNavigate={scrollToSection}
        onOpenContact={() => {
          setContactDefaultType('commission');
          setIsContactModalOpen(true);
        }}
      />

      {/* Main Content Body - Responsive padding and full fluid width */}
      <main className="flex-1 flex flex-col relative w-full pt-20 sm:pt-24 md:pt-28 pb-28 md:pb-16 bg-[#121314] overflow-x-hidden">
        {/* Section 1: Hero */}
        <HeroSection
          onScrollToProjects={() => scrollToSection('portfolio-grid')}
          onOpenCommission={() => {
            setContactDefaultType('commission');
            setIsContactModalOpen(true);
          }}
        />

        {/* Section 2: About Studio */}
        <AboutStudioSection />

        {/* Section 3: Featured Work Grid (Responsive 2 / 3 / 4 columns) */}
        <FeaturedWorkGrid
          projects={FEATURED_PROJECTS}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* Section 4: 1:1 Advisory & Masterclass with Video Preview */}
        <MentorshipCard
          onOpenVideo={() => setIsVideoOpen(true)}
          onOpenBooking={() => {
            setContactDefaultType('advisory');
            setIsContactModalOpen(true);
          }}
          onOpenPaymentPlan={() => {
            setContactDefaultType('payment-plan');
            setIsContactModalOpen(true);
          }}
        />

        {/* Section 5: Peer Reviews & Testimonials */}
        <ReviewsSection
          reviews={reviews}
          onOpenWriteReview={() => setIsReviewModalOpen(true)}
        />

        {/* Section 6: High-Contrast Cream Travertine Digital Store */}
        <DigitalProductsStore
          products={DIGITAL_PRODUCTS}
          onAddToCart={handleAddToCart}
          onOpenProductDetail={(prod) => setSelectedProduct(prod)}
        />

        {/* Section 7: FAQ Accordion */}
        <FaqSection />

        {/* Responsive Footer */}
        <footer className="w-full border-t border-[#1e2024] bg-[#0f1011] mt-12 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8 text-center md:text-left">
            <div className="flex flex-col gap-2 max-w-sm">
              <div className="flex items-center justify-center md:justify-start gap-2.5">
                <RgLogo size="sm" glow />
                <span className="font-serif text-base font-bold text-[#f5f4ef]">
                  Richard Godwin
                </span>
              </div>
              <p className="text-xs text-[#8e929f] leading-relaxed">
                Architectural design atelier synthesizing geological permanence, ambient daylight, and tectonic rigor.
              </p>
              <p className="text-[11px] font-mono text-[#c8a265]">
                Zurich · New York · Kyoto
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-[#a0a4b2]">
                <span className="material-symbols-outlined text-[16px] text-[#c8a265]">mail</span>
                <span>Direct Studio Email:</span>
                <a
                  href="mailto:goldengiftahuruonye@gmail.com?subject=Direct%20Inquiry%20%E2%80%94%20Richard%20Godwin%20Atelier"
                  className="text-[#c8a265] hover:underline font-mono text-xs"
                >
                  goldengiftahuruonye@gmail.com
                </a>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#9ea2af]">
              <button onClick={() => scrollToSection('about-studio')} className="hover:text-[#c8a265] transition-colors cursor-pointer">
                Atelier Profile
              </button>
              <button onClick={() => scrollToSection('portfolio-grid')} className="hover:text-[#c8a265] transition-colors cursor-pointer">
                Built Works
              </button>
              <button onClick={() => scrollToSection('advisory-program')} className="hover:text-[#c8a265] transition-colors cursor-pointer">
                Advisory Cohorts
              </button>
              <button 
                onClick={() => {
                  setContactDefaultType('payment-plan');
                  setIsContactModalOpen(true);
                }} 
                className="hover:text-[#c8a265] transition-colors cursor-pointer text-[#d8dadf]"
              >
                Payment Plans
              </button>
              <button onClick={() => scrollToSection('digital-store')} className="hover:text-[#c8a265] transition-colors cursor-pointer">
                BIM Toolkits
              </button>
              <button onClick={() => scrollToSection('faq-section')} className="hover:text-[#c8a265] transition-colors cursor-pointer">
                FAQ
              </button>
              <button 
                onClick={() => {
                  setContactDefaultType('commission');
                  setIsContactModalOpen(true);
                }} 
                className="hover:text-[#c8a265] transition-colors cursor-pointer text-[#c8a265] font-semibold"
              >
                Inquire for Commission
              </button>
            </div>
          </div>

          <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-[#1d1f23] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#636774] gap-3 text-center sm:text-left">
            <p>
              All architectural photography, drawings, CAD &amp; BIM standards &copy; {new Date().getFullYear()} Richard Godwin Architecture.
            </p>
            <p className="font-mono text-[#4b4e58]">
              Tectonic Dossier v2.6.4 • Responsive Spatial Layout
            </p>
          </div>
        </footer>
      </main>

      {/* Floating Action Bars (Mobile dock on phones, subtle floating pill on desktop) */}
      <FixedBottomBar
        onOpenContact={() => {
          setContactDefaultType('commission');
          setIsContactModalOpen(true);
        }}
      />

      {/* Lightbox Modal */}
      <LightboxModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onPrev={handlePrevProject}
        onNext={handleNextProject}
        currentIndex={
          selectedProject
            ? FEATURED_PROJECTS.findIndex((p) => p.id === selectedProject.id)
            : undefined
        }
        totalProjects={FEATURED_PROJECTS.length}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Video Masterclass Player Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        onOpenBooking={() => {
          setContactDefaultType('advisory');
          setIsContactModalOpen(true);
        }}
      />

      {/* Write a Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={handleAddReview}
      />

      {/* Contact / Commission Inquiry Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        defaultType={contactDefaultType}
      />

      {/* Menu Drawer */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={scrollToSection}
        onOpenContact={() => {
          setContactDefaultType('commission');
          setIsContactModalOpen(true);
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
        onSelectProject={(proj) => {
          setSelectedProject(proj);
          scrollToSection('portfolio-grid');
        }}
        onSelectProduct={(prod) => {
          setSelectedProduct(prod);
          scrollToSection('digital-store');
        }}
      />

      {/* Digital Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#1b1d22]/95 border border-[#c8a265]/50 text-[#eae7e1] text-xs font-medium shadow-2xl backdrop-blur-md flex items-center gap-2 animate-bounce-short">
          <span className="material-symbols-outlined text-[16px] text-[#c8a265]">check_circle</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
