'use client'

import { ArrowUpRight, ArrowDownLeft, ArrowRight, Check, X } from "lucide-react";
import { PaymentBubbleProperties } from "./types";
import { formatCurrency } from "./utils";

const variantLabel = {
  sent:    "PAGO ENVIADO",
  request: "SOLICITUD DE PAGO",
} as const;

export function PaymentBubble({
  amount,
  currency,
  memo,
  variant,
  status,
  side,
  onPay,
  onReject,
  onViewReceipt,
}: PaymentBubbleProperties) {
  const isSent   = variant === "sent";
  const isDark   = isSent;

  const cornerClass = side === "sender"
    ? "rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-md"
    : "rounded-tl-3xl rounded-tr-3xl rounded-bl-md rounded-br-3xl";

  return (
    <div className={`w-72 overflow-hidden ${cornerClass} ${isDark ? "bg-[#0E1C16] text-white" : "bg-white text-[#1A2721] border border-[#D2DED8]"}`}>

    
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isDark ? "bg-[#24312B]" : "bg-[#EBF4F0]"}`}>
            {isSent
              ? <ArrowUpRight size={18} className="text-white" />
              : <ArrowDownLeft size={18} className="text-[#23C987]" />
            }
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#95A29C]">
              {variantLabel[variant]}
            </p>
            <p className={`text-2xl font-bold leading-tight ${isDark ? "text-white" : "text-[#1A2721]"}`}>
              {formatCurrency(amount)} {currency}
            </p>
          </div>
        </div>

        {memo && (
          <p className={`text-sm ${isDark ? "text-[#95A29C]" : "text-[#54615B]"}`}>
            "{memo}"
          </p>
        )}
      </div>

 
      <div className={`h-px ${isDark ? "bg-[#24312B]" : "bg-[#D2DED8]"}`} />

  
      <div className={`px-4 py-3 flex items-center justify-between ${isDark ? "bg-[#162c23]" : "bg-[#e8f5ef]"}`}>

        {status === "completed" && <>
          <span className="flex items-center gap-1 text-xs text-[#95A29C]">
            <Check size={14} />
            Completado
          </span>
          <button onClick={onViewReceipt} className={`flex items-center gap-1 text-xs ${isDark ? "text-[#95A29C] hover:text-white" : "text-[#54615B] hover:text-[#1A2721]"} transition-colors cursor-pointer`}>
            Ver recibo <ArrowRight size={12} />
          </button>
        </>}

        {status === "pending" && variant === "request" && <>
          <span className="flex items-center gap-1.5 text-xs text-[#54615B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D2DED8]" />
            Pendiente
          </span>
          <div className="flex items-center gap-4">
            <button onClick={onReject} className="text-xs text-[#54615B] hover:text-[#1A2721] transition-colors cursor-pointer">
              Rechazar
            </button>
            <button onClick={onPay} className="bg-[#23C987] hover:bg-[#1db87a] text-white rounded-full px-4 py-1.5 text-xs font-semibold transition-colors cursor-pointer">
              Pagar
            </button>
          </div>
        </>}

        {status === "pending" && variant === "sent" && (
          <span className="flex items-center gap-1.5 text-sm text-[#95A29C]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#95A29C]" />
            Pendiente
          </span>
        )}

        {status === "rejected" && (
          <span className="flex items-center gap-1.5 text-sm text-[#FF5957]">
            <X size={14} />
            Rechazado
          </span>
        )}

      </div>
    </div>
  );
}
