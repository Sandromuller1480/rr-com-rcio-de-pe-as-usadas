import { Prototype } from "@/components/prototype";

export default async function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  return <Prototype route={slug.join("/")} />;
}
