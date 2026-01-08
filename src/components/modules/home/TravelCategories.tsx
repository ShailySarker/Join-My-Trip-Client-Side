import {
  Mountain,
  Palmtree,
  Tent,
  Camera,
  PartyPopper,
  Sparkles,
  Building2,
  Leaf,
  UtensilsCrossed,
  ShoppingBag,
  Globe,
  Route,
  Binoculars,
  Trees,
  Compass,
  Landmark,
  LucideIcon,
  Crown,
} from "lucide-react";
import Link from "next/link";
import { ITrevelInterest } from "@/types/travelPlan.interface";

type TravelCategory = {
  label: string;
  value: ITrevelInterest;
  icon: LucideIcon;
  color: string;
};

const travelCategories: TravelCategory[] = [
  {
    label: "Hiking",
    value: ITrevelInterest.HIKING,
    icon: Mountain,
    color: "text-green-600 bg-green-50 dark:bg-green-900/20",
  },
  {
    label: "Beach",
    value: ITrevelInterest.BEACH,
    icon: Palmtree,
    color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
  },
  {
    label: "Cultural",
    value: ITrevelInterest.CULTURAL,
    icon: Landmark,
    color: "text-purple-600 bg-purple-50 dark:bg-purple-900/20",
  },
  {
    label: "Adventure",
    value: ITrevelInterest.ADVENTURE,
    icon: Compass,
    color: "text-red-600 bg-red-50 dark:bg-red-900/20",
  },
  {
    label: "Nature",
    value: ITrevelInterest.NATURE,
    icon: Trees,
    color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20",
  },
  {
    label: "Wildlife",
    value: ITrevelInterest.WILDLIFE,
    icon: Binoculars,
    color: "text-lime-600 bg-lime-50 dark:bg-lime-900/20",
  },
  {
    label: "Road Trips",
    value: ITrevelInterest.ROAD_TRIPS,
    icon: Route,
    color: "text-orange-600 bg-orange-50 dark:bg-orange-900/20",
  },
  {
    label: "Historical",
    value: ITrevelInterest.HISTORICAL,
    icon: Crown,
    color: "text-stone-600 bg-stone-50 dark:bg-stone-900/20",
  },
  {
    label: "Camping",
    value: ITrevelInterest.CAMPING,
    icon: Tent,
    color: "text-teal-600 bg-teal-50 dark:bg-teal-900/20",
  },
  {
    label: "Nightlife",
    value: ITrevelInterest.NIGHTLIFE_EXPLORATION,
    icon: PartyPopper,
    color: "text-pink-600 bg-pink-50 dark:bg-pink-900/20",
  },
  {
    label: "Luxury",
    value: ITrevelInterest.LUXURY_TRAVEL,
    icon: Sparkles,
    color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20",
  },
  {
    label: "City Life",
    value: ITrevelInterest.CITY_EXPLORATION,
    icon: Building2,
    color: "text-sky-600 bg-sky-50 dark:bg-sky-900/20",
  },
  {
    label: "Village Life",
    value: ITrevelInterest.VILLAGE_LIFE,
    icon: Leaf,
    color: "text-lime-700 bg-lime-50 dark:bg-lime-900/20",
  },
  {
    label: "Photography",
    value: ITrevelInterest.PHOTOGRAPHY,
    icon: Camera,
    color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20",
  },
  {
    label: "Food Festival",
    value: ITrevelInterest.FOOD_FESTIVAL,
    icon: UtensilsCrossed,
    color: "text-rose-600 bg-rose-50 dark:bg-rose-900/20",
  },
  {
    label: "Shopping",
    value: ITrevelInterest.SHOPPING,
    icon: ShoppingBag,
    color: "text-fuchsia-600 bg-fuchsia-50 dark:bg-fuchsia-900/20",
  },
  {
    label: "Relaxation",
    value: ITrevelInterest.RELAXATION,
    icon: Sparkles,
    color: "text-cyan-600 bg-cyan-50 dark:bg-cyan-900/20",
  },
  {
    label: "International",
    value: ITrevelInterest.INTERNATIONAL,
    icon: Globe,
    color: "text-violet-600 bg-violet-50 dark:bg-violet-900/20",
  },
];

export default function TravelCategories() {
  return (
    <section className="">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse by Interest</h2>
          <p className="text-muted-foreground">
            Find trips that match your passion.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {travelCategories.map((cat, index) => {
            const Icon = cat.icon;

            return (
              <Link
                key={index}
                href={`/travel-plans?interests=${cat.value}`}
                className="flex flex-col items-center p-6 rounded-2xl border hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1 group shadow-sm bg-white"
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${cat.color}`}
                >
                  <Icon className="w-7 h-7" />
                </div>

                <p className="font-medium text-sm">{cat.label}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
