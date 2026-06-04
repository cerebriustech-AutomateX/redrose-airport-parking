import { trustPoints } from "@/lib/data";

export default function TrustBar() {
  return (
    <section className="relative border-y border-white/[0.06] bg-[#1A1A1D]/40 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-7 lg:px-8">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/10">
          {trustPoints.map((point) => (
            <li key={point} className="lg:px-6 lg:first:pl-0 lg:last:pr-0">
              <span className="font-[family-name:var(--font-montserrat)] text-sm font-medium tracking-wide text-[#F2F2F2] sm:text-[0.9375rem]">
                {point}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
