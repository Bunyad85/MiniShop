import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ProductCard from "../home/components/new-arrivals/ProductCard";
import CategoryFilters from "./CategoryFilters";
import CategoryPagination from "./CategoryPagination";
import CategoryToolbar from "./CategoryToolbar";
import { useCategoryProducts } from "./useCategoryProducts";

const CategoryPage = () => {
    const { slug } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const searchQuery = searchParams.get("q")?.trim() ?? "";
    const {
        applyFilters,
        draftFilters,
        filteredProducts,
        hasError,
        isLoading,
        pageSize,
        pageNumbers,
        pageTitle,
        paginatedProducts,
        priceBounds,
        productTypes,
        rangeEnd,
        rangeStart,
        safePage,
        setCurrentPage,
        setDraftFilters,
        setSortBy,
        sortBy,
        toggleDraftValue,
        totalPages,
    } = useCategoryProducts(slug, searchQuery);

    useEffect(() => {
        if (searchParams.get("filters") !== "open") {
            return;
        }

        setIsFiltersOpen(true);
        setSearchParams((currentParams) => {
            const nextParams = new URLSearchParams(currentParams);
            nextParams.delete("filters");
            return nextParams;
        });
    }, [searchParams, setSearchParams]);

    return (
        <main className="w-full bg-white py-4 pb-24 lg:pb-32">
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center gap-2 text-[14px] text-black/60">
                    <Link to="/" className="transition-colors hover:text-black">
                        Home
                    </Link>
                    <img
                        src="/right.svg"
                        alt=""
                        aria-hidden="true"
                        className="h-3.5 w-3.5 opacity-50"
                    />
                    <span>{pageTitle}</span>
                </div>

                <div className="mt-4 flex flex-col gap-6 xl:mt-6 xl:flex-row">
                    <div className="hidden xl:block xl:w-[295px] xl:shrink-0">
                        <CategoryFilters
                            productTypes={productTypes}
                            draftFilters={draftFilters}
                            priceBounds={priceBounds}
                            onToggleValue={toggleDraftValue}
                            onSetDraftFilters={setDraftFilters}
                            onApplyFilters={applyFilters}
                        />
                    </div>

                    <div className="min-w-0 flex-1">
                        <CategoryToolbar
                            pageTitle={pageTitle}
                            rangeStart={rangeStart}
                            rangeEnd={rangeEnd}
                            totalProducts={filteredProducts.length}
                            sortBy={sortBy}
                            onOpenFilters={() => setIsFiltersOpen(true)}
                            onSortChange={(value) => {
                                setSortBy(value);
                                setCurrentPage(1);
                            }}
                        />

                        {hasError ? (
                            <div className="mt-8 rounded-[20px] border border-black/10 p-8 text-center">
                                <p className="text-[16px] text-black/60">
                                    Category products could not be loaded.
                                </p>
                            </div>
                        ) : isLoading || !draftFilters ? (
                            <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
                                {Array.from({ length: pageSize }).map((_, index) => (
                                    <div key={index} className="animate-pulse">
                                        <div className="h-70 rounded-[20px] bg-[#F0EEED]" />
                                        <div className="mt-4 h-5 rounded bg-[#F0EEED]" />
                                        <div className="mt-2 h-4 w-1/2 rounded bg-[#F0EEED]" />
                                        <div className="mt-3 h-7 w-2/3 rounded bg-[#F0EEED]" />
                                    </div>
                                ))}
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <>
                                <div className="mt-6 grid grid-cols-2 gap-x-3.5 gap-y-6 sm:mt-8 sm:gap-6 xl:grid-cols-3">
                                    {paginatedProducts.map((product) => (
                                        <ProductCard key={product.id} item={product} compactMobile />
                                    ))}
                                </div>

                                <CategoryPagination
                                    pageNumbers={pageNumbers}
                                    safePage={safePage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            </>
                        ) : (
                            <div className="mt-8 rounded-[20px] border border-dashed border-black/10 bg-[#FAFAFA] px-6 py-12 text-center">
                                <p className="text-[16px] text-black/60">
                                    No products matched the selected filters.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {isFiltersOpen && (
                    <div className="fixed inset-0 z-40 bg-black/30 xl:hidden">
                        <button
                            type="button"
                            aria-label="Close filters"
                            onClick={() => setIsFiltersOpen(false)}
                            className="absolute inset-0"
                        />
                        <div className="absolute left-0 top-0 h-full w-[86%] max-w-[320px] overflow-y-auto p-4">
                            <CategoryFilters
                                productTypes={productTypes}
                                draftFilters={draftFilters}
                                priceBounds={priceBounds}
                                onClose={() => setIsFiltersOpen(false)}
                                onToggleValue={toggleDraftValue}
                                onSetDraftFilters={setDraftFilters}
                                onApplyFilters={applyFilters}
                            />
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
};

export default CategoryPage;
