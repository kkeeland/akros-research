# AKRO Research — Website Handoff

## Overview
Complete single-page e-commerce website for **AKRO research** — a premium research-grade peptide company. Built with a warm, clinical, professional aesthetic inspired by top-tier peptide retailers. Pure HTML/CSS/JS with no dependencies.

---

## Brand Identity
- **Name:** AKRO research ("AKRO" large/bold, "research" small/gold)
- **Tagline:** Science Without Shortcuts™
- **Color Palette:**
  - Primary Background: `#E8E5E0` (warm gray)
  - Navy: `#1A2F3F` (buttons, text, header)
  - Gold: `#B8975A` (accents, "research" text)
  - Green: `#5A8A6A` (stock indicators, success states)
  - Orange: `#C4763B` (low stock alerts)
- **Fonts:** Playfair Display (headings), DM Sans (body), JetBrains Mono (data/COA)

---

## Features Included

### Age Gate
- Simple comply/deny modal on page load
- Covers 21+ age, US residency, researcher status, and research-use-only acknowledgment
- "I Do Not Comply" redirects away from the site

### Navigation
- Promo bar: Free 2-Day Shipping $150+ | 20% Off $250+
- Sticky nav with logo, customer support contact, search, cart
- Secondary nav links: Home, Catalog, COA Library, Order Tracking, Wholesale, Payment, Contact, About, FAQ
- Quick category pills: Peptides, Blends, Solvents, Capsules

### Hero Section
- Headline: "Endotoxin-Free, Research-Grade. Cutting Edge Research Starts Here."
- Stats bar: 99.2%+ Avg Purity, 150+ Compounds, 48hr Shipping, 3rd Party Tested
- CSS-illustrated pharmaceutical vial with floating trust badges
- CTA buttons: Browse Catalog, View COA Library

### Trust Pillars (4-column)
1. Tested for Purity & Endotoxins
2. cGMP Compliant Facility
3. Fast Insured Shipping
4. Professional Support

### Product Catalog (12 products)
- Filterable by: All, Growth Hormone, Metabolic, Recovery, Cognitive, Blends
- Each card includes: CSS vial illustration with label, badge (NEW/BEST SELLER/EXCLUSIVE/SALE), product name, description, stock status (IN STOCK / ONLY X LEFT / OUT OF STOCK), price, Add to Cart button
- Working cart counter
- Products included:
  - **Recovery:** BPC-157, TB-500
  - **Metabolic:** Semaglutide, Tirzepatide
  - **Growth Hormone:** CJC-1295 (DAC), Ipamorelin, MK-677
  - **Cognitive:** Selank, Semax
  - **Blends:** Wolverine Blend, GLOW Blend, AURA Blend

### Certificate of Analysis (COA) Section
- Mock COA document with full test data (HPLC purity, mass spec, endotoxin, sterility, heavy metals)
- "Radical Transparency" messaging with 5 verification checkpoints
- QR-linked lot traceability mention

### About / Brand Story
- Navy background section with gold accents
- "Built by Researchers, for Researchers" positioning
- Brand origin story and quality commitment

### Newsletter Signup
- Email input with Subscribe button

### Footer
- 4-column layout: Brand description, Information links, Support links, Research Catalog links
- Company address, support hours, phone, email
- Legal disclaimer, Trustpilot/BBB badges

### Research Use Disclaimer
- Fixed bottom banner: "FOR RESEARCH USE ONLY"
- Dismissible

---

## Technical Notes

### Stack
- **Pure HTML/CSS/JS** — no frameworks, no build step
- Google Fonts loaded via CDN (Playfair Display, DM Sans, JetBrains Mono)
- Fully responsive (desktop, tablet, mobile breakpoints at 1024px and 768px)

### To Make This Production-Ready
1. **Replace CSS vials with real product photography** — swap the `.card-vial` and `.vial-illustration` elements with `<img>` tags
2. **Connect to an e-commerce backend** — Shopify, WooCommerce, or custom. The Add to Cart buttons currently use a simple JS counter
3. **Add real product data** — update the `products` array in the `<script>` section with actual SKUs, prices, descriptions
4. **Set up payment processing** — Stripe, Square, or your e-commerce platform's built-in solution
5. **Add real contact info** — replace placeholder phone/email/address
6. **Set up COA database** — link the COA Library nav item to actual downloadable PDFs
7. **SEO & Meta tags** — add Open Graph tags, meta descriptions, structured data
8. **Analytics** — add Google Analytics, Meta Pixel, etc.
9. **SSL certificate** — required for any e-commerce site
10. **Domain** — register akroresearch.com or similar

### File Structure
```
akro-research.html    — Complete single-file website (HTML + CSS + JS)
AKRO-HANDOFF.md       — This document
```

---

## Quick Customization Guide

### Change a product
Find the `products` array in the `<script>` tag at the bottom of the HTML file. Each product is an object like:
```javascript
{
  name: "BPC-157",
  cat: "recovery",        // filter category
  label: "Recovery",      // display label
  desc: "Description...",
  purity: "99.41%",
  weight: "5mg",
  price: 42.99,
  badge: "popular",       // "new", "popular", "exclusive", "sale", or null
  stock: "in",            // "in", "low", or "out"
  stockText: "IN STOCK",
  liquid: "rgba(26,47,63,0.07)"  // vial liquid color
}
```

### Change colors
All colors are CSS variables at the top of the `<style>` block under `:root`. Update there and they cascade everywhere.

### Change fonts
Update the Google Fonts `<link>` tag in `<head>` and the `font-family` references in CSS.

---

*Generated February 2026. Ready for Wayne to take and run with.*
