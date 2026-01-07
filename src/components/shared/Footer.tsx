import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="pt-8 ">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 xl:mx-12 lg:mx-8 md:mx-6 mx-5">
          <div>
            <h3 className="font-bold mb-2">Join My Trip</h3>
            <p className="text-sm text-muted-foreground">
              Join My Trip is a platform that connects travelers with travel
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Services
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/contact-us"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact Us
                </Link>
              </li> */}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-foreground"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact Us
                </Link>
              </li>
              {/* <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Help Center
                </Link>
              </li> */}
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Contact Us</h3>
            <p className="text-sm text-muted-foreground">
              123 Medical Lane
              <br />
              Green City, HC 12345
              <br />
              contact@jmt.com
            </p>
          </div>
        </div>
        <div className="mt-8 border-t py-4 text-center text-sm text-white font-medium bg-primary">
          &copy; {new Date().getFullYear()} Join My Trip. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
