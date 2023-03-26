import Image from "deco-sites/std/components/Image.tsx";
import Container from "$store/components/ui/Container.tsx";
import Text from "$store/components/ui/Text.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Highlight {
  src: LiveImage;
  alt: string;
  href: string;
  label: string;
}

export interface Props {
  highlights?: Highlight[];
  title: string;
}

function Highlights({ highlights = [], title }: Props) {
  return (
    <Container class="gap-5 px-[15px] md:px-[120px] py-[21px] md:py-[46px]">
      <Slider
        class="gap-6"
        snap="snap-center sm:snap-start block first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-0"
      >
        {highlights.map(({ href, src, alt, label }) => (
          <a href={href} class="w-[161px] md:w-[285px] cursor-pointer group">
            <img
              class="object-cover w-full h-[120px] md:h-[292px] rounded-t-[13px] group-hover:shadow-xl"
              src={src}
              alt={alt}
              loading="eager"
            />
            <div class="bg-[#ECCDA5] h-[41px] md:h-[100px] rounded-b-[13px] flex justify-center items-center group-hover:shadow-xl">
              <p class="font-semibold text-[20px] md:text-[48px] text-black">
                {label}
              </p>
            </div>
          </a>
        ))}
      </Slider>
    </Container>
  );
}

export default Highlights;
