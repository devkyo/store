"use client";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { TabsSkeleton } from "@/components/products/skeleton";
import { ProductTabs } from "@/components/products/tab";
import { useProductContext } from "@/context/ProductContext";
import { Suspense } from "react";

const Page = () => {
    const { config } = useProductContext();
    return (
        <div className="w-full max-w-5xl mx-auto">
            <Header />
            <div className="mx-3 mb-2 rounded-md overflow-hidden">
                <img src={config?.banner} alt="" className="w-full h-full object-cover" />
            </div>

            <div className="mx-3">
                <Suspense fallback={<TabsSkeleton />}>
                    <ProductTabs />
                </Suspense>
            </div>
            <Footer />
        </div>
    );
};

export default Page;
