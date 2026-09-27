import React, { useState, useMemo, useEffect } from 'react';
import { ARCHITECT_INFO, FEATURED_PROJECTS, DIGITAL_PRODUCTS } from '../../data/architecturalData';
import { Project, DigitalProduct } from '../../types/architecture';
import { RgLogo } from '../RgLogo';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenContact: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
  onSelectProject?: (project: Project) => void;
  onSelectProduct?: (product: DigitalProduct) => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenContact,
  theme = 'dark',
  onToggleTheme,
  onSelectProject,
  onSelectProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFilter, setSearchFilter] = useState<'all' | 'works' | 'store'>('all');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filter projects based on title, subtitle, category, location, or materials
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return FEATURED_PROJECTS.filter((proj) => {
      const matchTitle = proj.title.toLowerCase().includes(q);
      const matchSubtitle = proj.subtitle.toLowerCase().includes(q);
      const matchCategory = proj.category.toLowerCase().includes(q);
      const matchLocation = proj.location.toLowerCase().includes(q);
      const matchMaterials = proj.materials.some((m) => m.toLowerCase().includes(q));
      const matchDesc = proj.description.toLowerCase().includes(q);
      return matchTitle || matchSubtitle || matchCategory || matchLocation || matchMaterials || matchDesc;
    });
  }, [searchQuery]);

  // Filter digital products based on title, shortDesc, formats, or whatsIncluded
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return DIGITAL_PRODUCTS.filter((prod) => {
      const matchTitle = prod.title.toLowerCase().includes(q);
      const matchShortDesc = prod.shortDesc.toLowerCase().includes(q);
      const matchFullDesc = prod.fullDesc.toLowerCase().includes(q);
      const matchBadge = prod.badge?.toLowerCase().includes(q);
      const matchFormats = prod.format.some((f) => f.toLowerCase().includes(q));
      const matchIncluded = prod.whatsIncluded.some((item) => item.toLowerCase().includes(q));
      return matchTitle || matchShortDesc || matchFullDesc || matchBadge || matchFormats || matchIncluded;
    });
  }, [searchQuery]);

  if (!isOpen) return null;

  const hasSearch = searchQuery.trim().length > 0;
  const totalResults = filteredProjects.length + filteredProducts.length;

  const quickSearchTags = ['Concrete', 'Revit BIM', 'Pavilion', 'Travertine', 'Facade', 'Swiss Alps'];

  const links = [
    { label: 'Featured Projects & Built Work', target: 'portfolio-grid', icon: 'domain' },
    { label: 'About Atelier & Studio Profile', target: 'about-studio', icon: 'person' },
    { label: '1:1 Advisory Cohort', target: 'advisory-program', icon: 'school' },
    { label: 'Digital Blueprints & CAD Store', target: 'digital-store', icon: 'folder_zip' },
    { label: 'Client & Peer Reviews', target: 'peer-reviews', icon: 'grade' },
    { label: 'Frequently Asked Questions', target: 'faq-section', icon: 'help_outline' },
  ];

  const handleProjectClick = (proj: Project) => {
    onClose();
    if (onSelectProject) {
      onSelectProject(proj);
    } else {
      onNavigate('portfolio-grid');
    }
  };

  const handleProductClick = (prod: DigitalProduct) => {
    onClose();
    if (onSelectProduct) {
      onSelectProduct(prod);
    } else {
      onNavigate('digital-store');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#161719] text-[#eae7e1] border-l border-[#2a2d33] h-full flex flex-col shadow-2xl z-10 p-5 sm:p-6 justify-between overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#26282e] pb-4 mb-4">
            <div className="flex items-center gap-3">
              <RgLogo size="md" glow />
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-[#f5f4ef] leading-tight">
                  {ARCHITECT_INFO.name}
                </span>
                <span className="text-[10px] text-[#c8a265] font-mono">
                  {ARCHITECT_INFO.studio} · {ARCHITECT_INFO.credentials}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#202227] hover:bg-[#2c2f36] flex items-center justify-center transition-colors cursor-pointer text-[#9a9ea9] hover:text-[#eae7e1]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Interactive Search Bar Section */}
          <div className="mb-5 space-y-2.5">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-[#797d8c] text-[18px] pointer-events-none">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search works, materials, CAD toolkits..."
                className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-[#111214] border border-[#2b2e36] text-xs text-[#eae7e1] placeholder-[#666a77] focus:outline-none focus:border-[#c8a265] transition-colors"
                autoFocus={false}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 w-5 h-5 rounded-full bg-[#202227] hover:bg-[#2b2e37] flex items-center justify-center text-[#8e92a0] hover:text-[#eae7e1] text-xs cursor-pointer transition-colors"
                  title="Clear search"
                >
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              )}
            </div>

            {/* Scope Filter Segmented Tabs (When searching or always available) */}
            {hasSearch && (
              <div className="flex items-center gap-1.5 p-1 rounded-lg bg-[#111214] border border-[#26282f] text-[11px]">
                <button
                  type="button"
                  onClick={() => setSearchFilter('all')}
                  className={`flex-1 py-1 rounded text-center transition-all cursor-pointer font-medium ${
                    searchFilter === 'all'
                      ? 'bg-[#22242a] text-[#c8a265] shadow-xs'
                      : 'text-[#828695] hover:text-[#eae7e1]'
                  }`}
                >
                  All ({totalResults})
                </button>
                <button
                  type="button"
                  onClick={() => setSearchFilter('works')}
                  className={`flex-1 py-1 rounded text-center transition-all cursor-pointer font-medium ${
                    searchFilter === 'works'
                      ? 'bg-[#22242a] text-[#c8a265] shadow-xs'
                      : 'text-[#828695] hover:text-[#eae7e1]'
                  }`}
                >
                  Built Works ({filteredProjects.length})
                </button>
                <button
                  type="button"
                  onClick={() => setSearchFilter('store')}
                  className={`flex-1 py-1 rounded text-center transition-all cursor-pointer font-medium ${
                    searchFilter === 'store'
                      ? 'bg-[#22242a] text-[#c8a265] shadow-xs'
                      : 'text-[#828695] hover:text-[#eae7e1]'
                  }`}
                >
                  Store ({filteredProducts.length})
                </button>
              </div>
            )}

            {/* Quick Keyword Suggestion Tags when not searching */}
            {!hasSearch && (
              <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                <span className="text-[10px] text-[#6d717f] uppercase font-mono tracking-wider">
                  Quick:
                </span>
                {quickSearchTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag)}
                    className="px-2 py-0.5 rounded-md bg-[#191b1f] hover:bg-[#252830] text-[11px] text-[#9a9ea9] hover:text-[#c8a265] border border-[#292c34] transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Results Display OR Standard Navigation Links */}
          {hasSearch ? (
            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
              {totalResults === 0 ? (
                <div className="py-8 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#1b1d22] text-[#686c7a] flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-[20px]">search_off</span>
                  </div>
                  <p className="text-xs text-[#9a9da8]">
                    No works or store toolkits match <strong className="text-[#f5f4ef]">"{searchQuery}"</strong>
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-[11px] text-[#c8a265] hover:underline cursor-pointer"
                  >
                    Clear search query
                  </button>
                </div>
              ) : (
                <>
                  {/* Category 1: Built Works Results */}
                  {(searchFilter === 'all' || searchFilter === 'works') &&
                    filteredProjects.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#c8a265] font-semibold px-1">
                          <span>Built Works ({filteredProjects.length})</span>
                          <span className="text-[#6d717f] font-mono">Portfolio</span>
                        </div>
                        {filteredProjects.map((proj) => (
                          <div
                            key={proj.id}
                            onClick={() => handleProjectClick(proj)}
                            className="p-2.5 rounded-xl bg-[#1a1c20] hover:bg-[#23262d] border border-[#272a31] hover:border-[#c8a265]/40 flex items-center gap-3 transition-all cursor-pointer group"
                          >
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#111214] shrink-0 border border-[#2d3038]">
                              <img
                                src={proj.image}
                                alt={proj.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h5 className="text-xs font-semibold text-[#f5f4ef] group-hover:text-[#c8a265] truncate transition-colors">
                                {proj.title}
                              </h5>
                              <p className="text-[11px] text-[#868a98] truncate">{proj.subtitle}</p>
                              <div className="flex items-center gap-2 text-[10px] text-[#6d717f] mt-0.5">
                                <span>{proj.location}</span>
                                <span>·</span>
                                <span className="text-[#c8a265]">{proj.category}</span>
                              </div>
                            </div>
                            <span className="material-symbols-outlined text-[16px] text-[#555864] group-hover:text-[#c8a265] group-hover:translate-x-0.5 transition-all shrink-0">
                              arrow_forward
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                  {/* Category 2: Digital Store Products Results */}
                  {(searchFilter === 'all' || searchFilter === 'store') &&
                    filteredProducts.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-[#c8a265] font-semibold px-1">
                          <span>Digital Store ({filteredProducts.length})</span>
                          <span className="text-[#6d717f] font-mono">Blueprints &amp; BIM</span>
                        </div>
                        {filteredProducts.map((prod) => (
                          <div
                            key={prod.id}
                            onClick={() => handleProductClick(prod)}
                            className="p-2.5 rounded-xl bg-[#1a1c20] hover:bg-[#23262d] border border-[#272a31] hover:border-[#c8a265]/40 flex items-center gap-3 transition-all cursor-pointer group"
                          >
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#111214] shrink-0 border border-[#2d3038]">
                              <img
                                src={prod.image}
                                alt={prod.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <h5 className="text-xs font-semibold text-[#f5f4ef] group-hover:text-[#c8a265] truncate transition-colors">
                                  {prod.title}
                                </h5>
                                <span className="text-xs font-mono font-bold text-[#c8a265] shrink-0">
                                  ${prod.price}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#868a98] truncate">{prod.shortDesc}</p>
                              <div className="flex items-center gap-1.5 text-[10px] text-[#6d717f] mt-0.5">
                                <span className="font-mono">{prod.fileSize}</span>
                                <span>·</span>
                                <span className="text-[#a4a7b3]">{prod.format.slice(0, 2).join(', ')}</span>
                              </div>
                            </div>
                            <span className="material-symbols-outlined text-[16px] text-[#555864] group-hover:text-[#c8a265] group-hover:translate-x-0.5 transition-all shrink-0">
                              arrow_forward
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                </>
              )}
            </div>
          ) : (
            /* Standard Navigation Links */
            <nav className="space-y-1.5 mb-6">
              <span className="text-[10px] uppercase tracking-widest text-[#787c8a] font-semibold block mb-2 px-3">
                Studio Sections
              </span>
              {links.map((link) => (
                <button
                  key={link.target}
                  onClick={() => {
                    onClose();
                    onNavigate(link.target);
                  }}
                  className="w-full px-3 py-2.5 rounded-xl hover:bg-[#22242a] text-left text-xs font-medium text-[#d8dadf] hover:text-[#c8a265] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-[#858997]">
                      {link.icon}
                    </span>
                    <span>{link.label}</span>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-[#555864]">
                    chevron_right
                  </span>
                </button>
              ))}

              {onToggleTheme && (
                <button
                  onClick={onToggleTheme}
                  className="w-full px-3 py-2.5 mt-2 rounded-xl bg-[#202227] hover:bg-[#262931] border border-[#2d3038] text-left text-xs font-medium text-[#eae7e1] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-[#c8a265]">
                      {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                    </span>
                    <span>Appearance: {theme === 'dark' ? 'Dark Obsidian' : 'Light Limestone'}</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#161719] text-[#c8a265] border border-[#30333d]">
                    Switch
                  </span>
                </button>
              )}
            </nav>
          )}
        </div>

        {/* Studio Info & Inquire CTA */}
        <div className="pt-4 border-t border-[#26282e] space-y-3">
          <div className="text-xs space-y-1 text-[#8b8e9b]">
            <div className="text-[#eae7e1] font-medium">Offices &amp; Archives</div>
            <div className="text-[11px]">Zurich: Gotthardstrasse 26, 8002 Zürich</div>
            <div className="text-[11px]">New York: 180 Varick Street, Soho, NY 10014</div>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="w-full py-2.5 rounded-full bg-[#c8a265] hover:bg-[#dfb776] text-[#141413] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[17px]">mail</span>
            Request Studio Commission
          </button>

          <p className="text-[10px] text-center text-[#676b77]">
            © {new Date().getFullYear()} Richard Godwin Architecture &amp; Spatial Systems.
          </p>
        </div>
      </div>
    </div>
  );
};
