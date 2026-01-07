"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { toast } from "sonner";

export default function NewsletterSection() {
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    toast.success("Email received successfully!");
    form.reset(); // optional
  };

  return (
    <section className="py-20 bg-linear-to-r from-primary to-primary/80">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Never Miss an Adventure
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Subscribe to our newsletter and get exclusive travel tips,
            destination guides, and early access to new features.
          </p>

          <form
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            onSubmit={handleFormSubmit}
          >
            <Input
              type="email"
              name="email" // ✅ REQUIRED for FormData
              placeholder="Enter your email address"
              className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
              required
            />

            <Button
              type="submit"
              size="lg"
              variant="secondary"
              className="h-12 px-8 whitespace-nowrap"
            >
              Subscribe Now
            </Button>
          </form>

          <p className="text-sm opacity-75 mt-4">
            Join 100+ travelers who already subscribed. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
