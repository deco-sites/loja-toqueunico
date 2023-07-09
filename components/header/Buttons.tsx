import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useUI } from "$store/sdk/useUI.ts";

function SearchButton() {
  const { displaySearchbar } = useUI();

  return (
    <Button
      variant="icon"
      aria-label="search icon button"
      onClick={() => {
        displaySearchbar.value = !displaySearchbar.peek();
      }}
    >
      <Icon
        id="MagnifyingGlass"
        width={20}
        height={20}
        strokeWidth={0.1}
        class="text-white"
      />
    </Button>
  );
}

function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      variant="icon"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = true;
      }}
    >
      <Icon
        id="Bars3"
        width={20}
        height={20}
        strokeWidth={0.01}
        class="text-white"
      />
    </Button>
  );
}

function CartButton() {
  const { displayCart } = useUI();
  const dataDeco = displayCart.value ? {} : { "data-deco": "open-cart" };

  return (
    <Button
      {...dataDeco}
      variant="icon"
      class="relative"
      aria-label="open cart"
      onClick={() => {
        displayCart.value = true;
      }}
    >
      <Icon
        id="ShoppingCart"
        width={20}
        height={20}
        strokeWidth={2}
        class="text-white"
      />
    </Button>
  );
}

function HeaderButton({ variant }: { variant: "cart" | "search" | "menu" }) {
  if (variant === "cart") {
    return <CartButton />;
  }

  if (variant === "search") {
    return <SearchButton />;
  }

  if (variant === "menu") {
    return <MenuButton />;
  }

  return null;
}

export default HeaderButton;
