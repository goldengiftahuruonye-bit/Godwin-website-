/**
 * @license
 * Atelier Performance & Core Web Vitals Optimization Engine
 * Senior Web Performance Pipeline: LCP, INP, CLS minimization
 */

export interface ResourceHintsConfig {
  dnsPrefetch?: string[];
  preconnect?: { url: string; crossOrigin?: boolean }[];
  preload?: {
    url: string;
    as: 'font' | 'style' | 'image' | 'script';
    type?: string;
    crossOrigin?: boolean;
    fetchPriority?: 'high' | 'low' | 'auto';
  }[];
}

export interface MediaOptimizationConfig {
  heroImageSelectorPattern?: RegExp;
  defaultAspectRatios?: Record<string, { width: number; height: number }>;
}

/**
 * 1. SCRIPT EXECUTION & RESOURCE LOADING OPTIMIZATIONS
 * Transforms raw HTML to ensure non-critical scripts do not block HTML parsing.
 * Automatically appends 'defer' or 'async' to external script tags unless marked as critical.
 */
export function transformScriptExecution(html: string): string {
  // Regex to match <script> tags with src that don't already have defer or async or type="module"
  const scriptTagRegex = /<script\b(?![^>]*(?:\bdefer\b|\basync\b|\btype\s*=\s*["']module["']|\bdata-critical\b))([^>]*src\s*=\s*["'][^"']+["'][^>]*)>/gi;

  return html.replace(scriptTagRegex, (_match, attributes) => {
    // Append defer for standard script order preservation, async for independent third parties
    const isAnalyticsOrTracking = /gtag|analytics|facebook|pixel|clarity|hotjar/i.test(attributes);
    const mode = isAnalyticsOrTracking ? 'async' : 'defer';
    return `<script ${mode} ${attributes.trim()}>`;
  });
}

/**
 * Injects preconnect, dns-prefetch, and preload resource hints early in the <head>.
 */
export function injectResourceHints(html: string, hints: ResourceHintsConfig): string {
  const tags: string[] = [];

  // 1. DNS-Prefetch hints (speculative DNS resolution)
  if (hints.dnsPrefetch) {
    hints.dnsPrefetch.forEach((domain) => {
      tags.push(`<link rel="dns-prefetch" href="${domain}">`);
    });
  }

  // 2. Preconnect hints (DNS + TCP + TLS handshake)
  if (hints.preconnect) {
    hints.preconnect.forEach(({ url, crossOrigin }) => {
      const coAttr = crossOrigin ? ' crossorigin' : '';
      tags.push(`<link rel="preconnect" href="${url}"${coAttr}>`);
    });
  }

  // 3. Preload hints (High priority asset scheduling for LCP candidates & primary typography)
  if (hints.preload) {
    hints.preload.forEach(({ url, as, type, crossOrigin, fetchPriority }) => {
      let tag = `<link rel="preload" href="${url}" as="${as}"`;
      if (type) tag += ` type="${type}"`;
      if (crossOrigin) tag += ` crossorigin`;
      if (fetchPriority) tag += ` fetchpriority="${fetchPriority}"`;
      tag += '>';
      tags.push(tag);
    });
  }

  if (tags.length === 0) return html;

  const hintMarkup = `\n    <!-- Critical Resource Hints (Automated Core Web Vitals Pipeline) -->\n    ${tags.join('\n    ')}\n`;

  // Inject immediately after <head> or charset
  if (/<head>/i.test(html)) {
    return html.replace(/<head>/i, `<head>${hintMarkup}`);
  }
  return hintMarkup + html;
}

/**
 * 2. MEDIA OPTIMIZATION (Eliminate CLS & Boost LCP)
 * - Automatically ensures below-the-fold images have loading="lazy" and decoding="async".
 * - Excludes hero/LCP images, giving them fetchpriority="high" and loading="eager".
 * - Injects explicit width and height or aspect-ratio style to eliminate Cumulative Layout Shift (CLS).
 */
export function optimizeMediaTags(html: string, config: MediaOptimizationConfig = {}): string {
  const imgTagRegex = /<img\b([^>]*)>/gi;
  const heroPattern = config.heroImageSelectorPattern || /hero|portrait|banner|monogram|lcp/i;

  return html.replace(imgTagRegex, (fullTag, attrString) => {
    let attrs = attrString;
    const isHero = heroPattern.test(attrs) || /data-hero\s*=\s*["']true["']/i.test(attrs);

    // 1. Loading and Decoding strategies
    if (isHero) {
      // Eager fetch for LCP candidate
      if (!/loading\s*=/i.test(attrs)) {
        attrs += ' loading="eager"';
      }
      if (!/fetchpriority\s*=/i.test(attrs)) {
        attrs += ' fetchpriority="high"';
      }
      if (!/decoding\s*=/i.test(attrs)) {
        attrs += ' decoding="async"';
      }
    } else {
      // Lazy load non-critical images
      if (!/loading\s*=/i.test(attrs)) {
        attrs += ' loading="lazy"';
      }
      if (!/decoding\s*=/i.test(attrs)) {
        attrs += ' decoding="async"';
      }
    }

    // 2. Prevent CLS with explicit width/height or style aspect-ratio
    const hasWidth = /\bwidth\s*=/i.test(attrs);
    const hasHeight = /\bheight\s*=/i.test(attrs);
    const hasStyleAspectRatio = /aspect-ratio/i.test(attrs);

    if (!hasWidth && !hasHeight && !hasStyleAspectRatio) {
      // In modern CSS, aspect-ratio in class or style prevents reflow
      attrs += ' style="aspect-ratio: 4 / 3;"';
    }

    return `<img${attrs}>`;
  });
}

/**
 * 3. COMPREHENSIVE HTML TRANSFORMATION PIPELINE
 */
export function optimizeHtmlMarkup(
  html: string,
  hints?: ResourceHintsConfig,
  mediaConfig?: MediaOptimizationConfig
): string {
  let result = html;
  if (hints) {
    result = injectResourceHints(result, hints);
  }
  result = transformScriptExecution(result);
  result = optimizeMediaTags(result, mediaConfig);
  return result;
}

/**
 * 4. RECOMMENDED SERVER HEADERS CONFIGURATION (For CDNs / Edge Servers)
 */
export const RECOMMENDED_SERVER_HEADERS = {
  // Hashed build assets: Cache for 1 year, immutable
  staticAssets: {
    'Cache-Control': 'public, max-age=31536000, immutable',
    'X-Content-Type-Options': 'nosniff',
  },
  // HTML documents: Revalidate on every request to prevent stale deploys
  htmlDocuments: {
    'Cache-Control': 'public, max-age=0, must-revalidate',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
  },
  // Static media / images (unhashed or public root)
  publicMedia: {
    'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
  },
};
