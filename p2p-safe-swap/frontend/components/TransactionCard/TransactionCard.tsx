'use client'
import { Clock, Copy, Check } from "lucide-react";
import { useState } from "react";
import { TransactionCardProperties } from "./types";
import { formatNumber, getInitials, translations, truncateAddress } from "./utils";



export function TransactionCard({
  user,
  address,
  rating,
  operationCount,
  price,
  available,
  minLimit,
  maxLimit,
  windowMinutes,
  paymentMethods,
  lang = "en",
  onBuy,
}: TransactionCardProperties) {
  const [copied, setCopied] = useState(false);
  const t = translations[lang];

  function handleCopyAddress() {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-white rounded-2xl border border-[#D2DED8] p-5 flex flex-col gap-5 w-full shadow-sm">

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-full bg-[#23C987] flex items-center justify-center shrink-0">
            <span className="text-black font-bold text-sm">{getInitials(user)}</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyAddress}
                className="flex items-center gap-1.5 group cursor-pointer"
                title={address}
              >
                <span className="font-bold text-[#1A2721] text-base leading-tight font-mono">
                  {truncateAddress(address)}
                </span>
                {copied
                  ? <Check size={14} className="text-[#23C987] shrink-0" />
                  : <Copy size={14} className="text-[#95A29C] opacity-0 group-hover:opacity-100 shrink-0 transition-opacity" />
                }
              </button>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#23C987" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
</svg>
            </div>
            <div className="flex items-center gap-1.5 text-[#54615B] text-sm mt-0.5">
              <span>★ {rating}</span>
              <span className="text-[#95A29C]">·</span>
              <span>{operationCount} ops</span>
            </div>
          </div>
        </div>

        <div className="text-right shrink-0">
          <p className="font-bold text-[#1A2721] text-3xl leading-tight">{price}</p>
          <p className="text-[#95A29C] text-sm font-medium">EUR / USDT</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[#54615B] text-sm">{t.available}</span>
            <span className="font-semibold text-[#1A2721] text-sm">{formatNumber(available)}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#54615B] text-sm">{t.window}</span>
            <div className="flex items-center gap-1 text-[#1A2721]">
              <Clock size={14} className="text-[#1A2721]" />
              <span className="text-sm">{windowMinutes} min</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#54615B] text-sm">{t.limits}</span>
          <span className="font-semibold text-[#1A2721] text-sm">{minLimit} – {maxLimit} €</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
         {paymentMethods.map((name, index)=>
           <span key={index} className="border bg-[#F5FCF9] border-[#D2DED8] rounded-full px-4 py-1.5 text-sm text-[#54615B] font-medium">
            {name}
          </span>
        )}
       
        
        </div>
        <button
          onClick={onBuy}
          className="bg-[#23C987] hover:bg-[#1db87a] active:bg-[#18a86e] text-white rounded-full px-7 py-2.5 font-semibold text-sm shrink-0 transition-colors cursor-pointer"
        >
          {t.buy}
        </button>
      </div>

    </div>
  );
}
