export const dynamic = "force-dynamic";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {/* <main className="min-h-dvh bg-primary/30 xl:pb-24 lg:pb-20 md:pb-16 pb-14"> */}
      {/* <main className="min-h-dvh bg-primary/30 xl:px-24 lg:px-20 md:px-12 px-6 xl:pt-7 lg:pt-5 md:pt-4 pt-3 xl:pb-24 lg:pb-20 md:pb-16 pb-14"> */}
      <main className="min-h-dvh bg-primary/20">{children}</main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
