/* eslint-disable react/no-unescaped-entities */
import { Shield, Users, ThumbsUp, Clock, Heart, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Verified Travelers",
    description:
      "All our members are verified to ensure your safety and peace of mind.",
    color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20",
  },
  {
    icon: Users,
    title: "Diverse Community",
    description:
      "Connect with travelers from over 50 countries and diverse backgrounds.",
    color: "text-green-500 bg-green-50 dark:bg-green-900/20",
  },
  {
    icon: ThumbsUp,
    title: "Trusted Reviews",
    description:
      "Read authentic reviews from real travelers who've been there.",
    color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Our dedicated support team is here to help you anytime, anywhere.",
    color: "text-orange-500 bg-orange-50 dark:bg-orange-900/20",
  },
  {
    icon: Heart,
    title: "Match Algorithm",
    description:
      "Smart matching based on interests, travel style, and preferences.",
    color: "text-red-500 bg-red-50 dark:bg-red-900/20",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Explore destinations worldwide with local and international buddies.",
    color: "text-cyan-500 bg-cyan-50 dark:bg-cyan-900/20",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Join My Trip?
          </h2>
          <p className="text-muted-foreground text-lg">
            We're more than just a travel platform. We're a global community
            dedicated to making travel accessible, safe, and memorable for
            everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <CardContent className="p-8">
                <div
                  className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
