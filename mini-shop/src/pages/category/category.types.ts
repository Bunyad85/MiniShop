import type { NewArrivalItem } from "../home/components/new-arrivals/newArrivals.types";

export type DummyCategoryProduct = {
    id: number;
    title: string;
    price: number;
    discountPercentage: number;
    rating: number;
    thumbnail: string;
    images?: string[];
    category: string;
};

export type DummyProductsResponse = {
    products: DummyCategoryProduct[];
};

export type CategoryProduct = NewArrivalItem & {
    category: string;
    productType: string;
    dressStyle: string;
    colors: string[];
    sizes: string[];
};

export type FilterState = {
    productTypes: string[];
    minPrice: number;
    maxPrice: number;
    colors: string[];
    sizes: string[];
    dressStyle: string | null;
};

export type SortOption = "most-popular" | "price-low" | "price-high" | "newest";
