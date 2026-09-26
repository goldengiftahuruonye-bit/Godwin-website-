/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
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

export default function App() {
  // View mode: 'mobile' mirrors the exact smartphone shell from the screenshot, 'expanded' gives wide presence
  const [viewMode, setViewMode] = useState<'mobile' | 'expanded'>('mobile');

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

  // Smooth scrolling helpers
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
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
    <div className="min-h-screen bg-[#0e0f10] text-[#eae7e1] flex flex-col items-center justify-start relative antialiased selection:bg-[#c8a265] selection:text-[#121314]">
      {/* View Mode Banner on Desktop for easy toggling */}
      <aside aria-label="Layout view switcher" className="hidden lg:flex items-center justify-between w-full max-w-4xl px-4 py-2 text-[11px] text-[#7d818f] border-b border-[#212328]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8a265]" />
          <span>Atelier Vance — Architectural Storefront &amp; Studio Dossier</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#595c67]">Layout View:</span>
          <button
            onClick={() => setViewMode('mobile')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              viewMode === 'mobile'
                ? 'bg-[#22242a] text-[#c8a265] font-semibold border border-[#30333b]'
                : 'hover:text-[#eae7e1]'
            }`}
          >
            Mobile Shell (Exact Prototype)
          </button>
          <button
            onClick={() => setViewMode('expanded')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              viewMode === 'expanded'
                ? 'bg-[#22242a] text-[#c8a265] font-semibold border border-[#30333b]'
                : 'hover:text-[#eae7e1]'
            }`}
          >
            Expanded Studio Layout
          </button>
        </div>
      </aside>

      {/* Main Container Shell */}
      <div 
        className={`w-full relative flex flex-col bg-[#121314] transition-all duration-300 ${
          viewMode === 'mobile'
            ? 'max-w-md mx-auto min-h-screen shadow-[0_0_60px_rgba(0,0,0,0.85)] border-x border-[#222429]'
            : 'max-w-3xl mx-auto min-h-screen shadow-2xl border-x border-[#222429]'
        }`}
      >
        {/* Top Header */}
        <Header
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenMenu={() => setIsMenuOpen(true)}
          viewMode={viewMode}
          onToggleViewMode={() => setViewMode(viewMode === 'mobile' ? 'expanded' : 'mobile')}
        />

        {/* Main Content Body */}
        <main className="flex-1 flex flex-col relative w-full pt-16 pb-28 bg-[#121314]">
          {/* Section 1: Hero */}
          <HeroSection
            onScrollToProjects={() => scrollToSection('portfolio-grid')}
            onScrollToPodcast={() => scrollToSection('podcast-highlight')}
          />

          {/* Section 2: About Studio */}
          <AboutStudioSection />

          {/* Section 3: Featured Work Grid (3-column matching screenshot) */}
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

          {/* Footer Note */}
          <footer className="px-4 py-8 text-center text-[11px] text-[#6d717e] border-t border-[#1e2024]">
            <p className="font-serif text-[13px] text-[#8e929f] mb-1">
              Atelier Vance — Architectural Design &amp; Spatial Systems
            </p>
            <p>Zurich · New York · Kyoto</p>
            <p className="mt-2 text-[10px] text-[#555864]">
              All architectural photography, drawings, CAD standards &copy; {new Date().getFullYear()} Atelier Vance.
            </p>
          </footer>
        </main>

        {/* Floating Fixed Bottom Bar */}
        <FixedBottomBar
          onOpenContact={() => {
            setContactDefaultType('commission');
            setIsContactModalOpen(true);
          }}
        />
      </div>

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
