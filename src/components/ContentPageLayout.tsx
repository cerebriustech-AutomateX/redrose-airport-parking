import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { companyInfo, footerInfoLinks } from "@/lib/data";

type ContentPageLayoutProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
};

export default function ContentPageLayout({
  eyebrow,
  title,
  intro,
  children,
}: ContentPageLayoutProps) {
  return (
    <div className="min-h-screen bg-redrose-charcoal text-redrose-off-white">
      <header className="border-b border-white/5 bg-[#1A1A1D]/90">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/" className="shrink-0">
            <Image
              src="/images/redrose-logo.png"
              alt="RedRose Airport Parking"
              width={1024}
              height={682}
              className="h-10 w-auto bg-transparent sm:h-12"
            />
          </Link>
          <div className="flex items-center gap-5 text-sm">
            <Link
              href="/"
              className="text-redrose-off-white/70 transition-colors hover:text-white"
            >
              Home
            </Link>
            <Link href="/#book" className="btn-primary px-4 py-2 text-sm">
              Book
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <p className="content-page-eyebrow">{eyebrow}</p>
        <h1 className="content-page-title">{title}</h1>
        {intro ? <p className="content-page-intro">{intro}</p> : null}
        <div className="content-page-body">{children}</div>
      </main>

      <footer className="border-t border-white/5 bg-[#0f0f11]">
        <div className="mx-auto max-w-3xl px-6 py-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="text-sm text-redrose-grey">
              <p>{companyInfo.email}</p>
              <p className="mt-1">
                <a
                  href={`tel:${companyInfo.operationsPhone}`}
                  className="transition-colors hover:text-white"
                >
                  {companyInfo.operationsPhoneDisplay}
                </a>
              </p>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {footerInfoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-redrose-grey transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
