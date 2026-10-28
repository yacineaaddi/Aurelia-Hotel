import { termsAndConditions } from "../data/hotelData";
import Footer from "../components/Footer";
import Link from "next/link";

export const metadata = { title: "Aurelia Hotel | Terms & Conditions" };

export default function Page() {
  return (
    <>
      <div className="Terms">
        <h1 className="Terms-heading">Our Terms & Conditions</h1>
        <div className="Terms-container">
          {termsAndConditions.map((section) => (
            <section key={section.id} id={section.id} className="Terms-section">
              <h2 className="Terms-section-heading">{section.title}</h2>

              <div className="mt-5 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="Terms-section-paragraphe">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <section id="contact" className="scroll-mt-28">
            <h2 className="Terms-contact-section">15. Contact Us</h2>

            <p className="Terms-contact-paragraphe">
              If you have questions about these terms, your reservation, or our
              services, please contact the Aurelia Hotel team.
            </p>

            <Link href="/contact" className="Terms-contact-link">
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
