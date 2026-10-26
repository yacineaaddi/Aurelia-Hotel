import { termsAndConditions } from "../data/hotelData";
import Footer from "../components/Footer";
import Link from "next/link";

export const metadata = { title: "Aurelia Hotel | Terms & Conditions" };

export default function Page() {
  return (
    <>
      <div className="w-10/12 mx-auto mt-14 mb-24 flex flex-col gap-8">
        <h1 className="text-4xl text-accent-400 font-medium font-glida">
          Our Terms & Conditions
        </h1>
        <div className="space-y-10 sm:space-y-12">
          {termsAndConditions.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28 border-b border-primary-800 pb-10 sm:pb-12"
            >
              <h2 className="font-[var(--font-gilda)] text-2xl leading-snug text-accent-400 sm:text-3xl">
                {section.title}
              </h2>

              <div className="mt-5 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-8 text-primary-100/75 sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {termsAndConditions.link && (
                <Link
                  href={termsAndConditions.link.href}
                  className="mt-5 inline-flex items-center gap-2 border-b border-accent-400/50 pb-1 text-sm text-accent-400 transition-colors hover:border-accent-400 hover:text-primary-100"
                >
                  {termsAndConditions.link.label}
                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </section>
          ))}

          {/* Contact */}
          <section id="contact" className="scroll-mt-28">
            <h2 className="font-[var(--font-gilda)] text-2xl text-accent-400 sm:text-3xl">
              15. Contact Us
            </h2>

            <p className="mt-5 text-sm leading-8 text-primary-100/75 sm:text-base">
              If you have questions about these terms, your reservation, or our
              services, please contact the Aurelia Hotel team.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-3 border-b border-accent-400 pb-2 text-sm text-accent-400 transition-colors hover:text-primary-100"
            >
              Contact our team
              <span aria-hidden="true">→</span>
            </Link>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
