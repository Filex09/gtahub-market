export interface MarketItem {
  id: number;
  name: string;
  category: string;
  scope: 'legal' | 'illegal';
  referencePrice: string;
  median30d: string;
  variation: string;
  isPositive: boolean;
  activeListings: number;
  image: string; 
}

export interface Transaction {
  id: number;
  itemId: number;
  itemName: string;
  price: string;
  buyer: string;
  seller: string;
  time: string;
  status: 'COMPLETADA' | 'PENDIENTE' | 'CANCELADA';
}

export const featuredItems: MarketItem[] = [
  {
    id: 1,
    name: "Camiseta España 2026 (Local)",
    category: "Ropa Hombre",
    scope: "legal",
    referencePrice: "650.000 $",
    median30d: "620.000 $",
    variation: "+4.8%",
    isPositive: true,
    activeListings: 3,
    image: "/images/items/camiseta-españa-2026-(local).png"
  },
  {
    id: 2,
    name: "Hubpods",
    category: "Tecnología",
    scope: "legal",
    referencePrice: "6.000.000 $",
    median30d: "5.800.000 $",
    variation: "+3.4%",
    isPositive: true,
    activeListings: 5,
    image: "/images/items/hubpods.png"
  }
];

export const recentTransactions: Transaction[] = [
  {
    id: 1,
    itemId: 1,
    itemName: "Camiseta España 2026 (Local)",
    price: "650.000 $ (Nego)",
    buyer: "Marc_RP",
    seller: "Alejandro_V",
    time: "Ayer a las 20:54",
    status: "COMPLETADA"
  },
  {
    id: 2,
    itemId: 2,
    itemName: "Hubpods",
    price: "6.000.000 $",
    buyer: "Sofia_K",
    seller: "Dario_G",
    time: "Hoy a las 9:43",
    status: "COMPLETADA"
  }
];