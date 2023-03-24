import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Props {
  imgSrc: LiveImage;
}

function Footer({ imgSrc }: Props) {
  return (
    <footer class="w-full bg-[#242D21]">
      <div class="hidden md:block  w-full">
        <div class="flex justify-between items-center px-[118px] py-[64px] text-[#ECCDA5] text-[24px] font-normal">
          <a
            href="/"
            aria-label="home"
            className="cursor-pointer"
          >
            <img
              class="object-cover w-[215px]"
              src={imgSrc}
              alt="logo"
              loading="eager"
            />
          </a>
          <p class="cursor-pointer hover:text-white">Termos e condições</p>
          <p class="cursor-pointer hover:text-white">Privacidade</p>
          <p class="cursor-pointer hover:text-white">CNPJ + endereço</p>
        </div>
      </div>
      <div class="md:hidden pt-[24px] pb-[42px] px-[16px] flex flex-col text-[#ECCDA5] text-[11px] font-normal items-center justify-center">
        <p class="pb-[32px]">
          <a
            href="/"
            aria-label="home"
            className="cursor-pointer"
          >
            <img
              class="object-cover w-[170px]"
              src={imgSrc}
              alt="logo"
              loading="eager"
            />
          </a>
        </p>
        <div class="flex items-center justify-between w-full">
          <p class="cursor-pointer hover:text-white">Termos e condições</p>
          <p class="cursor-pointer hover:text-white">Privacidade</p>
          <p class="cursor-pointer hover:text-white">CNPJ + endereço</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
