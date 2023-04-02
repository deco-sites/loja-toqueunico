import Text from "$store/components/ui/Text.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import type { BreadcrumbList } from "deco-sites/std/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Item({ name, item }: { name?: string; item?: string }) {
  if (!name || !item) {
    return null;
  }

  return (
    <li class="whitespace-nowrap overflow-hidden overflow-ellipsis">
      <a href={item} class="hover:underline">
        <Text tone="[#5D7661]">
          {name}
        </Text>
      </a>
    </li>
  );
}

function Breadcrumb({ itemListElement = [] }: Props) {
  return (
    <ul class="flex flex-row gap-2 items-center w-full">
      <Item name="Home" item="/" />
      {itemListElement.map((item) => (
        <>
          <li class="mt-0.5">
            <Icon
              class="text-[#5D7661]"
              id="ChevronRight"
              width={12}
              height={12}
              strokeWidth={2}
            />
          </li>
          <Item {...item} />
        </>
      ))}
    </ul>
  );
}

export default Breadcrumb;
