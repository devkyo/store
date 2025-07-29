"use client";

import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { useCartStore } from "@/stores/cart-store";


type Props = {
    item: Product;
};

export const ProductItem = ({ item }: Props) => {

    const { toast } = useToast();
    const { upsertCartItem } = useCartStore((state) => state);

    const handleAddButton = () => {
        upsertCartItem(item, 1);
        toast({
            title: "Añadido al carrito!",
            description: `${item.name} se ha añadido al carrito.`,
            action: <ToastAction altText="close">Cerrar</ToastAction>,
            duration: 900,
        });
    };

    return (
        <div className="flex flex-col justify-start rounded-md border overflow-hidden h-full">
            <div className="rounded-tl-md rounded-tr-md min-h-[150px] max-h-[150px] md:min-h-[250px] md:max-h-[250px] overflow-hidden relative">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                />

            </div>
            <div className="mt-1 flex flex-col p-2 gap-2 justify-between flex-grow">
                <p className="text-[14px] font-bold flex-grow">{item.name}</p>
                <p className="text-sm opacity-50">s/ {item.price.toFixed(2)}</p>
                <div className="flex items-end flex-grow">
                    <Badge className="bottom-1 right-1 rounded-lg">{item.status}</Badge>
                </div>
                <Button variant="outline" onClick={handleAddButton}>
                    Agregar
                </Button>
            </div>
        </div>
    );
};
