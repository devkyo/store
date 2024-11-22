"use client";

import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";

type Props = {
    item: Product;
};

export const ProductItem = ({ item }: Props) => {
    const { toast } = useToast();

    const handleAddButton = () => {
        toast({
            title: "Added to cart!",
            description: `${item.name} has been added to cart.`,
            action: <ToastAction altText="close">Close</ToastAction>,
        });
    };

    return (
        <div>
            <div className="rounded-md overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-32 object-cover"
                />
            </div>
            <div className="mt-3 flex flex-col gap-2">
                <p className="text-lg">{item.name}</p>
                <p className="text-sm opacity-50">$ {item.price.toFixed(2)}</p>
                <Button variant="outline" onClick={handleAddButton}>
                    Add
                </Button>
            </div>
        </div>
    );
};
