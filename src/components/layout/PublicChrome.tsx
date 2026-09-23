"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookiesConsentModal from "@/components/common/CookiesConsentModal";
import AssistantWidget from "@/components/common/AssistantWidget";
import ScrollProvider from "@/providers/ScrollProvider";

export default function PublicChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  // In admin views, bypass public navbar, footer, scroll provider, and widgets
  if (isAdminRoute) {
    return <main>{children}</main>;
  }

  // Public corporate website chrome
  return (
    <>
      <ScrollProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </ScrollProvider>
      <CookiesConsentModal />
      <AssistantWidget />
    </>
  );
}