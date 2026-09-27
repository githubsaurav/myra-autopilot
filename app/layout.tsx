import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Myra Travel Autopilot",
  description: "One intelligence layer that plans, adapts and acts across the trip — built on MakeMyTrip's ecosystem.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
