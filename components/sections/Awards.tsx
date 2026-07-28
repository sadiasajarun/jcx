import Image from 'next/image';
import { awards } from '@/data/content';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';

export function Awards() {
  return (
    <section id="awards" aria-labelledby="awards-heading" className="py-24 md:py-32">
      <div className="shell">
        <div className="text-center">
          <Reveal>
            <p className="eyebrow justify-center before:hidden">Awards &amp; Recognition</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              id="awards-heading"
              className="display mx-auto mt-6 max-w-2xl text-[clamp(2.5rem,4.5vw,3.5rem)] text-ink"
            >
              Your trust is our
              <span className="block italic text-brand dark:text-accent">greatest award.</span>
            </h2>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {awards.map((award) => (
            <RevealItem key={award.id} className="bg-surface">
              <figure className="group flex h-full flex-col items-center gap-4 p-8 transition-colors hover:bg-accent/[0.04] md:p-10">
                <div className="relative aspect-square w-full max-w-[130px] overflow-hidden">
                  <Image
                    src={award.image}
                    alt={award.caption}
                    fill
                    sizes="130px"
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="text-center text-[0.7rem] tracking-[0.14em] text-muted uppercase">
                  {award.caption}
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <p className="mt-6 text-center text-[0.75rem] text-muted">
            TODO: client to supply the real award emblems and captions
            (<code>wp-content/uploads/2023/09/Award-*.webp</code>).
          </p>
        </Reveal>
      </div>
    </section>
  );
}
