import { useCartStore } from "@/stores/cart-store";
import { useCheckoutStore } from "@/stores/checkout-store";

export const generateMessage = () => {
    const { name, address } = useCheckoutStore((state) => state);
    const { cart } = useCartStore((state) => state);

    let orderProducts = [];
    for (let item of cart) {
        orderProducts.push(`${item.quantity}x ${item.product.name}`);
    }

    return `**Información de comprador**
Nombre: ${name}
Dirección: ${address.street}, ${address.number}, (${address.complement}),
${address.district}, ${address.city}/${address.state}   
--------
**Orden**
${orderProducts.join("\n")}`;
};
