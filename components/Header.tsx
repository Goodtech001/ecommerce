"use client";
import { ClerkLoaded, SignInButton, SignedIn, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import Image from 'next/image';
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
import logo from '../public/logo.png';
import useBasketStore from "@/store/store";

function Header() {
  const { user } = useUser();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  const createClerkPasskey = async () => {
    try {
      await user?.createPasskey();
    } catch (err) {
      console.error("Error creating passkey:", JSON.stringify(err, null, 2));
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Identity Branding Logo */}
        <Link href="/" className="shrink-0 transition-transform duration-200 active:scale-98">
          <Image src={logo} alt="brand logo" width={90} height={32} className="object-contain h-auto w-auto" priority />
        </Link>

        {/* Minimal Search Field Engine Capsule */}
        <Form action="/search" className="hidden md:flex flex-1 max-w-lg mx-8">
          <div className="w-full relative">
            <input 
              type="text" 
              name="query" 
              placeholder="Search lifestyle collections..."
              className="w-full bg-zinc-50 hover:bg-zinc-100/70 focus:bg-white text-sm text-zinc-900 pl-4 pr-10 py-2.5 rounded-xl border border-zinc-200/70 focus:border-zinc-900 outline-hidden transition-all" 
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:inline-flex h-5 select-none items-center gap-0.5 rounded-sm border border-zinc-200 bg-white px-1.5 font-mono text-[10px] font-medium text-zinc-400">
              ⌘K
            </kbd>
          </div>
        </Form>

        {/* Action Controls Cluster Area */}
        <div className="flex items-center gap-3">
          {/* Basket Navigation Trigger */}
          <Link 
            href="/basket" 
            className="group relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 transition-all text-xs font-semibold tracking-wide"
          >
            <TrolleyIcon className="w-4 h-4 transition-transform group-hover:-translate-y-[1px]" />
            <span className="hidden sm:inline">My Basket</span>
            
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-purple-600 text-white font-mono text-[10px] font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1 border border-white ring-2 ring-purple-600/20 animate-in zoom-in">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Secure User System Gateways via Clerk */}
          <ClerkLoaded>
            <SignedIn>
              <Link 
                href="/orders" 
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-50 text-zinc-700 hover:text-zinc-900 transition-all border border-zinc-200 text-xs font-semibold"
              >
                <PackageIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Orders</span>
              </Link>
            </SignedIn>

            {user ? (
              <div className="flex items-center gap-2.5 pl-1.5 border-l border-zinc-200">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8 rounded-xl border border-zinc-200"
                    }
                  }} 
                />
                <div className="hidden lg:block text-left leading-tight">
                  <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">Account</p>
                  <p className="text-xs font-bold text-zinc-800 truncate max-w-24">{user.firstName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="text-xs font-bold text-zinc-900 hover:text-zinc-600 px-3 py-2 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            )}

            {user && user.passkeys.length === 0 && (
              <button
                onClick={createClerkPasskey}
                className="hidden xl:block bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold text-xs px-4 py-2.5 rounded-xl border border-purple-200/50 transition-all active:scale-98"
              >
                Secure Account (Passkey)
              </button>
            )}
          </ClerkLoaded>
        </div>
      </header>
    </div>
  );
}

export default Header;