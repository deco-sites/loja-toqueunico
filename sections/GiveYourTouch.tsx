import Button from "$store/components/ui/Button.tsx";

export default function GiveYourTouch() {
  return (
    <div class=" bg-[#D9D9D9] flex flex-col items-center justify-center h-[221px] md:h-[374px] w-full">
      <div class="w-[198px] md:w-[669px] flex flex-col items-center justify-center">
        <p class="font-normal text-[11px] md:text-[24px] text-black text-center mb-3 md:mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          consectetur lectus sed leo ultricies.
        </p>
        <div class="hidden md:inline">
          <Button size="large" variant="primary">
            DÊ O SEU TOQUE
          </Button>
        </div>
        <div class="md:hidden inline">
          <Button size="small" variant="primary">
            DÊ O SEU TOQUE
          </Button>
        </div>
      </div>
    </div>
  );
}
