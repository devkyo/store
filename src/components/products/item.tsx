"use client";

import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { useCartStore } from "@/stores/cart-store";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState, useRef } from "react";

type Props = {
    item: Product;
};

export const ProductItem = ({ item }: Props) => {

    const { toast } = useToast();
    const { upsertCartItem } = useCartStore((state) => state);
    const [images, setImages] = useState<string[]>([]);
    const [current, setCurrent] = useState(0);
    const [api, setApi] = useState<CarouselApi | null>(null);

    const plugin = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: false })
    );
    const handleAddButton = () => {
        upsertCartItem(item, 1);
        toast({
            title: "Añadido al carrito!",
            description: `${item.name} se ha añadido al carrito.`,
            action: <ToastAction altText="close">Cerrar</ToastAction>,
            duration: 900,
        });
    };

    useEffect(() => {
        const gallery = item.image.split(',').map(img => img.trim());

        setImages(gallery);

    }, [item.image]);

    useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            setCurrent(api.selectedScrollSnap());
        };

        api.on("select", onSelect);
        onSelect(); // inicial

        return () => {
            api.off("select", onSelect);
        };
    }, [api]);



    return (
        <div className="flex flex-col justify-start rounded-md border overflow-hidden h-full">
            <div className="rounded-tl-md rounded-tr-md min-h-[150px] max-h-[150px] md:min-h-[250px] md:max-h-[250px] overflow-hidden relative">

                <Carousel plugins={[plugin.current]} setApi={setApi} className="relative"
                >
                    <CarouselContent>
                        {
                            images.map((img, index) => (
                                <CarouselItem key={index} className="min-h-[150px] max-h-[150px] md:min-h-[250px] md:max-h-[250px]">
                                    <img
                                        src={img}
                                        alt="asd"
                                        className="w-full h-full object-cover"
                                    />
                                </CarouselItem>
                            ))

                        }

                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                    <div className="flex justify-center gap-2 mt-4  z-99 absolute bottom-1 w-full">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                className={`h-2 w-2 rounded-full transition-all duration-300 ${current === index ? "bg-black opacity-50 w-2" : "bg-gray-300"
                                    }`}
                                onClick={() => api?.scrollTo(index)}
                            />
                        ))}
                    </div>
                </Carousel>

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
