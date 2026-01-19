/* eslint-disable react/no-unescaped-entities */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How does Join My Trip work?",
    answer:
      "Simply create an account, set up your profile with your travel preferences, and start browsing or creating travel plans. Our matching algorithm will help you find compatible travel buddies based on your interests and destinations.",
  },
  {
    question: "Is it safe to travel with strangers?",
    answer:
      "Your safety is our priority. All users must verify their profiles, and we have a comprehensive review system. Always communicate through our platform, meet in public places first, and trust your instincts.",
  },
  {
    question: "What are the subscription benefits?",
    answer:
      "Premium subscribers get unlimited trip creations, priority matching, advanced search filters, verified badge, and access to exclusive travel deals and events.",
  },
  {
    question: "Can I cancel a trip?",
    answer:
      "Yes, you can cancel a trip at any time. However, please be respectful of other travelers who may have made arrangements. Check our cancellation policy for details on refunds.",
  },
  {
    question: "How do I get matched with other travelers?",
    answer:
      "Our smart algorithm matches you based on travel dates, destinations, interests, age range, and travel style. You can also manually search and filter travelers to find the perfect match.",
  },
  {
    question: "What if I have issues during my trip?",
    answer:
      "Our 24/7 support team is always available to assist you. You can reach us through the app, email, or phone. We also have emergency protocols in place for urgent situations.",
  },
];

export default function FAQSection() {
  return (
    <section className="py-20 bg-muted xl:px-24 lg:px-20 md:px-12 px-6 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/80 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/80 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto"
        >
          <div className="text-center mb-12">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about traveling with Join My Trip
            </p>
          </div>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left font-semibold hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-8 pt-8 border-t text-center ">
                <p className="text-muted-foreground mb-4">
                  Still have questions? We're here to help!
                </p>
                <Link href="/faq">
                  <Button variant="default">View All FAQs</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
