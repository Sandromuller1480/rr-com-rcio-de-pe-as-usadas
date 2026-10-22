import { createSeed } from "@/data/seed";
import type { DemoState, Order, RequestItem } from "@/types/domain";

export interface DemoRepository {
  load(): DemoState;
  save(state: DemoState): void;
  reset(): DemoState;
}

export const STORAGE_KEY = "rr-demo:v1";

export class LocalDemoRepository implements DemoRepository {
  load(): DemoState {
    if (typeof window === "undefined") return createSeed();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return this.reset();
      const parsed = JSON.parse(raw) as DemoState;
      if (parsed.version !== 1 || !Array.isArray(parsed.products)) return this.reset();
      return parsed;
    } catch {
      return createSeed();
    }
  }
  save(state: DemoState) {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
  reset() {
    const state = createSeed();
    this.save(state);
    return state;
  }
}

export function completeSale(state: DemoState, productIds: string[], channel: Order["channel"], payment: Order["payment"]): DemoState {
  const available = productIds.map((id) => state.products.find((p) => p.id === id)).filter(Boolean);
  if (available.length !== productIds.length || available.some((p) => p!.status !== "Disponivel")) throw new Error("Uma ou mais pecas nao estao disponiveis.");
  if (payment === "Recusado") return state;
  const order: Order = {
    id: `PED-${Date.now().toString().slice(-5)}`,
    customer: "Cliente demonstrativo", channel,
    total: available.reduce((sum, p) => sum + p!.price, 0), payment,
    status: payment === "Aprovado" ? "Em separacao" : "Novo",
    createdAt: new Date().toISOString(),
    items: available.map((p) => ({ productId: p!.id, name: p!.name, price: p!.price })),
    timeline: ["Pedido criado", `Pagamento ${payment.toLowerCase()}`],
  };
  return {
    ...state, cart: [], orders: [order, ...state.orders],
    products: state.products.map((p) => productIds.includes(p.id) && payment === "Aprovado" ? { ...p, status: "Vendida" as const } : p),
  };
}

export function addRequest(state: DemoState, request: Omit<RequestItem, "id" | "createdAt" | "status">): DemoState {
  return { ...state, requests: [{ ...request, id: `SOL-${Date.now().toString().slice(-4)}`, status: "Nova", createdAt: new Date().toISOString() }, ...state.requests] };
}
