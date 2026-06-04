import Image from "next/image";
import Link from "next/link";
import { footerLegalLinks, footerQuickLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-white/5 bg-[#0f0f11] pt-16 pb-10"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <Image
              src="/images/redrose-logo.png"
              alt="RedRose Airport Parking"
              width={220}
              height={280}
              className="h-24 w-auto sm:h-28 lg:h-32"
            />
            <p className="mt-6 max-w-sm leading-relaxed text-redrose-grey">
              Premium, secure and convenient airport parking designed to make
              your journey easier.
            </p>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-montserrat)] text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-redrose-grey transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-montserrat)] text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-redrose-grey">
              <li>Email: info@redroseparking.co.uk</li>
              <li>Phone: 00000 000000</li>
              <li>Location details coming soon</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-redrose-grey">
            &copy; {new Date().getFullYear()} RedRose Airport Parking. All
            rights reserved.
          </p>
          <ul className="flex flex-wrap gap-6">
            {footerLegalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-xs text-redrose-grey transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
