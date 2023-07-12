import Button from "$store/components/ui/Button.tsx";

interface Props {
  productName: string;
  productPrice: number;
  targetWhatsappNumber: string;
}

function AddToCartButton(
  { productName, productPrice, targetWhatsappNumber }: Props,
) {
  const onClick = () => {
    const urlLink = generateLink(
      productName,
      productPrice,
      targetWhatsappNumber,
    );
    location.href = urlLink;
  };

  return (
    <>
      <Button
        variant="secondary"
        data-deco="add-to-cart"
        onClick={onClick}
        class="md:w-full !rounded-[10px] md:h-[88px] md:text-[35px] text-xl h-10 w-[133px]"
      >
        COMPRAR
      </Button>
    </>
  );
}

export default AddToCartButton;

function formatCents(centavos: number) {
  const reais = centavos;
  return reais.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export const generateLink = (
  productName: string,
  price: number,
  phone: string,
) => {
  const text = `*Olá!*

  Me interessei sobre o produto *${productName}* (${formatCents(price)}).

  Gostaria de prosseguir com a compra!
`;

  return `https://api.whatsapp.com/send?phone=${phone}&text=${
    window.encodeURIComponent(text)
  }`;
};
