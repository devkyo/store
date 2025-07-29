import { useCheckoutStore } from "@/stores/checkout-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { generateMessage } from "@/lib/generate-message";
import { SendHorizonal } from "lucide-react";
import { useProductContext } from "@/context/ProductContext";
export const StepFinish = () => {
    const { name } = useCheckoutStore((state) => state);
    const { config } = useProductContext();
    const message = generateMessage();
    const linkWhatsApp = `https://wa.me//${config?.phone
        }?text=${encodeURI(message)}`;

    const handleClick = () => {
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    return (
        <div className="text-center flex flex-col gap-5">
            <p>
                Todo listo <strong>{name}</strong>!
            </p>
            <p>
                Enviaremos tu pedido a nuestro WhatsApp para que lo completemos. Nuestros asistentes te guiarán durante el proceso.
            </p>
            <Button onClick={handleClick}>
                <Link
                    target="_blank"
                    href={linkWhatsApp}
                    className="w-full flex justify-center items-center"
                >
                    <SendHorizonal className="mr-1" /> Completar la compra
                </Link>
            </Button>
        </div>
    );
};
