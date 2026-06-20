
export type TransactionCardLang = "es" | "en";

export interface TransactionCardProperties{
    user:string;
    address:string;
    rating:number;
    operationCount:number;
    price:number;
    available:number;
    minLimit:number;
    maxLimit:number;
    windowMinutes:number;
    paymentMethods:string[];
    lang?: TransactionCardLang;
    onBuy:() => void;
}


