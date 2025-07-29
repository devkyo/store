"use client";
import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { Product, ProductContexType, Category } from '@/types/product';
import { Config } from '@/types/config';

import { getCategories, getConfig, getProducts } from "@/services/product";



const ProductContext = createContext<ProductContexType | undefined>(undefined);

export default function ProductProvider({ children }: { children: ReactNode }) {

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [config, setConfig] = useState<Config | null>(null);


  useEffect(() => {

    getCategories()
      .then(setCategories)
      .catch(err => {
        console.log('Error al cargar categorias', err);
      });

    getProducts()
      .then(setProducts)
      .catch(err => {
        console.log('Error al cargar productos', err);
      });

    getConfig()
      .then(setConfig)
      .catch(err => {
        console.log('Error al cargar configuracion', err);
      })


  }, []);

  return (
    // <div style={{
    //   '--background: '143, 69%, 24% '
    //   '--primary': '143, 69%, 24%',
    //   '--primary-foreground': '324, 87%, 45%'
    // } as React.CSSProperties}>

    <ProductContext.Provider value={{ products, categories, config }}>
      {children}
    </ProductContext.Provider>
    // </div>
  )
}

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext debe usarse dentro de ProductProvider");
  }
  return context;
};