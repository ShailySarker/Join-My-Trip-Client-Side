// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Users,
//   MapPin,
//   Shield,
//   Star,
//   MessageSquare,
//   Calendar,
//   CreditCard,
//   Globe,
//   Bell,
//   TrendingUp,
//   Zap,
//   Crown,
//   CheckCircle,
//   XCircle,
//   Leaf,
//   TreePine,
//   Sprout,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Link from "next/link";

// export default function ServicesPage() {
//   const [selectedPlan, setSelectedPlan] = useState("premium");

//   const services = [
//     {
//       icon: <Users className="w-8 h-8" />,
//       title: "Travel Buddy Matching",
//       description:
//         "AI-powered matching based on sustainability values, interests, and eco-style",
//       features: [
//         "Smart green algorithm",
//         "Eco-interest matching",
//         "Sustainability scoring",
//       ],
//       color: "text-emerald-600 bg-emerald-50",
//     },
//     {
//       icon: <MapPin className="w-8 h-8" />,
//       title: "Sustainable Trip Planning",
//       description:
//         "Collaborative eco-friendly itinerary planning with your green travel companions",
//       features: [
//         "Shared green itineraries",
//         "Carbon budget planning",
//         "Eco-activity scheduling",
//       ],
//       color: "text-green-600 bg-green-50",
//     },
//     {
//       icon: <Shield className="w-8 h-8" />,
//       title: "Eco Safety & Verification",
//       description: "Comprehensive sustainability verification and user safety",
//       features: [
//         "Eco-certification",
//         "Green background checks",
//         "24/7 eco support",
//       ],
//       color: "text-teal-600 bg-teal-50",
//     },
//     {
//       icon: <MessageSquare className="w-8 h-8" />,
//       title: "Green Communication Tools",
//       description:
//         "Built-in messaging and group chat for seamless eco-communication",
//       features: ["Secure green messaging", "Eco group chats", "Video calls"],
//       color: "text-lime-600 bg-lime-50",
//     },
//     {
//       icon: <Star className="w-8 h-8" />,
//       title: "Eco Review System",
//       description:
//         "Trust-building review and rating system for sustainable travel",
//       features: [
//         "Eco trip reviews",
//         "Green user ratings",
//         "Sustainability badges",
//       ],
//       color: "text-amber-600 bg-amber-50",
//     },
//     {
//       icon: <Globe className="w-8 h-8" />,
//       title: "Global Green Community",
//       description: "Connect with eco travelers from around the world",
//       features: [
//         "150+ green destinations",
//         "Local eco guides",
//         "Sustainable cultural exchange",
//       ],
//       color: "text-cyan-600 bg-cyan-50",
//     },
//   ];

//   const pricingPlans = [
//     {
//       name: "Free",
//       price: "$0",
//       period: "forever",
//       description: "Basic features for casual eco travelers",
//       icon: <Leaf className="w-6 h-6" />,
//       color: "border-gray-200",
//       features: [
//         { text: "Basic eco profile creation", included: true },
//         { text: "Limited green travel plans (3)", included: true },
//         { text: "Basic eco search functionality", included: true },
//         { text: "Standard green matching", included: true },
//         { text: "Green community access", included: true },
//         { text: "Priority eco support", included: false },
//         { text: "Advanced green matching", included: false },
//         { text: "Unlimited eco travel plans", included: false },
//         { text: "Eco-verified badge", included: false },
//         { text: "AI sustainable trip suggestions", included: false },
//       ],
//       cta: "Start Green Journey",
//     },
//     {
//       name: "Eco Premium",
//       price: "$9.99",
//       period: "per month",
//       description: "Perfect for frequent eco travelers",
//       icon: <TreePine className="w-6 h-6" />,
//       color: "border-emerald-500",
//       popular: true,
//       features: [
//         { text: "Everything in Free", included: true },
//         { text: "Unlimited green travel plans", included: true },
//         { text: "Advanced AI eco matching", included: true },
//         { text: "Priority eco support", included: true },
//         { text: "Eco-verified badge", included: true },
//         { text: "AI sustainable trip suggestions", included: true },
//         { text: "Carbon footprint tracking", included: true },
//         { text: "Customizable eco profile", included: true },
//         { text: "Ad-free green experience", included: true },
//         { text: "Early access to eco features", included: true },
//       ],
//       cta: "Start 7-Day Eco Trial",
//     },
//     {
//       name: "Eco Yearly",
//       price: "$99.99",
//       period: "per year",
//       description: "Best value for serious eco travelers",
//       icon: <Sprout className="w-6 h-6" />,
//       color: "border-teal-500",
//       features: [
//         { text: "Everything in Eco Premium", included: true },
//         { text: "Save 2 months", included: true },
//         { text: "Free eco trip planning session", included: true },
//         { text: "Exclusive green destination guides", included: true },
//         { text: "Priority eco customer support", included: true },
//         { text: "Annual sustainability report", included: true },
//         { text: "Eco partner discounts", included: true },
//         { text: "VIP green community access", included: true },
//         { text: "Dedicated eco account manager", included: true },
//         { text: "Premium eco travel insurance", included: true },
//       ],
//       savings: "Save $19.89",
//       cta: "Choose Eco Yearly Plan",
//     },
//   ];

//   const premiumFeatures = [
//     {
//       category: "Enhanced Eco Matching",
//       features: [
//         "AI-powered sustainability scoring",
//         "Eco-interest based algorithm",
//         "Green travel style matching",
//         "Environmental values compatibility",
//       ],
//     },
//     {
//       category: "Advanced Green Tools",
//       features: [
//         "Collaborative sustainable trip planning",
//         "Carbon budget management tools",
//         "Eco-itinerary optimization",
//         "Real-time green location sharing",
//       ],
//     },
//     {
//       category: "Sustainability & Support",
//       features: [
//         "24/7 eco safety support",
//         "Green emergency assistance",
//         "Verified eco user network",
//         "Sustainability certification integration",
//       ],
//     },
//   ];

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section - Green Theme */}
//       <div className="bg-linear-to-br from-emerald-600 to-teal-600 py-20">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="max-w-4xl mx-auto text-center"
//           >
//             <Badge className="mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm text-white border-0">
//               <Leaf className="w-4 h-4 mr-2" />
//               SUSTAINABLE SERVICES
//             </Badge>

//             <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
//               Travel World,
//               <span className="pb-4 block bg-linear-to-r from-lime-300 to-amber-300 bg-clip-text text-transparent">
//                 Together
//               </span>
//             </h1>

//             <p className="text-xl text-emerald-100 mb-10 max-w-3xl mx-auto">
//               Discover our comprehensive suite of sustainable services designed
//               to make your travels eco-friendlier, more social, and
//               unforgettable. From free basic features to premium green
//               experiences, we have everything you need.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link href="/subscription">
//                 <Button
//                   size="lg"
//                   className="bg-white text-emerald-600 hover:bg-emerald-50 gap-3 px-8"
//                 >
//                   <CreditCard className="w-6 h-6" />
//                   Subscription Plans
//                 </Button>
//               </Link>
//               <Link href="/register">
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="border-white text-emerald-600 hover:bg-white/10 gap-3 px-8"
//                 >
//                   <Leaf className="w-6 h-6" />
//                   Register Now
//                 </Button>
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* All Green Services */}
//       <section className="py-20">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <Badge className="mb-4 bg-emerald-100 text-emerald-800">
//               OUR SERVICES
//             </Badge>
//             <h2 className="text-4xl font-bold mb-4">
//               Everything You Need for Perfect Travels
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Comprehensive tools and features to enhance every aspect of your
//               sustainable travel experience
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {services.map((service, index) => (
//               <motion.div
//                 key={service.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 whileHover={{ y: -5 }}
//               >
//                 <Card className="border-0 shadow-lg hover:shadow-xl transition-all h-full">
//                   <CardContent className="p-8">
//                     <div
//                       className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${service.color} mb-6`}
//                     >
//                       {service.icon}
//                     </div>

//                     <h3 className="text-xl font-bold mb-3">{service.title}</h3>
//                     <p className="text-gray-600 mb-6">{service.description}</p>

//                     <ul className="space-y-3">
//                       {service.features.map((feature) => (
//                         <li
//                           key={feature}
//                           className="flex items-center text-gray-600"
//                         >
//                           <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
//                           {feature}
//                         </li>
//                       ))}
//                     </ul>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* How It Works - Green Theme */}
//       <section className="py-20 bg-emerald-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <Badge className="mb-4 bg-green-100 text-green-800">
//               HOW IT WORKS
//             </Badge>
//             <h2 className="text-4xl font-bold mb-4">
//               Simple, Powerful, Sustainable
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Three simple steps to transform your eco travel experience
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="text-center">
//               <div className="relative">
//                 <div className="w-20 h-20 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
//                   1
//                 </div>
//                 <div className="hidden md:block absolute top-10 right-0 w-full h-0.5 bg-linear-to-r from-emerald-500 to-teal-500 transform translate-x-1/2"></div>
//               </div>
//               <h3 className="text-xl font-bold mb-3">Create & Customize</h3>
//               <p className="text-gray-600">
//                 Build your eco travel profile with sustainable interests and
//                 green preferences
//               </p>
//             </div>

//             <div className="text-center">
//               <div className="relative">
//                 <div className="w-20 h-20 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
//                   2
//                 </div>
//                 <div className="hidden md:block absolute top-10 right-0 w-full h-0.5 bg-linear-to-r from-emerald-500 to-teal-500 transform translate-x-1/2"></div>
//               </div>
//               <h3 className="text-xl font-bold mb-3">Discover & Connect</h3>
//               <p className="text-gray-600">
//                 Find perfect eco travel matches using our advanced AI algorithms
//               </p>
//             </div>

//             <div className="text-center">
//               <div className="w-20 h-20 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
//                 3
//               </div>
//               <h3 className="text-xl font-bold mb-3">
//                 Travel & Share Sustainably
//               </h3>
//               <p className="text-gray-600">
//                 Plan green trips together, share eco experiences, and create
//                 sustainable memories
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA - Green Theme */}
//       <section className="py-20">
//         <div className="container mx-auto px-4">
//           <Card className="border-0 shadow-2xl bg-linear-to-r from-emerald-600 to-teal-600 overflow-hidden">
//             <div className="grid lg:grid-cols-2">
//               <div className="p-12 text-white">
//                 <h2 className="text-4xl font-bold mb-6">
//                   Ready to Transform Your Travels Sustainably?
//                 </h2>
//                 <p className="text-xl text-emerald-100 mb-8">
//                   Join thousands of eco travelers who have found their perfect
//                   green companions and created sustainable memories together.
//                 </p>

//                 <div className="space-y-4">
//                   <div className="flex items-center">
//                     <CheckCircle className="w-6 h-6 mr-3" />
//                     <span>7-day free eco trial</span>
//                   </div>
//                   <div className="flex items-center">
//                     <CheckCircle className="w-6 h-6 mr-3" />
//                     <span>No credit card required</span>
//                   </div>
//                   <div className="flex items-center">
//                     <CheckCircle className="w-6 h-6 mr-3" />
//                     <span>Cancel anytime</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-12 bg-white">
//                 <div className="max-w-md">
//                   <h3 className="text-2xl font-bold mb-6">
//                     Start Your Green Journey Today
//                   </h3>

//                   <div className="space-y-4">
//                     <Link href="/register">
//                       <Button
//                         size="lg"
//                         className="w-full gap-3 py-6 text-lg bg-linear-to-r from-emerald-500 to-teal-500"
//                       >
//                         <Leaf className="w-6 h-6" />
//                         Start Free Eco Trial
//                       </Button>
//                     </Link>

//                     <Link href="#pricing">
//                       <Button
//                         variant="outline"
//                         className="w-full gap-3 py-6 text-lg"
//                       >
//                         Compare All Green Plans
//                       </Button>
//                     </Link>

//                     <div className="text-center text-sm text-gray-500 mt-4">
//                       Already have an eco account?{" "}
//                       <Link
//                         href="/login"
//                         className="text-emerald-600 font-medium"
//                       >
//                         Sign in
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </section>
//     </div>
//   );
// }

import React from "react";

const page = () => {
  return <div>page</div>;
};

export default page;
