"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  Users,
  Shield,
  CreditCard,
  MessageSquare,
  Settings,
  Plane,
  Search,
  UserCheck,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const categories = [
    {
      id: "general",
      name: "General",
      icon: <HelpCircle className="w-5 h-5" />,
    },
    { id: "account", name: "Account", icon: <Users className="w-5 h-5" /> },
    { id: "safety", name: "Safety", icon: <Shield className="w-5 h-5" /> },
    {
      id: "payments",
      name: "Payments",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: "travel",
      name: "Travel Planning",
      icon: <Plane className="w-5 h-5" />,
    },
    {
      id: "features",
      name: "Features",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const faqs = {
    general: [
      {
        question: "What is JoinMyTrip?",
        answer:
          "JoinMyTrip is a social platform that connects travelers looking for companions for their trips. We help solo travelers find like-minded companions to share adventures, split costs, and create unforgettable memories together.",
      },
      {
        question: "Is JoinMyTrip free to use?",
        answer:
          "Yes! We offer a free plan with basic features including profile creation, limited travel plans, and basic search functionality. We also offer Monthly and Yearly based plans with advanced features.",
      },
      {
        question: "How do I get started?",
        answer:
          "Getting started is easy! Just sign up for a free account, create your profile with your travel interests, and start browsing travel plans or create your own. Our AI will suggest compatible travel buddies based on your preferences.",
      },
      {
        question: "Is JoinMyTrip available worldwide?",
        answer:
          "Yes! JoinMyTrip is available in 150+ countries. Our community includes travelers from all around the world, making it easy to find companions no matter where you want to go.",
      },
    ],
    account: [
      {
        question: "How do I create an account?",
        answer:
          'Click the "Sign Up" button in the top right corner. You can sign up using your email address. You\'ll need to verify your email and complete your profile before you can start connecting with other travelers.',
      },
      {
        question: "How do I verify my account?",
        answer:
          "We offer multiple verification options: email verification, phone verification, and optional ID verification for Premium users. Verified accounts receive a trust badge and gain access to more features.",
      },
      {
        question: "Can I delete my account?",
        answer:
          "Yes, you can delete your account at any time from your account settings. Please note that account deletion is permanent and all your data will be removed from our systems within 30 days.",
      },
      {
        question: "How do I update my profile information?",
        answer:
          'Go to your profile page and click the "Edit Profile" button. You can update your personal information, travel interests, profile photo, and other details at any time.',
      },
    ],
    safety: [
      {
        question: "How does JoinMyTrip ensure user safety?",
        answer:
          "We take safety seriously with multiple layers of protection: verified profiles, background check options, secure messaging, 24/7 support, user reviews, and reporting tools. We also provide safety tips and guidelines for all users.",
      },
      {
        question: "Are background checks available?",
        answer:
          "Yes, we partner with trusted third-party services to offer optional background checks for Premium members. This adds an extra layer of trust and safety to our community.",
      },
      {
        question: "What should I do if I encounter suspicious behavior?",
        answer:
          'Use the "Report" button on any profile or message. Our safety team reviews all reports within 24 hours. For emergencies, contact our 24/7 support line immediately.',
      },
      {
        question: "How do I verify other travelers?",
        answer:
          "Look for verification badges on profiles, read reviews from other users, use our secure messaging to get to know people before meeting, and always meet in public places first.",
      },
    ],
    payments: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are processed securely through Stripe.",
      },
      {
        question: "Is there a free trial for Premium?",
        answer:
          "Yes! New users get a 7-day free trial of Premium features. No credit card is required to start your trial. You can cancel anytime during the trial period.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "We offer a 14-day money-back guarantee for all Premium and Yearly plans. If you're not satisfied with our service, contact our support team within 14 days of purchase for a full refund.",
      },
      {
        question: "How do I cancel my subscription?",
        answer:
          "You can cancel your subscription anytime from your account settings. Your Premium features will remain active until the end of your current billing period.",
      },
    ],
    travel: [
      {
        question: "How do I find travel buddies?",
        answer:
          "You can search for travel buddies by destination, travel dates, interests, or travel style. Our AI matching system also suggests compatible travelers based on your profile and preferences.",
      },
      {
        question: "Can I plan group trips?",
        answer:
          "Yes! You can create travel plans for groups and invite multiple travelers to join. Our platform includes group messaging, itinerary planning, and expense splitting tools.",
      },
      {
        question: "How does the review system work?",
        answer:
          "After completing a trip, users can leave reviews and ratings for their travel companions. These reviews help build trust within our community and help others make informed decisions.",
      },
      {
        question: "Can I use JoinMyTrip for business travel?",
        answer:
          "While primarily designed for leisure travel, many business travelers use our platform to find companions for business trips or to explore destinations during downtime.",
      },
    ],
    features: [
      {
        question: "What are Premium features?",
        answer:
          "Premium features include unlimited travel plans, advanced AI matching, priority support, verified badge, trip analytics, ad-free experience, and early access to new features.",
      },
      {
        question: "How does AI matching work?",
        answer:
          "Our AI analyzes your profile, interests, travel history, and preferences to find compatible travel companions. The algorithm considers factors like travel style, personality, and common interests.",
      },
      {
        question: "Is there a mobile app?",
        answer:
          "Yes! JoinMyTrip is available as a mobile app for both iOS and Android. You can download it from the App Store or Google Play Store.",
      },
      {
        question: "Can I message other travelers before meeting?",
        answer:
          "Yes, our secure messaging system allows you to communicate with other travelers before deciding to travel together. We recommend getting to know your potential travel buddies well before meeting in person.",
      },
    ],
  };

  const toggleFAQ = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFAQs = Object.entries(faqs).flatMap(([category, items]) =>
    items
      .filter(
        (item) =>
          searchQuery === "" ||
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map((item) => ({ ...item, category }))
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-[#5ea500] to-teal-600 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Frequently <span className="text-black">Asked</span> Questions
            </h1>

            <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
              Find answers to common questions about Join My Trip. Can not find
              what you are looking for? Contact our support team for
              personalized assistance.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search for your query..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg rounded-xl border-0 shadow-lg bg-white"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-3 mt-6 font-semibold">
                <Badge className="bg-white/20 text-white hover:bg-white/30 cursor-pointer">
                  <Users className="w-4 h-4 mr-2" />
                  Account Questions
                </Badge>
                <Badge className="bg-white/20 text-white hover:bg-white/30 cursor-pointer">
                  <Shield className="w-4 h-4 mr-2" />
                  Safety & Security
                </Badge>
                <Badge className="bg-white/20 text-white hover:bg-white/30 cursor-pointer">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Payments & Plans
                </Badge>
                <Badge className="bg-white/20 text-white hover:bg-white/30 cursor-pointer">
                  <Plane className="w-4 h-4 mr-2" />
                  Travel Planning
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto py-12">
        {/* Quick Help Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link href="/services">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 text-orange-600 mb-4">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-2">Features Guide</h3>
                <p className="text-sm text-gray-600">
                  Learn about all our features
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/about-us">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-2">About Us</h3>
                <p className="text-sm text-gray-600">Get know about our team</p>
              </CardContent>
            </Card>
          </Link>
          {/* <Link href="/contact">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-2">Contact Support</h3>
                <p className="text-sm text-gray-600">
                  Get personalized help from our team
                </p>
              </CardContent>
            </Card>
          </Link> */}

          <Link href="/subscriptions">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-2">Subscriptions</h3>
                <p className="text-sm text-gray-600">
                  Manage your subscription plan
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/terms-of-service">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-600 mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-bold mb-2">Terms of Service</h3>
                <p className="text-sm text-gray-600">
                  Read our terms of services
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Main FAQ Content */}
        <div className="mx-auto">
          <Tabs defaultValue="general" className="w-full mx-auto">
            <div className="mb-8 flex justify-center">
              <TabsList className="grid grid-cols-6 md:grid-cols-3 lg:grid-cols-6 ">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="flex items-center gap-2"
                  >
                    {category.icon}
                    <span className="hidden sm:inline">{category.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {categories.map((category) => (
              <TabsContent
                key={category.id}
                value={category.id}
                className="mt-0"
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-8">
                      <div className="w-12 h-12 rounded-lg bg-linear-to-r from-[#5ea500] to-teal-600 flex items-center justify-center text-white mr-4">
                        {category.icon}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">
                          {category.name} Questions
                        </h2>
                        <p className="text-gray-600">
                          Common questions about {category.name.toLowerCase()}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {faqs[category.id as keyof typeof faqs]?.map(
                        (faq, index) => {
                          const id = `${category.id}-${index}`;
                          const isExpanded = expandedItems.includes(id);

                          return (
                            <div
                              key={id}
                              className="border border-gray-200 rounded-xl overflow-hidden"
                            >
                              <button
                                onClick={() => toggleFAQ(id)}
                                className="w-full text-left p-6 hover:bg-gray-50 flex justify-between items-center"
                              >
                                <div className="flex items-start">
                                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                                    <span className="text-primary font-bold">
                                      ?
                                    </span>
                                  </div>
                                  <h3 className="font-bold text-lg">
                                    {faq.question}
                                  </h3>
                                </div>
                                <div
                                  className={`transform transition-transform ${
                                    isExpanded ? "rotate-180" : ""
                                  }`}
                                >
                                  <svg
                                    className="w-6 h-6 text-gray-400 cursor-pointer"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 9l-7 7-7-7"
                                    />
                                  </svg>
                                </div>
                              </button>

                              <AnimatePresence>
                                {isExpanded && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <div className="px-6 pb-6 ml-12">
                                      <Separator className="mb-6" />
                                      <p className="text-gray-600">
                                        {faq.answer}
                                      </p>

                                      {category.id === "safety" &&
                                        faq.question.includes("safety") && (
                                          <div className="mt-4">
                                            <Link href="/safety">
                                              <Button
                                                variant="outline"
                                                size="sm"
                                              >
                                                Read Safety Guide
                                              </Button>
                                            </Link>
                                          </div>
                                        )}

                                      {category.id === "payments" &&
                                        faq.question.includes("refund") && (
                                          <div className="mt-4">
                                            <Link href="/contact">
                                              <Button
                                                variant="outline"
                                                size="sm"
                                              >
                                                Request Refund
                                              </Button>
                                            </Link>
                                          </div>
                                        )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        }
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>

          {/* Search Results */}
          {searchQuery && (
            <div className="mt-12">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold">Search Results</h2>
                      <p className="text-gray-600">
                        Found {filteredFAQs.length} results for{" "}
                        {"{searchQuery}"}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear Search
                    </Button>
                  </div>

                  {filteredFAQs.length > 0 ? (
                    <div className="space-y-6">
                      {filteredFAQs.map((faq, index) => {
                        const id = `search-${index}`;
                        const isExpanded = expandedItems.includes(id);

                        return (
                          <div
                            key={id}
                            className="border border-gray-200 rounded-xl overflow-hidden"
                          >
                            <button
                              onClick={() => toggleFAQ(id)}
                              className="w-full text-left p-6 hover:bg-gray-50 flex justify-between items-start"
                            >
                              <div>
                                <Badge className="mb-2">
                                  {
                                    categories.find(
                                      (c) => c.id === faq.category
                                    )?.name
                                  }
                                </Badge>
                                <h3 className="font-bold text-lg">
                                  {faq.question}
                                </h3>
                              </div>
                              <div
                                className={`transform transition-transform ${
                                  isExpanded ? "rotate-180" : ""
                                }`}
                              >
                                <svg
                                  className="w-6 h-6 text-gray-400 cursor-pointer"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </div>
                            </button>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <div className="px-6 pb-6">
                                    <Separator className="mb-6" />
                                    <p className="text-gray-600">
                                      {faq.answer}
                                    </p>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">
                        No results found
                      </h3>
                      <p className="text-gray-600 mb-6">
                        We could not find any answers matching your search. Try
                        different keywords or contact our support team.
                      </p>
                      {/* <Link href="/contact"> */}
                      <Button>Contact Support</Button>
                      {/* </Link> */}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Popular Questions */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-8">Popular Questions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <UserCheck className="w-5 h-5 text-blue-600 mr-3" />
                    <h3 className="font-bold">Account & Profile</h3>
                  </div>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="#account"
                        className="text-primary cursor-pointer hover:underline"
                      >
                        How do I verify my account?
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#account"
                        className="text-primary cursor-pointer hover:underline"
                      >
                        Can I change my username?
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#account"
                        className="text-primary cursor-pointer hover:underline"
                      >
                        How do I delete my account?
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <CreditCard className="w-5 h-5 text-green-600 mr-3" />
                    <h3 className="font-bold">Payments & Subscriptions</h3>
                  </div>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="#payments"
                        className="text-primary cursor-pointer hover:underline"
                      >
                        Is there a free trial?
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#payments"
                        className="text-primary cursor-pointer hover:underline"
                      >
                        How do I cancel my subscription?
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#payments"
                        className="text-primary cursor-pointer hover:underline"
                      >
                        What payment methods do you accept?
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Shield className="w-5 h-5 text-purple-600 mr-3" />
                    <h3 className="font-bold">Safety & Security</h3>
                  </div>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="#safety"
                        className="text-primary cursor-pointer hover:underline"
                      >
                        How do you ensure user safety?
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#safety"
                        className="text-primary cursor-pointer hover:underline"
                      >
                        What should I do if I feel unsafe?
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#safety"
                        className="text-primary cursor-pointer hover:underline"
                      >
                        Are background checks available?
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Plane className="w-5 h-5 text-orange-600 mr-3" />
                    <h3 className="font-bold">Travel Planning</h3>
                  </div>
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="#travel"
                        className="text-primary cursor-pointer hover:underline"
                      >
                        How do I find travel buddies?
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#travel"
                        className="text-primary cursor-pointer hover:underline"
                      >
                        Can I plan group trips?
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#travel"
                        className="text-primary cursor-pointer hover:underline"
                      >
                        How does the review system work?
                      </Link>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Still Need Help */}
          <div className="mt-12">
            <Card className="border-0 shadow-xl bg-linear-to-r from-[#5ea500] to-teal-600 text-white">
              <CardContent className="p-12">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 mx-auto mb-6" />
                  <h2 className="text-3xl font-bold mb-6">
                    Still <span className="text-black">Need</span> Help?
                  </h2>
                  <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                    Our support team is here to help you with any questions or
                    issues you might have.
                  </p>

                  {/* <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link href="/contact">
                      <Button
                        size="lg"
                        className="bg-white text-blue-600 hover:bg-blue-50 gap-3 px-8"
                      >
                        Contact Support Team
                      </Button>
                    </Link>

                    <Link href="/community">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-white text-white hover:bg-white/10 gap-3 px-8"
                      >
                        Visit Community Forum
                      </Button>
                    </Link>
                  </div> */}

                  <div className="mt-10 pt-10 ">
                    <div className="grid sm:grid-cols-3 gap-8">
                      <div>
                        <div className="font-bold mb-2">Email Support</div>
                        <div className="text-blue-200">
                          support@joinmytrip.com
                        </div>
                      </div>
                      <div>
                        <div className="font-bold mb-2">Live Chat</div>
                        <div className="text-blue-200">Available 24/7</div>
                      </div>
                      <div>
                        <div className="font-bold mb-2">Response Time</div>
                        <div className="text-blue-200">
                          Typically within 2 hours
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
