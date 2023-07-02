import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import type { RequestURLParam } from "deco-sites/std/functions/requestToParam.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

export interface Props {
  productId: RequestURLParam;
  allProducts: Product[] | null;
}

/**
 * @title Simple Product Page
 */
function loader(
  props: Props,
  req: Request,
): Promise<ProductDetailsPage | null> {
  const product = props.allProducts?.find(({ productID }) =>
    productID === props.productId
  );

  if (!product) return Promise.resolve(null);

  return Promise.resolve({
    "@type": "ProductDetailsPage",
    breadcrumbList: {
      "@type": "BreadcrumbList",
      numberOfItems: 0,
      itemListElement: [],
    },
    product,
    seo: {
      title: product.name ?? "Toque Único",
      description: product.description ?? "Tudo a seu toque.",
      canonical: (new URL(req.url)).href,
    },
  });
}

export default loader;
