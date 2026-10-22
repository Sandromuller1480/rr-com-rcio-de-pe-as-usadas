import test from "node:test";
import assert from "node:assert/strict";
import { createSeed } from "../src/data/seed";
import { completeSale } from "../src/services/repository";

test("venda aprovada torna a unidade indisponível", () => {
  const state = createSeed();
  const item = state.products.find((p) => p.status === "Disponível")!;
  const next = completeSale(state, [item.id], "Portal", "Aprovado");
  assert.equal(next.products.find((p) => p.id === item.id)?.status, "Vendida");
  assert.equal(next.orders[0].items[0].name, item.name);
});

test("pagamento recusado não cria venda nem baixa estoque", () => {
  const state = createSeed();
  const item = state.products.find((p) => p.status === "Disponível")!;
  const next = completeSale(state, [item.id], "Portal", "Recusado");
  assert.equal(next.orders.length, state.orders.length);
  assert.equal(next.products.find((p) => p.id === item.id)?.status, "Disponível");
});

test("unidade vendida não pode ser vendida novamente", () => {
  const state = createSeed();
  const item = state.products.find((p) => p.status === "Disponível")!;
  const sold = completeSale(state, [item.id], "Balcão", "Aprovado");
  assert.throws(() => completeSale(sold, [item.id], "Portal", "Aprovado"), /não estão disponíveis/);
});
