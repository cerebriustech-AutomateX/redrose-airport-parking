import type { Metadata } from "next";
import ContentPageLayout from "@/components/ContentPageLayout";
import { companyInfo, termsSections } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms & Conditions | RedRose Airport Parking",
  description:
    "Terms and conditions for Red Rose Airport Parking Ltd — Meet & Greet and Park & Ride services at Manchester Airport.",
};

export default function TermsPage() {
  return (
    <ContentPageLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      intro={`${companyInfo.name} — ${companyInfo.airport} parking services including Meet & Greet and Park & Ride.`}
    >
      {termsSections.map((section) => (
        <section key={section.title} className="content-section">
          <h2 className="content-section-title">{section.title}</h2>
          <ul className="content-bullet-list">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </ContentPageLayout>
  );
}
