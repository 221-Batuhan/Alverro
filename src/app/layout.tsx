import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://alverro.com"),
  title: {
    default: "Alvérro — Wear Your Legacy",
    template: "%s — Alvérro",
  },
  description: "Heritage-inspired accessible luxury. Knitwear, tailoring, and essentials.",
  openGraph: {
    title: "Alvérro — Wear Your Legacy",
    description: "Heritage-inspired accessible luxury.",
    url: "https://alverro.com",
    siteName: "Alvérro",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alvérro — Wear Your Legacy",
    description: "Heritage-inspired accessible luxury.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-background text-foreground`}>
        <header className="fixed top-0 inset-x-0 z-50 transition-colors">
          <div className="container-page flex items-center justify-between py-4">
            <a href="/" className="heading-serif text-xl tracking-wide">Alvérro</a>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a className="hover:opacity-80" href="/collections">Collections</a>
              <a className="hover:opacity-80" href="/shop">Shop</a>
              <a className="hover:opacity-80" href="/account">Account</a>
              <a className="hover:opacity-80" href="/cart">Cart</a>
            </nav>
          </div>
        </header>
        <main className="pt-16">{children}</main>
        <footer className="border-t border-black/5 mt-16">
          <div className="container-page py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="heading-serif">Alvérro</span>
            <p className="text-xs text-foreground/70">© {new Date().getFullYear()} Alvérro. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
