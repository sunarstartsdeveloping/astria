const steps = [
  {
    number: "01",
    title: "Discover",
    description: "Deep-dive into your goals, audience, competitors, and market to craft the perfect strategy.",
  },
  {
    number: "02",
    title: "Design",
    description: "Transform strategy into stunning wireframes, prototypes, and visual designs you'll love.",
  },
  {
    number: "03",
    title: "Build",
    description: "Develop, test, and refine every detail with clean code and pixel-perfect execution.",
  },
  {
    number: "04",
    title: "Launch & Scale",
    description: "Deploy to production, monitor performance, and continuously optimize for growth.",
  },
];

export function Process() {
  return (
    <section className="py-24 bg-muted/40 border-t border-border/40 relative" id="process">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="text-center max-w-[620px] mx-auto mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.1em] text-brand mb-3">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            How We Bring Ideas to Life
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed">
            A streamlined 4-step process designed to take your project from concept to launch — efficiently and beautifully.
          </p>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Connector line on desktop */}
          <div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-[1.5px] bg-border/80 z-0" />

          {steps.map((step) => (
            <div key={step.number} className="relative z-10 text-center flex flex-col items-center group">
              <div className="w-14 h-14 rounded-full bg-card border-2 border-brand/30 text-brand font-bold text-sm flex items-center justify-center mb-6 group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-all duration-300 shadow-sm">
                {step.number}
              </div>
              <h3 className="text-base font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[220px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
