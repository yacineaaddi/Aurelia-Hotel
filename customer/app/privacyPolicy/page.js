import { privacyPolicy } from "../data/hotelData";
import Footer from "../components/Footer";
import Link from "next/link";

export const metadata = { title: "Aurelia Hotel | Privacy policy" };

export default function Page() {
  return (
    <>
      <div className="w-10/12 mx-auto mt-14 mb-24 flex flex-col gap-8">
        <h1 className="text-4xl text-accent-400 font-medium font-glida">
          Our Privacy Policy
        </h1>
        <div className="space-y-10 sm:space-y-12">
          {privacyPolicy.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28 border-b border-primary-800 pb-10 sm:pb-12"
            >
              <h2 className="font-[var(--font-gilda)] text-2xl leading-snug text-accent-400 sm:text-3xl">
                {section.title}
              </h2>

              <p className="mt-5 text-sm leading-8 text-primary-100/75 sm:text-base">
                {section.content}
              </p>

              {section.bullets && (
                <ul className="mt-5 space-y-3 pl-5 text-sm leading-7 text-primary-100/70 sm:text-base">
                  {section.bullets.map((item) => (
                    <li key={item} className="list-disc marker:text-accent-400">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.note && (
                <p className="mt-5 border-l-2 border-accent-400/50 pl-4 text-sm leading-7 text-primary-100/55">
                  {section.note}
                </p>
              )}
            </section>
          ))}

          {/* Contact */}
          <section id="contact" className="scroll-mt-28">
            <h2 className="font-[var(--font-gilda)] text-2xl text-accent-400 sm:text-3xl">
              11. Contact Us
            </h2>

            <p className="mt-5 text-sm leading-8 text-primary-100/75 sm:text-base">
              If you have questions about this Privacy Policy or would like to
              make a privacy-related request, please contact the Aurelia Hotel
              team.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-3 border-b border-accent-400 pb-2 text-sm text-accent-400 transition-colors hover:text-primary-100"
            >
              Contact our team <span aria-hidden="true">→</span>
            </Link>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
