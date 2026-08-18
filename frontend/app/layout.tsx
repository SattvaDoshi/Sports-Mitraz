import "./globals.css";

export const metadata = {
  title: "Sports Store",
  description: "Custom sports apparel, trophies, and accessories",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}