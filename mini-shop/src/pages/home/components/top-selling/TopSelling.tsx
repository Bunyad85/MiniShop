import ProductCard from "../new-arrivals/ProductCard";
import TopSellingSkeleton from "./TopSellingSkeleton";
import useTopSelling from "./useTopSelling";

const TopSelling = () => {
    const { visibleItems, isLoading, hasError, canShowMore, showMore } = useTopSelling();

    return (
        <section className="w-full bg-white py-14 sm:py-16 lg:py-18">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="h-px w-full bg-black/10" />

                <h2 className="mt-14 text-center text-[32px] font-black uppercase leading-none text-black sm:text-[38px] lg:text-[44px]">
                    Top Selling
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
                                {isLoading ? (
                                    <TopSellingSkeleton />
                                ) : (
                                    visibleItems.map((item) => (
                                        <div key={item.id} className="w-[230px] shrink-0 sm:w-auto">
                                            <ProductCard item={item} compactMobile />
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {!isLoading && canShowMore && (
                            <div className="mt-9 flex justify-center">
                                <button
                                    type="button"
                                    onClick={showMore}
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

export default TopSelling;
