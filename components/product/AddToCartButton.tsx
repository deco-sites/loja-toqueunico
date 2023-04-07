import Button from "$store/components/ui/Button.tsx";
import { useAddToCart } from "$store/sdk/useAddToCart.ts";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
  skuId: string;
  sellerId: string;
  icon?: boolean;
}

function AddToCartButton({ skuId, sellerId, icon = false }: Props) {
  const props = useAddToCart({
    skuId,
    sellerId,
  });

  return (
    <>
      {!icon && (
        <Button
          variant="secondary"
          data-deco="add-to-cart"
          {...props}
          class="w-full"
        >
          COMPRAR
        </Button>
      )}
      {icon && (
        <Button
          {...props}
          variant="icon"
          data-deco="add-to-cart"
          class="px-0 md:px-2"
        >
          <Icon
            id="ShoppingCart"
            width={20}
            height={20}
            strokeWidth={2}
            class="text-[#ECCDA5]"
          />
        </Button>
      )}
    </>
  );
}

export default AddToCartButton;
