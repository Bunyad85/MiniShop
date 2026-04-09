import { useEffect, useState } from "react";
import axios from "axios";
import type { TopSellingItem } from "./topSelling.types";

type DummyProductsResponse = {
    products: Array<{
        id: number;
        title: string;
        price: number;
        discountPercentage: number;
        rating: number;
        thumbnail: string;
        images?: string[];
    }>;
};

const useTopSelling = () => {
    const [items, setItems] = useState<TopSellingItem[]>([]);
    const [visibleCount, setVisibleCount] = useState(4);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                setHasError(false);

                const { data } = await axios.get<DummyProductsResponse>(
                    "https://dummyjson.com/products?limit=8&skip=8",
                );

                const mappedItems: TopSellingItem[] = data.products.map((product) => {
                    const oldPrice = Math.round(
                        product.price / (1 - product.discountPercentage / 100),
                    );

                    return {
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.images?.[0] ?? product.thumbnail,
                        oldPrice: oldPrice > product.price ? oldPrice : undefined,
                        discount:
                            product.discountPercentage > 0
                                ? `-${Math.round(product.discountPercentage)}%`
                                : undefined,
                        rating: Number(product.rating.toFixed(1)),
                    };
                });

                setItems(mappedItems);
            } catch {
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        void fetchProducts();
    }, []);

    return {
        items,
        visibleItems: items.slice(0, visibleCount),
        isLoading,
        hasError,
        canShowMore: visibleCount < items.length,
        showMore: () => setVisibleCount((current) => current + 4),
    };
};

export default useTopSelling;
