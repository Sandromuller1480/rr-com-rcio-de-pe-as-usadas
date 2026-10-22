export type Product = {
  id: string;
  sku: string;
  name: string;
  category: string;
  brand: string;
  model: string;
  year: number;
  engine: string;
  price: number;
  condition: "Excelente" | "Boa" | "Regular" | "Não testada";
  status: "Disponível" | "Reservada" | "Vendida" | "Preparação";
  location: string;
  originVehicle: string;
};

export type Order = {
  id: string;
  customer: string;
  channel: "Portal" | "Aplicativo" | "Balcão";
  total: number;
  payment: "Pendente" | "Aprovado" | "Recusado" | "Reembolsado";
  status: string;
  createdAt: string;
  items: { productId: string; name: string; price: number }[];
  timeline: string[];
};

export type RequestItem = { id: string; type: string; customer: string; vehicle: string; part: string; status: string; createdAt: string };
export type DemoState = {
  version: 2;
  products: Product[];
  orders: Order[];
  requests: RequestItem[];
  cart: string[];
  favorites: string[];
  role: string;
};
