/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  CheckCircle2,
  UserCheck,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const safetyFeatures = [
  {
    icon: UserCheck,
    title: "Verified Profiles",
    description:
      "All users undergo identity verification to ensure authenticity",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Industry-standard encryption for all financial transactions",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "Your personal data is protected with advanced security measures",
  },
  {
    icon: Eye,
    title: "Transparent Reviews",
    description: "Honest feedback system helps you make informed decisions",
  },
  {
    icon: CheckCircle2,
    title: "24/7 Support",
    description: "Round-the-clock customer support for your peace of mind",
  },
  {
    icon: FileCheck,
    title: "Terms Compliance",
    description: "Strict community guidelines to maintain a safe environment",
  },
];

export default function SafetySection() {
  return (
    <section className="py-24 xl:px-24 lg:px-20 md:px-12 px-6 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
              <Shield className="h-4 w-4" />
              <span>Safety & Security</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Travel with{" "}
              <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Confidence
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Your safety is our top priority. We've implemented comprehensive
              security measures to ensure you have a worry-free travel
              experience. Every aspect of our platform is designed with your
              protection in mind.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Background Checks</h4>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive verification process for all members
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">
                    Encrypted Communications
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    End-to-end encryption for all your conversations
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Fraud Prevention</h4>
                  <p className="text-sm text-muted-foreground">
                    AI-powered systems to detect and prevent fraudulent activity
                  </p>
                </div>
              </div>
            </div>

            <Link href="/privacy-policy">
              <Button size="lg" className="rounded-full">
                Learn More About Our Security
              </Button>
            </Link>
          </motion.div>

          {/* Right Side - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {safetyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-2xl border bg-card hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
