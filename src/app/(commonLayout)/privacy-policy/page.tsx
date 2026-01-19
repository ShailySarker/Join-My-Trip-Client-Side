// "use client";

// import { motion } from "framer-motion";

// export default function PrivacyPolicyPage() {
//   return (
//     <div className="p-8">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.5 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="w-32 h-32 bg-emerald-500 rounded-lg"
//       />

//       <motion.button
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg"
//       >
//         Hover Me
//       </motion.button>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Shield,
  Eye,
  Database,
  UserCheck,
  Download,
  Trash2,
  List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState("overview");

  const sections = [
    { id: "overview", title: "Overview", icon: <Shield className="w-4 h-4" /> },
    {
      id: "data-collection",
      title: "Data We Collect",
      icon: <Database className="w-4 h-4" />,
    },
    {
      id: "data-use",
      title: "How We Use Data",
      icon: <Eye className="w-4 h-4" />,
    },
    {
      id: "rights",
      title: "Your Rights",
      icon: <UserCheck className="w-4 h-4" />,
    },
    {
      id: "question",
      title: "Other Info",
      icon: <List className="w-4 h-4" />,
    },
  ];

  const dataCategories = [
    {
      category: "Personal Information",
      items: ["Fullname", "Email address", "Profile photo", "Age", "Location"],
      purpose: "Account creation and verification",
    },
    {
      category: "Travel Information",
      items: [
        "Travel plans",
        "Destinations",
        "Travel dates",
        "Interests",
        "Budget",
      ],
      purpose: "Matching and recommendations",
    },
    {
      category: "Communication Data",
      items: ["Messages", "Reviews", "Ratings", "Feedback"],
      purpose: "Service improvement and moderation",
    },
    {
      category: "Technical Data",
      items: ["IP address", "Device info", "Browser type", "Usage data"],
      purpose: "Security and analytics",
    },
  ];

  return (
    <div className="xl:px-24 lg:px-20 md:px-12 px-6 xl:pt-7 lg:pt-5 md:pt-4 pt-3 xl:pb-24 lg:pb-20 md:pb-16 pb-14">
      {/* Header */}
      <div className="bg-linear-to-r bg-primary py-16">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <Lock className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Privacy Policy
            </h1>

            <p className="text-xl text-accent/80 mb-8">
              Your privacy is our priority. Learn how we protect your data.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-white/20 py-1 text-white">
                <Lock className="w-4 h-4 mr-0.5" />
                End-to-end encrypted
              </Badge>
              <Badge className="bg-white/20 py-1 text-white">
                Updated: January 07, 2026
              </Badge>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <Shield className="w-5 h-5 mr-2 text-primary" />
                  <h3 className="font-bold">Quick Navigation</h3>
                </div>

                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id);
                        document.getElementById(section.id)?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                        activeSection === section.id
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span className="mr-3">{section.icon}</span>
                      {section.title}
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                {/* Overview */}
                <section id="overview" className="mb-12">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Overview</h2>
                      <p className="text-gray-600">
                        How we protect your privacy
                      </p>
                    </div>
                  </div>

                  <div className="ml-14">
                    <p className="text-gray-600 mb-6">
                      At TravelBuddy, we take your privacy seriously. This
                      Privacy Policy explains how we collect, use, disclose, and
                      safeguard your information when you use our platform.
                      Please read this privacy policy carefully.
                    </p>

                    <Card className="bg-primary/5 border-primary/10">
                      <CardContent className="p-6">
                        <h3 className="font-bold text-primary mb-4">
                          Our Commitment
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium mb-2">Transparency</h4>
                            <p className="text-sm text-gray-600">
                              We clearly explain what data we collect and why
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Security</h4>
                            <p className="text-sm text-gray-600">
                              Industry-standard encryption and security measures
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Control</h4>
                            <p className="text-sm text-gray-600">
                              You control your data and privacy settings
                            </p>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Compliance</h4>
                            <p className="text-sm text-gray-600">
                              GDPR, CCPA, and other privacy regulations
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                <Separator />

                {/* Data We Collect */}
                <section id="data-collection" className="py-12">
                  <div className="flex items-center mb-8">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Database className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Data We Collect</h2>
                      <p className="text-gray-600">
                        Information you provide and we collect
                      </p>
                    </div>
                  </div>

                  <div className="ml-14">
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      {dataCategories.map((category) => (
                        <Card key={category.category}>
                          <CardContent className="p-6">
                            <h3 className="font-bold mb-4">
                              {category.category}
                            </h3>
                            <ul className="space-y-2 mb-4">
                              {category.items.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-center text-gray-600"
                                >
                                  <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                                  {item}
                                </li>
                              ))}
                            </ul>
                            <div className="text-sm text-primary bg-primary/5 shadow px-3 py-2 rounded">
                              Purpose: {category.purpose}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </section>

                <Separator />

                {/* How We Use Data */}
                <section id="data-use" className="py-12">
                  <div className="flex items-center mb-8">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <Eye className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">
                        How We Use Your Data
                      </h2>
                      <p className="text-gray-600">
                        Purposes of data processing
                      </p>
                    </div>
                  </div>

                  <div className="ml-14">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Card>
                        <CardContent className="p-6">
                          <div className="text-primary font-bold mb-4">
                            Service Operation
                          </div>
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                                <span className="text-primary text-sm">✓</span>
                              </div>
                              <span>Provide and maintain our services</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                                <span className="text-primary text-sm">✓</span>
                              </div>
                              <span>Process your transactions</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                                <span className="text-primary text-sm">✓</span>
                              </div>
                              <span>Send service-related communications</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6">
                          <div className="text-primary font-bold mb-4">
                            Improvement & Personalization
                          </div>
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                                <span className="text-primary text-sm">✓</span>
                              </div>
                              <span>Personalize your experience</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                                <span className="text-primary text-sm">✓</span>
                              </div>
                              <span>Improve our services</span>
                            </li>
                            <li className="flex items-start">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0">
                                <span className="text-primary text-sm">✓</span>
                              </div>
                              <span>Develop new features</span>
                            </li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </section>

                {/* Your Rights */}
                <section id="rights" className="py-12">
                  <div className="flex items-center mb-8">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      <UserCheck className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">
                        Your Privacy Rights
                      </h2>
                      <p className="text-gray-600">
                        Control your personal information
                      </p>
                    </div>
                  </div>

                  <div className="ml-14">
                    <div className="grid md:grid-cols-3 gap-6">
                      <Card>
                        <CardContent className="p-6 text-center">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                            <Eye className="w-6 h-6" />
                          </div>
                          <h3 className="font-bold mb-2">Right to Access</h3>
                          <p className="text-sm text-gray-600">
                            Request a copy of your personal data
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6 text-center">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                            <Download className="w-6 h-6" />
                          </div>
                          <h3 className="font-bold mb-2">
                            Right to Portability
                          </h3>
                          <p className="text-sm text-gray-600">
                            Receive your data in a portable format
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardContent className="p-6 text-center">
                          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                            <Trash2 className="w-6 h-6" />
                          </div>
                          <h3 className="font-bold mb-2">Right to Deletion</h3>
                          <p className="text-sm text-gray-600">
                            Request deletion of your personal data
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="mt-8 p-6 bg-linear-to-r from-blue-50 to-purple-50 rounded-xl">
                      <h3 className="font-bold mb-4">Exercise Your Rights</h3>
                      <p className="text-gray-600 mb-4">
                        To exercise any of these rights, please contact our
                        Privacy Officer through our email
                        privacy@joinmytrip.com. Want to know more about our
                        company? Kindly visit here-
                      </p>
                      <div className="flex gap-2">
                        <Link href="/about-us">
                          <Button>About Us</Button>
                        </Link>
                        <Link href="/terms-of-service">
                          <Button variant="outline">Terms of Service</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Contact Section */}
                <section id="question" className="pt-8">
                  <Card className="bg-linear-to-r bg-primary border-0">
                    <CardContent className="p-8">
                      <div className="text-center">
                        <Lock className="w-12 h-12 mx-auto mb-6 text-white" />
                        <h2 className="text-2xl font-bold mb-4 text-white ">
                          Privacy Questions?
                        </h2>
                        <p className="text-accent/80 mb-6 w-[60%] mx-auto">
                          Our dedicated privacy team is here to help with any
                          questions about your data protection and privacy
                          rights.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          <Link href="/faq">
                            <Button variant="outline">Visit FAQ Page</Button>
                          </Link>
                          <Link href="/terms-of-service">
                            <Button variant="outline">Terms of Service</Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </section>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
