export const dynamic = "force-dynamic";

import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {/* <main className="min-h-dvh bg-primary/30 xl:pb-20 lg:pb-16 md:pb-14 pb-13"> */}
      <main className="min-h-dvh bg-primary/30 xl:px-24 lg:px-20 md:px-12 px-6 xl:pt-7 lg:pt-5 md:pt-4 pt-3 xl:pb-20 lg:pb-16 md:pb-14 pb-13">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
