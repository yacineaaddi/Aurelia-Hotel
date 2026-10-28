import { privacyPolicy } from "../data/hotelData";
import Footer from "../components/Footer";
import Link from "next/link";

export const metadata = { title: "Aurelia Hotel | Privacy policy" };

export default function Page() {
  return (
    <>
      <div className="policy">
        <h1 className="policy-heading">Our Privacy Policy</h1>
        <div className="policy-container">
          {privacyPolicy.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="policy-section"
            >
              <h2 className="policy-section-heading">{section.title}</h2>

              <p className="policy-section-paragraphe">{section.content}</p>

              {section.bullets && (
                <ul className="policy-section-bullets">
                  {section.bullets.map((item) => (
                    <li key={item} className="policy-bullets-list">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.note && (
                <p className="policy-section-note">{section.note}</p>
              )}
            </section>
          ))}

          <section id="contact" className="scroll-mt-28">
            <h2 className="policy-contact-section">11. Contact Us</h2>

            <p className="policy-contact-paragraphe">
              If you have questions about this Privacy Policy or would like to
              make a privacy-related request, please contact the Aurelia Hotel
              team.
            </p>

            <Link href="/contact" className="policy-contact-link">
              Contact our team <span aria-hidden="true">→</span>
            </Link>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
