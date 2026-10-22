import type { DemoState, Order, Product } from "@/types/domain";

const names = [
  ["Farol dianteiro", "Iluminação"], ["Lanterna traseira", "Iluminação"], ["Alternador", "Elétrica"],
  ["Motor de partida", "Elétrica"], ["Retrovisor elétrico", "Vidros e retrovisores"], ["Porta dianteira", "Lataria"],
  ["Capô", "Lataria"], ["Radiador", "Arrefecimento"], ["Câmbio manual", "Câmbio e transmissão"],
  ["Banco dianteiro", "Acabamento interno"], ["Módulo de injeção", "Elétrica"], ["Compressor de ar", "Motor e componentes"],
];
const brands = ["Volkswagen", "Chevrolet", "Fiat", "Ford", "Toyota", "Honda"];
const models = ["Gol", "Onix", "Strada", "Ka", "Corolla", "Civic"];

export function createProducts(): Product[] {
  return Array.from({ length: 36 }, (_, index) => {
    const [name, category] = names[index % names.length];
    const vehicle = index % brands.length;
    return {
      id: `P${String(index + 1).padStart(3, "0")}`,
      sku: `RR-${category.slice(0, 3).toUpperCase()}-${String(index + 1).padStart(4, "0")}`,
      name: `${name} ${brands[vehicle]} ${models[vehicle]}`,
      category,
      brand: brands[vehicle],
      model: models[vehicle],
      year: 2014 + (index % 10),
      engine: index % 3 === 0 ? "1.0" : index % 3 === 1 ? "1.6" : "2.0",
      price: 189 + index * 37,
      condition: (["Excelente", "Boa", "Boa", "Regular", "Não testada"] as const)[index % 5],
      status: index % 11 === 0 ? "Reservada" : index % 13 === 0 ? "Vendida" : index % 9 === 0 ? "Preparação" : "Disponível",
      location: `Depósito A / C${(index % 4) + 1} / E${(index % 6) + 1} / P${(index % 3) + 1}`,
      originVehicle: `VEI-${String((index % 8) + 1).padStart(3, "0")}`,
    };
  });
}

function createOrders(products: Product[]): Order[] {
  return Array.from({ length: 15 }, (_, index) => {
    const product = products[(index * 2 + 1) % products.length];
    const days = (index + 1) * 2;
    return {
      id: `PED-${String(1048 - index).padStart(5, "0")}`,
      customer: ["Marcos Lima", "Ana Souza", "Carlos Alves", "Juliana Prado"][index % 4],
      channel: (["Portal", "Aplicativo", "Balcão"] as const)[index % 3],
      total: product.price,
      payment: (["Aprovado", "Aprovado", "Pendente", "Recusado"] as const)[index % 4],
      status: ["Em separação", "Pronto para retirada", "Concluído", "Novo"][index % 4],
      createdAt: new Date(Date.now() - days * 86400000).toISOString(),
      items: [{ productId: product.id, name: product.name, price: product.price }],
      timeline: ["Pedido criado", "Pagamento analisado"],
    };
  });
}

export function createSeed(): DemoState {
  const products = createProducts();
  return {
    version: 2,
    products,
    orders: createOrders(products),
    requests: Array.from({ length: 6 }, (_, index) => ({
      id: `SOL-${String(301 + index).padStart(4, "0")}`,
      type: index % 2 ? "Peça procurada" : "Compatibilidade",
      customer: ["Ana Souza", "Marcos Lima", "Juliana Prado"][index % 3],
      vehicle: `${brands[index]} ${models[index]} ${2017 + index}`,
      part: names[index][0], status: index < 3 ? "Nova" : "Em atendimento",
      createdAt: new Date(Date.now() - index * 86400000).toISOString(),
    })),
    cart: [], favorites: [], role: "Administrador",
  };
}
