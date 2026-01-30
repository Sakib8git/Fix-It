"use client";

const steps = [
  {
    number: 1,
    title: "Book Online",
    description:
      "Select your service and schedule a pickup or drop-off time through our portal.",
  },
  {
    number: 2,
    title: "Drop-off Device",
    description:
      "Bring your device to our shop or mail it to us using our secure packaging kit.",
  },
  {
    number: 3,
    title: "Receive Fixed Device",
    description:
      "Pick up your professionally repaired device, tested and ready for pickup.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
            Simple 3-Step Process
          </h2>
          <p className="text-lg text-muted-foreground">
            Getting your device fixed has never been easier. Follow our
            streamlined process to get back online.
          </p>
        </div>

        {/* Steps Container */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            return (
              <div key={index} className="text-center">
                {/* Step Number Circle */}
                <div className="mb-6 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-2xl">
                    {step.number}
                  </div>
                </div>

                {/* Step Content */}
                <h3 className="mb-3 text-xl font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
