// app/layout.tsx
import CartToast from "@/components/CartToast";
import { CartProvider } from "@/lib/cart-context";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children} <CartToast /></CartProvider>
      </body>
    </html>
  );
}