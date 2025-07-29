"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/types/product";
import { TabsContent } from "@radix-ui/react-tabs";
import { ProductEmpty } from "./empty";
import { ProductItem } from "./item";
import { useProductContext } from "@/context/ProductContext";
import { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Loader, Siren, X } from "lucide-react";

type Tab = {
  title: string;
  value: string;
  products: Product[];
};


export const ProductTabs = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const { products, categories, config } = useProductContext();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [defaultItem, setDefaultItem] = useState<string>('');

  const tabs: Tab[] = categories.map(cat => ({
    title: cat.name,
    value: cat.name.toLowerCase(),
    products: products.filter((item) => item.category.toLowerCase() === cat.name.toLowerCase()),
  }));

  const filterProducts = (products: Product[]) => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  useEffect(() => {

    if (products.length > 0 && categories.length > 0) {
      const firstTab = tabs[0];
      if (firstTab?.value) {
        setDefaultItem(firstTab.value);
      }
      setLoading(false);
    }
  }, [products, categories]);

  return (
    <>
      {loading ? (
        <div className="w-full h-[50vh] flex justify-center items-center">
          <Loader className="w-6 h-6 animate-spin text-gray-500" />
        </div>
      ) :

        <Tabs defaultValue={defaultItem}>
          <TabsList className="flex">
            {tabs.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className="flex-1"
              >
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>


          {tabs.map((item) => (
            <TabsContent
              key={item.value}
              value={item.value}
              className="mt-3"
            >
              <div className="flex flex-col md:flex-row gap-2 justify-between mb-3 lg:mb-0">
                {
                  config?.message ? (
                    <Alert className="py-0  flex items-center rounded-sm  lg:h-[30px]" variant="destructive">
                      {/* <Siren size={20} className="mt-[-12px]" /> */}
                      <div className="text-[14px] mb-0 overflow-hidden whitespace-nowrap">
                        <div className="inline-block animate-marquee">
                          {config?.message}

                        </div>
                      </div>
                    </Alert>) :
                    <div></div>
                }
                <div className="relative w-full mb-3 lg:w-1/3">

                  <input
                    type="text"
                    placeholder="Buscar producto..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-3 w-full border p-1 rounded text-sm "
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm("")}
                      className="absolute right-2 top-2 text-gray-400 hover:text-red-500"
                      title="Borrar"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>
              {filterProducts(item.products).length > 0 ? (
                <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                  {filterProducts(item.products).map((product, index) => (
                    <ProductItem key={index} item={product} />
                  ))}
                </div>
              ) : (
                <ProductEmpty />
              )}


            </TabsContent>
          ))}





        </Tabs>

      }
    </>
  );
};
