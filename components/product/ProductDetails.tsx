import Image from "deco-sites/std/components/Image.tsx";
import AddToCartButton from "$store/islands/AddToCartButton.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useOffer } from "$store/sdk/useOffer.ts";
import { formatPrice } from "$store/sdk/format.ts";
import type { LoaderReturnType } from "$live/types.ts";
import type { ProductDetailsPage } from "deco-sites/std/commerce/types.ts";
import IconStarFilled from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/star-filled.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import Avatar from "$store/components/ui/Avatar.tsx";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
}

function NotFound() {
  return (
    <div class="w-full flex justify-center items-center py-28">
      <div class="flex flex-col items-center justify-center gap-6">
        <Text variant="heading-2">Página não encontrada</Text>
        <a href="/">
          <Button>Voltar à página inicial</Button>
        </a>
      </div>
    </div>
  );
}

function Sizes(product: Product) {
  const possibilities = useVariantPossibilities(product);
  const options = Object.entries(
    possibilities["TAMANHO"] ?? possibilities["Tamanho"] ?? {},
  );

  return (
    <ul class="flex justify-center items-center gap-2">
      {options.map(([value, urls]) => {
        const url = urls.find((url) => url === product.url) || urls[0];

        return (
          <a href={url}>
            <Avatar
              class="bg-default"
              variant="abbreviation"
              content={value}
              disabled={url === product.url}
            />
          </a>
        );
      })}
    </ul>
  );
}

function Details({ page }: { page: ProductDetailsPage }) {
  const {
    breadcrumbList,
    product,
  } = page;
  const {
    description,
    productID,
    offers,
    image: images,
    name,
    gtin,
  } = product;
  const { price, listPrice, seller, installments } = useOffer(offers);
  const [front, back] = images ?? [];

  return (
    <Container class="py-0 sm:py-10">
      <div class="md:inline hidden mx-4">
        <Breadcrumb
          itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
        />
        <div class="flex">
          <div class="flex flex-row overflow-auto snap-x snap-mandatory scroll-smooth sm:gap-2">
            {[front, back ?? front].map((img, index) => (
              <Image
                style={{ aspectRatio: "360 / 500" }}
                class="snap-center min-w-[100vw] sm:min-w-0 sm:w-auto sm:h-[600px]"
                sizes="(max-width: 640px) 100vw, 30vw"
                src={img.url!}
                alt={img.alternateName}
                width={360}
                height={500}
                // Preload LCP image for better web vitals
                preload={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
              />
            ))}
          </div>
          <div class="w-full flex flex-col max-w-[640px]">
            <div class="flex justify-between mt-3">
              <h1 class="lg:text-2xl text-[20px] font-bold text-[#5D7661]">
                {
                  /* {name?.includes(isVariantOf?.name ?? "")
                ? name
                : `${isVariantOf?.name ?? ""} - ${name}`} */
                }
                asdasd
              </h1>
              <div class="flex flex-col items-center">
                <p class="text-[#324836] font-normal text-[10px]">
                  3 avaliações
                </p>
                <div class="flex  gap-1">
                  <IconStarFilled class="h-4 w-4 text-[#5D7661]" />
                  <IconStarFilled class="h-4 w-4 text-[#5D7661]" />
                  <IconStarFilled class="h-4 w-4 text-[#5D7661]" />
                  <IconStarFilled class="h-4 w-4 text-[#5D7661]" />
                  <IconStarFilled class="h-4 w-4 text-[#ECCDA5]" />
                </div>
              </div>
            </div>
            {description && (
              <div class="flex flex-col justify-center items-start mt-4 pb-4">
                <p class="text-black font-bold text-[11px] uppercase">
                  Descrição
                </p>
                <span class="text-[#727272] font-medium capitalize text-[11px] mt-[6px]">
                  {description}
                </span>
              </div>
            )}
            <div class="flex flex-col items-start justify-center">
              <p class="text-black font-bold text-[11px] uppercase mb-2">
                SELECIONE O TAMANHO
              </p>
              <Sizes {...product} />
            </div>
          </div>
        </div>
      </div>
      <div class="md:hidden flex flex-col gap-4 sm:flex-row sm:gap-10 pt-5 px-4">
        <Breadcrumb
          itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
        />
        {/* Image Gallery */}
        <div class="flex flex-row overflow-auto snap-x snap-mandatory scroll-smooth sm:gap-2">
          {[front, back ?? front].map((img, index) => (
            <Image
              style={{ aspectRatio: "360 / 500" }}
              class="snap-center min-w-[100vw] sm:min-w-0 sm:w-auto sm:h-[600px]"
              sizes="(max-width: 640px) 100vw, 30vw"
              src={img.url!}
              alt={img.alternateName}
              width={360}
              height={500}
              // Preload LCP image for better web vitals
              preload={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>
        <div class="w-full flex flex-col border-b-1">
          <div class="flex justify-between mt-3">
            <h1 class="lg:text-2xl text-[20px] font-bold text-[#5D7661]">
              {
                /* {name?.includes(isVariantOf?.name ?? "")
                ? name
                : `${isVariantOf?.name ?? ""} - ${name}`} */
              }
              asdasd
            </h1>
            <div class="flex flex-col items-center">
              <p class="text-[#324836] font-normal text-[10px]">3 avaliações</p>
              <div class="flex  gap-1">
                <IconStarFilled class="h-4 w-4 text-[#5D7661]" />
                <IconStarFilled class="h-4 w-4 text-[#5D7661]" />
                <IconStarFilled class="h-4 w-4 text-[#5D7661]" />
                <IconStarFilled class="h-4 w-4 text-[#5D7661]" />
                <IconStarFilled class="h-4 w-4 text-[#ECCDA5]" />
              </div>
            </div>
          </div>
          {description && (
            <div class="flex flex-col justify-center items-start mt-4 pb-4">
              <p class="text-black font-bold text-[11px] uppercase">
                Descrição
              </p>
              <span class="text-[#727272] font-medium capitalize text-[11px] mt-[6px]">
                {description}
              </span>
            </div>
          )}
        </div>
        <div class="flex flex-col items-start justify-center">
          <p class="text-black font-bold text-[11px] uppercase mb-2">
            SELECIONE O TAMANHO
          </p>
          <Sizes {...product} />
        </div>
      </div>
      <div class="md:hidden z-50 bg-[#324836] h-[120px] rounded-t-[25px] pt-[30px] px-[14px] fixed bottom-0 w-full flex items-start justify-between">
        <div class="w-full">
          {listPrice && (
            <div>
              <span class="line-through text-[#C1C1C1] text-[14px] font-normal">
                {formatPrice(listPrice, offers!.priceCurrency!)}
              </span>
            </div>
          )}
          {price && (
            <div>
              <span class="text-[#ECCDA5] text-[24px] font-bold">
                {formatPrice(price, offers!.priceCurrency!)}
              </span>
            </div>
          )}
        </div>
        {seller && <AddToCartButton skuId={productID} sellerId={seller} />}
      </div>
    </Container>
  );
}

function ProductDetails({ page }: Props) {
  if (page) {
    return <Details page={page} />;
  }

  return <NotFound />;
}

export default ProductDetails;
