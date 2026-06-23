"use client";

import { createCheckoutSession, Metadata } from "@/actions/createCheckoutSession";
import AddToBasketButton from "@/components/AddToBasketButton";
import { imageUrl } from "@/lib/imageUrl";
import useBasketStore from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { Loader2, ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-zinc-400 animate-spin" />
      </div>
    );
  }

  if (groupedItems.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-400 mb-6">
          <ShoppingBagIcon className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Your basket is empty</h1>
        <p className="text-sm text-zinc-500 mt-2 max-w-xs leading-relaxed">
          Looks like you haven&apos;t added anything to your cart yet. Explore our curated catalog to discover items.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 px-6 py-2.5 rounded-xl bg-zinc-900 text-white font-semibold text-xs tracking-wide hover:bg-zinc-800 transition-all shadow-md active:scale-98"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);

    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
        clerkUserId: user!.id,
      };

      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session", error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalItemsCount = groupedItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = useBasketStore.getState().getTotalPrice();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="border-b border-zinc-200 pb-5 mb-8">
        <h1 className="text-3xl font-black tracking-tight text-zinc-900">Shopping Basket</h1>
        <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mt-1">
          {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"} selected
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Product List Stack */}
        <div className="lg:col-span-8 space-y-4">
          {groupedItems?.map((item) => (
            <div
              key={item.product._id}
              className="group bg-white rounded-2xl p-4 border border-zinc-100 shadow-xs hover:border-zinc-200/80 flex items-center justify-between gap-4 transition-all"
            >
              <div
                className="flex items-center flex-1 min-w-0 cursor-pointer"
                onClick={() => router.push(`/product/${item.product.slug?.current}`)}
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-zinc-50 rounded-xl overflow-hidden border border-zinc-100 shrink-0 p-2 mr-4 flex items-center justify-center">
                  {item.product.image && (
                    <Image
                      src={imageUrl(item.product.image).url()}
                      alt={item.product.name ?? "Product image"}
                      className="object-contain mix-blend-multiply w-full h-full transition-transform duration-300 group-hover:scale-105"
                      width={96}
                      height={96}
                    />
                  )}
                </div>
                
                <div className="min-w-0 space-y-1">
                  <h2 className="text-base font-bold text-zinc-900 truncate group-hover:text-zinc-700 transition-colors">
                    {item.product.name}
                  </h2>
                  <p className="text-sm font-semibold text-zinc-900 font-mono">
                    £{((item.product.price ?? 0) * item.quantity).toFixed(2)}
                  </p>
                  {item.quantity > 1 && (
                    <p className="text-[11px] font-medium text-zinc-400">
                      £{item.product.price?.toFixed(2)} each
                    </p>
                  )}
                </div>
              </div>

              <div className="shrink-0 pl-2">
                <AddToBasketButton product={item.product} />
              </div>
            </div>
          ))}
        </div>

        {/* Right: Floating Sticky Checkout Frame */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 bg-white p-6 border border-zinc-100 rounded-2xl shadow-sm z-10 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:w-full max-lg:rounded-t-3xl max-lg:border-t max-lg:shadow-xl">
          <h3 className="text-lg font-bold text-zinc-900 max-lg:hidden">Order Summary</h3>
          
          <div className="mt-4 max-lg:mt-0 space-y-3 pb-4 border-b border-zinc-100 max-lg:pb-2">
            <div className="flex justify-between text-sm font-medium text-zinc-500">
              <span>Subtotal Items</span>
              <span className="font-mono text-zinc-800 font-bold">{totalItemsCount}</span>
            </div>
            <div className="flex justify-between text-sm font-medium text-zinc-500">
              <span>Shipping</span>
              <span className="text-zinc-800 font-bold text-xs uppercase tracking-wider">Calculated next</span>
            </div>
          </div>

          <div className="flex justify-between items-baseline mt-4 mb-4 max-lg:mt-3">
            <span className="text-sm font-bold text-zinc-900 lg:text-base">Estimated Total</span>
            <span className="text-2xl font-black text-zinc-900 font-mono tracking-tight">
              £{totalPrice.toFixed(2)}
            </span>
          </div>

          {isSignedIn ? (
            <button
              onClick={handleCheckout}
              disabled={isLoading}
              className="w-full bg-zinc-950 text-white text-xs font-bold tracking-widest uppercase py-3.5 rounded-xl disabled:bg-zinc-200 disabled:text-zinc-400 hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 shadow-md active:scale-98 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                "Proceed to Checkout"
              )}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button className="w-full bg-zinc-950 text-white text-xs font-bold tracking-widest uppercase py-3.5 rounded-xl hover:bg-zinc-800 transition-all shadow-md active:scale-98 cursor-pointer">
                Sign in to Checkout
              </button>
            </SignInButton>
          )}
        </div>
      </div>
      
      {/* Dynamic buffer clearance overlay underneath the sheet container structure */}
      <div className="h-24 lg:hidden" />
    </div>
  );
}

export default BasketPage;