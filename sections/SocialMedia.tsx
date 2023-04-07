import Text from "$store/components/ui/Text.tsx";
import Container from "$store/components/ui/Container.tsx";

export default function SocialMedia() {
  return (
    <Container class="flex flex-col items-center justify-center pb-10">
      <Text variant="heading-2">
        Siga-nos no Instagram
      </Text>
      <div class="p-8 flex gap-8">
        <div class="bg-[#F5F5F5] w-[180px] h-[180px] rounded-[13px]"></div>
        <div class="bg-[#F5F5F5] w-[180px] h-[180px] rounded-[13px]"></div>
        <div class="bg-[#F5F5F5] w-[180px] h-[180px] rounded-[13px]"></div>
        <div class="bg-[#F5F5F5] w-[180px] h-[180px] rounded-[13px]"></div>
        <div class="bg-[#F5F5F5] w-[180px] h-[180px] rounded-[13px]"></div>
        <div class="bg-[#F5F5F5] w-[180px] h-[180px] rounded-[13px]"></div>
      </div>
    </Container>
  );
}
