import HeaderButton from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";

import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import HeaderSearchMenu from "$store/islands/HeaderSearchMenu.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import Container from "$store/components/ui/Container.tsx";

function Navbar({ items, searchbar, image }: {
  items: INavItem[];
  searchbar: SearchbarProps;
  image: LiveImage;
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        class={`md:hidden flex flex-row justify-between items-center h-[${navbarHeight}] border-b-1 border-default w-full px-2 gap-2`}
      >
        <HeaderButton variant="menu" />

        <a
          href="/"
          class={`flex-grow inline-flex items-center h-[${navbarHeight}]`}
          aria-label="Store logo"
        >
          <img
            class="object-cover w-[175px]"
            src={image}
            alt="logo"
            loading="eager"
          />
        </a>

        <div class="flex gap-1">
          <HeaderButton variant="search" />
          <HeaderButton variant="cart" />
        </div>
      </div>

      {/* Desktop Version */}
      <Container
        class={`hidden md:flex flex-row justify-between items-center border-b-1 border-default w-full pl-2 pr-3 h-[${navbarHeight}]`}
      >
        <div class="flex">
          <a href="/" aria-label="Store logo" class="block mr-10">
            <img
              class="object-contain w-[317px] h-[51px]"
              src={image}
              alt="logo"
              loading="eager"
            />
          </a>
          <div class="flex-auto flex justify-center">
            {items.map((item) => <NavItem item={item} />)}
          </div>
        </div>
        <div class="flex-none w-44 flex items-center justify-end gap-2">
          <HeaderButton variant="search" />
          <HeaderSearchMenu searchbar={searchbar} />
          <Button
            as="a"
            variant="icon"
            href="/login"
            aria-label="Log in"
          >
            <Icon
              id="User"
              width={20}
              height={20}
              strokeWidth={0.4}
              class="text-white"
            />
          </Button>
          <HeaderButton variant="cart" />
        </div>
      </Container>
    </>
  );
}

export default Navbar;
