"use client";

import Link from "next/link";

const exploreLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const guestLinks = [
  { label: "My Reservations", href: "/account/reservations" },
  { label: "My Profile", href: "/account/profile" },
  { label: "Rooms", href: "/cabins" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  function HandleScroll(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="mt-auto bg-primary-950 text-primary-100 border-t border-primary-800">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-10 lg:px-12 lg:py-20 text-center sm:text-left">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start">
            <Link href="/" className="inline-block">
              <span className="font-[var(--font-gilda)] text-3xl tracking-wide">
                Aurelia
              </span>
              <span className="mt-1 block text-xs uppercase tracking-[0.3em] text-accent-400">
                Hotel & Retreat
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-primary-100/70">
              A place to slow down, find comfort, and make every stay a
              memorable experience.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-[var(--font-gilda)] text-xl text-accent-400">
              Explore
            </h3>

            <ul className="mt-6 space-y-4">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-100/70 transition-colors duration-200 hover:text-accent-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guest services */}
          <div>
            <h3 className="font-[var(--font-gilda)] text-xl text-accent-400">
              Guest Services
            </h3>

            <ul className="mt-6 space-y-4">
              {guestLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-100/70 transition-colors duration-200 hover:text-accent-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-[var(--font-gilda)] text-xl text-accent-400">
              Get in Touch
            </h3>

            <p className="mt-6 text-sm leading-7 text-primary-100/70">
              Have a question or need help planning your stay? We would be
              delighted to hear from you.
            </p>

            <Link
              href="/contact"
              className="group mt-5 inline-flex items-center gap-2 border-b border-accent-400/50 pb-1 text-sm text-accent-400 transition-colors hover:border-accent-400 hover:text-primary-100"
            >
              Contact our team
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-800/80">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center sm:px-10 md:flex-row md:text-left lg:px-12">
          <p className="text-xs text-primary-100/50">
            © {currentYear} Aurelia Hotel. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-primary-100/50">
            <Link
              href="/privacyPolicy"
              className="transition-colors hover:text-accent-400"
            >
              Privacy Policy
            </Link>
            <Link
              href="/termsAndConditions"
              className="transition-colors hover:text-accent-400"
            >
              Terms & Conditions
            </Link>
          </div>

          <Link
            onClick={HandleScroll}
            href="/"
            className="text-xs uppercase tracking-[0.2em] text-primary-100/50 transition-colors hover:text-accent-400"
          >
            Back to top ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
