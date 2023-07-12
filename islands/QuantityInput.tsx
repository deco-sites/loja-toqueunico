import { useSignal } from "@preact/signals";

export default function () {
  const quantity = useSignal(1);

  return (
    <div class="flex items-center justify-between w-[122px] p-2 border-b-1 border-[#E8E8E8]">
      <div
        onClick={() => quantity.value > 1 && quantity.value--}
        class="w-[24px] h-[24px] flex items-center justify-center rounded-full bg-[#ECCDA5] text-[#5D7661] text-2xl font-bold cursor-pointer"
      >
        -
      </div>
      <div class="text-white text-xl">{quantity.value}</div>
      <div
        onClick={() => quantity.value++}
        class="w-[24px] h-[24px] flex items-center justify-center rounded-full bg-[#ECCDA5] text-[#5D7661] text-2xl font-bold cursor-pointer"
      >
        +
      </div>
    </div>
  );
}
