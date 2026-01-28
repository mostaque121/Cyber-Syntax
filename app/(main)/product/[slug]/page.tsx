import { notFound } from "next/navigation";
import { getProductBySlug } from "../../actions/product-actions";
import { ProductBreadcrumb } from "../components/product-bredcrumb";
import { ProductDetails } from "../components/product-details";
import { ProductImages } from "../components/product-images";
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug({ slug });
  if (!product) {
    notFound();
  }

  return (
    <div className="container px-4 md:px-8 mx-auto py-3">
      <ProductBreadcrumb
        productTitle={product.title}
        category={product.category}
      />
      <div className="flex flex-col md:flex-row gap-8">
        <ProductImages images={product.images} />
        <ProductDetails
          image={
            product.images.find((img) => img.isFeatured)?.url ||
            product.images[0].url
          }
          productId={product.id}
          title={product.title}
          brand={product.brand}
          description={product.shortDescription ?? ""}
          price={product.price}
          warranty={product.warranty}
          discountPercentage={product.discountPercentage}
          productType={product.productType}
          isHotDeal={product.isHotDeal}
        />
      </div>
    </div>
  );
}
