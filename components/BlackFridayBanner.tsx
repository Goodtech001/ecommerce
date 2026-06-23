import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";

async function BlackFridayBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.GFRIDAY);

  if (!sale?.isActive) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-zinc-950 text-white shadow-xl border border-zinc-800">
      {/* Decorative premium ambient glow backgrounds */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 -mb-12 h-60 w-60 rounded-full bg-purple-600/10 blur-3xl" />

      <div className="relative max-w-5xl px-8 py-12 md:py-16 sm:px-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-4 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-purple-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
            Limited Time Offer
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            {sale.title}
          </h2>
          <p className="text-lg text-zinc-400 font-medium leading-relaxed max-w-xl">
            {sale.description}
          </p>
        </div>

        <div className="flex-shrink-0 self-start md:self-center">
          <div className="relative group overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 p-1">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-30 blur-md group-hover:opacity-50 transition duration-500" />
            <div className="relative bg-zinc-950 px-6 py-4 rounded-xl flex items-center gap-4">
              <div>
                <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Use Code</p>
                <p className="text-xl font-black text-purple-400 tracking-wider uppercase font-mono">{sale.couponCode}</p>
              </div>
              <div className="h-8 w-[1px] bg-zinc-800" />
              <div>
                <p className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Discount</p>
                <p className="text-xl font-black text-white">{sale.discountAmount}% OFF</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlackFridayBanner;