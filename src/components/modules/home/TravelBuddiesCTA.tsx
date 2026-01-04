import { Button } from "@/components/ui/button";
import { Users, Search } from "lucide-react";
import Link from "next/link";

export default function TravelBuddiesCTA() {
  return (
    <section className="py-24 bg-primary/5 dark:bg-primary/10 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container relative z-10 px-4 mx-auto text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary mb-4">
            <Users className="w-8 h-8" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Ready to Find Your Travel Buddy?
          </h2>

          <p className="text-xl text-muted-foreground leading-relaxed">
            Do not travel alone. Join our community of explorers and find the
            perfect companion for your next adventure. Filter by destination,
            interests, and budget.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/dashboard/explore-travelers">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full">
                Find Buddies
                <Search className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg rounded-full border-2"
              >
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
