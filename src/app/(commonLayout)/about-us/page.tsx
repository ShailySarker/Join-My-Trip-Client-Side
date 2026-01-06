// // // import { Metadata } from "next";
// // // import Image from "next/image";
// // // import { Button } from "@/components/ui/button";
// // // import Link from "next/link";
// // // import { ArrowRight, Globe, Heart, Shield } from "lucide-react";
// // // import { getAllUsers } from "@/services/user/userService";
// // // import { getAllTravelPlansPublic } from "@/services/travelPlans/travelPlans.service";

// // // export const metadata: Metadata = {
// // //   title: "About Us - Join My Trip",
// // //   description: "Learn more about our mission to connect travelers worldwide.",
// // // };

// // // export default async function AboutUsPage() {
// // //   const [usersData, tripsData] = await Promise.all([
// // //     getAllUsers({ limit: "1" }).catch(() => null),
// // //     getAllTravelPlansPublic({ limit: "1" }).catch(() => null),
// // //   ]);

// // //   // Format large numbers e.g. 5000 -> 5K
// // //   const formatNumber = (num: number) => {
// // //     if (!num) return "0";
// // //     if (num >= 1000) return (num / 1000).toFixed(1) + "K+";
// // //     return num + "+";
// // //   };

// // //   // Safely access meta.total (handling potential nulls if fetch fails)
// // //   // @ts-ignore
// // //   const userCount = usersData?.meta?.total || 50; // Fallback
// // //   // @ts-ignore
// // //   const tripCount = tripsData?.meta?.total || 20;

// // //   return (
// // //     <div className="bg-background">
// // //       {/* Hero Section */}
// // //       <section className="relative py-24 px-4 overflow-hidden dark:bg-zinc-900/20">
// // //         <div className="container mx-auto max-w-6xl relative z-10">
// // //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
// // //             <div className="space-y-8 animate-fade-in-up">
// // //               <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
// // //                 Our Story
// // //               </div>
// // //               <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
// // //                 Connecting <br />
// // //                 <span className="text-primary">Wanderlusters</span> <br />
// // //                 Worldwide
// // //               </h1>
// // //               <p className="text-xl text-muted-foreground leading-relaxed">
// // //                 Join My Trip was born from a simple idea: traveling is better
// // //                 together. We're on a mission to help solo travelers find their
// // //                 perfect companions and create unforgettable memories.
// // //               </p>
// // //               <div className="flex gap-4">
// // //                 <Link href="/auth/register">
// // //                   <Button size="lg" className="rounded-full px-8">
// // //                     Join Our Community
// // //                     <ArrowRight className="ml-2 w-4 h-4" />
// // //                   </Button>
// // //                 </Link>
// // //               </div>
// // //             </div>
// // //             <div className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl skew-y-2 hover:skew-y-0 transition-transform duration-700">
// // //               <Image
// // //                 src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
// // //                 alt="Team working together"
// // //                 fill
// // //                 className="object-cover"
// // //               />
// // //               <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Decorative elements */}
// // //         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
// // //       </section>

// // //       {/* Mission Values */}
// // //       <section className="py-24 bg-muted/30">
// // //         <div className="container mx-auto px-4">
// // //           <div className="text-center max-w-3xl mx-auto mb-16">
// // //             <h2 className="text-3xl font-bold mb-4">Why We Do It</h2>
// // //             <p className="text-muted-foreground text-lg">
// // //               We believe in the power of shared experiences and the friendships
// // //               that are forged on the road.
// // //             </p>
// // //           </div>

// // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto">
// // //             <div className="bg-card p-10 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-shadow">
// // //               <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
// // //                 <Globe className="w-8 h-8" />
// // //               </div>
// // //               <h3 className="text-xl font-bold mb-3">Global Connection</h3>
// // //               <p className="text-muted-foreground">
// // //                 Breaking down barriers and connecting people from diverse
// // //                 cultures and backgrounds through travel.
// // //               </p>
// // //             </div>
// // //             <div className="bg-card p-10 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-shadow">
// // //               <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
// // //                 <Heart className="w-8 h-8" />
// // //               </div>
// // //               <h3 className="text-xl font-bold mb-3">Community First</h3>
// // //               <p className="text-muted-foreground">
// // //                 Building a supportive, inclusive, and friendly community where
// // //                 every traveler feels welcome.
// // //               </p>
// // //             </div>
// // //             <div className="bg-card p-10 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-shadow">
// // //               <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
// // //                 <Shield className="w-8 h-8" />
// // //               </div>
// // //               <h3 className="text-xl font-bold mb-3">Safety & Trust</h3>
// // //               <p className="text-muted-foreground">
// // //                 Prioritizing safety with verified profiles and secure booking
// // //                 processes for peace of mind.
// // //               </p>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>

// // //       {/* Stats Section */}
// // //       <section className="py-24 bg-primary text-primary-foreground">
// // //         <div className="container mx-auto px-4">
// // //           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
// // //             <div>
// // //               <div className="text-5xl font-bold mb-2">
// // //                 {formatNumber(userCount)}
// // //               </div>
// // //               <div className="opacity-80">Active Users</div>
// // //             </div>
// // //             <div>
// // //               <div className="text-5xl font-bold mb-2">
// // //                 {formatNumber(tripCount)}
// // //               </div>
// // //               <div className="opacity-80">Trips Planned</div>
// // //             </div>
// // //             <div>
// // //               <div className="text-5xl font-bold mb-2">50+</div>
// // //               <div className="opacity-80">Countries</div>
// // //             </div>
// // //             <div>
// // //               <div className="text-5xl font-bold mb-2">4.8</div>
// // //               <div className="opacity-80">Average Rating</div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </section>
// // //     </div>
// // //   );
// // // }

// // "use client";

// // import { motion } from "framer-motion";
// // import {
// //   Globe,
// //   Users,
// //   Shield,
// //   Heart,
// //   Award,
// //   Target,
// //   TrendingUp,
// //   Compass,
// //   Star,
// //   MapPin,
// //   ChevronRight,
// //   CheckCircle,
// //   Leaf,
// //   TreePine,
// //   Sprout,
// // } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import Link from "next/link";

// // // Animation variants
// // const fadeInUp = {
// //   hidden: { opacity: 0, y: 20 },
// //   visible: { opacity: 1, y: 0 },
// // };

// // const staggerContainer = {
// //   hidden: { opacity: 0 },
// //   visible: {
// //     opacity: 1,
// //     transition: {
// //       staggerChildren: 0.1,
// //     },
// //   },
// // };

// // const scaleIn = {
// //   hidden: { opacity: 0, scale: 0.8 },
// //   visible: { opacity: 1, scale: 1 },
// // };

// // const slideInLeft = {
// //   hidden: { opacity: 0, x: -50 },
// //   visible: { opacity: 1, x: 0 },
// // };

// // const slideInRight = {
// //   hidden: { opacity: 0, x: 50 },
// //   visible: { opacity: 1, x: 0 },
// // };

// // export default function AboutPage() {
// //   const teamMembers = [
// //     {
// //       name: "Alex Morgan",
// //       role: "CEO & Founder",
// //       image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
// //       bio: "Former eco travel blogger turned entrepreneur",
// //       expertise: ["Sustainable Travel", "Community Building"],
// //     },
// //     {
// //       name: "Sarah Chen",
// //       role: "Head of Sustainability",
// //       image:
// //         "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
// //       bio: "10+ years in sustainable tourism",
// //       expertise: ["Eco Verification", "Green Certifications"],
// //     },
// //     {
// //       name: "Marcus Rodriguez",
// //       role: "Lead Developer",
// //       image:
// //         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
// //       bio: "Passionate about green travel tech",
// //       expertise: ["AI Eco Matching", "Platform Development"],
// //     },
// //     {
// //       name: "Emma Wilson",
// //       role: "Community Manager",
// //       image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
// //       bio: "Connecting eco travelers worldwide",
// //       expertise: ["Community Growth", "User Experience"],
// //     },
// //   ];

// //   const milestones = [
// //     {
// //       year: "2020",
// //       title: "Founded",
// //       description: "Started with a vision to connect eco-conscious travelers",
// //     },
// //     {
// //       year: "2021",
// //       title: "10K Eco Users",
// //       description: "Reached first major sustainable milestone",
// //     },
// //     {
// //       year: "2022",
// //       title: "Global Green Launch",
// //       description: "Expanded to 50+ eco destinations",
// //     },
// //     {
// //       year: "2023",
// //       title: "Eco Premium Launch",
// //       description: "Introduced sustainable premium features",
// //     },
// //     {
// //       year: "2024",
// //       title: "50K+ Green Community",
// //       description: "50,000+ happy eco travelers",
// //     },
// //   ];

// //   const values = [
// //     {
// //       icon: <Shield className="w-8 h-8" />,
// //       title: "Sustainability First",
// //       description:
// //         "Verified eco-friendly practices and 24/7 support ensure green travels",
// //     },
// //     {
// //       icon: <Heart className="w-8 h-8" />,
// //       title: "Green Community",
// //       description:
// //         "Building meaningful connections between eco-conscious travelers",
// //     },
// //     {
// //       icon: <Compass className="w-8 h-8" />,
// //       title: "Eco Adventure",
// //       description: "Inspiring unforgettable sustainable travel experiences",
// //     },
// //     {
// //       icon: <Target className="w-8 h-8" />,
// //       title: "Carbon Conscious",
// //       description: "Transparent carbon tracking and eco-friendly matching",
// //     },
// //   ];

// //   return (
// //     <div className="min-h-screen">
// //       {/* Hero Section - Green Theme */}
// //       <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-600 py-24">
// //         <div className="absolute inset-0 bg-[url('/pattern-leaf.svg')] opacity-10"></div>
// //         <div className="container relative mx-auto px-4">
// //           <motion.div
// //             initial="hidden"
// //             animate="visible"
// //             variants={fadeInUp}
// //             transition={{ duration: 0.6 }}
// //             className="max-w-4xl mx-auto text-center"
// //           >
// //             <motion.div variants={scaleIn} transition={{ delay: 0.1 }}>
// //               <Badge className="mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm text-white border-0">
// //                 <Leaf className="w-4 h-4 mr-2" />
// //                 OUR GREEN STORY
// //               </Badge>
// //             </motion.div>

// //             <motion.h1
// //               variants={fadeInUp}
// //               transition={{ delay: 0.2 }}
// //               className="text-5xl md:text-7xl font-bold text-white mb-6"
// //             >
// //               Connecting Eco Travelers,
// //               <span className="block bg-gradient-to-r from-lime-300 to-amber-300 bg-clip-text text-transparent">
// //                 Creating Green Memories
// //               </span>
// //             </motion.h1>

// //             <motion.p
// //               variants={fadeInUp}
// //               transition={{ delay: 0.3 }}
// //               className="text-xl text-emerald-100 mb-10 max-w-3xl mx-auto"
// //             >
// //               At TravelBuddy, we believe the best journeys are shared
// //               sustainably. Founded by passionate eco travelers, we're on a
// //               mission to transform solo trips into unforgettable group
// //               adventures through meaningful green connections.
// //             </motion.p>

// //             <motion.div
// //               variants={fadeInUp}
// //               transition={{ delay: 0.4 }}
// //               className="flex flex-col sm:flex-row gap-4 justify-center"
// //             >
// //               <Link href="/register">
// //                 <Button
// //                   size="lg"
// //                   className="bg-white text-emerald-600 hover:bg-emerald-50 gap-3 px-8"
// //                 >
// //                   <Leaf className="w-6 h-6" />
// //                   Join Our Green Community
// //                 </Button>
// //               </Link>
// //               <Link href="/services">
// //                 <Button
// //                   size="lg"
// //                   variant="outline"
// //                   className="border-white text-white hover:bg-white/10 gap-3 px-8"
// //                 >
// //                   Our Eco Services
// //                   <ChevronRight className="w-5 h-5" />
// //                 </Button>
// //               </Link>
// //             </motion.div>
// //           </motion.div>
// //         </div>
// //       </section>

// //       {/* Mission & Vision - Green Theme */}
// //       <section className="py-20">
// //         <div className="container mx-auto px-4">
// //           <div className="grid lg:grid-cols-2 gap-12 items-center">
// //             <motion.div
// //               initial="hidden"
// //               animate="visible"
// //               variants={slideInLeft}
// //               transition={{ duration: 0.6 }}
// //             >
// //               <Badge className="mb-4 bg-emerald-100 text-emerald-800">
// //                 OUR GREEN MISSION
// //               </Badge>
// //               <h2 className="text-4xl font-bold mb-6">
// //                 Making Sustainable Travel Accessible
// //               </h2>
// //               <p className="text-gray-600 text-lg mb-6">
// //                 We're revolutionizing the way people travel by creating a global
// //                 green community where eco-conscious travelers can find
// //                 compatible companions, minimize carbon footprints, and create
// //                 sustainable memories that last a lifetime.
// //               </p>

// //               <div className="space-y-4">
// //                 <motion.div variants={fadeInUp} className="flex items-start">
// //                   <CheckCircle className="w-6 h-6 text-emerald-500 mr-3 mt-1" />
// //                   <div>
// //                     <h4 className="font-bold mb-1">Carbon Neutral Community</h4>
// //                     <p className="text-gray-600">
// //                       Every trip is carbon offset for your peace of mind
// //                     </p>
// //                   </div>
// //                 </motion.div>

// //                 <motion.div
// //                   variants={fadeInUp}
// //                   transition={{ delay: 0.1 }}
// //                   className="flex items-start"
// //                 >
// //                   <CheckCircle className="w-6 h-6 text-emerald-500 mr-3 mt-1" />
// //                   <div>
// //                     <h4 className="font-bold mb-1">Smart Eco Matching</h4>
// //                     <p className="text-gray-600">
// //                       AI-powered matching based on sustainability values and
// //                       interests
// //                     </p>
// //                   </div>
// //                 </motion.div>

// //                 <motion.div
// //                   variants={fadeInUp}
// //                   transition={{ delay: 0.2 }}
// //                   className="flex items-start"
// //                 >
// //                   <CheckCircle className="w-6 h-6 text-emerald-500 mr-3 mt-1" />
// //                   <div>
// //                     <h4 className="font-bold mb-1">Global Green Network</h4>
// //                     <p className="text-gray-600">
// //                       Connect with eco travelers in 150+ countries worldwide
// //                     </p>
// //                   </div>
// //                 </motion.div>
// //               </div>
// //             </motion.div>

// //             <motion.div
// //               initial="hidden"
// //               animate="visible"
// //               variants={slideInRight}
// //               transition={{ duration: 0.6, delay: 0.2 }}
// //               className="relative"
// //             >
// //               <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl p-8 text-white">
// //                 <div className="flex items-center mb-6">
// //                   <Target className="w-12 h-12 mr-4" />
// //                   <div>
// //                     <h3 className="text-2xl font-bold">Our Green Vision</h3>
// //                     <p className="text-emerald-100">
// //                       The future of sustainable social travel
// //                     </p>
// //                   </div>
// //                 </div>

// //                 <p className="text-lg mb-8">
// //                   To become the world's most trusted platform for connecting eco
// //                   travelers, making every journey more sustainable, affordable,
// //                   and memorable through meaningful green connections.
// //                 </p>

// //                 <motion.div
// //                   initial="hidden"
// //                   animate="visible"
// //                   variants={staggerContainer}
// //                   className="grid grid-cols-2 gap-6"
// //                 >
// //                   <motion.div
// //                     variants={scaleIn}
// //                     className="text-center p-4 bg-white/10 rounded-xl"
// //                   >
// //                     <div className="text-3xl font-bold mb-2">50K+</div>
// //                     <div className="text-sm">Eco Travelers</div>
// //                   </motion.div>
// //                   <motion.div
// //                     variants={scaleIn}
// //                     transition={{ delay: 0.1 }}
// //                     className="text-center p-4 bg-white/10 rounded-xl"
// //                   >
// //                     <div className="text-3xl font-bold mb-2">120+</div>
// //                     <div className="text-sm">Green Destinations</div>
// //                   </motion.div>
// //                   <motion.div
// //                     variants={scaleIn}
// //                     transition={{ delay: 0.2 }}
// //                     className="text-center p-4 bg-white/10 rounded-xl"
// //                   >
// //                     <div className="text-3xl font-bold mb-2">15K+</div>
// //                     <div className="text-sm">Sustainable Trips</div>
// //                   </motion.div>
// //                   <motion.div
// //                     variants={scaleIn}
// //                     transition={{ delay: 0.3 }}
// //                     className="text-center p-4 bg-white/10 rounded-xl"
// //                   >
// //                     <div className="text-3xl font-bold mb-2">4.8★</div>
// //                     <div className="text-sm">Green Rating</div>
// //                   </motion.div>
// //                 </motion.div>
// //               </div>
// //             </motion.div>
// //           </div>
// //         </div>
// //       </section>

// //       {/* Our Green Values */}
// //       <section className="py-20 bg-emerald-50">
// //         <div className="container mx-auto px-4">
// //           <motion.div
// //             initial="hidden"
// //             animate="visible"
// //             variants={fadeInUp}
// //             className="text-center mb-16"
// //           >
// //             <Badge className="mb-4 bg-green-100 text-green-800">
// //               OUR GREEN VALUES
// //             </Badge>
// //             <h2 className="text-4xl font-bold mb-4">What We Stand For</h2>
// //             <p className="text-gray-600 max-w-2xl mx-auto">
// //               These sustainable principles guide everything we do at TravelBuddy
// //             </p>
// //           </motion.div>

// //           <motion.div
// //             initial="hidden"
// //             animate="visible"
// //             variants={staggerContainer}
// //             className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
// //           >
// //             {values.map((value, index) => (
// //               <motion.div
// //                 key={value.title}
// //                 variants={fadeInUp}
// //                 transition={{ delay: index * 0.1 }}
// //                 whileHover={{ y: -5 }}
// //               >
// //                 <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow h-full">
// //                   <CardContent className="p-8 text-center">
// //                     <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 mb-6">
// //                       {value.icon}
// //                     </div>
// //                     <h3 className="text-xl font-bold mb-3">{value.title}</h3>
// //                     <p className="text-gray-600">{value.description}</p>
// //                   </CardContent>
// //                 </Card>
// //               </motion.div>
// //             ))}
// //           </motion.div>
// //         </div>
// //       </section>

// //       {/* Our Green Story Timeline */}
// //       <section className="py-20">
// //         <div className="container mx-auto px-4">
// //           <motion.div
// //             initial="hidden"
// //             animate="visible"
// //             variants={fadeInUp}
// //             className="text-center mb-16"
// //           >
// //             <Badge className="mb-4 bg-emerald-100 text-emerald-800">
// //               GREEN JOURNEY
// //             </Badge>
// //             <h2 className="text-4xl font-bold mb-4">Our Sustainable Story</h2>
// //             <p className="text-gray-600 max-w-2xl mx-auto">
// //               From a simple green idea to a global eco community
// //             </p>
// //           </motion.div>

// //           <div className="relative">
// //             {/* Timeline Line */}
// //             <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-emerald-500 to-teal-500"></div>

// //             {milestones.map((milestone, index) => (
// //               <motion.div
// //                 key={milestone.year}
// //                 initial="hidden"
// //                 animate="visible"
// //                 variants={fadeInUp}
// //                 transition={{ duration: 0.5, delay: index * 0.1 }}
// //                 className={`relative mb-12 ${
// //                   index % 2 === 0
// //                     ? "lg:pr-1/2 lg:pl-0 lg:text-right"
// //                     : "lg:pl-1/2 lg:pr-0"
// //                 }`}
// //               >
// //                 <div className="flex items-center lg:block">
// //                   {/* Year Badge */}
// //                   <div
// //                     className={`
// //                     ${
// //                       index % 2 === 0
// //                         ? "lg:absolute lg:right-0 lg:translate-x-1/2"
// //                         : "lg:absolute lg:left-0 lg:-translate-x-1/2"
// //                     }
// //                     z-10 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500
// //                     flex items-center justify-center text-white font-bold text-xl
// //                     shadow-lg
// //                   `}
// //                   >
// //                     {milestone.year}
// //                   </div>

// //                   {/* Content */}
// //                   <div
// //                     className={`
// //                     ${index % 2 === 0 ? "lg:mr-16" : "lg:ml-16"}
// //                     ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}
// //                     flex-1 ml-6 lg:ml-0
// //                   `}
// //                   >
// //                     <Card className="border-0 shadow-lg">
// //                       <CardContent className="p-6">
// //                         <h3 className="text-2xl font-bold mb-2">
// //                           {milestone.title}
// //                         </h3>
// //                         <p className="text-gray-600">{milestone.description}</p>
// //                       </CardContent>
// //                     </Card>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Green Team Section */}
// //       <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
// //         <div className="container mx-auto px-4">
// //           <motion.div
// //             initial="hidden"
// //             animate="visible"
// //             variants={fadeInUp}
// //             className="text-center mb-16"
// //           >
// //             <Badge className="mb-4 bg-emerald-100 text-emerald-800">
// //               OUR GREEN TEAM
// //             </Badge>
// //             <h2 className="text-4xl font-bold mb-4">
// //               Meet The Green Dream Team
// //             </h2>
// //             <p className="text-gray-600 max-w-2xl mx-auto">
// //               Passionate eco travelers and green tech experts working to
// //               revolutionize how people travel sustainably
// //             </p>
// //           </motion.div>

// //           <motion.div
// //             initial="hidden"
// //             animate="visible"
// //             variants={staggerContainer}
// //             className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
// //           >
// //             {teamMembers.map((member, index) => (
// //               <motion.div
// //                 key={member.name}
// //                 variants={fadeInUp}
// //                 transition={{ delay: index * 0.1 }}
// //                 whileHover={{ y: -5 }}
// //               >
// //                 <Card className="border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden group">
// //                   <div className="relative h-64 overflow-hidden">
// //                     <div
// //                       className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
// //                       style={{ backgroundImage: `url(${member.image})` }}
// //                     />
// //                     <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
// //                       <div className="absolute bottom-4 left-4 right-4">
// //                         <div className="flex flex-wrap gap-2">
// //                           {member.expertise.map((exp) => (
// //                             <Badge
// //                               key={exp}
// //                               variant="secondary"
// //                               className="bg-white/20 text-white"
// //                             >
// //                               {exp}
// //                             </Badge>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <CardContent className="p-6">
// //                     <h3 className="text-xl font-bold mb-1">{member.name}</h3>
// //                     <p className="text-emerald-600 font-medium mb-3">
// //                       {member.role}
// //                     </p>
// //                     <p className="text-gray-600 text-sm">{member.bio}</p>
// //                   </CardContent>
// //                 </Card>
// //               </motion.div>
// //             ))}
// //           </motion.div>
// //         </div>
// //       </section>

// //       {/* Join Green Community CTA */}
// //       <section className="py-20">
// //         <div className="container mx-auto px-4">
// //           <motion.div initial="hidden" animate="visible" variants={scaleIn}>
// //             <Card className="border-0 shadow-2xl overflow-hidden">
// //               <div className="grid lg:grid-cols-2">
// //                 <div className="p-12 bg-gradient-to-br from-emerald-600 to-teal-600 text-white">
// //                   <h2 className="text-4xl font-bold mb-6">
// //                     Join Our Growing Green Community
// //                   </h2>
// //                   <p className="text-xl text-emerald-100 mb-8">
// //                     Become part of a global network of eco travelers creating
// //                     sustainable memories together.
// //                   </p>

// //                   <div className="space-y-4 mb-8">
// //                     <div className="flex items-center">
// //                       <CheckCircle className="w-6 h-6 mr-3" />
// //                       <span>Verified eco traveler profiles</span>
// //                     </div>
// //                     <div className="flex items-center">
// //                       <CheckCircle className="w-6 h-6 mr-3" />
// //                       <span>AI-powered green matching</span>
// //                     </div>
// //                     <div className="flex items-center">
// //                       <CheckCircle className="w-6 h-6 mr-3" />
// //                       <span>24/7 sustainability support</span>
// //                     </div>
// //                     <div className="flex items-center">
// //                       <CheckCircle className="w-6 h-6 mr-3" />
// //                       <span>Global green community</span>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="p-12">
// //                   <div className="max-w-md mx-auto">
// //                     <h3 className="text-2xl font-bold mb-6">
// //                       Ready to Start Your Eco Adventure?
// //                     </h3>

// //                     <div className="space-y-4">
// //                       <Link href="/register" className="block">
// //                         <Button className="w-full gap-3 py-6 text-lg">
// //                           <Leaf className="w-6 h-6" />
// //                           Join Green Community
// //                         </Button>
// //                       </Link>

// //                       <Link href="/services" className="block">
// //                         <Button
// //                           variant="outline"
// //                           className="w-full gap-3 py-6 text-lg"
// //                         >
// //                           Explore Eco Services
// //                           <ChevronRight className="w-5 h-5" />
// //                         </Button>
// //                       </Link>

// //                       <Link href="/contact" className="block">
// //                         <Button variant="ghost" className="w-full">
// //                           Contact Our Green Team
// //                         </Button>
// //                       </Link>
// //                     </div>

// //                     <div className="mt-8 pt-8 border-t text-center">
// //                       <p className="text-gray-600 mb-2">
// //                         Already have an eco account?
// //                       </p>
// //                       <Link href="/login">
// //                         <Button variant="link">Sign In Here</Button>
// //                       </Link>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </Card>
// //           </motion.div>
// //         </div>
// //       </section>

// //       {/* Green Testimonial */}
// //       <section className="py-20 bg-emerald-50">
// //         <div className="container mx-auto px-4">
// //           <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
// //             <Card className="border-0 shadow-xl max-w-3xl mx-auto">
// //               <CardContent className="p-12">
// //                 <div className="text-center">
// //                   <TreePine className="w-12 h-12 text-emerald-500 mx-auto mb-6" />
// //                   <blockquote className="text-2xl italic text-gray-700 mb-8">
// //                     "TravelBuddy transformed how I travel sustainably. What used
// //                     to be solo eco trips are now shared green adventures with
// //                     amazing people who share my values for the planet."
// //                   </blockquote>
// //                   <div>
// //                     <div className="font-bold text-lg">Jessica Miller</div>
// //                     <div className="text-gray-600">Eco Traveler since 2021</div>
// //                     <div className="flex items-center justify-center mt-2 text-gray-500">
// //                       <Sprout className="w-4 h-4 mr-1" />
// //                       Visited 24 eco destinations with TravelBuddy companions
// //                     </div>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </motion.div>
// //         </div>
// //       </section>
// //     </div>
// //   );
// // }

// "use client";

// import { motion } from "framer-motion";
// import {
//   Globe,
//   Users,
//   Shield,
//   Heart,
//   Award,
//   Target,
//   TrendingUp,
//   Compass,
//   Star,
//   MapPin,
//   ChevronRight,
//   CheckCircle,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import Link from "next/link";

// export default function AboutPage() {
//   const teamMembers = [
//     {
//       name: "Alex Morgan",
//       role: "CEO & Founder",
//       image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
//       bio: "Former travel blogger turned entrepreneur",
//       expertise: ["Travel Tech", "Community Building"],
//     },
//     {
//       name: "Sarah Chen",
//       role: "Head of Safety",
//       image:
//         "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
//       bio: "10+ years in travel security",
//       expertise: ["User Safety", "Verification"],
//     },
//     {
//       name: "Marcus Rodriguez",
//       role: "Lead Developer",
//       image:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
//       bio: "Passionate about travel tech",
//       expertise: ["AI Matching", "Platform Development"],
//     },
//     {
//       name: "Emma Wilson",
//       role: "Community Manager",
//       image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
//       bio: "Connecting travelers worldwide",
//       expertise: ["Community Growth", "User Experience"],
//     },
//   ];

//   const milestones = [
//     {
//       year: "2020",
//       title: "Founded",
//       description: "Started with a vision to connect solo travelers",
//     },
//     {
//       year: "2021",
//       title: "10K Users",
//       description: "Reached first major milestone",
//     },
//     {
//       year: "2022",
//       title: "Global Launch",
//       description: "Expanded to 50+ countries",
//     },
//     {
//       year: "2023",
//       title: "Premium Launch",
//       description: "Introduced premium features",
//     },
//     {
//       year: "2024",
//       title: "50K+ Community",
//       description: "50,000+ happy travelers",
//     },
//   ];

//   const values = [
//     {
//       icon: <Shield className="w-8 h-8" />,
//       title: "Safety First",
//       description: "Verified profiles and 24/7 support ensure safe travels",
//     },
//     {
//       icon: <Heart className="w-8 h-8" />,
//       title: "Community",
//       description: "Building meaningful connections between travelers",
//     },
//     {
//       icon: <Compass className="w-8 h-8" />,
//       title: "Adventure",
//       description: "Inspiring unforgettable travel experiences",
//     },
//     {
//       icon: <Target className="w-8 h-8" />,
//       title: "Trust",
//       description: "Transparent reviews and reliable matching",
//     },
//   ];

//   return (
//     <div className="min-h-screen">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 py-24">
//         <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
//         <div className="container relative mx-auto px-4">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="max-w-4xl mx-auto text-center"
//           >
//             <Badge className="mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm text-white border-0">
//               OUR STORY
//             </Badge>

//             <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
//               Connecting Travelers,
//               <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
//                 Creating Memories
//               </span>
//             </h1>

//             <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
//               At TravelBuddy, we believe the best journeys are shared. Founded
//               by passionate travelers, we're on a mission to transform solo
//               trips into unforgettable group adventures through meaningful
//               connections.
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Link href="/register">
//                 <Button
//                   size="lg"
//                   className="bg-white text-blue-600 hover:bg-blue-50 gap-3 px-8"
//                 >
//                   <Users className="w-6 h-6" />
//                   Join Our Community
//                 </Button>
//               </Link>
//               <Link href="/services">
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="border-white text-white hover:bg-white/10 gap-3 px-8"
//                 >
//                   Our Services
//                   <ChevronRight className="w-5 h-5" />
//                 </Button>
//               </Link>
//             </div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Mission & Vision */}
//       <section className="py-20">
//         <div className="container mx-auto px-4">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             <motion.div
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <Badge className="mb-4">OUR MISSION</Badge>
//               <h2 className="text-4xl font-bold mb-6">
//                 Making Solo Travel a Thing of the Past
//               </h2>
//               <p className="text-gray-600 text-lg mb-6">
//                 We're revolutionizing the way people travel by creating a global
//                 community where solo travelers can find compatible companions,
//                 share costs, and create memories that last a lifetime.
//               </p>

//               <div className="space-y-4">
//                 <div className="flex items-start">
//                   <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
//                   <div>
//                     <h4 className="font-bold mb-1">
//                       Safe & Verified Community
//                     </h4>
//                     <p className="text-gray-600">
//                       Every member undergoes verification for your peace of mind
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
//                   <div>
//                     <h4 className="font-bold mb-1">
//                       Smart Matching Technology
//                     </h4>
//                     <p className="text-gray-600">
//                       AI-powered matching based on interests, travel style, and
//                       personality
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start">
//                   <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
//                   <div>
//                     <h4 className="font-bold mb-1">Global Network</h4>
//                     <p className="text-gray-600">
//                       Connect with travelers in 150+ countries worldwide
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="relative"
//             >
//               <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl p-8 text-white">
//                 <div className="flex items-center mb-6">
//                   <Target className="w-12 h-12 mr-4" />
//                   <div>
//                     <h3 className="text-2xl font-bold">Our Vision</h3>
//                     <p className="text-blue-100">The future of social travel</p>
//                   </div>
//                 </div>

//                 <p className="text-lg mb-8">
//                   To become the world's most trusted platform for connecting
//                   travelers, making every journey more affordable, safe, and
//                   memorable through meaningful connections.
//                 </p>

//                 <div className="grid grid-cols-2 gap-6">
//                   <div className="text-center p-4 bg-white/10 rounded-xl">
//                     <div className="text-3xl font-bold mb-2">50K+</div>
//                     <div className="text-sm">Active Travelers</div>
//                   </div>
//                   <div className="text-center p-4 bg-white/10 rounded-xl">
//                     <div className="text-3xl font-bold mb-2">120+</div>
//                     <div className="text-sm">Countries</div>
//                   </div>
//                   <div className="text-center p-4 bg-white/10 rounded-xl">
//                     <div className="text-3xl font-bold mb-2">15K+</div>
//                     <div className="text-sm">Successful Trips</div>
//                   </div>
//                   <div className="text-center p-4 bg-white/10 rounded-xl">
//                     <div className="text-3xl font-bold mb-2">4.8★</div>
//                     <div className="text-sm">Average Rating</div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Our Values */}
//       <section className="py-20 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <Badge className="mb-4">OUR VALUES</Badge>
//             <h2 className="text-4xl font-bold mb-4">What We Stand For</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               These principles guide everything we do at TravelBuddy
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {values.map((value, index) => (
//               <motion.div
//                 key={value.title}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//               >
//                 <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow h-full">
//                   <CardContent className="p-8 text-center">
//                     <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mb-6">
//                       {value.icon}
//                     </div>
//                     <h3 className="text-xl font-bold mb-3">{value.title}</h3>
//                     <p className="text-gray-600">{value.description}</p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Our Story Timeline */}
//       <section className="py-20">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <Badge className="mb-4">JOURNEY</Badge>
//             <h2 className="text-4xl font-bold mb-4">Our Story</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               From a simple idea to a global community
//             </p>
//           </div>

//           <div className="relative">
//             {/* Timeline Line */}
//             <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

//             {milestones.map((milestone, index) => (
//               <motion.div
//                 key={milestone.year}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className={`relative mb-12 ${
//                   index % 2 === 0
//                     ? "lg:pr-1/2 lg:pl-0 lg:text-right"
//                     : "lg:pl-1/2 lg:pr-0"
//                 }`}
//               >
//                 <div className="flex items-center lg:block">
//                   {/* Year Badge */}
//                   <div
//                     className={`
//                     ${
//                       index % 2 === 0
//                         ? "lg:absolute lg:right-0 lg:translate-x-1/2"
//                         : "lg:absolute lg:left-0 lg:-translate-x-1/2"
//                     }
//                     z-10 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500
//                     flex items-center justify-center text-white font-bold text-xl
//                     shadow-lg
//                   `}
//                   >
//                     {milestone.year}
//                   </div>

//                   {/* Content */}
//                   <div
//                     className={`
//                     ${index % 2 === 0 ? "lg:mr-16" : "lg:ml-16"}
//                     ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}
//                     flex-1 ml-6 lg:ml-0
//                   `}
//                   >
//                     <Card className="border-0 shadow-lg">
//                       <CardContent className="p-6">
//                         <h3 className="text-2xl font-bold mb-2">
//                           {milestone.title}
//                         </h3>
//                         <p className="text-gray-600">{milestone.description}</p>
//                       </CardContent>
//                     </Card>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-16">
//             <Badge className="mb-4">OUR TEAM</Badge>
//             <h2 className="text-4xl font-bold mb-4">Meet The Dream Team</h2>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Passionate travelers and tech experts working to revolutionize how
//               people travel
//             </p>
//           </div>

//           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {teamMembers.map((member, index) => (
//               <motion.div
//                 key={member.name}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//               >
//                 <Card className="border-0 shadow-lg hover:shadow-xl transition-all overflow-hidden group">
//                   <div className="relative h-64 overflow-hidden">
//                     <div
//                       className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
//                       style={{ backgroundImage: `url(${member.image})` }}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       <div className="absolute bottom-4 left-4 right-4">
//                         <div className="flex flex-wrap gap-2">
//                           {member.expertise.map((exp) => (
//                             <Badge
//                               key={exp}
//                               variant="secondary"
//                               className="bg-white/20 text-white"
//                             >
//                               {exp}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <CardContent className="p-6">
//                     <h3 className="text-xl font-bold mb-1">{member.name}</h3>
//                     <p className="text-blue-600 font-medium mb-3">
//                       {member.role}
//                     </p>
//                     <p className="text-gray-600 text-sm">{member.bio}</p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Join Community CTA */}
//       <section className="py-20">
//         <div className="container mx-auto px-4">
//           <Card className="border-0 shadow-2xl overflow-hidden">
//             <div className="grid lg:grid-cols-2">
//               <div className="p-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
//                 <h2 className="text-4xl font-bold mb-6">
//                   Join Our Growing Community
//                 </h2>
//                 <p className="text-xl text-blue-100 mb-8">
//                   Become part of a global network of travelers creating
//                   unforgettable memories together.
//                 </p>

//                 <div className="space-y-4 mb-8">
//                   <div className="flex items-center">
//                     <CheckCircle className="w-6 h-6 mr-3" />
//                     <span>Verified traveler profiles</span>
//                   </div>
//                   <div className="flex items-center">
//                     <CheckCircle className="w-6 h-6 mr-3" />
//                     <span>AI-powered matching</span>
//                   </div>
//                   <div className="flex items-center">
//                     <CheckCircle className="w-6 h-6 mr-3" />
//                     <span>24/7 safety support</span>
//                   </div>
//                   <div className="flex items-center">
//                     <CheckCircle className="w-6 h-6 mr-3" />
//                     <span>Global community</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-12">
//                 <div className="max-w-md mx-auto">
//                   <h3 className="text-2xl font-bold mb-6">
//                     Ready to Start Your Adventure?
//                   </h3>

//                   <div className="space-y-4">
//                     <Link href="/register" className="block">
//                       <Button className="w-full gap-3 py-6 text-lg">
//                         <Users className="w-6 h-6" />
//                         Join Free Today
//                       </Button>
//                     </Link>

//                     <Link href="/services" className="block">
//                       <Button
//                         variant="outline"
//                         className="w-full gap-3 py-6 text-lg"
//                       >
//                         Explore Services
//                         <ChevronRight className="w-5 h-5" />
//                       </Button>
//                     </Link>

//                     <Link href="/contact" className="block">
//                       <Button variant="ghost" className="w-full">
//                         Contact Our Team
//                       </Button>
//                     </Link>
//                   </div>

//                   <div className="mt-8 pt-8 border-t text-center">
//                     <p className="text-gray-600 mb-2">
//                       Already have an account?
//                     </p>
//                     <Link href="/login">
//                       <Button variant="link">Sign In Here</Button>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </section>

//       {/* Testimonial */}
//       <section className="py-20 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <Card className="border-0 shadow-xl max-w-3xl mx-auto">
//             <CardContent className="p-12">
//               <div className="text-center">
//                 <Star className="w-12 h-12 text-yellow-500 fill-yellow-500 mx-auto mb-6" />
//                 <blockquote className="text-2xl italic text-gray-700 mb-8">
//                   "TravelBuddy transformed how I travel. What used to be solo
//                   trips are now shared adventures with amazing people from
//                   around the world."
//                 </blockquote>
//                 <div>
//                   <div className="font-bold text-lg">Jessica Miller</div>
//                   <div className="text-gray-600">
//                     TravelBuddy Member since 2021
//                   </div>
//                   <div className="flex items-center justify-center mt-2 text-gray-500">
//                     <MapPin className="w-4 h-4 mr-1" />
//                     Visited 24 countries with TravelBuddy companions
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </section>
//     </div>
//   );
// }

import React from "react";

const AboutUsPage = () => {
  return <div>AboutUsPage</div>;
};

export default AboutUsPage;
