import type { Metadata, Viewport } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import PublicChrome from "@/components/layout/PublicChrome";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#063D2A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://swayambhuinfo.com"),
  title: {
    default: "Swayambhu Innovative Solutions | CPCB Authorized Recycler & Circular Infrastructure",
    template: "%s | Swayambhu Innovative Solutions",
  },
  description:
    "Swayambhu Innovative Solutions Private Limited (CIN: U74999BR2015PTC025206) is an ISO 9001:2015 & ZED Silver certified CPCB Category-II plastic waste recycler specializing in turnkey MRFs, verified EPR credits, and community biogas plants.",
  keywords: [
    "CPCB Category-II EPR Credits",
    "Plastic Waste Recycler Haridwar",
    "Material Recovery Facility India",
    "Turnkey MRF Solutions",
    "Decentralized Biogas Digesters",
    "Upcycled Eco-Boards",
    "BRSR ESG Compliance India",
    "Swayambhu Innovative Solutions",
    "Circular Economy Infrastructure",
    "CSR School Sanitation Furniture",
  ],
  authors: [{ name: "Swayambhu Innovative Solutions Pvt. Ltd.", url: "https://swayambhuinfo.com" }],
  creator: "Swayambhu Innovative Solutions Private Limited",
  publisher: "Swayambhu Innovative Solutions Private Limited",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://swayambhuinfo.com",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://swayambhuinfo.com",
    siteName: "Swayambhu Innovative Solutions",
    title: "Swayambhu Innovative Solutions | CPCB Authorized Recycler & Circular Infrastructure",
    description:
      "Decentralized Circular Infrastructure & Enterprise Climate Authority. CPCB Category-II authorized recycler delivering turnkey MRFs, verifiable EPR credits, and community biogas systems across India.",
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Swayambhu Innovative Solutions - Circular Infrastructure & Recycling Plant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swayambhu Innovative Solutions | Circular Economy & EPR Authority",
    description:
      "CPCB Registered Plastic Recycler, ISO 9001:2015 & ZED Silver Certified. Turnkey MRFs, Category-II EPR credits, and decentralized biogas networks.",
    site: "@SisSwayambhu",
    creator: "@SisSwayambhu",
    images: ["/images/og-cover.jpg"],
  },
  icons: {
    icon: [
      { url: "/brand/favicon.ico" },
      { url: "/brand/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/brand/logo-icon.svg" }],
  },
  other: {
    "geo.region": "IN-UT",
    "geo.placename": "Haridwar",
    "geo.position": "29.9457;78.1642",
    ICBM: "29.9457, 78.1642",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Corporation",
      "@id": "https://swayambhuinfo.com/#corporation",
      name: "Swayambhu Innovative Solutions Private Limited",
      alternateName: "Swayambhu",
      url: "https://swayambhuinfo.com",
      logo: "https://swayambhuinfo.com/brand/logo-full-green.svg",
      sameAs: [
        "https://www.linkedin.com/in/akansha-singh-63729256",
        "https://twitter.com/SisSwayambhu",
        "https://www.facebook.com/swaymbhu2015",
        "https://www.instagram.com/swayambhu07",
      ],
      telephone: "+91-9205642777",
      email: "contact@swayambhuinfo.com",
      taxID: "U74999BR2015PTC025206",
      foundingDate: "2015",
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "Plot-5A2, Sector 3, IIE BHEL, SIDCUL",
          addressLocality: "Haridwar",
          addressRegion: "Uttarakhand",
          postalCode: "249403",
          addressCountry: "IN",
          name: "Recycling Facility & Operations Hub",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "Nandini Path, Dr. B Bhattacharya Marg, West Patel Nagar, Shastri Nagar",
          addressLocality: "Patna",
          addressRegion: "Bihar",
          postalCode: "800023",
          addressCountry: "IN",
          name: "Registered Corporate Headquarters",
        },
      ],
      knowsAbout: [
        "CPCB Category-II EPR Credits",
        "Material Recovery Facilities (MRF)",
        "Plastic Upcycling & Eco-Boards",
        "Decentralized Biogas Digesters",
        "ISO 14064 Carbon Accounting",
        "Corporate ESG & BRSR Disclosures",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://swayambhuinfo.com/#website",
      url: "https://swayambhuinfo.com",
      name: "Swayambhu Innovative Solutions",
      publisher: {
        "@id": "https://swayambhuinfo.com/#corporation",
      },
      inLanguage: "en-IN",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-swayam-ivory text-swayam-dark antialiased selection:bg-swayam-forest selection:text-white">
        <PublicChrome>{children}</PublicChrome>
      </body>
    </html>
  );
}