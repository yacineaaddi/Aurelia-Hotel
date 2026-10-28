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
    <footer className="Footer">
      <div className="Footer-main">
        <div className="Footer-main-box">
          <div className="Footer-logo">
            <Link href="/" className="inline-block">
              <span className="Footer-hotelName">Aurelia</span>
              <span className="Footer-slogan">Hotel & Retreat</span>
            </Link>

            <p className="Footer-description">
              A place to slow down, find comfort, and make every stay a
              memorable experience.
            </p>
          </div>

          <div>
            <h3 className="Footer-title">Explore</h3>

            <ul className="mt-6 space-y-4">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="Footer-links">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="Footer-title">Guest Services</h3>

            <ul className="mt-6 space-y-4">
              {guestLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="Footer-links">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="Footer-title">Get in Touch</h3>

            <p className="Footer-contact">
              Have a question or need help planning your stay? We would be
              delighted to hear from you.
            </p>

            <Link href="/contact" className="Footer-contact-link">
              Contact our team
              <span className="Footer-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="Footer-subline">
        <div className="Footer-copyright">
          <p className="Footer-copyright-text">
            © {currentYear} Aurelia Hotel. All rights reserved.
          </p>

          <div className="Footer-box">
            <Link href="/privacyPolicy" className="Footer-box-link">
              Privacy Policy
            </Link>
            <Link href="/termsAndConditions" className="Footer-box-link">
              Terms & Conditions
            </Link>
          </div>

          <Link onClick={HandleScroll} href="/" className="Footer-backToTop">
            Back to top ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
