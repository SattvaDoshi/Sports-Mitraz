"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { Product } from "@/lib/types";

export type CartItem = {
  product: Product;
  qty: number;
  color?: string | null;
  size?: string | null;
};

type ToastState = {
  visible: boolean;
  message: string;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addToCart: (
    product: Product,
    qty?: number,
    opts?: { color?: string | null; size?: string | null }
  ) => void;
  removeFromCart: (productId: string, color?: string | null, size?: string | null) => void;
  updateQty: (productId: string, color: string | null, size: string | null, qty: number) => void;
  clearCart: () => void;
  toast: ToastState;
  dismissToast: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function sameLine(
  it: CartItem,
  productId: string,
  color?: string | null,
  size?: string | null
) {
  return (
    it.product.id === productId &&
    it.color === (color ?? null) &&
    it.size === (size ?? null)
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<ToastState>({ visible: false, message: "" });

  const addToCart = useCallback<CartContextValue["addToCart"]>(
    (product, qty = 1, opts) => {
      setItems((prev) => {
        const idx = prev.findIndex((it) =>
          sameLine(it, product.id, opts?.color, opts?.size)
        );
        if (idx > -1) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: next[idx].qty + qty };
          return next;
        }
        return [...prev, { product, qty, color: opts?.color ?? null, size: opts?.size ?? null }];
      });

      setToast({ visible: true, message: `${product.name} added to cart` });
    },
    []
  );

  const removeFromCart = useCallback<CartContextValue["removeFromCart"]>(
    (productId, color, size) => {
      setItems((prev) => prev.filter((it) => !sameLine(it, productId, color, size)));
    },
    []
  );

  const updateQty = useCallback<CartContextValue["updateQty"]>(
    (productId, color, size, qty) => {
      setItems((prev) => {
        if (qty < 1) {
          return prev.filter((it) => !sameLine(it, productId, color, size));
        }
        return prev.map((it) =>
          sameLine(it, productId, color, size) ? { ...it, qty } : it
        );
      });
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);

  // keep supporting the sm:cart-add CustomEvent for ProductDetailPage
  useEffect(() => {
    function onCartAdd(e: Event) {
      const detail = (e as CustomEvent).detail as {
        product: Product;
        qty: number;
        color?: string | null;
        size?: string | null;
      };
      if (!detail?.product) return;
      addToCart(detail.product, detail.qty, { color: detail.color, size: detail.size });
    }
    window.addEventListener("sm:cart-add", onCartAdd);
    return () => window.removeEventListener("sm:cart-add", onCartAdd);
  }, [addToCart]);

  useEffect(() => {
    if (!toast.visible) return;
    const t = window.setTimeout(() => setToast((s) => ({ ...s, visible: false })), 3000);
    return () => window.clearTimeout(t);
  }, [toast.visible]);

  const itemCount = useMemo(() => items.reduce((sum, it) => sum + it.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.product.price * it.qty, 0),
    [items]
  );

  const dismissToast = useCallback(() => setToast((s) => ({ ...s, visible: false })), []);

  const value: CartContextValue = {
    items,
    itemCount,
    subtotal,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    toast,
    dismissToast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}