import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

declare type AssemblyType = "UNISELECT" | "MULTISELECT" | "TEXT";

export interface AssemblyOption {
  name: string;
  description?: string;
  price?: number;
  live?: boolean;
}

export interface Assembly {
  name: string;
  live: boolean;
  type: AssemblyType;
  min?: number;
  max?: number;
  price?: number;
  options: AssemblyOption[];
}

/** @titleBy name */
export interface SimpleProduct {
  id?: string;
  name: string;
  images: Array<{
    image: LiveImage;
  }>;
  category: string;
  description?: string;
  live: boolean;
  price: number;

  highlight: boolean;
  min?: number;
  max?: number;
  assemblyOptions?: Assembly[];
}

export interface Props {
  products: Array<SimpleProduct>;
}

/**
 * @title Simple Products
 * @description Use it in Shelves and static Galleries.
 */
const loader = (
  props: Props,
): Promise<Product[] | null> => {
  return Promise.resolve(props.products.map(mapProductToSchemaOrg));
};

export default loader;

function mapProductToSchemaOrg(product: SimpleProduct): Product {
  const {
    name,
    category,
    id,
    images,
    description,
    live,
    price,
    // highlight,
    // min,
    // max,
    assemblyOptions,
  } = product;

  const schemaOrgProduct = {
    "@context": "https://schema.org/",
    "@type": "Product" as const,
    "productID": id,
    "category": category,
    "name": name,
    "sku": "TODO",
    "image": images.map((img) => ({
      "@type": "ImageObject",
      url: img.image,
    })), // Assumes LiveImage has a 'url' property
    "description": description,
    "url": `https://yourwebsite.com/products/${id}`, // Replace with actual product URL logic
    "isConsumableFor": live
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock",
    "offers": {
      highPrice: 100,
      lowPrice: 400,
      offerCount: 2,
      offers: [],
      "@type": "AggregateOffer",
      "price": price,
      "priceCurrency": "USD", // Replace with the currency you use

      "availability": live
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    // "aggregateRating": {
    //   "@type": "AggregateRating",
    //   "ratingValue": "4.4", // Replace with actual rating
    //   "reviewCount": "89",  // Replace with actual review count
    // },
    "additionalProperty": assemblyOptions
      ? assemblyOptions.map((option) => ({
        "@type": "PropertyValue" as const,
        "name": option.name,
        "value": option.options.map((op) => op.name).join(", "), // Add more properties as needed
      }))
      : [],
  } as Product;

  return schemaOrgProduct;
}
