"use client";
import { useProductContext } from "@/context/ProductContext";
export const Logo = () => {
    const { config } = useProductContext();
    return (
        <div className="text-xl">
            {/* <img src="images/rws-black.png" alt="" className="w-[120px] dark:hidden" /> */}
            <img src={config?.logotipo} alt="" className="w-[120px] dark:hidden" />
            <img src="images/rws-white.png" alt="" className="w-[120px] hidden dark:block" />
        </div>
    );
};
