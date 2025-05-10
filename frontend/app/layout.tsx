import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// Get the font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// Set the metadata
export const metadata: Metadata = {
  title: "RelationAI",
  description:
    "Predict properties and apply operations on mathematical binary relations using AI",
};

// Props for the layout
type Props = {
  children: React.ReactNode;
};

// Root layout component
const RootLayout: React.FC<Props> = ({ children }) => (
  <html lang="en">
    <body className={poppins.className}>{children}</body>
  </html>
);

export default RootLayout;
