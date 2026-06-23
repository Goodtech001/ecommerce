"use client";

import Link from "next/link";
import Form from "next/form";

const footerLinks = [
  {
    title: "Collection",
    links: [
      { label: "All Products", href: "/" },
      { label: "New Arrivals", href: "/?filter=new" },
      { label: "Limited Offers", href: "/?filter=sales" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Order Tracking", href: "/orders" },
      { label: "Shipping & Returns", href: "/returns" },
      { label: "Contact Care", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

function Footer() {
  return (
    <footer className="w-full bg-zinc-950 text-zinc-400 border-t border-zinc-900 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        {/* Top Section: Navigation Grid + Newsletter Subscription */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-zinc-900">
          
          {/* Brand Focus Area */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-white text-lg font-black tracking-tight">Wyna & co.</h3>
            <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
              Meticulously crafted essentials designed for modern environments and premium lifestyle curation.
            </p>
          </div>

          {/* Map Link Matrices */}
          <div className="lg:col-span-4 grid grid-cols-3 gap-6 sm:gap-8">
            {footerLinks.map((group) => (
              <div key={group.title} className="space-y-3.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  {group.title}
                </h4>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href} 
                        className="text-xs text-zinc-500 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Minimal Editorial Newsletter Field */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Join the Editorial List
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Receive drop announcements, regional collection updates, and members-only offers directly.
            </p>
            <Form action="/newsletter" className="relative max-w-sm">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-700 text-xs text-white px-4 py-3 rounded-xl outline-hidden transition-all placeholder:text-zinc-600 pr-24"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white text-zinc-950 font-bold text-[11px] px-3 py-1.5 rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </Form>
          </div>

        </div>

        {/* Bottom Section: Copyright Metadata & Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium text-zinc-600 tracking-wide">
          <p>© {new Date().getFullYear()} Wyna & co. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-400 transition-colors cursor-default">Secure checkout via Stripe & Flutterwave</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;