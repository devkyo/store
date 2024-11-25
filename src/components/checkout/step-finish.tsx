import { useCheckoutStore } from "@/stores/checkout-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { generateMessage } from "@/lib/generate-message";
import { SendHorizonal } from "lucide-react";

export const StepFinish = () => {
    const { name } = useCheckoutStore((state) => state);

    const message = generateMessage();
    const linkWhatsApp = `https://wa.me//${
        process.env.NEXT_PUBLIC_WHATSAPP
    }?text=${encodeURI(message)}`;

    const handleClick = () => {
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    return (
        <div className="text-center flex flex-col gap-5">
            <p>
                All set <strong>{name}</strong>!
            </p>
            <p>
                We will now send your order to our WhatsApp to complete. Our
                attendants will guide you through the progress of your order.
            </p>
            <Button onClick={handleClick}>
                <Link
                    target="_blank"
                    href={linkWhatsApp}
                    className="w-full flex justify-center"
                >
                    <SendHorizonal className="mr-1" /> Send to WhatsApp
                </Link>
            </Button>
        </div>
    );
};
