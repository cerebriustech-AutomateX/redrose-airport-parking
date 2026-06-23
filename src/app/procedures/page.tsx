import type { Metadata } from "next";
import ContentPageLayout from "@/components/ContentPageLayout";
import {
  arrivalSteps,
  companyInfo,
  departureSteps,
  importantInfo,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Park & Ride Procedures | RedRose Airport Parking",
  description:
    "Departure and arrival procedures for Red Rose Airport Parking Park & Ride at Manchester Airport.",
};

type StepListProps = {
  title: string;
  steps: readonly string[];
};

function StepList({ title, steps }: StepListProps) {
  return (
    <section className="content-section">
      <h2 className="content-section-title">{title}</h2>
      <ol className="content-step-list">
        {steps.map((step, index) => (
          <li key={index} className="content-step-item">
            <span className="content-step-number">{index + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function ProceduresPage() {
  return (
    <ContentPageLayout
      eyebrow="Procedures"
      title="Park & Ride instructions"
      intro={`Step-by-step guidance for your journey at ${companyInfo.airport}. Facility postcode: ${companyInfo.facilityPostcode}.`}
    >
      <StepList title="Departure" steps={departureSteps} />
      <StepList title="Arrival" steps={arrivalSteps} />

      {importantInfo.map((item) => (
        <section key={item.title} className="content-section">
          <h2 className="content-section-title">{item.title}</h2>
          <p className="content-section-body">{item.body}</p>
        </section>
      ))}

      <p className="content-section-body">
        For assistance, contact our Operations Team on{" "}
        <a
          href={`tel:${companyInfo.operationsPhone}`}
          className="text-white underline-offset-4 hover:underline"
        >
          {companyInfo.operationsPhoneDisplay}
        </a>
        .
      </p>
    </ContentPageLayout>
  );
}
