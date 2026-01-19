import Link from "next/link";
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="pt-16 pb-8">
        {/* Newsletter Section */}
        {/* <div className="xl:mx-12 lg:mx-8 md:mx-6 mx-5 mb-12">
          <div className="max-w-4xl mx-auto text-center p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border">
            <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter for travel tips, exclusive deals, and community updates
            </p>
            <form className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button type="submit" size="lg">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div> */}

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:mx-12 lg:mx-8 md:mx-6 mx-5 mb-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <h3 className="text-xl font-bold text-primary">Join My Trip</h3>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Your trusted platform for finding perfect travel companions and
              creating unforgettable journey experiences around the world.
            </p>

            {/* Social Links */}
            <div className="flex gap-2">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border hover:bg-primary hover:text-white transition-colors duration-300"
              >
                <Facebook className="h-4 w-4" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border hover:bg-primary hover:text-white transition-colors duration-300"
              >
                <Twitter className="h-4 w-4" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border hover:bg-primary hover:text-white transition-colors duration-300"
              >
                <Instagram className="h-4 w-4" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border hover:bg-primary hover:text-white transition-colors duration-300"
              >
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border hover:bg-primary hover:text-white transition-colors duration-300"
              >
                <Youtube className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/travel-plans"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Travel Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/explore-travelers"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Explore Travelers
                </Link>
              </li>
              <li>
                <Link
                  href="/subscription"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Subscription
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  123 Travel Street
                  <br />
                  Adventure City, AC 12345
                  <br />
                  Bangladesh
                </span>
              </li>
              <li>
                <a
                  href="mailto:contact@joinmytrip.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  contact@joinmytrip.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  +880 123 567 89
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t pt-8">
          <div className="xl:mx-12 lg:mx-8 md:mx-6 mx-5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>&copy; {currentYear} Join My Trip. All Rights Reserved.</p>
              <div className="flex gap-6">
                <Link
                  href="/privacy-policy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms-of-service"
                  className="hover:text-primary transition-colors"
                >
                  Terms
                </Link>
                <Link
                  href="/contact-us"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
