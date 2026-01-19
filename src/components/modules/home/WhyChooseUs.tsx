/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { ShieldCheck, HeartHandshake, Infinity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
  {
    icon: ShieldCheck,
    title: "Unmatched Safety",
    description:
      "We prioritize your safety above all else. With rigorous identity verification and 24/7 support, you can travel with complete peace of mind.",
    number: "01",
    gradient: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-500",
  },
  {
    icon: HeartHandshake,
    title: "Authentic Connections",
    description:
      "Forget superficial tourism. Our community is built on genuine connections, bringing together like-minded travelers for life-changing experiences.",
    number: "02",
    gradient: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-500",
  },
  {
    icon: Infinity,
    title: "Limitless Possibilities",
    description:
      "From weekend getaways to year-long expeditions. Create the journey you've always dreamed of with companions who share your vision.",
    number: "03",
    gradient: "from-orange-500/20 to-yellow-500/20",
    iconColor: "text-orange-500",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-muted xl:px-24 lg:px-20 md:px-12 px-6 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/80 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/80 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Travel Different, Travel{" "}
            <span className="text-primary">Better</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            We're not just a platform; we're a movement changing how the world
            explores together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="h-full border-none shadow-lg bg-background/50 backdrop-blur-sm hover:bg-background transition-colors duration-300 overflow-hidden group relative">
                <CardContent className="p-8 h-full flex flex-col items-center text-center relative z-10">
                  {/* Large Background Number */}
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] text-9xl font-black select-none pointer-events-none transition-opacity group-hover:opacity-[0.07]">
                    {value.number}
                  </div>

                  {/* Icon with Gradient Blob */}
                  <div className="relative mb-6">
                    <div
                      className={`absolute inset-0 rounded-full blur-xl bg-linear-to-br ${value.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    <div className="relative w-20 h-20 bg-card rounded-full flex items-center justify-center shadow-sm border group-hover:scale-110 transition-transform duration-300">
                      <value.icon className={`w-10 h-10 ${value.iconColor}`} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>

                {/* Bottom colored border */}
                <div
                  className={`h-1 w-0 group-hover:w-full transition-all duration-500 bg-linear-to-r ${value.gradient} mx-auto`}
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
