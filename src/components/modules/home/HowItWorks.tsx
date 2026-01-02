import { UserPlus, CalendarPlus, Plane } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "1. Sign Up & Profile",
    description: "Create your account and build a profile showcasing your travel interests (and maybe a cool bio!).",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    icon: CalendarPlus,
    title: "2. Create or Join",
    description: "Post your own travel plan or browse existing trips to find one that matches your dream vacation.",
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  },
  {
    icon: Plane,
    title: "3. Travel Together",
    description: "Connect, chat, and set off on your journey with your new travel buddies. It's that simple!",
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Your journey to finding the perfect travel companion starts here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent z-0" />

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center space-y-6">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center ${step.color} shadow-lg mb-4 transition-transform hover:scale-110 duration-300`}>
                <step.icon className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
