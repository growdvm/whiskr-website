/** Server-rendered LCP headline (visible before client JS). */
export function HeroHeadline() {
  return (
    <>
      <h1 className="font-dm-sans text-[clamp(2rem,4.2vw,3.25rem)] font-extrabold leading-[1.12] tracking-tight mb-5 hero-lcp">
        <span className="text-[#101235]">The AI Vet Scribe That Finishes Your Notes </span>
        <span className="text-gradient-whiskr">Before Your Next Patient</span>
      </h1>
      <p
        className="text-base sm:text-lg text-[#475569] mb-6 max-w-[36rem] hero-animate-delay-1"
        style={{ lineHeight: 1.7 }}
      >
        Chart less, care more. Built for how vets actually practice — complete SOAP notes, 17+ languages,
        medication summary, one-click PIMS sync, and full review before you finalize.
      </p>
    </>
  );
}
