import ProductDetailPage from "./product-detail-page";

export default async function Page({
  params,
}: {
  params: { productId: string };
}) {
  return <ProductDetailPage productId={params.productId} />;
}
