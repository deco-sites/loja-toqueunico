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
// import IconStarFilled from "https://deno.land/x/tabler_icons_tsx@0.0.3/tsx/star-filled.tsx";
import type { Product } from "deco-sites/std/commerce/types.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import Avatar from "$store/components/ui/Avatar.tsx";
import QuantityInput from "../../islands/QuantityInput.tsx";
import { useId } from "preact/hooks";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/components/ui/SliderJS.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import ProductImageZoom from "$store/islands/ProductImageZoom.tsx";

export interface Props {
  page: LoaderReturnType<ProductDetailsPage | null>;
  /** @title Número de WhatsApp para envio */
  targetWhatsappNumber: string;
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

function Details({ page, targetWhatsappNumber }: Props) {
  if (!page) return null;

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
  const id = `product-image-gallery:${useId()}`;

  const WIDTH = 360;
  const HEIGHT = 500;
  const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

  return (
    <Container class="py-0 sm:py-10">
      {/* Desktop */}
      <div class="md:inline hidden mx-4">
        <div class="flex items-center justify-between pb-4 px-20">
          <Breadcrumb
            itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
          />
          {
            /* <div class=" flex-col items-center">
            <p class="text-[#324836] font-normal text-[25px]">
              3 avaliações
            </p>
            <div class="flex  gap-1">
              <IconStarFilled class="h-8 w-8 text-[#5D7661]" />
              <IconStarFilled class="h-8 w-8 text-[#5D7661]" />
              <IconStarFilled class="h-8 w-8 text-[#5D7661]" />
              <IconStarFilled class="h-8 w-8 text-[#5D7661]" />
              <IconStarFilled class="h-8 w-8 text-[#ECCDA5]" />
            </div>
          </div> */
          }
        </div>
        <div class="flex justify-center">
          <div class="w-full max-w-[556px]">
            <div
              id={id}
              class="grid grid-cols-1 gap-4 sm:grid-rows-1 sm:justify-center"
            >
              {/* Image Slider */}
              <div class="relative sm:col-start-2 sm:col-span-1 sm:row-start-1">
                <Slider class="carousel carousel-center gap-6 w-[436px]">
                  {(images || []).map((img, index) => (
                    <Slider.Item
                      index={index}
                      class="carousel-item w-full"
                    >
                      <Image
                        class="w-full"
                        sizes="(max-width: 640px) 100vw, 40vw"
                        style={{ aspectRatio: ASPECT_RATIO }}
                        src={img.url!}
                        alt={img.alternateName}
                        width={WIDTH}
                        height={HEIGHT}
                        // Preload LCP image for better web vitals
                        preload={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </Slider.Item>
                  ))}
                </Slider>

                <Slider.PrevButton
                  class="no-animation absolute left-2 top-1/2 btn btn-circle btn-outline"
                  disabled
                >
                  <Icon size={20} id="ChevronLeft" strokeWidth={3} />
                </Slider.PrevButton>

                <Slider.NextButton
                  class="no-animation absolute right-2 top-1/2 btn btn-circle btn-outline"
                  disabled={(images || []).length < 2}
                >
                  <Icon size={20} id="ChevronRight" strokeWidth={3} />
                </Slider.NextButton>

                <div class="absolute top-2 right-2 bg-base-100 rounded-full">
                  <ProductImageZoom
                    images={images || []}
                    width={1280}
                    height={1280 * HEIGHT / WIDTH}
                  />
                </div>
              </div>

              {/* Dots */}
              <ul class="flex gap-2 sm:justify-start overflow-auto px-4 sm:px-0 sm:flex-col sm:col-start-1 sm:col-span-1 sm:row-start-1">
                {(images || []).map((img, index) => (
                  <li class="min-w-[65px] sm:min-w-[100px]">
                    <Slider.Dot index={index}>
                      <Image
                        style={{ aspectRatio: ASPECT_RATIO }}
                        class="group-disabled:border-base-300 border rounded "
                        width={63}
                        height={87.5}
                        src={img.url!}
                        alt={img.alternateName}
                      />
                    </Slider.Dot>
                  </li>
                ))}
              </ul>
            </div>
            <SliderJS rootId={id}></SliderJS>
          </div>
          <div class="w-full flex flex-col max-w-[556px] justify-between pl-16">
            <div class="">
              <div class="flex justify-between">
                <h1 class="text-[45px] font-bold text-[#5D7661] leading-tight">
                  {name}
                </h1>
              </div>
              {description && (
                <div class="flex flex-col justify-center items-start mt-4 pb-4">
                  <p class="text-black font-bold text-[20px] uppercase border-t-2 pt-[22px] pr-4">
                    Descrição
                  </p>
                  <span class="text-[#727272] font-medium capitalize text-[15px] mt-[6px]">
                    {description}
                  </span>
                </div>
              )}
              {
                /* <div class="flex items-center pt-3">
                <p class="text-black font-bold text-[20px] uppercase mr-4">
                  SELECIONE O TAMANHO
                </p>
                <Sizes {...product} />
              </div> */
              }
            </div>
            <div class="bg-[#324836] w-[135%] h-[264px] rounded-[18px] py-[30px] px-[88px] ">
              <div class="flex justify-between items-center max-w-[470px]">
                <>
                  <div class="w-full">
                    {listPrice && (
                      <div>
                        <span class="line-through text-[#C1C1C1] text-[20px] font-normal">
                          {formatPrice(listPrice, offers!.priceCurrency!)}
                        </span>
                      </div>
                    )}
                    {price && (
                      <div class="pb-5">
                        <span class="text-white text-[47px] font-bold">
                          {formatPrice(price, offers!.priceCurrency!)}
                        </span>
                      </div>
                    )}
                  </div>
                </>
                <QuantityInput />
              </div>
              <div class="">
                {product?.name && (
                  <AddToCartButton
                    productName={product.name}
                    productPrice={product.offers?.offers[0].price || 0}
                    targetWhatsappNumber={targetWhatsappNumber}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div class="md:hidden flex flex-col gap-4 sm:flex-row sm:gap-10 pt-5 px-4">
        <Breadcrumb
          itemListElement={breadcrumbList?.itemListElement.slice(0, -1)}
        />
        {/* Image Gallery */}
        <div class="w-full max-w-[556px]">
          <div
            id={id}
            class="grid grid-cols-1 gap-4 sm:grid-rows-1 sm:justify-center"
          >
            {/* Image Slider */}
            <div class="relative sm:col-start-2 sm:col-span-1 sm:row-start-1">
              <Slider class="carousel carousel-center gap-6 w-[436px]">
                {(images || []).map((img, index) => (
                  <Slider.Item
                    index={index}
                    class="carousel-item w-full"
                  >
                    <Image
                      class="w-full mx-auto"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      style={{ aspectRatio: ASPECT_RATIO }}
                      src={img.url!}
                      alt={img.alternateName}
                      width={WIDTH}
                      height={HEIGHT}
                      // Preload LCP image for better web vitals
                      preload={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </Slider.Item>
                ))}
              </Slider>

              <Slider.PrevButton
                class="no-animation absolute left-2 top-1/2 btn btn-circle btn-outline"
                disabled
              >
                <Icon size={20} id="ChevronLeft" strokeWidth={3} />
              </Slider.PrevButton>

              <Slider.NextButton
                class="no-animation absolute right-2 top-1/2 btn btn-circle btn-outline"
                disabled={(images || []).length < 2}
              >
                <Icon size={20} id="ChevronRight" strokeWidth={3} />
              </Slider.NextButton>

              <div class="absolute top-2 right-2 bg-base-100 rounded-full">
                <ProductImageZoom
                  images={images || []}
                  width={1280}
                  height={1280 * HEIGHT / WIDTH}
                />
              </div>
            </div>

            {/* Dots */}
            <ul class="flex gap-2 sm:justify-start overflow-auto px-4 sm:px-0 sm:flex-col sm:col-start-1 sm:col-span-1 sm:row-start-1">
              {(images || []).map((img, index) => (
                <li class="min-w-[65px] sm:min-w-[100px]">
                  <Slider.Dot index={index}>
                    <Image
                      style={{ aspectRatio: ASPECT_RATIO }}
                      class="group-disabled:border-base-300 border rounded "
                      width={63}
                      height={87.5}
                      src={img.url!}
                      alt={img.alternateName}
                    />
                  </Slider.Dot>
                </li>
              ))}
            </ul>
          </div>
          <SliderJS rootId={id}></SliderJS>
        </div>
        <div class="w-full flex flex-col border-b-1">
          <div class="flex justify-between mt-3">
            <h1 class="lg:text-2xl text-[20px] font-bold text-[#5D7661]">
              {name}
            </h1>
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
          {
            /* <p class="text-black font-bold text-[11px] uppercase mb-2">
            SELECIONE O TAMANHO
          </p>
          <Sizes {...product} /> */
          }
        </div>
      </div>
      <div class="md:hidden z-50 bg-[#324836] h-[120px] rounded-t-[25px] pt-[30px] px-[4vw] fixed bottom-0 w-full flex items-start justify-between">
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
        {product?.name && (
          <AddToCartButton
            productName={product.name}
            productPrice={product.offers?.offers[0].price || 0}
            targetWhatsappNumber={targetWhatsappNumber}
          />
        )}
      </div>
    </Container>
  );
}

function ProductDetails(props: Props) {
  if (props.page) {
    return <Details {...props} />;
  }

  return <NotFound />;
}

export default ProductDetails;
