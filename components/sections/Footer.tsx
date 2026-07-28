import Link from 'next/link';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { site } from '@/data/site';
import { Logo } from '@/components/ui/Logo';
import { SocialIcons } from '@/components/ui/SocialIcons';

export function Footer() {
  return (
    // `#contact` — every "Contact" CTA on the page lands here.
    // Brand blue in light mode, near-black in dark mode.
    <footer id="contact" className="bg-brand-deep text-white dark:bg-[#0A0B0E]">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Col 1 — brand */}
          <div className="lg:col-span-5">
            <Logo variant="invert" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
              {site.positioning}
            </p>
            <address className="mt-6 flex gap-3 text-sm not-italic text-white/70">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <span>
                {site.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </address>
          </div>

          {/* Col 2 — on-page navigation */}
          <nav aria-label="Explore this page" className="lg:col-span-3">
            <h3 className="text-[0.7rem] font-medium tracking-[0.2em] text-accent uppercase">
              Explore
            </h3>
            <ul className="mt-5 space-y-2.5">
              {site.footerExplore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline cursor-pointer text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3 — contact */}
          <div className="lg:col-span-4">
            <h3 className="text-[0.7rem] font-medium tracking-[0.2em] text-accent uppercase">
              Get in touch
            </h3>
            <ul className="mt-5 space-y-3.5 text-sm text-white/70">
              <li>
                <a
                  href={site.hotline.href}
                  className="link-underline cursor-pointer hover:text-white"
                >
                  <Phone className="size-4 text-accent" aria-hidden />
                  <span>
                    Hotline <span className="font-semibold text-white">{site.hotline.label}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={site.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline cursor-pointer hover:text-white"
                >
                  <MessageCircle className="size-4 text-accent" aria-hidden />
                  {site.whatsapp.number}
                </a>
              </li>
              <li>
                {/* TODO: confirm the public enquiry address with the client. */}
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline cursor-pointer hover:text-white"
                >
                  <Mail className="size-4 text-accent" aria-hidden />
                  {site.email}
                </a>
              </li>
            </ul>

            <SocialIcons className="mt-7" size="md" itemClassName="border-white/20 text-white/80" />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col items-center justify-between gap-3 py-6 text-[0.75rem] text-white/50 sm:flex-row">
          <p>{site.copyright}</p>
          {/* Credit line slot — client to confirm wording. */}
          <p>Designed &amp; developed for {site.shortName}.</p>
        </div>
      </div>
    </footer>
  );
}
