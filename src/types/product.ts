import { Config } from './config';

export interface Category {
    id: string;
    name: string;
    image: string;
}

export interface Product {
    id: number;
    cant: number;
    name: string;
    status: string;
    image: string;
    category: string;
    price: number;
}

export type ProductContexType = {
    products: Product[];
    categories: Category[];
    config: Config | null;
}