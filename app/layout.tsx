import "./globals.css";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import Navbar from "@/components/layout/navbar";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Alphi - Application Éducative Française",
  description:
    "Application éducative française pour les enfants du Québec. Apprenez la classification des mots à travers la poésie de manière ludique et interactive.",
  metadataBase: new URL("https://alphi-education.replit.dev"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cx(sfPro.variable, inter.variable)}>
          {children}
          <VercelAnalytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
