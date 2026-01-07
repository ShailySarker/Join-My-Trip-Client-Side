import {
  Mountain,
  Palmtree,
  Tent,
  Camera,
  FerrisWheel,
  Coffee,
  Music,
  Bike,
} from "lucide-react";
import Link from "next/link";

const categories = [
  {
    name: "Adventure",
    icon: Mountain,
    color: "text-red-500 bg-red-50 dark:bg-red-900/10",
  },
  {
    name: "Beach",
    icon: Palmtree,
    color: "text-blue-500 bg-blue-50 dark:bg-blue-900/10",
  },
  {
    name: "Camping",
    icon: Tent,
    color: "text-green-500 bg-green-50 dark:bg-green-900/10",
  },
  {
    name: "Photography",
    icon: Camera,
    color: "text-purple-500 bg-purple-50 dark:bg-purple-900/10",
  },
  {
    name: "Theme Parks",
    icon: FerrisWheel,
    color: "text-pink-500 bg-pink-50 dark:bg-pink-900/10",
  },
  {
    name: "Food & Drink",
    icon: Coffee,
    color: "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/10",
  },
  {
    name: "Culture",
    icon: Music,
    color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-900/10",
  },
  {
    name: "Cycling",
    icon: Bike,
    color: "text-cyan-500 bg-cyan-50 dark:bg-cyan-900/10",
  },
];

export default function TravelCategories() {
  return (
    <section className="py-20 bg-background border-y border-border/40">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse by Interest</h2>
          <p className="text-muted-foreground">
            Find trips that match your passion.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat, index) => (
            <Link
              href={`/travel-plans?search=${cat.name}`}
              key={index}
              className="flex flex-col items-center p-6 rounded-2xl hover:bg-accent/50 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div
                className={`p-4 rounded-full mb-3 ${cat.color} group-hover:scale-110 transition-transform`}
              >
                <cat.icon className="w-6 h-6" />
              </div>
              <span className="font-medium text-sm text-foreground/80 group-hover:text-primary transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
