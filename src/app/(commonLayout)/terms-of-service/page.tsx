// // import React from "react";

// // const TermsAndConditionsPage = () => {
// //   return <div>TermsAndConditionsPage</div>;
// // };

// // export default TermsAndConditionsPage;

// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   Shield,
//   FileText,
//   AlertCircle,
//   CheckCircle,
//   Calendar,
//   User,
//   Lock,
//   Globe,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import Link from "next/link";

// export default function TermsPage() {
//   const [activeSection, setActiveSection] = useState("acceptance");

//   const sections = [
//     { id: "acceptance", title: "Acceptance of Terms" },
//     { id: "eligibility", title: "Eligibility" },
//     { id: "accounts", title: "User Accounts" },
//     { id: "content", title: "User Content" },
//     { id: "conduct", title: "User Conduct" },
//     { id: "payments", title: "Payments & Subscriptions" },
//     { id: "termination", title: "Termination" },
//     { id: "disclaimer", title: "Disclaimer" },
//     { id: "liability", title: "Limitation of Liability" },
//     { id: "changes", title: "Changes to Terms" },
//     { id: "contact", title: "Contact Us" },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
//         <div className="container mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="max-w-4xl mx-auto text-center"
//           >
//             <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6">
//               <FileText className="w-8 h-8 text-white" />
//             </div>

//             <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
//               Terms of Service
//             </h1>

//             <p className="text-xl text-blue-100 mb-8">
//               Last updated: December 15, 2023
//             </p>

//             <div className="flex flex-wrap justify-center gap-4">
//               <Badge className="bg-white/20 text-white">
//                 <Calendar className="w-4 h-4 mr-2" />
//                 Effective immediately
//               </Badge>
//               <Badge className="bg-white/20 text-white">
//                 <AlertCircle className="w-4 h-4 mr-2" />
//                 Please read carefully
//               </Badge>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-12">
//         <div className="grid lg:grid-cols-4 gap-8">
//           {/* Sidebar Navigation */}
//           <div className="lg:col-span-1">
//             <Card className="sticky top-24 border-0 shadow-lg">
//               <CardContent className="p-6">
//                 <div className="flex items-center mb-6">
//                   <Shield className="w-5 h-5 mr-2 text-blue-600" />
//                   <h3 className="font-bold">Navigation</h3>
//                 </div>

//                 <nav className="space-y-2">
//                   {sections.map((section) => (
//                     <button
//                       key={section.id}
//                       onClick={() => {
//                         setActiveSection(section.id);
//                         document.getElementById(section.id)?.scrollIntoView({
//                           behavior: "smooth",
//                         });
//                       }}
//                       className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
//                         activeSection === section.id
//                           ? "bg-blue-50 text-blue-600 font-medium"
//                           : "text-gray-600 hover:bg-gray-50"
//                       }`}
//                     >
//                       {section.title}
//                     </button>
//                   ))}
//                 </nav>

//                 <Separator className="my-6" />

//                 <div className="space-y-3">
//                   <Link href="/privacy">
//                     <Button variant="outline" className="w-full justify-start">
//                       <Lock className="w-4 h-4 mr-2" />
//                       Privacy Policy
//                     </Button>
//                   </Link>

//                   <Link href="/contact">
//                     <Button variant="ghost" className="w-full justify-start">
//                       Contact Support
//                     </Button>
//                   </Link>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Main Content */}
//           <div className="lg:col-span-3">
//             <Card className="border-0 shadow-lg">
//               <CardContent className="p-8">
//                 {/* Introduction */}
//                 <div className="mb-8">
//                   <p className="text-gray-600 mb-6">
//                     Welcome to TravelBuddy. These Terms of Service ("Terms")
//                     govern your access to and use of our website, services, and
//                     applications (collectively, the "Service"). Please read
//                     these Terms carefully before using our Service.
//                   </p>

//                   <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
//                     <div className="flex items-start">
//                       <AlertCircle className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
//                       <div>
//                         <h4 className="font-bold text-blue-800 mb-2">
//                           Important Notice
//                         </h4>
//                         <p className="text-blue-700">
//                           By accessing or using our Service, you agree to be
//                           bound by these Terms. If you disagree with any part of
//                           the terms, you may not access the Service.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Sections */}
//                 <div className="space-y-12">
//                   {/* Acceptance of Terms */}
//                   <section id="acceptance">
//                     <div className="flex items-center mb-4">
//                       <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
//                         <span className="font-bold text-blue-600">1</span>
//                       </div>
//                       <h2 className="text-2xl font-bold">
//                         Acceptance of Terms
//                       </h2>
//                     </div>

//                     <div className="ml-11">
//                       <p className="text-gray-600 mb-4">
//                         By accessing and using TravelBuddy, you accept and agree
//                         to be bound by the terms and provision of this
//                         agreement. In addition, when using TravelBuddy's
//                         particular services, you shall be subject to any posted
//                         guidelines or rules applicable to such services.
//                       </p>

//                       <div className="bg-gray-50 rounded-lg p-4 mb-4">
//                         <p className="text-gray-700">
//                           <strong>Key Points:</strong> These Terms constitute a
//                           legally binding agreement between you and TravelBuddy
//                           regarding your use of the Service.
//                         </p>
//                       </div>
//                     </div>
//                   </section>

//                   <Separator />

//                   {/* Eligibility */}
//                   <section id="eligibility">
//                     <div className="flex items-center mb-4">
//                       <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
//                         <span className="font-bold text-blue-600">2</span>
//                       </div>
//                       <h2 className="text-2xl font-bold">Eligibility</h2>
//                     </div>

//                     <div className="ml-11">
//                       <p className="text-gray-600 mb-4">
//                         To use TravelBuddy, you must:
//                       </p>

//                       <ul className="space-y-3 mb-6">
//                         <li className="flex items-start">
//                           <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
//                           <span>Be at least 18 years of age</span>
//                         </li>
//                         <li className="flex items-start">
//                           <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
//                           <span>
//                             Possess the legal authority to enter into this
//                             agreement
//                           </span>
//                         </li>
//                         <li className="flex items-start">
//                           <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
//                           <span>
//                             Use the Service in accordance with these Terms
//                           </span>
//                         </li>
//                         <li className="flex items-start">
//                           <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
//                           <span>
//                             Agree to provide accurate and complete information
//                           </span>
//                         </li>
//                       </ul>

//                       <div className="bg-red-50 border border-red-100 rounded-lg p-4">
//                         <div className="flex items-start">
//                           <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-1 flex-shrink-0" />
//                           <div>
//                             <h4 className="font-bold text-red-800 mb-1">
//                               Age Restriction
//                             </h4>
//                             <p className="text-red-700">
//                               TravelBuddy is not intended for users under 18
//                               years of age. If you are under 18, you may not use
//                               our Service.
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </section>

//                   <Separator />

//                   {/* User Accounts */}
//                   <section id="accounts">
//                     <div className="flex items-center mb-4">
//                       <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
//                         <span className="font-bold text-blue-600">3</span>
//                       </div>
//                       <h2 className="text-2xl font-bold">User Accounts</h2>
//                     </div>

//                     <div className="ml-11">
//                       <div className="grid md:grid-cols-2 gap-6 mb-6">
//                         <Card>
//                           <CardContent className="p-6">
//                             <div className="flex items-center mb-4">
//                               <User className="w-6 h-6 text-blue-600 mr-3" />
//                               <h3 className="font-bold">Account Creation</h3>
//                             </div>
//                             <ul className="space-y-2 text-sm text-gray-600">
//                               <li>
//                                 • Provide accurate and complete information
//                               </li>
//                               <li>• Maintain the security of your password</li>
//                               <li>• Notify us of any unauthorized use</li>
//                               <li>• You are responsible for all activities</li>
//                             </ul>
//                           </CardContent>
//                         </Card>

//                         <Card>
//                           <CardContent className="p-6">
//                             <div className="flex items-center mb-4">
//                               <Lock className="w-6 h-6 text-blue-600 mr-3" />
//                               <h3 className="font-bold">Account Security</h3>
//                             </div>
//                             <ul className="space-y-2 text-sm text-gray-600">
//                               <li>• Keep login credentials confidential</li>
//                               <li>• Use strong, unique passwords</li>
//                               <li>• Enable two-factor authentication</li>
//                               <li>• Report suspicious activity immediately</li>
//                             </ul>
//                           </CardContent>
//                         </Card>
//                       </div>
//                     </div>
//                   </section>

//                   <Separator />

//                   {/* User Content */}
//                   <section id="content">
//                     <div className="flex items-center mb-4">
//                       <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
//                         <span className="font-bold text-blue-600">4</span>
//                       </div>
//                       <h2 className="text-2xl font-bold">User Content</h2>
//                     </div>

//                     <div className="ml-11">
//                       <p className="text-gray-600 mb-4">
//                         You retain ownership of any content you submit, post, or
//                         display on or through TravelBuddy ("User Content").
//                       </p>

//                       <Card className="mb-6">
//                         <CardContent className="p-6">
//                           <h3 className="font-bold mb-4">
//                             By submitting User Content, you grant TravelBuddy:
//                           </h3>
//                           <ul className="space-y-3">
//                             <li className="flex items-start">
//                               <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-1" />
//                               <span>
//                                 A worldwide, non-exclusive, royalty-free license
//                                 to use, reproduce, and display your User Content
//                               </span>
//                             </li>
//                             <li className="flex items-start">
//                               <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-1" />
//                               <span>
//                                 The right to make your profile and travel plans
//                                 visible to other users
//                               </span>
//                             </li>
//                             <li className="flex items-start">
//                               <CheckCircle className="w-5 h-5 text-blue-500 mr-3 mt-1" />
//                               <span>
//                                 Permission to use your reviews and ratings to
//                                 improve our services
//                               </span>
//                             </li>
//                           </ul>
//                         </CardContent>
//                       </Card>
//                     </div>
//                   </section>

//                   {/* Continue with other sections... */}
//                   {/* Due to space constraints, I'll show the structure for remaining sections */}

//                   {/* Conduct Section */}
//                   <section id="conduct">
//                     <div className="flex items-center mb-4">
//                       <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
//                         <span className="font-bold text-blue-600">5</span>
//                       </div>
//                       <h2 className="text-2xl font-bold">User Conduct</h2>
//                     </div>

//                     <div className="ml-11">
//                       <div className="grid md:grid-cols-2 gap-6">
//                         <div className="bg-green-50 border border-green-100 rounded-lg p-6">
//                           <h3 className="font-bold text-green-800 mb-4">
//                             ✓ Allowed Activities
//                           </h3>
//                           <ul className="space-y-3">
//                             <li className="flex items-start">
//                               <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
//                               <span>Create genuine travel profiles</span>
//                             </li>
//                             <li className="flex items-start">
//                               <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
//                               <span>Share authentic travel experiences</span>
//                             </li>
//                             <li className="flex items-start">
//                               <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-1" />
//                               <span>Connect with fellow travelers</span>
//                             </li>
//                           </ul>
//                         </div>

//                         <div className="bg-red-50 border border-red-100 rounded-lg p-6">
//                           <h3 className="font-bold text-red-800 mb-4">
//                             ✗ Prohibited Activities
//                           </h3>
//                           <ul className="space-y-3">
//                             <li className="flex items-start">
//                               <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-1" />
//                               <span>Harassment or hate speech</span>
//                             </li>
//                             <li className="flex items-start">
//                               <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-1" />
//                               <span>Spam or commercial solicitation</span>
//                             </li>
//                             <li className="flex items-start">
//                               <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-1" />
//                               <span>Sharing false information</span>
//                             </li>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   </section>

//                   {/* Contact Section */}
//                   <section id="contact" className="pt-8">
//                     <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
//                       <CardContent className="p-8">
//                         <div className="text-center">
//                           <h2 className="text-2xl font-bold mb-4">
//                             Questions About Our Terms?
//                           </h2>
//                           <p className="text-gray-600 mb-6">
//                             If you have any questions about these Terms of
//                             Service, please contact our legal team.
//                           </p>
//                           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                             <Link href="/contact">
//                               <Button className="gap-2">Contact Support</Button>
//                             </Link>
//                             <Link href="/privacy">
//                               <Button variant="outline">
//                                 View Privacy Policy
//                               </Button>
//                             </Link>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </section>
//                 </div>

//                 {/* Footer */}
//                 <div className="mt-12 pt-8 border-t">
//                   <div className="flex flex-col md:flex-row justify-between items-center gap-4">
//                     <div className="text-gray-600 text-sm">
//                       <p>
//                         © {new Date().getFullYear()} TravelBuddy. All rights
//                         reserved.
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-6 text-sm">
//                       <Link
//                         href="/privacy"
//                         className="text-blue-600 hover:underline"
//                       >
//                         Privacy Policy
//                       </Link>
//                       <Link
//                         href="/cookie-policy"
//                         className="text-blue-600 hover:underline"
//                       >
//                         Cookie Policy
//                       </Link>
//                       <Link
//                         href="/contact"
//                         className="text-blue-600 hover:underline"
//                       >
//                         Contact
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";

const page = () => {
  return <div>page</div>;
};

export default page;
