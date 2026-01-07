import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MapPin, Phone, Clock, MessageCircle, Send } from "lucide-react";
import ContactForm from "@/components/modules/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us - Join My Trip",
  description:
    "Get in touch with us. We're here to help you with any questions or support you need.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-3 mb-6 bg-primary/10 rounded-full">
            <MessageCircle className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question about
            features, pricing, or just want to say hi, our team is ready to
            answer all your questions.
          </p>
        </div>
      </section>

      {/* 2. Contact Information Cards */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto -mt-32">
            <Card className="shadow-xl border-0">
              <CardContent className="p-8 text-center bg-card rounded-xl h-full flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mb-6">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email Us</h3>
                <p className="text-muted-foreground mb-6">
                  Our friendly team is here to help.
                </p>
                <a
                  href="mailto:support@joinmytrip.com"
                  className="text-primary font-semibold hover:underline mt-auto"
                >
                  support@joinmytrip.com
                </a>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0">
              <CardContent className="p-8 text-center bg-card rounded-xl h-full flex flex-col items-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Office</h3>
                <p className="text-muted-foreground mb-6">
                  Come say hello at our office HQ.
                </p>
                <div className="text-primary font-semibold mt-auto">
                  100 Smith Street
                  <br />
                  Collingwood VIC 3066 AU
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl border-0">
              <CardContent className="p-8 text-center bg-card rounded-xl h-full flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full flex items-center justify-center mb-6">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <p className="text-muted-foreground mb-6">
                  Mon-Fri from 8am to 5pm.
                </p>
                <a
                  href="tel:+1(555)000-0000"
                  className="text-primary font-semibold hover:underline mt-auto"
                >
                  +1 (555) 000-0000
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. Contact Form & Map Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Send us a message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Map/Image Placeholder */}
            <div className="bg-muted rounded-3xl min-h-[500px] relative overflow-hidden">
               <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902442430139!2d90.39108031536257!3d23.750858094676466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b888ad3f9801%3A0x85c00b240b457a44!2sFarmgate%2C%20Dhaka%201215!5e0!3m2!1sen!2sbd!4v1675269781827!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "500px" }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Support Hours */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-8">Support Availability</h2>
            <div className="flex flex-wrap justify-center gap-8">
                <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-medium">Monday - Friday: 9AM - 6PM</span>
                </div>
                <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-medium">Saturday: 10AM - 4PM</span>
                </div>
                <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-medium">Sunday: Closed</span>
                </div>
            </div>
        </div>
      </section>

      {/* 5. FAQ Preview */}
      <section className="py-20 bg-background text-center">
          <div className="max-w-3xl mx-auto px-4">
              <h2 className="text-3xl font-bold mb-6">Frequent Questions</h2>
              <p className="text-muted-foreground mb-8">
                  Haven't found what you're looking for? Browse our Frequently Asked Questions to find the answer.
              </p>
              <Button variant="outline" size="lg" asChild>
                  <a href="/faq">Visit Help Center</a>
              </Button>
          </div>
      </section>
    </div>
  );
}
