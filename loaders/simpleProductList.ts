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
  shuffle?: boolean;
}

/**
 * @title Simple Products
 * @description Use it in Shelves and static Galleries.
 */
const loader = (
  props: Props,
): Promise<Product[] | null> => {
  const mappedProducts = props.products.map(mapProductToSchemaOrg);
  if (props.shuffle) {
    return Promise.resolve(shuffleArray(mappedProducts));
  } else {
    return Promise.resolve(mappedProducts);
  }
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
    })),
    "description": description,
    // TODO: How to make this configurable
    "url": `/produtos/${id}`,
    "isConsumableFor": live
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock",
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "BRL",
      highPrice: price / 100,
      lowPrice: price / 100,
      offerCount: 2,
      offers: [{
        "price": price / 100,
        "@type": "Offer",
        priceSpecification: [],
        "inventoryLevel": 10,
        "availability": live
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      }],
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

function shuffleArray<T>(array: Array<T>) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
