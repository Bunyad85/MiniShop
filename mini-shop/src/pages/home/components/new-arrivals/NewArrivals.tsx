import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import type { NewArrivalItem } from "./newArrivals.types";

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

const NewArrivals = () => {
    const [items, setItems] = useState<NewArrivalItem[]>([]);
    const [visibleCount, setVisibleCount] = useState(4);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                setHasError(false);

                const { data } = await axios.get<DummyProductsResponse>(
                    "https://dummyjson.com/products?limit=8&skip=0",
                );

                const mappedItems: NewArrivalItem[] = data.products.map((product) => {
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

    const visibleItems = items.slice(0, visibleCount);
    const canShowMore = visibleCount < items.length;

    return (
        <section className="w-full bg-white py-14 sm:py-16 lg:py-18">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-center text-[32px] font-black uppercase leading-none text-black sm:text-[38px] lg:text-[44px]">
                    New Arrivals
                </h2>

                {hasError ? (
                    <div className="mt-14 flex flex-col items-center gap-4">
                        <p className="text-[16px] text-black/60">Products could not be loaded.</p>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="inline-flex h-12 items-center justify-center rounded-full border border-black/10 px-6 text-[15px] font-medium text-black"
                        >
                            Retry
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="mt-12 overflow-x-auto pb-2 sm:overflow-visible">
                            <div className="flex min-w-max gap-5 sm:grid sm:min-w-0 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
                                {isLoading
                                    ? Array.from({ length: 4 }).map((_, index) => (
                                        <div
                                            key={index}
                                            className="w-[230px] shrink-0 animate-pulse sm:w-auto"
                                        >
                                            <div className="h-46 rounded-[20px] bg-[#F0EEED] sm:h-70" />
                                            <div className="mt-4 h-6 rounded bg-[#F0EEED]" />
                                            <div className="mt-3 h-5 w-1/2 rounded bg-[#F0EEED]" />
                                            <div className="mt-3 h-8 w-2/3 rounded bg-[#F0EEED]" />
                                        </div>
                                    ))
                                    : visibleItems.map((item) => (
                                        <div key={item.id} className="w-[230px] shrink-0 sm:w-auto">
                                            <ProductCard item={item} compactMobile />
                                        </div>
                                    ))}
                            </div>
                        </div>

                        {!isLoading && canShowMore && (
                            <div className="mt-9 flex justify-center">
                                <button
                                    type="button"
                                    onClick={() => setVisibleCount((current) => current + 4)}
                                    className="inline-flex h-12.5 min-w-50 items-center justify-center rounded-full border border-black/10 bg-white px-6 text-[15px] font-medium text-black transition-colors hover:bg-black hover:text-white"
                                >
                                    View All
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default NewArrivals;
