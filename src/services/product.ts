// import { products } from "@/data/products";
import { Product, Category } from "@/types/product";
import { Config } from '@/types/config';

// ### for firebase activate 
// import { collection, getDocs, doc, getDoc, DocumentReference, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
// import { db } from '@/lib/firebase';
import api from "@/lib/api";


// export const getAllCategories = async (): Promise<Category[]> => {
//     const snapshot = await getDocs(collection(db, "Category"));
//     return snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...(doc.data() as Omit<Category, "id">), // casting necesario
//     }));
// };


export const getCategories = async (): Promise<Category[]> => {
    const categories = await api.category.list();
    return categories;
}
export const getProducts = async (): Promise<Product[]> => {
    const products = await api.product.list();
    return products;
}
export const getConfig = async (): Promise<Config> => {
    const config = await api.config.list();
    return config[0];
}

// ####config with firebase
// export const getProductWithCategory = async (): Promise<Product[]> => {
//     const [productSnap, categorySnap] = await Promise.all([
//         getDocs(collection(db, "Product")),
//         getDocs(collection(db, "Category")),
//     ]);

//     // Map de categorías por ID
//     const categoryMap = new Map<string, Category>();
//     categorySnap.forEach((doc) => {
//         const data = doc.data();
//         categoryMap.set(doc.id, { id: doc.id, name: data.name });
//     });
//     const products: Product[] = productSnap.docs.map((docSnap) => {
//         const data = docSnap.data() as DocumentData;

//         const catRef = data.category;
//         const catId = catRef?.id;
//         const category = catId ? categoryMap.get(catId) ?? null : null;

//         return {
//             id: docSnap.id,
//             name: data.name,
//             price: data.price,
//             image: data.image,
//             status: data.status,
//             category,
//         };
//     });

//     return products;
// };

// export const getProductWithCategory = async (): Promise<Product[]> => {
//     const querySnapshot = await getDocs(collection(db, "Product"));

//     const productsWithCategory = await Promise.all(
//         querySnapshot.docs.map(async (docSnap) => {
//             const data = docSnap.data();

//             let category = null;
//             if (data.category) {
//                 const catSnap = await getDoc(data.category);
//                 if (catSnap.exists()) {
//                     console.log('existe cateogry', catSnap)
//                     const catData = catSnap.data() as Category;
//                     category = {
//                         id: catSnap.id,
//                         name: catData.name,
//                     };
//                 }
//             }
//             return {
//                 id: docSnap.id,
//                 name: data.name,
//                 price: data.price,
//                 image: data.image,
//                 status: data.status,
//                 category: category,
//             };
//         })
//     );

//     return productsWithCategory;
// };
