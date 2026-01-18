"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";

const successStories = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, USA",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    trip: "Backpacking Through Southeast Asia",
    date: "December 2025",
    rating: 5,
    story:
      "I found the perfect travel buddy for my 3-month adventure through Thailand, Vietnam, and Cambodia. We had an amazing time exploring temples, trying street food, and making unforgettable memories. This platform made it so easy to connect!",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Singapore",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    trip: "European Cultural Tour",
    date: "October 2025",
    rating: 5,
    story:
      "Met incredible people who shared my passion for art and history. We visited museums in Paris, Prague, and Rome together. The platform's matching system is brilliant - everyone I met was genuine and fun to travel with!",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800",
  },
  {
    id: 3,
    name: "Emma Martinez",
    location: "Barcelona, Spain",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    trip: "African Safari Adventure",
    date: "September 2025",
    rating: 5,
    story:
      "Best decision ever! I connected with a group heading to Kenya and Tanzania. We witnessed the Great Migration, spotted the Big Five, and formed friendships that will last a lifetime. Thank you Join My Trip!",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800",
  },
];

export default function SuccessStories() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
            <Star className="h-4 w-4 fill-current" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Real Travelers,{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Real Adventures
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of happy travelers who found their perfect travel
            companions and created amazing memories
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative rounded-2xl overflow-hidden border bg-card hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${story.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold">{story.trip}</p>
                  <p className="text-white/80 text-sm">{story.date}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-12 w-12 border-2 border-primary">
                    <AvatarImage src={story.avatar} alt={story.name} />
                    <AvatarFallback>
                      {story.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold">{story.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {story.location}
                    </p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: story.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <Quote className="h-8 w-8 text-primary/20 absolute -top-2 -left-2" />
                  <p className="text-muted-foreground text-sm leading-relaxed pl-6">
                    {story.story}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
