import ProductCard from "../home/components/new-arrivals/ProductCard";
import type { NewArrivalItem } from "../home/components/new-arrivals/newArrivals.types";

type ProductRecommendationsProps = {
    items: NewArrivalItem[];
};

const ProductRecommendations = ({ items }: ProductRecommendationsProps) => {
    if (items.length === 0) {
        return null;
    }

    return (
        <section className="mt-16 pt-12 sm:mt-20 sm:pt-14">
            <h2 className="text-center text-[32px] font-black uppercase leading-none text-black sm:text-[38px] lg:text-[44px]">
                <span className="sm:hidden">
                    <span className="block">You Might</span>
                    <span className="block">Also Like</span>
                </span>
                <span className="hidden sm:inline">You Might Also Like</span>
            </h2>

            <div className="mt-8 flex gap-4 overflow-x-auto pb-2 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:pb-0 xl:grid-cols-4">
                {items.map((item) => (
                    <div key={item.id} className="w-[220px] shrink-0 sm:w-auto sm:shrink">
                        <ProductCard item={item} compactMobile />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductRecommendations;
