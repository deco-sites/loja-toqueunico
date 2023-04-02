import Button from "$store/components/ui/Button.tsx";
import { useAddToCart } from "$store/sdk/useAddToCart.ts";

interface Props {
  skuId: string;
  sellerId: string;
}

function AddToCartButton({ skuId, sellerId }: Props) {
  const props = useAddToCart({
    skuId,
    sellerId,
  });

  return (
    <Button
      variant="secondary"
      data-deco="add-to-cart"
      {...props}
      class="w-full"
    >
      COMPRAR
    </Button>
  );
}

export default AddToCartButton;
